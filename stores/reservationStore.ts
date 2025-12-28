// ============================================
// RESERVATION STORE - Rezervasyon yönetimi
// Zustand ile state management
// ============================================

import { create } from 'zustand';
import { Reservation, ReservationStatus, Trip } from '../types';
import { DEFAULT_RESERVATIONS, generateId, generateOrderId } from '../constants/defaultData';
import { saveData, loadData, STORAGE_KEYS } from '../utils/storage';
import { useTripStore } from './tripStore';

/**
 * Reservation Store State Interface
 */
interface ReservationState {
  // State
  reservations: Reservation[];
  currentReservation: Reservation | null;
  selectedSeats: number[];
  isLoading: boolean;
  error: string | null;

  // Actions
  initialize: () => Promise<void>;
  selectSeat: (seatNumber: number) => void;
  deselectSeat: (seatNumber: number) => void;
  clearSelectedSeats: () => void;
  createReservation: (
    tripId: string,
    userId: string,
    passengerName: string,
    passengerPhone: string,
    passengerEmail: string
  ) => Promise<Reservation | null>;
  cancelReservation: (reservationId: string) => Promise<boolean>;
  getUserReservations: (userId: string) => Reservation[];
  getReservationWithTrip: (reservationId: string) => (Reservation & { trip?: Trip }) | undefined;
  clearError: () => void;
  setCurrentReservation: (reservation: Reservation | null) => void;
}

/**
 * Reservation Store
 * - Rezervasyon oluşturma ve iptal
 * - Koltuk seçimi yönetimi
 * - Kullanıcı rezervasyonları listeleme
 */
export const useReservationStore = create<ReservationState>((set, get) => ({
  // Başlangıç durumu
  reservations: [],
  currentReservation: null,
  selectedSeats: [],
  isLoading: false,
  error: null,

  /**
   * Store'u başlat - varsayılan rezervasyonları yükle
   */
  initialize: async () => {
    set({ isLoading: true });
    try {
      // Storage'dan rezervasyonları yükle
      const storedReservations = await loadData<Reservation[]>(STORAGE_KEYS.RESERVATIONS);

      // Eğer rezervasyon yoksa, varsayılan rezervasyonları ekle
      if (!storedReservations || storedReservations.length === 0) {
        await saveData(STORAGE_KEYS.RESERVATIONS, DEFAULT_RESERVATIONS);
        set({ reservations: DEFAULT_RESERVATIONS, isLoading: false });
      } else {
        set({ reservations: storedReservations, isLoading: false });
      }
    } catch (error) {
      console.error('Reservation initialize error:', error);
      set({ 
        error: 'Rezervasyonlar yüklenirken hata oluştu',
        isLoading: false 
      });
    }
  },

  /**
   * Koltuk seç
   */
  selectSeat: (seatNumber: number) => {
    const { selectedSeats } = get();
    if (!selectedSeats.includes(seatNumber)) {
      set({ selectedSeats: [...selectedSeats, seatNumber].sort((a, b) => a - b) });
    }
  },

  /**
   * Koltuk seçimini kaldır
   */
  deselectSeat: (seatNumber: number) => {
    const { selectedSeats } = get();
    set({ selectedSeats: selectedSeats.filter((s) => s !== seatNumber) });
  },

  /**
   * Tüm koltuk seçimlerini temizle
   */
  clearSelectedSeats: () => set({ selectedSeats: [] }),

  /**
   * Rezervasyon oluştur
   */
  createReservation: async (
    tripId: string,
    userId: string,
    passengerName: string,
    passengerPhone: string,
    passengerEmail: string
  ) => {
    set({ isLoading: true, error: null });
    try {
      const { reservations, selectedSeats } = get();
      const tripStore = useTripStore.getState();
      const trip = tripStore.getTripById(tripId);

      if (!trip) {
        set({ error: 'Sefer bulunamadı', isLoading: false });
        return null;
      }

      if (selectedSeats.length === 0) {
        set({ error: 'Lütfen en az bir koltuk seçin', isLoading: false });
        return null;
      }

      // Koltukların müsait olduğunu kontrol et
      const unavailableSeats = selectedSeats.filter((seat) =>
        trip.occupiedSeats.includes(seat)
      );

      if (unavailableSeats.length > 0) {
        set({ 
          error: `Koltuk(lar) ${unavailableSeats.join(', ')} artık müsait değil`, 
          isLoading: false 
        });
        return null;
      }

      // Yeni rezervasyon oluştur
      const newReservation: Reservation = {
        id: generateId('res'),
        oderId: generateOrderId(),
        tripId,
        userId,
        seatNumbers: selectedSeats,
        passengerName,
        passengerPhone,
        passengerEmail,
        totalPrice: trip.price * selectedSeats.length,
        status: 'active',
        createdAt: new Date().toISOString(),
      };

      // Koltukları rezerve et
      await tripStore.reserveSeats(tripId, selectedSeats);

      // Rezervasyonu kaydet
      const updatedReservations = [...reservations, newReservation];
      await saveData(STORAGE_KEYS.RESERVATIONS, updatedReservations);

      set({ 
        reservations: updatedReservations,
        currentReservation: newReservation,
        selectedSeats: [],
        isLoading: false 
      });

      return newReservation;
    } catch (error) {
      console.error('Create reservation error:', error);
      set({ error: 'Rezervasyon oluşturulurken hata oluştu', isLoading: false });
      return null;
    }
  },

  /**
   * Rezervasyon iptal et
   */
  cancelReservation: async (reservationId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { reservations } = get();
      const reservation = reservations.find((r) => r.id === reservationId);

      if (!reservation) {
        set({ error: 'Rezervasyon bulunamadı', isLoading: false });
        return false;
      }

      // Koltukları serbest bırak
      const tripStore = useTripStore.getState();
      await tripStore.cancelSeatReservation(reservation.tripId, reservation.seatNumbers);

      // Rezervasyon durumunu güncelle
      const updatedReservations = reservations.map((r) =>
        r.id === reservationId ? { ...r, status: 'cancelled' as ReservationStatus } : r
      );

      await saveData(STORAGE_KEYS.RESERVATIONS, updatedReservations);
      set({ reservations: updatedReservations, isLoading: false });

      return true;
    } catch (error) {
      console.error('Cancel reservation error:', error);
      set({ error: 'Rezervasyon iptal edilirken hata oluştu', isLoading: false });
      return false;
    }
  },

  /**
   * Kullanıcının rezervasyonlarını getir
   */
  getUserReservations: (userId: string) => {
    const { reservations } = get();
    const tripStore = useTripStore.getState();

    return reservations
      .filter((r) => r.userId === userId)
      .map((r) => ({
        ...r,
        trip: tripStore.getTripById(r.tripId),
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  /**
   * Rezervasyonu sefer bilgisiyle birlikte getir
   */
  getReservationWithTrip: (reservationId: string) => {
    const { reservations } = get();
    const tripStore = useTripStore.getState();
    
    const reservation = reservations.find((r) => r.id === reservationId);
    if (!reservation) return undefined;

    return {
      ...reservation,
      trip: tripStore.getTripById(reservation.tripId),
    };
  },

  /**
   * Hata temizle
   */
  clearError: () => set({ error: null }),

  /**
   * Mevcut rezervasyonu ayarla
   */
  setCurrentReservation: (reservation: Reservation | null) => {
    set({ currentReservation: reservation });
  },
}));



