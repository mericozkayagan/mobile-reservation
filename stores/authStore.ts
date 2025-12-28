// ============================================
// AUTH STORE - Kullanıcı kimlik doğrulama yönetimi
// Zustand ile state management
// ============================================

import { create } from 'zustand';
import { User, UserRole } from '../types';
import { DEFAULT_USERS, generateId } from '../constants/defaultData';
import { saveData, loadData, STORAGE_KEYS } from '../utils/storage';

/**
 * Auth Store State Interface
 */
interface AuthState {
  // State
  currentUser: User | null;
  users: User[];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // Actions
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  updateUser: (userId: string, updates: Partial<User>) => Promise<void>;
  clearError: () => void;
  isAdmin: () => boolean;
}

/**
 * Auth Store
 * - Kullanıcı girişi ve kaydı
 * - Oturum yönetimi
 * - Rol bazlı erişim kontrolü
 */
export const useAuthStore = create<AuthState>((set, get) => ({
  // Başlangıç durumu
  currentUser: null,
  users: [],
  isLoading: false,
  isInitialized: false,
  error: null,

  /**
   * Store'u başlat - varsayılan verileri yükle
   */
  initialize: async () => {
    set({ isLoading: true });
    try {
      // Storage'dan kullanıcıları yükle
      const storedUsers = await loadData<User[]>(STORAGE_KEYS.USERS);
      const storedCurrentUser = await loadData<User>(STORAGE_KEYS.CURRENT_USER);

      // Eğer kullanıcı yoksa, varsayılan kullanıcıları ekle
      if (!storedUsers || storedUsers.length === 0) {
        await saveData(STORAGE_KEYS.USERS, DEFAULT_USERS);
        set({ users: DEFAULT_USERS });
      } else {
        set({ users: storedUsers });
      }

      // Kayıtlı oturum varsa, kullanıcıyı set et
      if (storedCurrentUser) {
        set({ currentUser: storedCurrentUser });
      }

      set({ isInitialized: true, isLoading: false });
    } catch (error) {
      console.error('Auth initialize error:', error);
      set({ 
        error: 'Uygulama başlatılırken hata oluştu',
        isLoading: false,
        isInitialized: true 
      });
    }
  },

  /**
   * Kullanıcı girişi
   * @param email - E-posta adresi
   * @param password - Şifre
   * @returns Giriş başarılı mı?
   */
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { users } = get();
      
      // Kullanıcıyı bul
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!user) {
        set({ error: 'E-posta veya şifre hatalı', isLoading: false });
        return false;
      }

      // Kullanıcıyı kaydet
      await saveData(STORAGE_KEYS.CURRENT_USER, user);
      set({ currentUser: user, isLoading: false });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      set({ error: 'Giriş yapılırken hata oluştu', isLoading: false });
      return false;
    }
  },

  /**
   * Çıkış yap
   */
  logout: async () => {
    set({ isLoading: true });
    try {
      await saveData(STORAGE_KEYS.CURRENT_USER, null);
      set({ currentUser: null, isLoading: false });
    } catch (error) {
      console.error('Logout error:', error);
      set({ isLoading: false });
    }
  },

  /**
   * Yeni kullanıcı kaydı
   * @param name - Kullanıcı adı
   * @param email - E-posta
   * @param password - Şifre
   * @param phone - Telefon (opsiyonel)
   * @returns Kayıt başarılı mı?
   */
  register: async (name: string, email: string, password: string, phone?: string) => {
    set({ isLoading: true, error: null });
    try {
      const { users } = get();

      // E-posta kontrolü
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        set({ error: 'Bu e-posta adresi zaten kayıtlı', isLoading: false });
        return false;
      }

      // Yeni kullanıcı oluştur
      const newUser: User = {
        id: generateId('user'),
        email: email.toLowerCase(),
        password,
        name,
        role: 'user' as UserRole,
        phone,
        createdAt: new Date().toISOString(),
      };

      // Kullanıcıları güncelle
      const updatedUsers = [...users, newUser];
      await saveData(STORAGE_KEYS.USERS, updatedUsers);
      await saveData(STORAGE_KEYS.CURRENT_USER, newUser);

      set({ 
        users: updatedUsers, 
        currentUser: newUser, 
        isLoading: false 
      });
      return true;
    } catch (error) {
      console.error('Register error:', error);
      set({ error: 'Kayıt olurken hata oluştu', isLoading: false });
      return false;
    }
  },

  /**
   * Kullanıcı bilgilerini güncelle
   */
  updateUser: async (userId: string, updates: Partial<User>) => {
    const { users, currentUser } = get();
    
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...updates } : user
    );

    await saveData(STORAGE_KEYS.USERS, updatedUsers);

    // Mevcut kullanıcı güncellendiyse, onu da güncelle
    if (currentUser?.id === userId) {
      const updatedCurrentUser = { ...currentUser, ...updates };
      await saveData(STORAGE_KEYS.CURRENT_USER, updatedCurrentUser);
      set({ users: updatedUsers, currentUser: updatedCurrentUser });
    } else {
      set({ users: updatedUsers });
    }
  },

  /**
   * Hata mesajını temizle
   */
  clearError: () => set({ error: null }),

  /**
   * Kullanıcı admin mi?
   */
  isAdmin: () => {
    const { currentUser } = get();
    return currentUser?.role === 'admin';
  },
}));



