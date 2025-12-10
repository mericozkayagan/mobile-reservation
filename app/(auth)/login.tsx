// ============================================
// LOGIN SCREEN - Giriş ekranı
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, LogIn } from 'lucide-react-native';
import { Button, Input } from '../../components';
import { useAuthStore } from '../../stores';

/**
 * Giriş ekranı
 * - E-posta ve şifre ile giriş
 * - Kayıt sayfasına yönlendirme
 */
export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  // Form doğrulama
  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errors.email = 'E-posta adresi gerekli';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (!password) {
      errors.password = 'Şifre gerekli';
    } else if (password.length < 6) {
      errors.password = 'Şifre en az 6 karakter olmalı';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Giriş işlemi
  const handleLogin = async () => {
    clearError();
    
    if (!validateForm()) return;

    const success = await login(email.trim(), password);
    
    if (success) {
      router.replace('/(tabs)');
    }
  };

  // Hızlı giriş (test için)
  const handleQuickLogin = async (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    
    const success = await login(userEmail, userPassword);
    if (success) {
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-950">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="px-6"
        >
          {/* Logo ve Başlık */}
          <View className="items-center mt-12 mb-8">
            <View className="w-20 h-20 bg-primary-600 rounded-2xl items-center justify-center mb-4">
              <Text className="text-4xl">🎫</Text>
            </View>
            <Text className="text-white text-2xl font-bold">Hoş Geldiniz</Text>
            <Text className="text-dark-400 mt-2">Hesabınıza giriş yapın</Text>
          </View>

          {/* Hata Mesajı */}
          {error && (
            <View className="bg-accent-rose/20 border border-accent-rose rounded-xl p-4 mb-4">
              <Text className="text-accent-rose text-center">{error}</Text>
            </View>
          )}

          {/* Form */}
          <View className="mb-6">
            <Input
              label="E-posta"
              placeholder="ornek@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              error={formErrors.email}
              icon={<Mail size={20} color="#64748b" />}
            />

            <Input
              label="Şifre"
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={formErrors.password}
              icon={<Lock size={20} color="#64748b" />}
            />
          </View>

          {/* Giriş Butonu */}
          <Button
            title="Giriş Yap"
            onPress={handleLogin}
            loading={isLoading}
            fullWidth
            size="lg"
            icon={<LogIn size={20} color="#fff" />}
          />

          {/* Kayıt Ol Linki */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-dark-400">Hesabınız yok mu? </Text>
            <Pressable 
              onPress={() => router.push('/(auth)/register')}
              accessibilityRole="link"
              accessibilityLabel="Kayıt Olun"
            >
              <Text className="text-primary-400 font-semibold">Kayıt Olun</Text>
            </Pressable>
          </View>

          {/* Hızlı Giriş (Test için) */}
          <View className="mt-8 pt-6 border-t border-dark-800">
            <Text className="text-dark-500 text-center text-xs mb-4">
              Hızlı Test Girişi
            </Text>
            <View className="flex-row space-x-3">
              <Pressable
                onPress={() => handleQuickLogin('admin@test.com', '123456')}
                accessibilityRole="button"
                accessibilityLabel="Admin olarak giriş yap"
                className="flex-1 bg-accent-orange/20 border border-accent-orange/50 rounded-xl py-3 items-center"
              >
                <Text className="text-accent-orange font-medium">👑 Admin</Text>
                <Text className="text-dark-400 text-xs mt-1">admin@test.com</Text>
              </Pressable>
              <Pressable
                onPress={() => handleQuickLogin('user@test.com', '123456')}
                accessibilityRole="button"
                accessibilityLabel="Kullanıcı olarak giriş yap"
                className="flex-1 bg-accent-emerald/20 border border-accent-emerald/50 rounded-xl py-3 items-center ml-3"
              >
                <Text className="text-accent-emerald font-medium">👤 Kullanıcı</Text>
                <Text className="text-dark-400 text-xs mt-1">user@test.com</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

