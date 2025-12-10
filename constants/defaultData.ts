// ============================================
// DEFAULT DATA - Hazır test verileri
// Proje kontrolünde hızlı test için
// ============================================

import { User, Trip, Reservation } from '../types';

/**
 * Hazır kullanıcılar
 * - Admin ve normal kullanıcı hesapları
 * - Kontrol sırasında direkt giriş yapılabilir
 */
export const DEFAULT_USERS: User[] = [
  {
    id: 'user-admin-001',
    email: 'admin@test.com',
    password: '123456',
    name: 'Admin Kullanıcı',
    role: 'admin',
    phone: '0532 111 2233',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'user-test-001',
    email: 'user@test.com',
    password: '123456',
    name: 'Test Kullanıcı',
    role: 'user',
    phone: '0533 444 5566',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 'user-test-002',
    email: 'mehmet@test.com',
    password: '123456',
    name: 'Mehmet Yılmaz',
    role: 'user',
    phone: '0534 777 8899',
    createdAt: '2025-01-02T00:00:00.000Z',
  },
];

/**
 * Hazır seferler
 * - Otobüs ve uçak seferleri
 * - Farklı şehirler arası
 * - Bazı koltuklarda doluluk var
 */
export const DEFAULT_TRIPS: Trip[] = [
  // Otobüs Seferleri
  {
    id: 'trip-bus-001',
    type: 'bus',
    from: 'İstanbul',
    to: 'Ankara',
    date: '2025-12-15',
    time: '08:00',
    arrivalTime: '13:30',
    price: 350,
    totalSeats: 40,
    occupiedSeats: [1, 2, 5, 10, 15, 22, 30],
    company: 'Metro Turizm',
    vehicleInfo: 'Mercedes Travego',
    createdAt: '2025-12-01T00:00:00.000Z',
  },
  {
    id: 'trip-bus-002',
    type: 'bus',
    from: 'İstanbul',
    to: 'Ankara',
    date: '2025-12-15',
    time: '10:00',
    arrivalTime: '15:30',
    price: 375,
    totalSeats: 40,
    occupiedSeats: [3, 7, 12, 18],
    company: 'Kamil Koç',
    vehicleInfo: 'MAN Lions Coach',
    createdAt: '2025-12-01T00:00:00.000Z',
  },
  {
    id: 'trip-bus-003',
    type: 'bus',
    from: 'Ankara',
    to: 'İzmir',
    date: '2025-12-16',
    time: '09:00',
    arrivalTime: '16:00',
    price: 425,
    totalSeats: 40,
    occupiedSeats: [2, 4, 6, 8, 20, 21],
    company: 'Pamukkale',
    vehicleInfo: 'Neoplan Tourliner',
    createdAt: '2025-12-01T00:00:00.000Z',
  },
  {
    id: 'trip-bus-004',
    type: 'bus',
    from: 'İzmir',
    to: 'Antalya',
    date: '2025-12-17',
    time: '07:30',
    arrivalTime: '13:00',
    price: 300,
    totalSeats: 40,
    occupiedSeats: [1, 3, 5, 7, 9],
    company: 'Ulusoy',
    vehicleInfo: 'Mercedes Travego',
    createdAt: '2025-12-01T00:00:00.000Z',
  },
  // Uçak Seferleri
  {
    id: 'trip-plane-001',
    type: 'plane',
    from: 'İstanbul',
    to: 'İzmir',
    date: '2025-12-16',
    time: '10:30',
    arrivalTime: '11:45',
    price: 850,
    totalSeats: 150,
    occupiedSeats: [1, 2, 3, 10, 11, 12, 25, 26, 50, 51, 52, 75, 100],
    company: 'Türk Hava Yolları',
    vehicleInfo: 'Airbus A321',
    createdAt: '2025-12-01T00:00:00.000Z',
  },
  {
    id: 'trip-plane-002',
    type: 'plane',
    from: 'İstanbul',
    to: 'Antalya',
    date: '2025-12-17',
    time: '14:00',
    arrivalTime: '15:30',
    price: 750,
    totalSeats: 180,
    occupiedSeats: [5, 6, 15, 16, 30, 31, 45, 46, 90, 91],
    company: 'Pegasus',
    vehicleInfo: 'Boeing 737-800',
    createdAt: '2025-12-01T00:00:00.000Z',
  },
  {
    id: 'trip-plane-003',
    type: 'plane',
    from: 'Ankara',
    to: 'Trabzon',
    date: '2025-12-18',
    time: '08:45',
    arrivalTime: '10:15',
    price: 680,
    totalSeats: 120,
    occupiedSeats: [1, 2, 3, 4, 20, 21, 22, 40, 41],
    company: 'AnadoluJet',
    vehicleInfo: 'Boeing 737-700',
    createdAt: '2025-12-01T00:00:00.000Z',
  },
  {
    id: 'trip-plane-004',
    type: 'plane',
    from: 'İzmir',
    to: 'İstanbul',
    date: '2025-12-15',
    time: '18:00',
    arrivalTime: '19:15',
    price: 720,
    totalSeats: 150,
    occupiedSeats: [8, 9, 10, 35, 36, 70, 71, 72],
    company: 'SunExpress',
    vehicleInfo: 'Airbus A320',
    createdAt: '2025-12-01T00:00:00.000Z',
  },
  // Ek seferler
  {
    id: 'trip-bus-005',
    type: 'bus',
    from: 'İstanbul',
    to: 'Bursa',
    date: '2025-12-15',
    time: '12:00',
    arrivalTime: '14:30',
    price: 180,
    totalSeats: 40,
    occupiedSeats: [11, 12, 25],
    company: 'Süzer Turizm',
    vehicleInfo: 'Mercedes Tourismo',
    createdAt: '2025-12-01T00:00:00.000Z',
  },
  {
    id: 'trip-bus-006',
    type: 'bus',
    from: 'Ankara',
    to: 'Konya',
    date: '2025-12-16',
    time: '15:00',
    arrivalTime: '18:30',
    price: 220,
    totalSeats: 40,
    occupiedSeats: [1, 2, 3, 4],
    company: 'Metro Turizm',
    vehicleInfo: 'Neoplan Cityliner',
    createdAt: '2025-12-01T00:00:00.000Z',
  },
];

/**
 * Hazır rezervasyonlar
 * - Test kullanıcısının bazı rezervasyonları var
 */
export const DEFAULT_RESERVATIONS: Reservation[] = [
  {
    id: 'res-001',
    oderId: 'ORD-2025-001',
    tripId: 'trip-bus-001',
    userId: 'user-test-001',
    seatNumbers: [1, 2],
    passengerName: 'Test Kullanıcı',
    passengerPhone: '0533 444 5566',
    passengerEmail: 'user@test.com',
    totalPrice: 700,
    status: 'active',
    createdAt: '2025-12-10T10:00:00.000Z',
  },
  {
    id: 'res-002',
    oderId: 'ORD-2025-002',
    tripId: 'trip-plane-001',
    userId: 'user-test-001',
    seatNumbers: [10, 11, 12],
    passengerName: 'Test Kullanıcı',
    passengerPhone: '0533 444 5566',
    passengerEmail: 'user@test.com',
    totalPrice: 2550,
    status: 'active',
    createdAt: '2025-12-10T11:00:00.000Z',
  },
];

/**
 * Unique ID oluşturucu
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Sipariş numarası oluşturucu
 */
export const generateOrderId = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `ORD-${year}-${random}`;
};

