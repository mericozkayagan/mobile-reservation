// ============================================
// INDEX - Giriş yönlendirme sayfası
// Oturum durumuna göre yönlendirme yapar
// ============================================

import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../stores';

/**
 * Başlangıç ekranı
 * - Kullanıcı giriş yapmışsa ana sayfaya yönlendir
 * - Giriş yapmamışsa login sayfasına yönlendir
 */
export default function Index() {
  const router = useRouter();
  const { currentUser, isInitialized } = useAuthStore();

  useEffect(() => {
    if (isInitialized) {
      // Kısa bir gecikme ile yönlendir
      const timer = setTimeout(() => {
        if (currentUser) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/login');
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isInitialized, currentUser]);

  return (
    <View className="flex-1 bg-dark-950 items-center justify-center">
      {/* Logo ve Başlık */}
      <View className="items-center mb-8">
        <View className="w-24 h-24 bg-primary-600 rounded-3xl items-center justify-center mb-4">
          <Text className="text-5xl">🎫</Text>
        </View>
        <Text className="text-white text-3xl font-bold">Rezervasyon</Text>
        <Text className="text-primary-400 text-lg mt-1">Otobüs & Uçak Biletleri</Text>
      </View>

      {/* Yükleme Göstergesi */}
      <ActivityIndicator size="large" color="#6366f1" />
      <Text className="text-dark-400 mt-4">Yükleniyor...</Text>
    </View>
  );
}

