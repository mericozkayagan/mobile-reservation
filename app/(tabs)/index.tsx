// ============================================
// HOME SCREEN - Ana sayfa / Sefer arama
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bus,
  Plane,
  MapPin,
  Calendar,
  Search,
  ArrowRightLeft,
  ChevronRight,
} from 'lucide-react-native';
import { Button } from '../../components';
import { useAuthStore, useTripStore } from '../../stores';
import { TripType, CITIES } from '../../types';

/**
 * Ana sayfa ekranı
 * - Sefer tipi seçimi (otobüs/uçak)
 * - Kalkış ve varış şehri seçimi
 * - Tarih seçimi
 * - Sefer arama
 */
export default function HomeScreen() {
  const router = useRouter();
  const { currentUser } = useAuthStore();
  const { searchTrips } = useTripStore();

  // Form state
  const [tripType, setTripType] = useState<TripType | undefined>(undefined);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Modal state
  const [cityModal, setCityModal] = useState<'from' | 'to' | null>(null);
  const [dateModal, setDateModal] = useState(false);

  // Şehir seçimi işle
  const handleCitySelect = (city: string) => {
    if (cityModal === 'from') {
      setFromCity(city);
    } else {
      setToCity(city);
    }
    setCityModal(null);
  };

  // Şehirleri değiştir
  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  // Arama yap
  const handleSearch = () => {
    if (!fromCity || !toCity || !date) {
      return;
    }

    searchTrips({
      from: fromCity,
      to: toCity,
      date,
      type: tripType,
    });

    router.push('/trip-list');
  };

  // Tarih listesi oluştur (bugünden 30 gün sonrasına kadar)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-950">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="mt-4 mb-6">
          <Text className="text-dark-400">Merhaba,</Text>
          <Text className="text-white text-2xl font-bold">
            {currentUser?.name || 'Misafir'} 👋
          </Text>
          <Text className="text-dark-500 mt-2">
            Nereye seyahat etmek istiyorsunuz?
          </Text>
        </View>

        {/* Sefer Tipi Seçimi */}
        <View className="flex-row mb-6">
          <TouchableOpacity
            onPress={() => setTripType(tripType === 'bus' ? undefined : 'bus')}
            className={`flex-1 flex-row items-center justify-center py-4 rounded-xl border-2 mr-2 ${
              tripType === 'bus'
                ? 'bg-accent-emerald/20 border-accent-emerald'
                : 'bg-dark-800 border-dark-700'
            }`}
          >
            <Bus
              size={24}
              color={tripType === 'bus' ? '#10b981' : '#64748b'}
            />
            <Text
              className={`ml-2 font-medium ${
                tripType === 'bus' ? 'text-accent-emerald' : 'text-dark-400'
              }`}
            >
              Otobüs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTripType(tripType === 'plane' ? undefined : 'plane')}
            className={`flex-1 flex-row items-center justify-center py-4 rounded-xl border-2 ml-2 ${
              tripType === 'plane'
                ? 'bg-primary-500/20 border-primary-500'
                : 'bg-dark-800 border-dark-700'
            }`}
          >
            <Plane
              size={24}
              color={tripType === 'plane' ? '#6366f1' : '#64748b'}
            />
            <Text
              className={`ml-2 font-medium ${
                tripType === 'plane' ? 'text-primary-400' : 'text-dark-400'
              }`}
            >
              Uçak
            </Text>
          </TouchableOpacity>
        </View>

        {/* Arama Formu */}
        <View className="bg-dark-800 rounded-2xl p-4 border border-dark-700">
          {/* Nereden */}
          <TouchableOpacity
            onPress={() => setCityModal('from')}
            className="flex-row items-center py-4 border-b border-dark-700"
          >
            <View className="w-10 h-10 bg-accent-emerald/20 rounded-full items-center justify-center">
              <MapPin size={20} color="#10b981" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-dark-500 text-xs">Nereden</Text>
              <Text className={`text-lg ${fromCity ? 'text-white' : 'text-dark-500'}`}>
                {fromCity || 'Kalkış noktası seçin'}
              </Text>
            </View>
            <ChevronRight size={20} color="#64748b" />
          </TouchableOpacity>

          {/* Swap Button */}
          <View className="absolute right-4 top-[68px] z-10">
            <TouchableOpacity
              onPress={swapCities}
              className="w-10 h-10 bg-primary-600 rounded-full items-center justify-center"
            >
              <ArrowRightLeft size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Nereye */}
          <TouchableOpacity
            onPress={() => setCityModal('to')}
            className="flex-row items-center py-4 border-b border-dark-700"
          >
            <View className="w-10 h-10 bg-accent-rose/20 rounded-full items-center justify-center">
              <MapPin size={20} color="#f43f5e" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-dark-500 text-xs">Nereye</Text>
              <Text className={`text-lg ${toCity ? 'text-white' : 'text-dark-500'}`}>
                {toCity || 'Varış noktası seçin'}
              </Text>
            </View>
            <ChevronRight size={20} color="#64748b" />
          </TouchableOpacity>

          {/* Tarih */}
          <TouchableOpacity
            onPress={() => setDateModal(true)}
            className="flex-row items-center py-4"
          >
            <View className="w-10 h-10 bg-primary-500/20 rounded-full items-center justify-center">
              <Calendar size={20} color="#6366f1" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-dark-500 text-xs">Tarih</Text>
              <Text className="text-white text-lg">
                {new Date(date).toLocaleDateString('tr-TR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </Text>
            </View>
            <ChevronRight size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Arama Butonu */}
        <View className="mt-6 mb-8">
          <Button
            title="Sefer Ara"
            onPress={handleSearch}
            size="lg"
            fullWidth
            disabled={!fromCity || !toCity}
            icon={<Search size={20} color="#fff" />}
          />
        </View>

        {/* Popüler Rotalar */}
        <View className="mb-8">
          <Text className="text-white font-bold text-lg mb-4">Popüler Rotalar</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { from: 'İstanbul', to: 'Ankara', icon: '🚌' },
              { from: 'İstanbul', to: 'İzmir', icon: '✈️' },
              { from: 'Ankara', to: 'Antalya', icon: '🚌' },
              { from: 'İzmir', to: 'Bursa', icon: '🚌' },
            ].map((route, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setFromCity(route.from);
                  setToCity(route.to);
                }}
                className="bg-dark-800 rounded-xl p-4 mr-3 border border-dark-700 min-w-[140px]"
              >
                <Text className="text-2xl mb-2">{route.icon}</Text>
                <Text className="text-white font-medium">{route.from}</Text>
                <Text className="text-dark-500">→ {route.to}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Şehir Seçim Modal */}
      <Modal
        visible={cityModal !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setCityModal(null)}
      >
        <View className="flex-1 bg-dark-950/95">
          <SafeAreaView className="flex-1">
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-dark-800">
              <Text className="text-white text-lg font-bold">
                {cityModal === 'from' ? 'Nereden' : 'Nereye'}
              </Text>
              <TouchableOpacity onPress={() => setCityModal(null)}>
                <Text className="text-primary-400">Kapat</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={CITIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleCitySelect(item)}
                  className="flex-row items-center px-4 py-4 border-b border-dark-800"
                >
                  <MapPin size={20} color="#64748b" />
                  <Text className="text-white text-lg ml-4">{item}</Text>
                </Pressable>
              )}
            />
          </SafeAreaView>
        </View>
      </Modal>

      {/* Tarih Seçim Modal */}
      <Modal
        visible={dateModal}
        animationType="slide"
        transparent
        onRequestClose={() => setDateModal(false)}
      >
        <View className="flex-1 bg-dark-950/95">
          <SafeAreaView className="flex-1">
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-dark-800">
              <Text className="text-white text-lg font-bold">Tarih Seçin</Text>
              <TouchableOpacity onPress={() => setDateModal(false)}>
                <Text className="text-primary-400">Kapat</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={generateDates()}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setDate(item);
                    setDateModal(false);
                  }}
                  className={`flex-row items-center px-4 py-4 border-b border-dark-800 ${
                    item === date ? 'bg-primary-600/20' : ''
                  }`}
                >
                  <Calendar size={20} color={item === date ? '#6366f1' : '#64748b'} />
                  <Text
                    className={`text-lg ml-4 ${
                      item === date ? 'text-primary-400 font-bold' : 'text-white'
                    }`}
                  >
                    {new Date(item).toLocaleDateString('tr-TR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Text>
                </Pressable>
              )}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

