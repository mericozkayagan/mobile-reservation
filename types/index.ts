// ============================================
// TYPES - Uygulama veri tipleri tanımlamaları
// ============================================

/**
 * Kullanıcı rolü - admin veya normal kullanıcı
 */
export type UserRole = 'admin' | 'user';

/**
 * Sefer tipi - otobüs veya uçak
 */
export type TripType = 'bus' | 'plane';

/**
 * Koltuk durumu
 * - available: Müsait
 * - selected: Seçilmiş (kullanıcı tarafından)
 * - occupied: Dolu (başkası tarafından rezerve edilmiş)
 */
export type SeatStatus = 'available' | 'selected' | 'occupied';

/**
 * Rezervasyon durumu
 */
export type ReservationStatus = 'active' | 'cancelled' | 'completed';

/**
 * Kullanıcı arayüzü
 */
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
}

/**
 * Sefer arayüzü
 */
export interface Trip {
  id: string;
  type: TripType;
  from: string;            // Kalkış şehri
  to: string;              // Varış şehri
  date: string;            // YYYY-MM-DD formatında
  time: string;            // HH:MM formatında
  arrivalTime: string;     // Varış saati
  price: number;           // Bilet fiyatı (TL)
  totalSeats: number;      // Toplam koltuk sayısı
  occupiedSeats: number[]; // Dolu koltuk numaraları
  company: string;         // Firma adı
  vehicleInfo?: string;    // Araç bilgisi (örn: "Mercedes Travego")
  createdAt: string;
}

/**
 * Koltuk arayüzü
 */
export interface Seat {
  number: number;
  status: SeatStatus;
  price?: number;
}

/**
 * Rezervasyon arayüzü
 */
export interface Reservation {
  id: string;
  oderId: string;
  tripId: string;
  userId: string;
  seatNumbers: number[];
  passengerName: string;
  passengerPhone: string;
  passengerEmail: string;
  totalPrice: number;
  status: ReservationStatus;
  createdAt: string;
  trip?: Trip; // İlişkili sefer bilgisi (join için)
}

/**
 * Arama parametreleri
 */
export interface SearchParams {
  from: string;
  to: string;
  date: string;
  type?: TripType;
}

/**
 * Şehir listesi
 */
export const CITIES = [
  'İstanbul',
  'Ankara',
  'İzmir',
  'Bursa',
  'Antalya',
  'Adana',
  'Konya',
  'Gaziantep',
  'Mersin',
  'Diyarbakır',
  'Kayseri',
  'Eskişehir',
  'Trabzon',
  'Samsun',
  'Denizli',
] as const;

/**
 * Firma listesi
 */
export const COMPANIES = {
  bus: [
    'Metro Turizm',
    'Kamil Koç',
    'Pamukkale',
    'Ulusoy',
    'Süzer Turizm',
  ],
  plane: [
    'Türk Hava Yolları',
    'Pegasus',
    'AnadoluJet',
    'SunExpress',
  ],
} as const;

