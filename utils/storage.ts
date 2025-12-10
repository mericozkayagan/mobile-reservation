// ============================================
// STORAGE UTILS - AsyncStorage yardımcı fonksiyonları
// ============================================

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage key sabitleri
export const STORAGE_KEYS = {
  USERS: '@reservation_users',
  TRIPS: '@reservation_trips',
  RESERVATIONS: '@reservation_reservations',
  CURRENT_USER: '@reservation_current_user',
  IS_INITIALIZED: '@reservation_initialized',
} as const;

/**
 * Veri kaydetme
 * @param key - Storage anahtarı
 * @param value - Kaydedilecek değer
 */
export const saveData = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Storage save error:', error);
    throw error;
  }
};

/**
 * Veri okuma
 * @param key - Storage anahtarı
 * @returns Okunan değer veya null
 */
export const loadData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Storage load error:', error);
    return null;
  }
};

/**
 * Veri silme
 * @param key - Storage anahtarı
 */
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Storage remove error:', error);
    throw error;
  }
};

/**
 * Tüm verileri temizle
 */
export const clearAllData = async (): Promise<void> => {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Storage clear error:', error);
    throw error;
  }
};

/**
 * Storage başlatılmış mı kontrol et
 */
export const isStorageInitialized = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_INITIALIZED);
    return value === 'true';
  } catch (error) {
    return false;
  }
};

/**
 * Storage'ı başlatılmış olarak işaretle
 */
export const markStorageInitialized = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.IS_INITIALIZED, 'true');
  } catch (error) {
    console.error('Storage init mark error:', error);
  }
};

