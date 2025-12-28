// ============================================
// RESERVATION CARD - Rezervasyon kartı bileşeni
// ============================================

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bus, Plane, Calendar, MapPin, Ticket, XCircle } from 'lucide-react-native';
import { Reservation, Trip } from '../types';

interface ReservationCardProps {
  reservation: Reservation & { trip?: Trip };
  onPress?: () => void;
  onCancel?: () => void;
}

/**
 * Rezervasyon kartı bileşeni
 * - Rezervasyon bilgilerini görselleştirir
 * - İptal butonu
 */
export const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onPress,
  onCancel,
}) => {
  const { trip } = reservation;
  const TypeIcon = trip?.type === 'bus' ? Bus : Plane;
  
  // Durum rengi
  const statusColors = {
    active: { bg: 'bg-accent-emerald/20', text: 'text-accent-emerald', label: 'Aktif' },
    cancelled: { bg: 'bg-accent-rose/20', text: 'text-accent-rose', label: 'İptal' },
    completed: { bg: 'bg-dark-600', text: 'text-dark-400', label: 'Tamamlandı' },
  };

  const status = statusColors[reservation.status];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
      className="bg-dark-800 rounded-2xl p-4 mb-3 border border-dark-700"
    >
      {/* Üst Kısım: Sipariş No ve Durum */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Ticket size={16} color="#6366f1" />
          <Text className="text-primary-400 font-mono text-sm ml-2">
            {reservation.oderId}
          </Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${status.bg}`}>
          <Text className={`text-xs font-medium ${status.text}`}>
            {status.label}
          </Text>
        </View>
      </View>

      {/* Sefer Bilgisi */}
      {trip && (
        <>
          {/* Firma ve Tip */}
          <View className="flex-row items-center mb-3">
            <View className={`
              w-8 h-8 rounded-full items-center justify-center
              ${trip.type === 'bus' ? 'bg-accent-emerald/20' : 'bg-primary-500/20'}
            `}>
              <TypeIcon 
                size={16} 
                color={trip.type === 'bus' ? '#10b981' : '#6366f1'} 
              />
            </View>
            <Text className="text-white font-medium ml-2">{trip.company}</Text>
          </View>

          {/* Rota */}
          <View className="flex-row items-center py-2 border-t border-dark-700">
            <View className="flex-1">
              <View className="flex-row items-center">
                <MapPin size={14} color="#64748b" />
                <Text className="text-dark-300 text-sm ml-1">{trip.from}</Text>
              </View>
            </View>
            <Text className="text-dark-500 mx-3">→</Text>
            <View className="flex-1">
              <View className="flex-row items-center">
                <MapPin size={14} color="#64748b" />
                <Text className="text-dark-300 text-sm ml-1">{trip.to}</Text>
              </View>
            </View>
          </View>

          {/* Tarih ve Saat */}
          <View className="flex-row items-center mt-2">
            <Calendar size={14} color="#64748b" />
            <Text className="text-dark-300 text-sm ml-2">
              {new Date(trip.date).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })} - {trip.time}
            </Text>
          </View>
        </>
      )}

      {/* Alt Kısım: Koltuklar ve Fiyat */}
      <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-dark-700">
        <View>
          <Text className="text-dark-400 text-xs">Koltuklar</Text>
          <Text className="text-white font-medium">
            {reservation.seatNumbers.join(', ')}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-dark-400 text-xs">Toplam</Text>
          <Text className="text-primary-400 font-bold text-lg">
            ₺{reservation.totalPrice}
          </Text>
        </View>
      </View>

      {/* İptal Butonu */}
      {reservation.status === 'active' && onCancel && (
        <TouchableOpacity
          onPress={onCancel}
          className="flex-row items-center justify-center mt-3 py-2 border border-accent-rose rounded-lg"
        >
          <XCircle size={16} color="#f43f5e" />
          <Text className="text-accent-rose font-medium ml-2">
            Rezervasyonu İptal Et
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};



