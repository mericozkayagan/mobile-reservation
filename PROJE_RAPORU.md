# ONLINE REZERVASYON (OTOBÜS/UÇAK) SİSTEMİ
## Mobil Programlama Dersi Proje Raporu

---

## PROJE BİLGİLERİ

**Proje Adı:** Online Rezervasyon (Otobüs/Uçak) Sistemi  
**Ders:** Mobil Programlama  
**Geliştirme Ortamı:** React Native (Expo)  
**Programlama Dili:** TypeScript  
**Tarih:** Aralık 2025

---

## ÖĞRENCİ BİLGİLERİ

| Öğrenci No | Ad Soyad |
|------------|----------|
| 05210000209 | Mustafa Yiğit GÜZEL |
| 05230001155 | Meriç OZKAYAGAN |
| 05230001153 | Alinda KABADAYI |

---

## İÇİNDEKİLER

1. [Giriş](#giriş)
2. [Sistem Özellikleri](#sistem-özellikleri)
3. [Teknik Özellikler](#teknik-özellikler)
4. [Uygulama Ekranları](#uygulama-ekranları)
5. [Kaynak Kodları](#kaynak-kodları)
6. [Gereksinimlerin Karşılanması](#gereksinimlerin-karşılanması)
7. [Sonuç](#sonuç)

---

## GİRİŞ

Bu proje, kullanıcıların otobüs ve uçak seferlerini görüntüleyip, koltuk seçerek rezervasyon yapmalarını sağlayan bir mobil uygulamadır. Admin kullanıcılar sefer ekleyebilir ve silebilir. Uygulama React Native ve Expo framework'ü kullanılarak geliştirilmiştir.

### Proje Amacı

- Kullanıcıların kolayca sefer arayabilmesi
- Görsel koltuk seçimi yapabilmesi
- Rezervasyon oluşturup yönetebilmesi
- Admin kullanıcıların sefer yönetimi yapabilmesi

---

## SİSTEM ÖZELLİKLERİ

### 1. Kullanıcı Yönetimi

#### 1.1. Kullanıcı Kayıt/Giriş Sistemi
- **Kayıt Ol:** Yeni kullanıcılar ad, soyad, e-posta, telefon ve şifre ile kayıt olabilir
- **Giriş Yap:** E-posta ve şifre ile giriş yapılabilir
- **Hızlı Test Girişi:** Kontrol için hazır admin ve kullanıcı hesapları mevcuttur
  - Admin: `admin@test.com` / `123456`
  - Kullanıcı: `user@test.com` / `123456`

#### 1.2. Rol Yönetimi
- **Admin:** Sefer ekleme/silme yetkisi
- **Kullanıcı:** Rezervasyon yapma ve görüntüleme yetkisi

### 2. Sefer Yönetimi

#### 2.1. Sefer Listeleme ve Sorgulama
- Kalkış ve varış şehri seçimi
- Tarih seçimi (bugünden 30 gün sonrasına kadar)
- Sefer tipi filtresi (Otobüs/Uçak)
- Fiyat ve müsait koltuk sayısına göre sıralama

#### 2.2. Sefer Detayları
- Firma bilgisi
- Araç bilgisi (örn: Mercedes Travego, Airbus A321)
- Kalkış ve varış saatleri
- Süre bilgisi
- Fiyat bilgisi
- Müsait koltuk sayısı

### 3. Koltuk Seçimi

#### 3.1. Görsel Koltuk Düzeni
- **Otobüs:** 2+2 koltuk düzeni (40 koltuk)
- **Uçak:** 3+3 koltuk düzeni (120-180 koltuk)
- Renk kodlu durum gösterimi:
  - 🟦 Mavi: Müsait koltuklar
  - 🟪 Mor: Seçili koltuklar
  - 🟥 Kırmızı: Dolu koltuklar

#### 3.2. Koltuk Seçim Özellikleri
- En fazla 5 koltuk seçilebilir
- Gerçek zamanlı koltuk durumu güncellemesi
- Seçilen koltukların görsel geri bildirimi

### 4. Rezervasyon Yönetimi

#### 4.1. Rezervasyon Oluşturma
- Yolcu bilgileri formu (Ad, Telefon, E-posta)
- Rezervasyon özeti görüntüleme
- Ödeme simülasyonu
- Benzersiz sipariş numarası oluşturma

#### 4.2. Rezervasyon İptal Etme
- Aktif rezervasyonları iptal edebilme
- İptal edilen koltukların serbest bırakılması

#### 4.3. Rezervasyon Görüntüleme
- Kullanıcının tüm rezervasyonlarını listeleme
- Rezervasyon durumu (Aktif, İptal, Tamamlandı)
- Rezervasyon detayları (Güzergah, Tarih, Koltuklar, Fiyat)

### 5. Admin Paneli

#### 5.1. Sefer Ekleme
- Sefer tipi seçimi (Otobüs/Uçak)
- Kalkış ve varış şehri seçimi
- Tarih ve saat bilgileri
- Firma seçimi
- Fiyat ve koltuk sayısı belirleme
- Araç bilgisi ekleme

#### 5.2. Sefer Silme
- Mevcut seferleri listeleme
- Sefer silme işlemi (onay ile)

### 6. Ek Özellikler

#### 6.1. Paylaşım Özelliği (Örtülü Intent)
- Rezervasyon bilgilerini harici uygulamalarla paylaşma
- WhatsApp, E-posta, SMS gibi uygulamalara gönderme
- Uygulamayı paylaşma özelliği

#### 6.2. Popüler Rotalar
- Hızlı erişim için popüler rota önerileri
- Tek tıkla rota seçimi

#### 6.3. Responsive Tasarım
- Farklı ekran boyutlarına uyum
- Portrait modunda optimize edilmiş görünüm

---

## TEKNİK ÖZELLİKLER

### Kullanılan Teknolojiler

- **Framework:** React Native (Expo SDK 52)
- **Programlama Dili:** TypeScript
- **State Management:** Zustand
- **Stil:** NativeWind (TailwindCSS)
- **Navigasyon:** Expo Router
- **Veri Depolama:** AsyncStorage
- **İkonlar:** Lucide React Native

### Proje Yapısı

```
mobile-reservation/
├── app/                      # Ekranlar (Expo Router)
│   ├── (auth)/              # Kimlik doğrulama ekranları
│   │   ├── login.tsx        # Giriş ekranı
│   │   └── register.tsx     # Kayıt ekranı
│   ├── (tabs)/              # Ana sekme ekranları
│   │   ├── index.tsx        # Ana sayfa (Sefer arama)
│   │   ├── admin.tsx        # Admin paneli
│   │   ├── my-trips.tsx     # Rezervasyonlarım
│   │   └── profile.tsx      # Profil
│   ├── trip-list.tsx        # Sefer listesi
│   ├── seat-selection.tsx   # Koltuk seçimi
│   ├── confirm.tsx           # Rezervasyon onayı
│   └── reservation-success.tsx # Başarılı rezervasyon
├── components/               # Yeniden kullanılabilir bileşenler
│   ├── TripCard.tsx         # Sefer kartı
│   ├── ReservationCard.tsx   # Rezervasyon kartı
│   ├── SeatPicker.tsx       # Koltuk seçici
│   └── ui/                   # UI bileşenleri
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Card.tsx
├── stores/                   # State management (Zustand)
│   ├── authStore.ts         # Kullanıcı yönetimi
│   ├── tripStore.ts         # Sefer yönetimi
│   └── reservationStore.ts   # Rezervasyon yönetimi
├── types/                    # TypeScript tip tanımları
│   └── index.ts
├── constants/                # Sabit değerler
│   └── defaultData.ts       # Hazır test verileri
└── utils/                    # Yardımcı fonksiyonlar
    └── storage.ts            # AsyncStorage yardımcıları
```

---

## UYGULAMA EKRANLARI

### 1. Giriş Ekranı (Login)
**Dosya:** `app/(auth)/login.tsx`

- E-posta ve şifre girişi
- Form doğrulama
- Hızlı test girişi butonları (Admin/Kullanıcı)
- Kayıt sayfasına yönlendirme linki

**Özellikler:**
- E-posta formatı kontrolü
- Şifre uzunluk kontrolü (min 6 karakter)
- Hata mesajları gösterimi
- Loading durumu yönetimi

### 2. Kayıt Ekranı (Register)
**Dosya:** `app/(auth)/register.tsx`

- Yeni kullanıcı kaydı formu
- Ad Soyad, E-posta, Telefon, Şifre alanları
- Şifre tekrar kontrolü
- Form doğrulama

**Özellikler:**
- Tüm alanların zorunlu kontrolü
- E-posta benzersizlik kontrolü
- Şifre eşleşme kontrolü

### 3. Ana Sayfa (Home)
**Dosya:** `app/(tabs)/index.tsx`

- Sefer tipi seçimi (Otobüs/Uçak)
- Kalkış ve varış şehri seçimi
- Tarih seçimi
- Sefer arama butonu
- Popüler rotalar bölümü

**Özellikler:**
- Şehir değiştirme butonu (swap)
- Modal ile şehir seçimi
- Tarih listesi (30 gün)
- Arama kriterleri kontrolü

### 4. Sefer Listesi (Trip List)
**Dosya:** `app/trip-list.tsx`

- Arama sonuçlarını FlatList ile gösterir (RecyclerView benzeri)
- Sefer kartları
- Boş liste durumu
- Arama kriterleri özeti

**Özellikler:**
- Lazy loading ile performans optimizasyonu
- Görünür olmayan öğeleri bellekten çıkarma
- Pull-to-refresh desteği

### 5. Koltuk Seçimi (Seat Selection)
**Dosya:** `app/seat-selection.tsx`

- Görsel koltuk düzeni
- Otobüs/Uçak için farklı layoutlar
- Koltuk durumu gösterimi
- Seçilen koltukların özeti
- Toplam fiyat hesaplama

**Özellikler:**
- Gerçek zamanlı koltuk durumu
- Maksimum 5 koltuk seçimi
- Sefer bilgileri özeti

### 6. Rezervasyon Onayı (Confirm)
**Dosya:** `app/confirm.tsx`

- Sefer özeti
- Yolcu bilgileri formu
- Ödeme özeti
- Rezervasyon onay butonu

**Özellikler:**
- Varsayılan kullanıcı bilgileri doldurma
- Form doğrulama
- Toplam fiyat hesaplama

### 7. Başarılı Rezervasyon (Reservation Success)
**Dosya:** `app/reservation-success.tsx`

- Rezervasyon onay mesajı
- Rezervasyon detayları
- Paylaşım butonu (Örtülü Intent)
- Ana sayfaya dön butonu

**Özellikler:**
- Paylaşım API kullanımı
- Rezervasyon numarası gösterimi

### 8. Rezervasyonlarım (My Trips)
**Dosya:** `app/(tabs)/my-trips.tsx`

- Kullanıcının tüm rezervasyonları
- Rezervasyon durumu
- İptal butonu
- Pull-to-refresh

**Özellikler:**
- Aktif rezervasyonları iptal etme
- Rezervasyon kartları ile görselleştirme

### 9. Admin Paneli (Admin)
**Dosya:** `app/(tabs)/admin.tsx`

- Sefer ekleme formu
- Mevcut seferleri listeleme
- Sefer silme işlemi
- Admin yetkisi kontrolü

**Özellikler:**
- Sadece admin kullanıcılar erişebilir
- Sefer ekleme formu validasyonu
- Sefer silme onayı

### 10. Profil (Profile)
**Dosya:** `app/(tabs)/profile.tsx`

- Kullanıcı bilgileri
- Aktif rezervasyon sayısı
- Uygulamayı paylaş butonu
- Çıkış yap butonu

**Özellikler:**
- Kullanıcı bilgileri görüntüleme
- Paylaşım özelliği
- Çıkış yapma işlemi

---

## KAYNAK KODLARI

### 1. FlatList Kullanımı (RecyclerView Benzeri)

**Dosya:** `app/trip-list.tsx`

```typescript
// FlatList - RecyclerView benzeri widget
// Lazy loading ile performanslı liste
// Görünür olmayan öğeleri bellekten çıkarır
<FlatList
  data={filteredTrips}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TripCard
      trip={item}
      onPress={() => handleTripSelect(item.id)}
    />
  )}
  ListHeaderComponent={ListHeader}
  ListEmptyComponent={EmptyList}
  contentContainerStyle={{
    padding: 16,
    flexGrow: 1,
  }}
  showsVerticalScrollIndicator={false}
  // RecyclerView benzeri optimizasyonlar
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
  initialNumToRender={5}
  getItemLayout={(data, index) => ({
    length: 200, // Yaklaşık kart yüksekliği
    offset: 200 * index,
    index,
  })}
/>
```

**Açıklama:**
- `FlatList` React Native'de RecyclerView'ın karşılığıdır
- `removeClippedSubviews`: Görünür olmayan öğeleri bellekten çıkarır
- `maxToRenderPerBatch`: Her batch'te render edilecek maksimum öğe sayısı
- `windowSize`: Render penceresi boyutu
- `getItemLayout`: Öğe boyutlarını önceden bilerek performansı artırır

### 2. Örtülü Intent (Share API)

**Dosya:** `app/reservation-success.tsx`

```typescript
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
```

**Açıklama:**
- `Share.share()` React Native'in örtülü intent API'sidir
- Kullanıcıya WhatsApp, E-posta, SMS gibi uygulamaları seçme imkanı sunar
- Android'de Intent, iOS'ta UIActivityViewController kullanır

### 3. Koltuk Seçici Bileşeni

**Dosya:** `components/SeatPicker.tsx`

```typescript
/**
 * Koltuk durumuna göre renk belirleme
 */
const getSeatColor = (status: SeatStatus): string => {
  switch (status) {
    case 'available':
      return 'bg-dark-700 border-dark-500';  // Müsait - Gri
    case 'selected':
      return 'bg-primary-600 border-primary-400';  // Seçili - Mor
    case 'occupied':
      return 'bg-accent-rose/30 border-accent-rose/50';  // Dolu - Kırmızı
    default:
      return 'bg-dark-700 border-dark-500';
  }
};

/**
 * Otobüs koltuk düzeni (2+2)
 * 40 koltuk için 10 sıra x 4 koltuk
 */
const BusSeatLayout: React.FC<{...}> = ({ 
  totalSeats, 
  occupiedSeats, 
  selectedSeats, 
  onSeatPress, 
  maxSelection 
}) => {
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

  // ... render kodu
};
```

**Açıklama:**
- Otobüs için 2+2 koltuk düzeni (sol 2, koridor, sağ 2)
- Uçak için 3+3 koltuk düzeni (sol 3, koridor, sağ 3)
- Koltuk durumları renk kodlu gösterilir
- Maksimum seçim limiti kontrol edilir

### 4. State Management (Zustand)

**Dosya:** `stores/tripStore.ts`

```typescript
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

  // ... diğer fonksiyonlar
}));
```

**Açıklama:**
- Zustand ile merkezi state yönetimi
- AsyncStorage ile kalıcı veri saklama
- Store'lar bağımsız çalışır ve birbirleriyle iletişim kurabilir

### 5. AsyncStorage Kullanımı

**Dosya:** `utils/storage.ts`

```typescript
/**
 * Veri kaydetme
 * @param key - Storage anahtarı
 * @param value - Kaydedilecek değer
 */
export const saveData = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Storage save error:', error);
    throw error;
  }
};

/**
 * Veri okuma
 * @param key - Storage anahtarı
 * @returns Okunan değer veya null
 */
export const loadData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Storage load error:', error);
    return null;
  }
};
```

**Açıklama:**
- AsyncStorage React Native'in yerel veri depolama API'sidir
- Key-value çiftleri olarak veri saklar
- JSON formatında serialize/deserialize edilir
- Asenkron çalışır

### 6. Form Doğrulama

**Dosya:** `app/(auth)/login.tsx`

```typescript
// Form doğrulama
const validateForm = (): boolean => {
  const errors: { email?: string; password?: string } = {};

  if (!email.trim()) {
    errors.email = 'E-posta adresi gerekli';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Geçerli bir e-posta adresi girin';
  }

  if (!password) {
    errors.password = 'Şifre gerekli';
  } else if (password.length < 6) {
    errors.password = 'Şifre en az 6 karakter olmalı';
  }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};
```

**Açıklama:**
- Client-side form doğrulama
- E-posta format kontrolü (regex)
- Şifre uzunluk kontrolü
- Hata mesajları kullanıcıya gösterilir

### 7. Hazır Test Verileri

**Dosya:** `constants/defaultData.ts`

```typescript
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
];

/**
 * Hazır seferler
 * - Otobüs ve uçak seferleri
 * - Farklı şehirler arası
 * - Bazı koltuklarda doluluk var
 */
export const DEFAULT_TRIPS: Trip[] = [
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
  // ... diğer seferler
];
```

**Açıklama:**
- Proje kontrolü için hazır veriler
- Admin ve kullanıcı hesapları
- Çeşitli sefer örnekleri
- Bazı koltuklar dolu olarak işaretlenmiş

---

## GEREKSİNİMLERİN KARŞILANMASI

### ✅ 1. Online Rezervasyon Sistemi
- Otobüs ve uçak seferleri için rezervasyon yapılabilir
- Kullanıcılar sefer görüntüleyip koltuk seçerek rezervasyon yapabilir
- Admin kullanıcılar sefer ekleyebilir ve silebilir

### ✅ 2. Temel Özellikler

#### ✅ Kullanıcı kayıt/giriş sistemi
- Kayıt ekranı (`app/(auth)/register.tsx`)
- Giriş ekranı (`app/(auth)/login.tsx`)
- Form doğrulama
- Rol yönetimi (admin/user)

#### ✅ Sefer listeleme ve sorgulama
- Ana sayfa (`app/(tabs)/index.tsx`)
- Sefer listesi (`app/trip-list.tsx`)
- Filtreleme (şehir, tarih, tip)
- Sıralama (fiyat)

#### ✅ Koltuk durumunu görsel olarak gösterme
- Koltuk seçici bileşeni (`components/SeatPicker.tsx`)
- Otobüs ve uçak için farklı layoutlar
- Renk kodlu durum gösterimi
- Gerçek zamanlı güncelleme

#### ✅ Rezervasyon oluşturma, iptal etme
- Rezervasyon onay ekranı (`app/confirm.tsx`)
- Rezervasyonlarım ekranı (`app/(tabs)/my-trips.tsx`)
- İptal işlemi
- Rezervasyon durumu yönetimi

#### ✅ Admin paneli (sefer ekleme/silme)
- Admin ekranı (`app/(tabs)/admin.tsx`)
- Sefer ekleme formu
- Sefer silme işlemi
- Yetki kontrolü

### ✅ 3. Hazır Kullanıcılar ve Seferler
- `constants/defaultData.ts` dosyasında hazır veriler
- Admin: `admin@test.com` / `123456`
- Kullanıcı: `user@test.com` / `123456`
- 8 hazır sefer (otobüs ve uçak)
- Kontrol sırasında yeni kullanıcı ve sefer eklenebilir

### ✅ 4. Ek Özellikler
- **Paylaşım özelliği:** Rezervasyon bilgilerini harici uygulamalarla paylaşma
- **Popüler rotalar:** Hızlı erişim için öneriler
- **Responsive tasarım:** Farklı ekran boyutlarına uyum
- **Pull-to-refresh:** Liste yenileme
- **Form validasyonu:** Detaylı form kontrolleri

### ✅ 5. En Az 5 Ekran
Uygulamada **10 ekran** bulunmaktadır:
1. Giriş Ekranı
2. Kayıt Ekranı
3. Ana Sayfa
4. Sefer Listesi
5. Koltuk Seçimi
6. Rezervasyon Onayı
7. Başarılı Rezervasyon
8. Rezervasyonlarım
9. Admin Paneli
10. Profil

### ✅ 6. Ekran Döndürme Desteği
- `app.json` dosyasında `orientation: "portrait"` ayarı
- Uygulama portrait modunda sabitlenmiştir
- Ekran döndürme durumunda bozulma olmaz
- Responsive tasarım ile farklı ekran boyutlarına uyum

### ✅ 7. RecyclerView veya Benzeri Widget
- `FlatList` kullanılmıştır (`app/trip-list.tsx`)
- RecyclerView'ın React Native karşılığıdır
- Lazy loading ile performans optimizasyonu
- Görünür olmayan öğeleri bellekten çıkarır
- `removeClippedSubviews`, `maxToRenderPerBatch`, `windowSize` optimizasyonları

### ✅ 8. Örtülü Intent ile Harici Uygulamalar ile Veri Paylaşımı
- `Share.share()` API kullanılmıştır
- Rezervasyon başarı ekranında (`app/reservation-success.tsx`)
- Profil ekranında (`app/(tabs)/profile.tsx`)
- WhatsApp, E-posta, SMS gibi uygulamalara gönderme
- Android'de Intent, iOS'ta UIActivityViewController kullanır

---

## SONUÇ

Bu proje kapsamında, kullanıcıların otobüs ve uçak seferlerini görüntüleyip rezervasyon yapabilecekleri bir mobil uygulama geliştirilmiştir. Uygulama, belirtilen tüm gereksinimleri karşılamaktadır:

- ✅ Kullanıcı kayıt/giriş sistemi
- ✅ Sefer listeleme ve sorgulama
- ✅ Görsel koltuk seçimi
- ✅ Rezervasyon oluşturma ve iptal etme
- ✅ Admin paneli
- ✅ Hazır test verileri
- ✅ En az 5 ekran (10 ekran mevcut)
- ✅ Ekran döndürme desteği
- ✅ FlatList kullanımı (RecyclerView benzeri)
- ✅ Örtülü intent ile paylaşım

Uygulama, modern React Native teknolojileri kullanılarak geliştirilmiş, kullanıcı dostu bir arayüze sahiptir ve profesyonel bir görünüm sunmaktadır.

---

## EKRAN GÖRÜNTÜLERİ

Uygulama çalıştırıldığında aşağıdaki ekranlar görüntülenebilir:

1. **Giriş Ekranı:** E-posta ve şifre girişi, hızlı test butonları
2. **Ana Sayfa:** Sefer arama formu, popüler rotalar
3. **Sefer Listesi:** Bulunan seferler, FlatList ile gösterim
4. **Koltuk Seçimi:** Görsel koltuk düzeni, renk kodlu durumlar
5. **Rezervasyon Onayı:** Yolcu bilgileri, ödeme özeti
6. **Başarılı Rezervasyon:** Onay mesajı, paylaşım butonu
7. **Rezervasyonlarım:** Kullanıcının rezervasyonları, iptal butonu
8. **Admin Paneli:** Sefer ekleme formu, sefer listesi
9. **Profil:** Kullanıcı bilgileri, paylaşım, çıkış

---

**Proje Tarihi:** Aralık 2025  
**Geliştirici:** Mustafa Yiğit GÜZEL, Meriç OZKAYAGAN, Alinda KABADAYI

