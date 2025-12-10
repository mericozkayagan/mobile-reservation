// ============================================
// REGISTER SCREEN - Kayıt ekranı
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, User, Phone, UserPlus } from 'lucide-react-native';
import { Button, Input } from '../../components';
import { useAuthStore } from '../../stores';

/**
 * Kayıt ekranı
 * - Yeni kullanıcı kaydı
 * - Form doğrulama
 */
export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Form doğrulama
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = 'Ad soyad gerekli';
    } else if (name.trim().length < 3) {
      errors.name = 'Ad soyad en az 3 karakter olmalı';
    }

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

    if (!confirmPassword) {
      errors.confirmPassword = 'Şifre tekrarı gerekli';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Kayıt işlemi
  const handleRegister = async () => {
    clearError();
    
    if (!validateForm()) return;

    const success = await register(name.trim(), email.trim(), password, phone.trim() || undefined);
    
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
          {/* Başlık */}
          <View className="items-center mt-8 mb-6">
            <View className="w-16 h-16 bg-primary-600 rounded-2xl items-center justify-center mb-4">
              <UserPlus size={32} color="#fff" />
            </View>
            <Text className="text-white text-2xl font-bold">Hesap Oluştur</Text>
            <Text className="text-dark-400 mt-2">Hemen ücretsiz kayıt olun</Text>
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
              label="Ad Soyad"
              placeholder="Adınız Soyadınız"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
              error={formErrors.name}
              icon={<User size={20} color="#64748b" />}
            />

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
              label="Telefon (Opsiyonel)"
              placeholder="0532 123 4567"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              error={formErrors.phone}
              icon={<Phone size={20} color="#64748b" />}
            />

            <Input
              label="Şifre"
              placeholder="En az 6 karakter"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={formErrors.password}
              icon={<Lock size={20} color="#64748b" />}
            />

            <Input
              label="Şifre Tekrar"
              placeholder="Şifrenizi tekrar girin"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={formErrors.confirmPassword}
              icon={<Lock size={20} color="#64748b" />}
            />
          </View>

          {/* Kayıt Butonu */}
          <Button
            title="Kayıt Ol"
            onPress={handleRegister}
            loading={isLoading}
            fullWidth
            size="lg"
            icon={<UserPlus size={20} color="#fff" />}
          />

          {/* Giriş Linki */}
          <View className="flex-row justify-center mt-6 mb-8">
            <Text className="text-dark-400">Zaten hesabınız var mı? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary-400 font-semibold">Giriş Yapın</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

