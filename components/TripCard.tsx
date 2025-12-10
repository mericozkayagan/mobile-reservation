// ============================================
// TRIP CARD - Sefer kartı bileşeni
// FlatList'te kullanılacak
// ============================================

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bus, Plane, Clock, MapPin, Users } from 'lucide-react-native';
import { Trip } from '../types';

interface TripCardProps {
  trip: Trip;
  onPress: () => void;
}

/**
 * Sefer kartı bileşeni
 * - Sefer bilgilerini görselleştirir
 * - Otobüs/Uçak ikonu
 * - Fiyat ve müsait koltuk bilgisi
 */
export const TripCard: React.FC<TripCardProps> = ({ trip, onPress }) => {
  // Müsait koltuk sayısı
  const availableSeats = trip.totalSeats - trip.occupiedSeats.length;

  // Tip ikonu
  const TypeIcon = trip.type === 'bus' ? Bus : Plane;

  // Süre hesaplama (basit)
  const calculateDuration = () => {
    const [startHour, startMin] = trip.time.split(':').map(Number);
    const [endHour, endMin] = trip.arrivalTime.split(':').map(Number);
    
    let hours = endHour - startHour;
    let mins = endMin - startMin;
    
    if (mins < 0) {
      hours -= 1;
      mins += 60;
    }
    if (hours < 0) hours += 24;
    
    return `${hours}s ${mins}dk`;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-dark-800 rounded-2xl p-4 mb-3 border border-dark-700"
    >
      {/* Üst Kısım: Firma ve Tip */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className={`
            w-10 h-10 rounded-full items-center justify-center
            ${trip.type === 'bus' ? 'bg-accent-emerald/20' : 'bg-primary-500/20'}
          `}>
            <TypeIcon 
              size={20} 
              color={trip.type === 'bus' ? '#10b981' : '#6366f1'} 
            />
          </View>
          <View className="ml-3">
            <Text className="text-white font-semibold">{trip.company}</Text>
            <Text className="text-dark-400 text-xs">{trip.vehicleInfo}</Text>
          </View>
        </View>
        <View className="items-end min-w-[80px]">
          <Text className="text-primary-400 font-bold text-xl" numberOfLines={1}>
            ₺{trip.price}
          </Text>
          <Text className="text-dark-400 text-xs" numberOfLines={1}>kişi başı</Text>
        </View>
      </View>

      {/* Orta Kısım: Rota */}
      <View className="flex-row items-center py-3 border-t border-b border-dark-700">
        {/* Kalkış */}
        <View className="flex-1">
          <Text className="text-dark-400 text-xs mb-1">Kalkış</Text>
          <Text className="text-white font-bold text-lg">{trip.time}</Text>
          <View className="flex-row items-center mt-1">
            <MapPin size={12} color="#64748b" />
            <Text className="text-dark-300 text-sm ml-1">{trip.from}</Text>
          </View>
        </View>

        {/* Süre */}
        <View className="items-center px-4">
          <View className="flex-row items-center">
            <Clock size={14} color="#64748b" />
            <Text className="text-dark-400 text-xs ml-1">{calculateDuration()}</Text>
          </View>
          <View className="w-16 h-px bg-dark-600 my-2" />
          <Text className="text-dark-500 text-xs">
            {trip.type === 'bus' ? 'Otobüs' : 'Uçak'}
          </Text>
        </View>

        {/* Varış */}
        <View className="flex-1 items-end">
          <Text className="text-dark-400 text-xs mb-1">Varış</Text>
          <Text className="text-white font-bold text-lg">{trip.arrivalTime}</Text>
          <View className="flex-row items-center mt-1">
            <MapPin size={12} color="#64748b" />
            <Text className="text-dark-300 text-sm ml-1">{trip.to}</Text>
          </View>
        </View>
      </View>

      {/* Alt Kısım: Tarih ve Koltuk */}
      <View className="flex-row items-center justify-between mt-3">
        <Text className="text-dark-400 text-sm">
          📅 {new Date(trip.date).toLocaleDateString('tr-TR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </Text>
        <View className="flex-row items-center">
          <Users size={14} color={availableSeats < 10 ? '#f43f5e' : '#10b981'} />
          <Text className={`
            ml-1 text-sm font-medium
            ${availableSeats < 10 ? 'text-accent-rose' : 'text-accent-emerald'}
          `}>
            {availableSeats} koltuk
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

