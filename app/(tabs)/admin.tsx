// ============================================
// ADMIN SCREEN - Admin paneli
// Sefer ekleme ve silme
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Plus,
  Trash2,
  Bus,
  Plane,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Building2,
  ChevronRight,
} from 'lucide-react-native';
import { Button, Input, Card, TripCard } from '../../components';
import { useAuthStore, useTripStore } from '../../stores';
import { TripType, CITIES, COMPANIES } from '../../types';

/**
 * Admin paneli ekranı
 * - Sefer ekleme formu
 * - Mevcut seferleri listeleme ve silme
 */
export default function AdminScreen() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAdmin = currentUser?.role === 'admin';
  const { trips, addTrip, deleteTrip, isLoading } = useTripStore();

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [tripType, setTripType] = useState<TripType>('bus');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [price, setPrice] = useState('');
  const [company, setCompany] = useState('');
  const [totalSeats, setTotalSeats] = useState('40');
  const [vehicleInfo, setVehicleInfo] = useState('');

  // Modal states
  const [cityModal, setCityModal] = useState<'from' | 'to' | null>(null);
  const [companyModal, setCompanyModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);

  // Admin değilse erişim engelle
  if (!isAdmin) {
    return (
      <SafeAreaView className="flex-1 bg-dark-950 items-center justify-center px-8">
        <Text className="text-6xl mb-4">🔒</Text>
        <Text className="text-white text-xl font-bold text-center">Erişim Engellendi</Text>
        <Text className="text-dark-500 text-center mt-2">
          Bu sayfaya sadece admin kullanıcılar erişebilir.
        </Text>
      </SafeAreaView>
    );
  }

  // Sefer sil
  const handleDelete = (tripId: string) => {
    Alert.alert(
      'Seferi Sil',
      'Bu seferi silmek istediğinizden emin misiniz?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            await deleteTrip(tripId);
            Alert.alert('Başarılı', 'Sefer silindi.');
          },
        },
      ]
    );
  };

  // Formu sıfırla
  const resetForm = () => {
    setTripType('bus');
    setFrom('');
    setTo('');
    setDate('');
    setTime('');
    setArrivalTime('');
    setPrice('');
    setCompany('');
    setTotalSeats('40');
    setVehicleInfo('');
  };

  // Sefer ekle
  const handleAddTrip = async () => {
    if (!from || !to || !date || !time || !arrivalTime || !price || !company) {
      Alert.alert('Hata', 'Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    await addTrip({
      type: tripType,
      from,
      to,
      date,
      time,
      arrivalTime,
      price: parseInt(price),
      company,
      totalSeats: parseInt(totalSeats) || 40,
      vehicleInfo: vehicleInfo || undefined,
    });

    Alert.alert('Başarılı', 'Sefer eklendi.');
    resetForm();
    setShowForm(false);
  };

  // Tarih listesi
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-950">
      {/* Header */}
      <View className="px-4 py-4 border-b border-dark-800 flex-row items-center justify-between">
        <View>
          <Text className="text-white text-2xl font-bold">Admin Paneli</Text>
          <Text className="text-dark-500 mt-1">{trips.length} sefer kayıtlı</Text>
        </View>
        <Button
          title={showForm ? 'Listeye Dön' : 'Sefer Ekle'}
          onPress={() => setShowForm(!showForm)}
          variant={showForm ? 'outline' : 'primary'}
          size="sm"
          icon={showForm ? undefined : <Plus size={16} color="#fff" />}
        />
      </View>

      {showForm ? (
        // Sefer Ekleme Formu
        <ScrollView className="flex-1 px-4 py-4">
          {/* Tip Seçimi */}
          <Text className="text-dark-300 text-sm font-medium mb-2">Sefer Tipi</Text>
          <View className="flex-row mb-4">
            <TouchableOpacity
              onPress={() => {
                setTripType('bus');
                setTotalSeats('40');
                setCompany('');
              }}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-xl border-2 mr-2 ${
                tripType === 'bus'
                  ? 'bg-accent-emerald/20 border-accent-emerald'
                  : 'bg-dark-800 border-dark-700'
              }`}
            >
              <Bus size={20} color={tripType === 'bus' ? '#10b981' : '#64748b'} />
              <Text className={`ml-2 ${tripType === 'bus' ? 'text-accent-emerald' : 'text-dark-400'}`}>
                Otobüs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTripType('plane');
                setTotalSeats('150');
                setCompany('');
              }}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-xl border-2 ml-2 ${
                tripType === 'plane'
                  ? 'bg-primary-500/20 border-primary-500'
                  : 'bg-dark-800 border-dark-700'
              }`}
            >
              <Plane size={20} color={tripType === 'plane' ? '#6366f1' : '#64748b'} />
              <Text className={`ml-2 ${tripType === 'plane' ? 'text-primary-400' : 'text-dark-400'}`}>
                Uçak
              </Text>
            </TouchableOpacity>
          </View>

          {/* Nereden */}
          <Text className="text-dark-300 text-sm font-medium mb-2">Nereden *</Text>
          <TouchableOpacity
            onPress={() => setCityModal('from')}
            className="flex-row items-center bg-dark-800 border border-dark-600 rounded-xl px-4 py-4 mb-4"
          >
            <MapPin size={20} color="#64748b" />
            <Text className={`flex-1 ml-3 ${from ? 'text-white' : 'text-dark-500'}`}>
              {from || 'Kalkış şehri seçin'}
            </Text>
            <ChevronRight size={20} color="#64748b" />
          </TouchableOpacity>

          {/* Nereye */}
          <Text className="text-dark-300 text-sm font-medium mb-2">Nereye *</Text>
          <TouchableOpacity
            onPress={() => setCityModal('to')}
            className="flex-row items-center bg-dark-800 border border-dark-600 rounded-xl px-4 py-4 mb-4"
          >
            <MapPin size={20} color="#64748b" />
            <Text className={`flex-1 ml-3 ${to ? 'text-white' : 'text-dark-500'}`}>
              {to || 'Varış şehri seçin'}
            </Text>
            <ChevronRight size={20} color="#64748b" />
          </TouchableOpacity>

          {/* Tarih */}
          <Text className="text-dark-300 text-sm font-medium mb-2">Tarih *</Text>
          <TouchableOpacity
            onPress={() => setDateModal(true)}
            className="flex-row items-center bg-dark-800 border border-dark-600 rounded-xl px-4 py-4 mb-4"
          >
            <Calendar size={20} color="#64748b" />
            <Text className={`flex-1 ml-3 ${date ? 'text-white' : 'text-dark-500'}`}>
              {date || 'Tarih seçin'}
            </Text>
            <ChevronRight size={20} color="#64748b" />
          </TouchableOpacity>

          {/* Saat */}
          <View className="flex-row">
            <View className="flex-1 mr-2">
              <Input
                label="Kalkış Saati *"
                placeholder="08:00"
                value={time}
                onChangeText={setTime}
                icon={<Clock size={20} color="#64748b" />}
              />
            </View>
            <View className="flex-1 ml-2">
              <Input
                label="Varış Saati *"
                placeholder="13:30"
                value={arrivalTime}
                onChangeText={setArrivalTime}
                icon={<Clock size={20} color="#64748b" />}
              />
            </View>
          </View>

          {/* Firma */}
          <Text className="text-dark-300 text-sm font-medium mb-2">Firma *</Text>
          <TouchableOpacity
            onPress={() => setCompanyModal(true)}
            className="flex-row items-center bg-dark-800 border border-dark-600 rounded-xl px-4 py-4 mb-4"
          >
            <Building2 size={20} color="#64748b" />
            <Text className={`flex-1 ml-3 ${company ? 'text-white' : 'text-dark-500'}`}>
              {company || 'Firma seçin'}
            </Text>
            <ChevronRight size={20} color="#64748b" />
          </TouchableOpacity>

          {/* Fiyat ve Koltuk */}
          <View className="flex-row">
            <View className="flex-1 mr-2">
              <Input
                label="Fiyat (₺) *"
                placeholder="350"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
                icon={<DollarSign size={20} color="#64748b" />}
              />
            </View>
            <View className="flex-1 ml-2">
              <Input
                label="Koltuk Sayısı"
                placeholder={tripType === 'bus' ? '40' : '150'}
                keyboardType="numeric"
                value={totalSeats}
                onChangeText={setTotalSeats}
              />
            </View>
          </View>

          {/* Araç Bilgisi */}
          <Input
            label="Araç Bilgisi (Opsiyonel)"
            placeholder="Mercedes Travego"
            value={vehicleInfo}
            onChangeText={setVehicleInfo}
          />

          {/* Ekle Butonu */}
          <Button
            title="Seferi Ekle"
            onPress={handleAddTrip}
            loading={isLoading}
            fullWidth
            size="lg"
            icon={<Plus size={20} color="#fff" />}
          />

          <View className="h-8" />
        </ScrollView>
      ) : (
        // Sefer Listesi
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="relative">
              <TripCard trip={item} onPress={() => {}} />
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                className="absolute top-4 right-4 w-10 h-10 bg-accent-rose/20 rounded-full items-center justify-center"
              >
                <Trash2 size={18} color="#f43f5e" />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <View className="items-center py-20">
              <Text className="text-dark-500">Henüz sefer yok</Text>
            </View>
          }
        />
      )}

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
                  onPress={() => {
                    if (cityModal === 'from') setFrom(item);
                    else setTo(item);
                    setCityModal(null);
                  }}
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

      {/* Firma Seçim Modal */}
      <Modal
        visible={companyModal}
        animationType="slide"
        transparent
        onRequestClose={() => setCompanyModal(false)}
      >
        <View className="flex-1 bg-dark-950/95">
          <SafeAreaView className="flex-1">
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-dark-800">
              <Text className="text-white text-lg font-bold">Firma Seçin</Text>
              <TouchableOpacity onPress={() => setCompanyModal(false)}>
                <Text className="text-primary-400">Kapat</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={COMPANIES[tripType]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setCompany(item);
                    setCompanyModal(false);
                  }}
                  className="flex-row items-center px-4 py-4 border-b border-dark-800"
                >
                  <Building2 size={20} color="#64748b" />
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
                  <Text className={`text-lg ml-4 ${item === date ? 'text-primary-400' : 'text-white'}`}>
                    {new Date(item).toLocaleDateString('tr-TR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
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

