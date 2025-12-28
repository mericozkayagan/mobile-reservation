// ============================================
// TRIP STORE - Sefer yönetimi
// Zustand ile state management
// ============================================

import { create } from 'zustand';
import { Trip, TripType, SearchParams } from '../types';
import { DEFAULT_TRIPS, generateId } from '../constants/defaultData';
import { saveData, loadData, STORAGE_KEYS } from '../utils/storage';

/**
 * Trip Store State Interface
 */
interface TripState {
  // State
  trips: Trip[];
  filteredTrips: Trip[];
  selectedTrip: Trip | null;
  isLoading: boolean;
  searchParams: SearchParams | null;
  error: string | null;

  // Actions
  initialize: () => Promise<void>;
  searchTrips: (params: SearchParams) => void;
  selectTrip: (tripId: string) => void;
  clearSelection: () => void;
  addTrip: (trip: Omit<Trip, 'id' | 'createdAt' | 'occupiedSeats'>) => Promise<void>;
  updateTrip: (tripId: string, updates: Partial<Trip>) => Promise<void>;
  deleteTrip: (tripId: string) => Promise<void>;
  reserveSeats: (tripId: string, seatNumbers: number[]) => Promise<void>;
  cancelSeatReservation: (tripId: string, seatNumbers: number[]) => Promise<void>;
  getTripById: (tripId: string) => Trip | undefined;
  getAvailableSeats: (tripId: string) => number[];
  clearError: () => void;
}

/**
 * Trip Store
 * - Sefer listeleme ve arama
 * - Sefer ekleme/silme (admin)
 * - Koltuk durumu yönetimi
 */
export const useTripStore = create<TripState>((set, get) => ({
  // Başlangıç durumu
  trips: [],
  filteredTrips: [],
  selectedTrip: null,
  isLoading: false,
  searchParams: null,
  error: null,

  /**
   * Store'u başlat - varsayılan seferleri yükle
   */
  initialize: async () => {
    set({ isLoading: true });
    try {
      // Storage'dan seferleri yükle
      const storedTrips = await loadData<Trip[]>(STORAGE_KEYS.TRIPS);

      // Eğer sefer yoksa, varsayılan seferleri ekle
      if (!storedTrips || storedTrips.length === 0) {
        await saveData(STORAGE_KEYS.TRIPS, DEFAULT_TRIPS);
        set({ trips: DEFAULT_TRIPS, isLoading: false });
      } else {
        set({ trips: storedTrips, isLoading: false });
      }
    } catch (error) {
      console.error('Trip initialize error:', error);
      set({ 
        error: 'Seferler yüklenirken hata oluştu',
        isLoading: false 
      });
    }
  },

  /**
   * Sefer ara
   * @param params - Arama parametreleri
   */
  searchTrips: (params: SearchParams) => {
    const { trips } = get();
    set({ isLoading: true, searchParams: params });

    // Filtreleme
    const filtered = trips.filter((trip) => {
      const matchFrom = trip.from.toLowerCase().includes(params.from.toLowerCase());
      const matchTo = trip.to.toLowerCase().includes(params.to.toLowerCase());
      const matchDate = trip.date === params.date;
      const matchType = params.type ? trip.type === params.type : true;

      return matchFrom && matchTo && matchDate && matchType;
    });

    // Fiyata göre sırala
    filtered.sort((a, b) => a.price - b.price);

    set({ filteredTrips: filtered, isLoading: false });
  },

  /**
   * Sefer seç
   */
  selectTrip: (tripId: string) => {
    const { trips } = get();
    const trip = trips.find((t) => t.id === tripId);
    set({ selectedTrip: trip || null });
  },

  /**
   * Seçimi temizle
   */
  clearSelection: () => set({ selectedTrip: null }),

  /**
   * Yeni sefer ekle (Admin)
   */
  addTrip: async (tripData) => {
    set({ isLoading: true, error: null });
    try {
      const { trips } = get();

      const newTrip: Trip = {
        ...tripData,
        id: generateId('trip'),
        occupiedSeats: [],
        createdAt: new Date().toISOString(),
      };

      const updatedTrips = [...trips, newTrip];
      await saveData(STORAGE_KEYS.TRIPS, updatedTrips);
      set({ trips: updatedTrips, isLoading: false });
    } catch (error) {
      console.error('Add trip error:', error);
      set({ error: 'Sefer eklenirken hata oluştu', isLoading: false });
    }
  },

  /**
   * Sefer güncelle (Admin)
   */
  updateTrip: async (tripId: string, updates: Partial<Trip>) => {
    set({ isLoading: true });
    try {
      const { trips, selectedTrip } = get();

      const updatedTrips = trips.map((trip) =>
        trip.id === tripId ? { ...trip, ...updates } : trip
      );

      await saveData(STORAGE_KEYS.TRIPS, updatedTrips);

      // Seçili sefer güncellendiyse, onu da güncelle
      if (selectedTrip?.id === tripId) {
        set({ 
          trips: updatedTrips, 
          selectedTrip: { ...selectedTrip, ...updates },
          isLoading: false 
        });
      } else {
        set({ trips: updatedTrips, isLoading: false });
      }
    } catch (error) {
      console.error('Update trip error:', error);
      set({ error: 'Sefer güncellenirken hata oluştu', isLoading: false });
    }
  },

  /**
   * Sefer sil (Admin)
   */
  deleteTrip: async (tripId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { trips, filteredTrips } = get();

      const updatedTrips = trips.filter((trip) => trip.id !== tripId);
      const updatedFiltered = filteredTrips.filter((trip) => trip.id !== tripId);

      await saveData(STORAGE_KEYS.TRIPS, updatedTrips);
      set({ 
        trips: updatedTrips, 
        filteredTrips: updatedFiltered,
        isLoading: false 
      });
    } catch (error) {
      console.error('Delete trip error:', error);
      set({ error: 'Sefer silinirken hata oluştu', isLoading: false });
    }
  },

  /**
   * Koltuk rezerve et
   */
  reserveSeats: async (tripId: string, seatNumbers: number[]) => {
    const { trips } = get();
    const trip = trips.find((t) => t.id === tripId);
    
    if (!trip) return;

    const newOccupiedSeats = [...new Set([...trip.occupiedSeats, ...seatNumbers])];
    await get().updateTrip(tripId, { occupiedSeats: newOccupiedSeats });
  },

  /**
   * Koltuk rezervasyonunu iptal et
   */
  cancelSeatReservation: async (tripId: string, seatNumbers: number[]) => {
    const { trips } = get();
    const trip = trips.find((t) => t.id === tripId);
    
    if (!trip) return;

    const newOccupiedSeats = trip.occupiedSeats.filter(
      (seat) => !seatNumbers.includes(seat)
    );
    await get().updateTrip(tripId, { occupiedSeats: newOccupiedSeats });
  },

  /**
   * ID ile sefer getir
   */
  getTripById: (tripId: string) => {
    const { trips } = get();
    return trips.find((t) => t.id === tripId);
  },

  /**
   * Müsait koltukları getir
   */
  getAvailableSeats: (tripId: string) => {
    const { trips } = get();
    const trip = trips.find((t) => t.id === tripId);
    
    if (!trip) return [];

    const allSeats = Array.from({ length: trip.totalSeats }, (_, i) => i + 1);
    return allSeats.filter((seat) => !trip.occupiedSeats.includes(seat));
  },

  /**
   * Hata temizle
   */
  clearError: () => set({ error: null }),
}));



