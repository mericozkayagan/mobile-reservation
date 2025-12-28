// ============================================
// MY TRIPS SCREEN - Rezervasyonlarım
// ============================================

import React, { useCallback } from 'react';
import { View, Text, FlatList, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ticket } from 'lucide-react-native';
import { ReservationCard } from '../../components';
import { useAuthStore, useReservationStore, useTripStore } from '../../stores';

/**
 * Rezervasyonlarım ekranı
 * - Kullanıcının tüm rezervasyonlarını listeler
 * - Rezervasyon iptal etme
 */
export default function MyTripsScreen() {
  const { currentUser } = useAuthStore();
  const { getUserReservations, cancelReservation, isLoading, initialize } = useReservationStore();
  const { initialize: initTrips } = useTripStore();

  // Kullanıcının rezervasyonlarını al
  const reservations = currentUser ? getUserReservations(currentUser.id) : [];

  // Yenile
  const onRefresh = useCallback(async () => {
    await Promise.all([initialize(), initTrips()]);
  }, []);

  // İptal işlemi
  const handleCancel = (reservationId: string) => {
    Alert.alert(
      'Rezervasyonu İptal Et',
      'Bu rezervasyonu iptal etmek istediğinizden emin misiniz?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'İptal Et',
          style: 'destructive',
          onPress: async () => {
            const success = await cancelReservation(reservationId);
            if (success) {
              Alert.alert('Başarılı', 'Rezervasyon iptal edildi.');
            }
          },
        },
      ]
    );
  };

  // Boş liste
  const EmptyList = () => (
    <View className="flex-1 items-center justify-center py-20">
      <View className="w-20 h-20 bg-dark-800 rounded-full items-center justify-center mb-4">
        <Ticket size={40} color="#64748b" />
      </View>
      <Text className="text-white text-lg font-bold mb-2">Henüz Rezervasyonunuz Yok</Text>
      <Text className="text-dark-500 text-center px-8">
        Sefer arayarak ilk rezervasyonunuzu oluşturabilirsiniz.
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-dark-950">
      {/* Header */}
      <View className="px-4 py-4 border-b border-dark-800">
        <Text className="text-white text-2xl font-bold">Rezervasyonlarım</Text>
        <Text className="text-dark-500 mt-1">
          {reservations.length > 0
            ? `${reservations.length} rezervasyon`
            : 'Henüz rezervasyon yok'}
        </Text>
      </View>

      {/* Liste */}
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReservationCard
            reservation={item}
            onCancel={
              item.status === 'active'
                ? () => handleCancel(item.id)
                : undefined
            }
          />
        )}
        contentContainerStyle={{
          padding: 16,
          flexGrow: 1,
        }}
        ListEmptyComponent={EmptyList}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            tintColor="#6366f1"
            colors={['#6366f1']}
          />
        }
      />
    </SafeAreaView>
  );
}



