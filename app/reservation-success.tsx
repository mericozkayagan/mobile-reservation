// ============================================
// RESERVATION SUCCESS SCREEN - Başarılı rezervasyon
// ============================================

import React from 'react';
import { View, Text, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CheckCircle,
  Ticket,
  MapPin,
  Calendar,
  Clock,
  Share2,
  Home,
} from 'lucide-react-native';
import { Button, Card } from '../components';
import { useReservationStore, useTripStore } from '../stores';

/**
 * Başarılı rezervasyon ekranı
 * - Rezervasyon onay bilgisi
 * - Paylaşım özelliği (örtülü intent)
 */
export default function ReservationSuccessScreen() {
  const router = useRouter();
  const { currentReservation, clearSelectedSeats } = useReservationStore();
  const { selectedTrip, clearSelection } = useTripStore();

  // Rezervasyon yoksa ana sayfaya yönlendir
  if (!currentReservation || !selectedTrip) {
    return (
      <SafeAreaView className="flex-1 bg-dark-950 items-center justify-center">
        <Text className="text-white">Rezervasyon bulunamadı</Text>
        <Button
          title="Ana Sayfaya Dön"
          onPress={() => router.replace('/(tabs)')}
          variant="outline"
          style={{ marginTop: 20 }}
        />
      </SafeAreaView>
    );
  }

  // Rezervasyonu paylaş (örtülü intent - harici uygulamalarla paylaşım)
  const handleShare = async () => {
    try {
      const message = `🎫 Rezervasyon Bilgileri

📍 Güzergah: ${selectedTrip.from} → ${selectedTrip.to}
🚌 Firma: ${selectedTrip.company}
📅 Tarih: ${new Date(selectedTrip.date).toLocaleDateString('tr-TR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}
🕐 Saat: ${selectedTrip.time}
💺 Koltuklar: ${currentReservation.seatNumbers.join(', ')}
💰 Toplam: ₺${currentReservation.totalPrice}

🎟️ Rezervasyon No: ${currentReservation.oderId}

Rezervasyon Uygulaması ile yapıldı.`;

      await Share.share({
        message,
        title: 'Rezervasyon Bilgileri',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  // Ana sayfaya dön
  const handleGoHome = () => {
    clearSelection();
    clearSelectedSeats();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-950">
      <View className="flex-1 px-4 justify-center">
        {/* Başarı İkonu */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-accent-emerald/20 rounded-full items-center justify-center mb-4">
            <CheckCircle size={60} color="#10b981" />
          </View>
          <Text className="text-white text-2xl font-bold">Rezervasyon Başarılı!</Text>
          <Text className="text-dark-400 mt-2 text-center">
            Bilet bilgileriniz e-posta adresinize gönderildi.
          </Text>
        </View>

        {/* Rezervasyon Kartı */}
        <Card className="mb-6">
          {/* Sipariş Numarası */}
          <View className="flex-row items-center justify-center py-3 border-b border-dark-700">
            <Ticket size={18} color="#6366f1" />
            <Text className="text-primary-400 font-mono text-lg ml-2">
              {currentReservation.oderId}
            </Text>
          </View>

          {/* Güzergah */}
          <View className="flex-row items-center py-4 border-b border-dark-700">
            <View className="flex-1">
              <Text className="text-dark-500 text-xs">Kalkış</Text>
              <View className="flex-row items-center mt-1">
                <MapPin size={14} color="#64748b" />
                <Text className="text-white font-medium ml-1">{selectedTrip.from}</Text>
              </View>
            </View>
            <Text className="text-dark-500 mx-3">→</Text>
            <View className="flex-1 items-end">
              <Text className="text-dark-500 text-xs">Varış</Text>
              <View className="flex-row items-center mt-1">
                <MapPin size={14} color="#64748b" />
                <Text className="text-white font-medium ml-1">{selectedTrip.to}</Text>
              </View>
            </View>
          </View>

          {/* Tarih ve Saat */}
          <View className="flex-row py-4 border-b border-dark-700">
            <View className="flex-1 flex-row items-center">
              <Calendar size={14} color="#64748b" />
              <Text className="text-dark-300 ml-2">
                {new Date(selectedTrip.date).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Clock size={14} color="#64748b" />
              <Text className="text-dark-300 ml-2">{selectedTrip.time}</Text>
            </View>
          </View>

          {/* Koltuklar ve Fiyat */}
          <View className="flex-row items-center justify-between py-4">
            <View>
              <Text className="text-dark-500 text-xs">Koltuklar</Text>
              <Text className="text-white font-bold text-lg">
                {currentReservation.seatNumbers.join(', ')}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-dark-500 text-xs">Toplam</Text>
              <Text className="text-primary-400 font-bold text-xl">
                ₺{currentReservation.totalPrice}
              </Text>
            </View>
          </View>
        </Card>

        {/* Butonlar */}
        <View className="space-y-3">
          <Button
            title="Paylaş"
            onPress={handleShare}
            variant="outline"
            fullWidth
            size="lg"
            icon={<Share2 size={20} color="#6366f1" />}
          />
          <Button
            title="Ana Sayfaya Dön"
            onPress={handleGoHome}
            fullWidth
            size="lg"
            icon={<Home size={20} color="#fff" />}
            style={{ marginTop: 12 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

