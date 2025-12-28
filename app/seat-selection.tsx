// ============================================
// SEAT SELECTION SCREEN - Koltuk seçimi ekranı
// Görsel koltuk düzeni
// ============================================

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bus, Plane, MapPin, Clock, Calendar } from 'lucide-react-native';
import { Button, SeatPicker } from '../components';
import { useTripStore, useReservationStore } from '../stores';

/**
 * Koltuk seçimi ekranı
 * - Seçilen seferin koltuk düzenini gösterir
 * - Koltuk seçme/kaldırma işlemi
 * - Onay sayfasına yönlendirme
 */
export default function SeatSelectionScreen() {
  const router = useRouter();
  const { selectedTrip } = useTripStore();
  const { selectedSeats, selectSeat, deselectSeat } = useReservationStore();

  // Sefer seçilmemişse geri dön
  if (!selectedTrip) {
    return (
      <SafeAreaView className="flex-1 bg-dark-950 items-center justify-center">
        <Text className="text-white">Sefer seçilmedi</Text>
        <Button
          title="Geri Dön"
          onPress={() => router.back()}
          variant="outline"
          style={{ marginTop: 20 }}
        />
      </SafeAreaView>
    );
  }

  const TypeIcon = selectedTrip.type === 'bus' ? Bus : Plane;

  // Koltuk seçimi/kaldırma
  const handleSeatPress = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      deselectSeat(seatNumber);
    } else {
      selectSeat(seatNumber);
    }
  };

  // Toplam fiyat
  const totalPrice = selectedSeats.length * selectedTrip.price;

  // Onay sayfasına git
  const handleContinue = () => {
    if (selectedSeats.length === 0) return;
    router.push('/confirm');
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-950" edges={['bottom']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Sefer Bilgisi */}
        <View className="bg-dark-800 mx-4 mt-4 rounded-2xl p-4 border border-dark-700">
          <View className="flex-row items-center mb-3">
            <View
              className={`w-10 h-10 rounded-full items-center justify-center ${
                selectedTrip.type === 'bus' ? 'bg-accent-emerald/20' : 'bg-primary-500/20'
              }`}
            >
              <TypeIcon
                size={20}
                color={selectedTrip.type === 'bus' ? '#10b981' : '#6366f1'}
              />
            </View>
            <View className="ml-3">
              <Text className="text-white font-semibold">{selectedTrip.company}</Text>
              <Text className="text-dark-400 text-xs">{selectedTrip.vehicleInfo}</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between py-3 border-t border-dark-700">
            <View className="flex-row items-center">
              <MapPin size={16} color="#64748b" />
              <Text className="text-dark-300 ml-2">{selectedTrip.from}</Text>
            </View>
            <Text className="text-dark-500 mx-2">→</Text>
            <View className="flex-row items-center">
              <MapPin size={16} color="#64748b" />
              <Text className="text-dark-300 ml-2">{selectedTrip.to}</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between pt-3 border-t border-dark-700">
            <View className="flex-row items-center">
              <Calendar size={16} color="#64748b" />
              <Text className="text-dark-300 ml-2">
                {new Date(selectedTrip.date).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                })}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Clock size={16} color="#64748b" />
              <Text className="text-dark-300 ml-2">
                {selectedTrip.time} - {selectedTrip.arrivalTime}
              </Text>
            </View>
          </View>
        </View>

        {/* Bilgi Mesajı */}
        <View className="mx-4 mt-4 mb-2">
          <Text className="text-dark-400 text-center text-sm">
            En fazla 5 koltuk seçebilirsiniz. Seçmek için koltuğa dokunun.
          </Text>
        </View>

        {/* Koltuk Seçici */}
        <View className="mx-4 mt-2">
          <SeatPicker
            tripType={selectedTrip.type}
            totalSeats={selectedTrip.totalSeats}
            occupiedSeats={selectedTrip.occupiedSeats}
            selectedSeats={selectedSeats}
            onSeatPress={handleSeatPress}
            maxSelection={5}
          />
        </View>

        <View className="h-24" />
      </ScrollView>

      {/* Alt Bar - Seçim Özeti ve Devam Butonu */}
      <View className="absolute bottom-0 left-0 right-0 bg-dark-900 border-t border-dark-800 px-4 py-4">
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-dark-500 text-xs">Seçilen Koltuklar</Text>
            <Text className="text-white font-bold">
              {selectedSeats.length > 0
                ? selectedSeats.join(', ')
                : 'Koltuk seçin'}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-dark-500 text-xs">Toplam</Text>
            <Text className="text-primary-400 text-xl font-bold">
              ₺{totalPrice}
            </Text>
          </View>
        </View>

        <Button
          title="Devam Et"
          onPress={handleContinue}
          fullWidth
          size="lg"
          disabled={selectedSeats.length === 0}
        />
      </View>
    </SafeAreaView>
  );
}



