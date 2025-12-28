// ============================================
// SEAT PICKER - Görsel koltuk seçim bileşeni
// Otobüs ve uçak için farklı layoutlar
// ============================================

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TripType, SeatStatus } from '../types';

interface SeatPickerProps {
  tripType: TripType;
  totalSeats: number;
  occupiedSeats: number[];
  selectedSeats: number[];
  onSeatPress: (seatNumber: number) => void;
  maxSelection?: number;
}

/**
 * Koltuk durumuna göre renk belirleme
 */
const getSeatColor = (status: SeatStatus): string => {
  switch (status) {
    case 'available':
      return 'bg-dark-700 border-dark-500';
    case 'selected':
      return 'bg-primary-600 border-primary-400';
    case 'occupied':
      return 'bg-accent-rose/30 border-accent-rose/50';
    default:
      return 'bg-dark-700 border-dark-500';
  }
};

/**
 * Tek koltuk bileşeni
 */
const Seat: React.FC<{
  number: number;
  status: SeatStatus;
  onPress: () => void;
  disabled: boolean;
}> = ({ number, status, onPress, disabled }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.7}
    className={`
      w-10 h-10 rounded-lg border-2 items-center justify-center m-1
      ${getSeatColor(status)}
      ${disabled && status !== 'selected' ? 'opacity-50' : ''}
    `}
  >
    <Text className={`
      text-xs font-bold
      ${status === 'selected' ? 'text-white' : 
        status === 'occupied' ? 'text-accent-rose' : 'text-dark-300'}
    `}>
      {number}
    </Text>
  </TouchableOpacity>
);

/**
 * Otobüs koltuk düzeni (2+2 veya 2+1)
 * 40 koltuk için 10 sıra x 4 koltuk
 */
const BusSeatLayout: React.FC<{
  totalSeats: number;
  occupiedSeats: number[];
  selectedSeats: number[];
  onSeatPress: (seatNumber: number) => void;
  maxSelection: number;
}> = ({ totalSeats, occupiedSeats, selectedSeats, onSeatPress, maxSelection }) => {
  const rows = Math.ceil(totalSeats / 4);
  const seats: number[][] = [];

  // 4'lü sıra oluştur (2+koridor+2)
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < 4; j++) {
      const seatNum = i * 4 + j + 1;
      if (seatNum <= totalSeats) {
        row.push(seatNum);
      }
    }
    seats.push(row);
  }

  const getSeatStatus = (seatNum: number): SeatStatus => {
    if (occupiedSeats.includes(seatNum)) return 'occupied';
    if (selectedSeats.includes(seatNum)) return 'selected';
    return 'available';
  };

  const canSelect = selectedSeats.length < maxSelection;

  return (
    <View className="bg-dark-800 rounded-2xl p-4">
      {/* Şoför */}
      <View className="items-end mb-4 pr-2">
        <View className="bg-dark-600 rounded-lg px-3 py-1">
          <Text className="text-dark-400 text-xs">🚌 Şoför</Text>
        </View>
      </View>

      {/* Koltuklar */}
      {seats.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-center items-center">
          {/* Sol taraf (2 koltuk) */}
          <View className="flex-row">
            {row.slice(0, 2).map((seatNum) => (
              <Seat
                key={seatNum}
                number={seatNum}
                status={getSeatStatus(seatNum)}
                onPress={() => onSeatPress(seatNum)}
                disabled={
                  occupiedSeats.includes(seatNum) ||
                  (!selectedSeats.includes(seatNum) && !canSelect)
                }
              />
            ))}
          </View>

          {/* Koridor */}
          <View className="w-8" />

          {/* Sağ taraf (2 koltuk) */}
          <View className="flex-row">
            {row.slice(2, 4).map((seatNum) => (
              <Seat
                key={seatNum}
                number={seatNum}
                status={getSeatStatus(seatNum)}
                onPress={() => onSeatPress(seatNum)}
                disabled={
                  occupiedSeats.includes(seatNum) ||
                  (!selectedSeats.includes(seatNum) && !canSelect)
                }
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

/**
 * Uçak koltuk düzeni (3+3)
 * 150 koltuk için 25 sıra x 6 koltuk
 */
const PlaneSeatLayout: React.FC<{
  totalSeats: number;
  occupiedSeats: number[];
  selectedSeats: number[];
  onSeatPress: (seatNumber: number) => void;
  maxSelection: number;
}> = ({ totalSeats, occupiedSeats, selectedSeats, onSeatPress, maxSelection }) => {
  const seatsPerRow = 6;
  const rows = Math.ceil(totalSeats / seatsPerRow);
  const seats: number[][] = [];

  // 6'lı sıra oluştur (3+koridor+3)
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < seatsPerRow; j++) {
      const seatNum = i * seatsPerRow + j + 1;
      if (seatNum <= totalSeats) {
        row.push(seatNum);
      }
    }
    seats.push(row);
  }

  const getSeatStatus = (seatNum: number): SeatStatus => {
    if (occupiedSeats.includes(seatNum)) return 'occupied';
    if (selectedSeats.includes(seatNum)) return 'selected';
    return 'available';
  };

  const canSelect = selectedSeats.length < maxSelection;

  // Koltuk harfleri
  const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <View className="bg-dark-800 rounded-2xl p-4">
      {/* Kokpit */}
      <View className="items-center mb-4">
        <View className="bg-dark-600 rounded-lg px-4 py-2">
          <Text className="text-dark-400 text-xs">✈️ Kokpit</Text>
        </View>
      </View>

      {/* Koltuk harfleri başlık */}
      <View className="flex-row justify-center mb-2">
        <View className="flex-row">
          {seatLetters.slice(0, 3).map((letter) => (
            <View key={letter} className="w-10 h-6 items-center justify-center m-1">
              <Text className="text-dark-400 text-xs font-bold">{letter}</Text>
            </View>
          ))}
        </View>
        <View className="w-8" />
        <View className="flex-row">
          {seatLetters.slice(3).map((letter) => (
            <View key={letter} className="w-10 h-6 items-center justify-center m-1">
              <Text className="text-dark-400 text-xs font-bold">{letter}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Koltuklar */}
      {seats.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-center items-center">
          {/* Sıra numarası */}
          <Text className="text-dark-500 text-xs w-6 text-right mr-2">
            {rowIndex + 1}
          </Text>

          {/* Sol taraf (3 koltuk) */}
          <View className="flex-row">
            {row.slice(0, 3).map((seatNum) => (
              <Seat
                key={seatNum}
                number={seatNum}
                status={getSeatStatus(seatNum)}
                onPress={() => onSeatPress(seatNum)}
                disabled={
                  occupiedSeats.includes(seatNum) ||
                  (!selectedSeats.includes(seatNum) && !canSelect)
                }
              />
            ))}
          </View>

          {/* Koridor */}
          <View className="w-8" />

          {/* Sağ taraf (3 koltuk) */}
          <View className="flex-row">
            {row.slice(3, 6).map((seatNum) => (
              <Seat
                key={seatNum}
                number={seatNum}
                status={getSeatStatus(seatNum)}
                onPress={() => onSeatPress(seatNum)}
                disabled={
                  occupiedSeats.includes(seatNum) ||
                  (!selectedSeats.includes(seatNum) && !canSelect)
                }
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

/**
 * Koltuk seçici ana bileşen
 */
export const SeatPicker: React.FC<SeatPickerProps> = ({
  tripType,
  totalSeats,
  occupiedSeats,
  selectedSeats,
  onSeatPress,
  maxSelection = 5,
}) => {
  return (
    <View>
      {/* Lejant */}
      <View className="flex-row justify-center mb-4 space-x-4">
        <View className="flex-row items-center">
          <View className="w-6 h-6 rounded bg-dark-700 border-2 border-dark-500 mr-2" />
          <Text className="text-dark-400 text-xs">Müsait</Text>
        </View>
        <View className="flex-row items-center ml-3">
          <View className="w-6 h-6 rounded bg-primary-600 border-2 border-primary-400 mr-2" />
          <Text className="text-dark-400 text-xs">Seçili</Text>
        </View>
        <View className="flex-row items-center ml-3">
          <View className="w-6 h-6 rounded bg-accent-rose/30 border-2 border-accent-rose/50 mr-2" />
          <Text className="text-dark-400 text-xs">Dolu</Text>
        </View>
      </View>

      {/* Koltuk düzeni */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {tripType === 'bus' ? (
          <BusSeatLayout
            totalSeats={totalSeats}
            occupiedSeats={occupiedSeats}
            selectedSeats={selectedSeats}
            onSeatPress={onSeatPress}
            maxSelection={maxSelection}
          />
        ) : (
          <PlaneSeatLayout
            totalSeats={totalSeats}
            occupiedSeats={occupiedSeats}
            selectedSeats={selectedSeats}
            onSeatPress={onSeatPress}
            maxSelection={maxSelection}
          />
        )}
      </ScrollView>
    </View>
  );
};



