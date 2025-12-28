// ============================================
// CONFIRM SCREEN - Rezervasyon onay ekranı
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bus,
  Plane,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CreditCard,
  Check,
} from 'lucide-react-native';
import { Button, Input, Card } from '../components';
import { useAuthStore, useTripStore, useReservationStore } from '../stores';

/**
 * Rezervasyon onay ekranı
 * - Yolcu bilgileri formu
 * - Rezervasyon özeti
 * - Ödeme simülasyonu
 */
export default function ConfirmScreen() {
  const router = useRouter();
  const { currentUser } = useAuthStore();
  const { selectedTrip } = useTripStore();
  const { selectedSeats, createReservation, isLoading, error, clearError } = useReservationStore();

  // Form state - varsayılan olarak kullanıcı bilgilerini doldur
  const [passengerName, setPassengerName] = useState(currentUser?.name || '');
  const [passengerPhone, setPassengerPhone] = useState(currentUser?.phone || '');
  const [passengerEmail, setPassengerEmail] = useState(currentUser?.email || '');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sefer veya koltuk seçilmemişse geri dön
  if (!selectedTrip || selectedSeats.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-dark-950 items-center justify-center">
        <Text className="text-white">Sefer veya koltuk seçilmedi</Text>
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
  const totalPrice = selectedSeats.length * selectedTrip.price;

  // Form doğrulama
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!passengerName.trim()) {
      errors.name = 'Ad soyad gerekli';
    }

    if (!passengerPhone.trim()) {
      errors.phone = 'Telefon gerekli';
    }

    if (!passengerEmail.trim()) {
      errors.email = 'E-posta gerekli';
    } else if (!/\S+@\S+\.\S+/.test(passengerEmail)) {
      errors.email = 'Geçerli bir e-posta girin';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Rezervasyon oluştur
  const handleConfirm = async () => {
    clearError();

    if (!validateForm()) return;
    if (!currentUser) return;

    const reservation = await createReservation(
      selectedTrip.id,
      currentUser.id,
      passengerName.trim(),
      passengerPhone.trim(),
      passengerEmail.trim()
    );

    if (reservation) {
      router.replace('/reservation-success');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-950" edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          {/* Sefer Özeti */}
          <View className="mt-4">
            <Text className="text-white font-bold text-lg mb-3">Sefer Bilgileri</Text>
            <Card>
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
                <View className="ml-3 flex-1">
                  <Text className="text-white font-semibold">{selectedTrip.company}</Text>
                  <Text className="text-dark-400 text-xs">{selectedTrip.vehicleInfo}</Text>
                </View>
              </View>

              {/* Rota */}
              <View className="flex-row items-center py-2 border-t border-dark-700">
                <View className="flex-1">
                  <Text className="text-dark-500 text-xs">Kalkış</Text>
                  <View className="flex-row items-center mt-1">
                    <MapPin size={14} color="#64748b" />
                    <Text className="text-white ml-2">{selectedTrip.from}</Text>
                  </View>
                </View>
                <Text className="text-dark-500 mx-2">→</Text>
                <View className="flex-1 items-end">
                  <Text className="text-dark-500 text-xs">Varış</Text>
                  <View className="flex-row items-center mt-1">
                    <MapPin size={14} color="#64748b" />
                    <Text className="text-white ml-2">{selectedTrip.to}</Text>
                  </View>
                </View>
              </View>

              {/* Tarih ve Saat */}
              <View className="flex-row items-center py-2 border-t border-dark-700">
                <View className="flex-row items-center flex-1">
                  <Calendar size={14} color="#64748b" />
                  <Text className="text-dark-300 ml-2">
                    {new Date(selectedTrip.date).toLocaleDateString('tr-TR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center py-2 border-t border-dark-700">
                <Clock size={14} color="#64748b" />
                <Text className="text-dark-300 ml-2">
                  {selectedTrip.time} - {selectedTrip.arrivalTime}
                </Text>
              </View>

              {/* Koltuklar */}
              <View className="pt-2 border-t border-dark-700">
                <Text className="text-dark-500 text-xs mb-1">Seçilen Koltuklar</Text>
                <Text className="text-white font-bold text-lg">
                  {selectedSeats.join(', ')}
                </Text>
              </View>
            </Card>
          </View>

          {/* Yolcu Bilgileri */}
          <View className="mt-6">
            <Text className="text-white font-bold text-lg mb-3">Yolcu Bilgileri</Text>

            {error && (
              <View className="bg-accent-rose/20 border border-accent-rose rounded-xl p-3 mb-4">
                <Text className="text-accent-rose text-center">{error}</Text>
              </View>
            )}

            <Input
              label="Ad Soyad"
              placeholder="Adınız Soyadınız"
              value={passengerName}
              onChangeText={setPassengerName}
              error={formErrors.name}
              icon={<User size={20} color="#64748b" />}
            />

            <Input
              label="Telefon"
              placeholder="0532 123 4567"
              keyboardType="phone-pad"
              value={passengerPhone}
              onChangeText={setPassengerPhone}
              error={formErrors.phone}
              icon={<Phone size={20} color="#64748b" />}
            />

            <Input
              label="E-posta"
              placeholder="ornek@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={passengerEmail}
              onChangeText={setPassengerEmail}
              error={formErrors.email}
              icon={<Mail size={20} color="#64748b" />}
            />
          </View>

          {/* Ödeme Özeti */}
          <View className="mt-6 mb-8">
            <Text className="text-white font-bold text-lg mb-3">Ödeme Özeti</Text>
            <Card>
              <View className="flex-row items-center justify-between py-2">
                <Text className="text-dark-400">Bilet Fiyatı</Text>
                <Text className="text-white">₺{selectedTrip.price} x {selectedSeats.length}</Text>
              </View>
              <View className="flex-row items-center justify-between py-2 border-t border-dark-700">
                <Text className="text-dark-400">Hizmet Bedeli</Text>
                <Text className="text-white">₺0</Text>
              </View>
              <View className="flex-row items-center justify-between py-3 border-t border-dark-700">
                <Text className="text-white font-bold text-lg">Toplam</Text>
                <Text className="text-primary-400 font-bold text-xl">₺{totalPrice}</Text>
              </View>
            </Card>
          </View>
        </ScrollView>

        {/* Alt Bar - Onay Butonu */}
        <View className="bg-dark-900 border-t border-dark-800 px-4 py-4">
          <Button
            title="Rezervasyonu Onayla"
            onPress={handleConfirm}
            loading={isLoading}
            fullWidth
            size="lg"
            icon={<CreditCard size={20} color="#fff" />}
          />
          <Text className="text-dark-500 text-xs text-center mt-2">
            Ödeme simülasyonu - Gerçek ödeme alınmaz
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}



