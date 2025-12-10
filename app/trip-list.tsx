// ============================================
// TRIP LIST SCREEN - Sefer listesi ekranı
// FlatList ile RecyclerView benzeri görünüm
// ============================================

import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { TripCard, Button } from '../components';
import { useTripStore, useReservationStore } from '../stores';

/**
 * Sefer listesi ekranı
 * - Arama sonuçlarını FlatList ile gösterir (RecyclerView karşılığı)
 * - Sefer kartlarına tıklanınca koltuk seçimine yönlendirir
 */
export default function TripListScreen() {
  const router = useRouter();
  const { filteredTrips, selectTrip, searchParams, isLoading } = useTripStore();
  const { clearSelectedSeats } = useReservationStore();

  // Sefer seçildiğinde
  const handleTripSelect = (tripId: string) => {
    selectTrip(tripId);
    clearSelectedSeats();
    router.push('/seat-selection');
  };

  // Boş liste bileşeni
  const EmptyList = () => (
    <View className="flex-1 items-center justify-center py-20">
      <View className="w-20 h-20 bg-dark-800 rounded-full items-center justify-center mb-4">
        <Search size={40} color="#64748b" />
      </View>
      <Text className="text-white text-lg font-bold mb-2">Sefer Bulunamadı</Text>
      <Text className="text-dark-500 text-center px-8">
        Aradığınız kriterlere uygun sefer bulunamadı. Lütfen farklı tarih veya güzergah deneyin.
      </Text>
      <Button
        title="Geri Dön"
        onPress={() => router.back()}
        variant="outline"
        style={{ marginTop: 20 }}
      />
    </View>
  );

  // Liste başlığı
  const ListHeader = () => (
    <View className="mb-4">
      {searchParams && (
        <View className="bg-dark-800 rounded-xl p-4 border border-dark-700">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-dark-500 text-xs">Güzergah</Text>
              <Text className="text-white font-bold">
                {searchParams.from} → {searchParams.to}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-dark-500 text-xs">Tarih</Text>
              <Text className="text-white font-medium">
                {new Date(searchParams.date).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'short',
                })}
              </Text>
            </View>
          </View>
        </View>
      )}
      <Text className="text-dark-500 mt-4">
        {filteredTrips.length} sefer bulundu
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-dark-950" edges={['bottom']}>
      {/* 
        FlatList - RecyclerView benzeri widget
        - Lazy loading ile performanslı liste
        - Görünür olmayan öğeleri bellekten çıkarır
      */}
      <FlatList
        data={filteredTrips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripCard
            trip={item}
            onPress={() => handleTripSelect(item.id)}
          />
        )}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={{
          padding: 16,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        // RecyclerView benzeri optimizasyonlar
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={5}
        getItemLayout={(data, index) => ({
          length: 200, // Yaklaşık kart yüksekliği
          offset: 200 * index,
          index,
        })}
      />
    </SafeAreaView>
  );
}

