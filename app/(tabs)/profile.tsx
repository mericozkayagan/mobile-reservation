// ============================================
// PROFILE SCREEN - Profil ekranı
// ============================================

import React from 'react';
import { View, Text, Pressable, Alert, Share, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Mail,
  Phone,
  LogOut,
  Shield,
  Share2,
  Info,
  ChevronRight,
} from 'lucide-react-native';
import { Button } from '../../components';
import { useAuthStore, useReservationStore } from '../../stores';

/**
 * Profil ekranı
 * - Kullanıcı bilgileri
 * - Çıkış yapma
 * - Uygulama paylaşma (örtülü intent)
 */
export default function ProfileScreen() {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const isAdmin = currentUser?.role === 'admin';
  const { getUserReservations } = useReservationStore();

  // Kullanıcının rezervasyonları
  const reservations = currentUser ? getUserReservations(currentUser.id) : [];
  const activeReservations = reservations.filter((r) => r.status === 'active');

  // Çıkış yap
  const handleLogout = async () => {
    if (Platform.OS === 'web') {
      // Web için window.confirm kullan
      const confirmed = window.confirm('Hesabınızdan çıkış yapmak istediğinizden emin misiniz?');
      if (confirmed) {
        await logout();
        router.replace('/(auth)/login');
      }
    } else {
      // Mobil için Alert.alert kullan
      Alert.alert(
        'Çıkış Yap',
        'Hesabınızdan çıkış yapmak istediğinizden emin misiniz?',
        [
          { text: 'Vazgeç', style: 'cancel' },
          {
            text: 'Çıkış Yap',
            style: 'destructive',
            onPress: async () => {
              await logout();
              router.replace('/(auth)/login');
            },
          },
        ]
      );
    }
  };

  // Uygulama paylaş (örtülü intent)
  const handleShare = async () => {
    try {
      await Share.share({
        message: `🎫 Rezervasyon Uygulaması\n\nOtobüs ve uçak biletlerinizi kolayca rezerve edin!\n\nHemen indirin ve seyahat planınızı yapın.`,
        title: 'Rezervasyon Uygulaması',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  // Menü öğesi bileşeni
  const MenuItem = ({
    icon: Icon,
    label,
    value,
    onPress,
    danger = false,
  }: {
    icon: React.ElementType;
    label: string;
    value?: string;
    onPress?: () => void;
    danger?: boolean;
  }) => (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center py-4 border-b border-dark-800"
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [{ opacity: pressed && onPress ? 0.7 : 1 }]}
    >
      <View
        className={`w-10 h-10 rounded-full items-center justify-center ${
          danger ? 'bg-accent-rose/20' : 'bg-dark-800'
        }`}
      >
        <Icon size={20} color={danger ? '#f43f5e' : '#64748b'} />
      </View>
      <View className="flex-1 ml-4">
        <Text className={`font-medium ${danger ? 'text-accent-rose' : 'text-white'}`}>
          {label}
        </Text>
        {value && <Text className="text-dark-500 text-sm">{value}</Text>}
      </View>
      {onPress && <ChevronRight size={20} color="#64748b" />}
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-dark-950">
      {/* Header */}
      <View className="px-4 py-4 border-b border-dark-800">
        <Text className="text-white text-2xl font-bold">Profil</Text>
      </View>

      <View className="flex-1 px-4">
        {/* Kullanıcı Kartı */}
        <View className="bg-dark-800 rounded-2xl p-6 mt-4 border border-dark-700">
          <View className="items-center">
            {/* Avatar */}
            <View className="w-20 h-20 bg-primary-600 rounded-full items-center justify-center mb-4">
              <Text className="text-white text-3xl font-bold">
                {currentUser?.name?.charAt(0).toUpperCase() || '?'}
              </Text>
            </View>

            {/* İsim ve Rol */}
            <Text className="text-white text-xl font-bold">{currentUser?.name}</Text>
            <View className="flex-row items-center mt-2">
              {isAdmin && (
                <View className="flex-row items-center bg-accent-orange/20 px-3 py-1 rounded-full mr-2">
                  <Shield size={14} color="#f97316" />
                  <Text className="text-accent-orange text-xs ml-1 font-medium">Admin</Text>
                </View>
              )}
              <Text className="text-dark-500">
                {activeReservations.length} aktif rezervasyon
              </Text>
            </View>
          </View>
        </View>

        {/* Kullanıcı Bilgileri */}
        <View className="mt-6">
          <Text className="text-dark-500 text-sm font-medium mb-2 uppercase">
            Hesap Bilgileri
          </Text>
          <View className="bg-dark-800 rounded-2xl px-4 border border-dark-700">
            <MenuItem
              icon={User}
              label="Ad Soyad"
              value={currentUser?.name}
            />
            <MenuItem
              icon={Mail}
              label="E-posta"
              value={currentUser?.email}
            />
            <MenuItem
              icon={Phone}
              label="Telefon"
              value={currentUser?.phone || 'Belirtilmemiş'}
            />
          </View>
        </View>

        {/* Diğer Seçenekler */}
        <View className="mt-6">
          <Text className="text-dark-500 text-sm font-medium mb-2 uppercase">
            Diğer
          </Text>
          <View className="bg-dark-800 rounded-2xl px-4 border border-dark-700">
            <MenuItem
              icon={Share2}
              label="Uygulamayı Paylaş"
              onPress={handleShare}
            />
            <MenuItem
              icon={Info}
              label="Uygulama Hakkında"
              value="Versiyon 1.0.0"
            />
          </View>
        </View>

        {/* Çıkış */}
        <View className="mt-6">
          <View className="bg-dark-800 rounded-2xl px-4 border border-dark-700">
            <MenuItem
              icon={LogOut}
              label="Çıkış Yap"
              onPress={handleLogout}
              danger
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

