# Online Rezervasyon Sistemi (Otobüs/Uçak)

Ege Üniversitesi Bilgisayar Mühendisliği - Mobil Programlama Dersi Projesi

## Proje Özeti

Bu proje, kullanıcıların otobüs veya uçak seferlerini görüntüleyip, koltuk seçerek rezervasyon yapmalarını sağlayan bir mobil uygulamadır. Admin kullanıcılar sefer ekleyebilir ve silebilir.

## Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| React Native | Cross-platform mobil uygulama geliştirme |
| Expo | React Native geliştirme ortamı |
| TypeScript | Tip güvenli JavaScript |
| Expo Router | Dosya tabanlı navigasyon |
| Zustand | State management |
| AsyncStorage | Local veri depolama |
| NativeWind | TailwindCSS için React Native |
| Lucide Icons | Modern ikon kütüphanesi |

## Özellikler

### Temel Özellikler
- ✅ Kullanıcı kayıt/giriş sistemi
- ✅ Sefer listeleme ve sorgulama
- ✅ Koltuk durumunu görsel olarak gösterme (otobüs/uçak düzeni)
- ✅ Rezervasyon oluşturma ve iptal etme
- ✅ Admin paneli (sefer ekleme/silme)

### Teknik Gereksinimler
- ✅ En az 5 ekran (7 ekran mevcut)
- ✅ Ekran çevrilmesinden etkilenmiyor (portrait kilidi)
- ✅ FlatList kullanımı (RecyclerView benzeri)
- ✅ Share API ile harici uygulama paylaşımı (örtülü intent)

### Ek Özellikler
- ✅ Koyu tema tasarım
- ✅ Animasyonlu geçişler
- ✅ Hazır test verileri
- ✅ Hızlı giriş butonları

## Ekranlar

1. **Splash/Index** - Yükleme ve yönlendirme
2. **Login** - Kullanıcı girişi
3. **Register** - Yeni kullanıcı kaydı
4. **Home** - Ana sayfa, sefer arama
5. **Trip List** - Sefer listesi (FlatList)
6. **Seat Selection** - Görsel koltuk seçimi
7. **Confirm** - Rezervasyon onayı
8. **Reservation Success** - Başarılı rezervasyon
9. **My Trips** - Kullanıcının rezervasyonları
10. **Admin Panel** - Sefer yönetimi (admin)
11. **Profile** - Kullanıcı profili

## Hazır Test Kullanıcıları

| E-posta | Şifre | Rol |
|---------|-------|-----|
| admin@test.com | 123456 | Admin |
| user@test.com | 123456 | Kullanıcı |
| mehmet@test.com | 123456 | Kullanıcı |

## Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn
- Expo CLI
- Android Studio (Android emulator için) veya Expo Go uygulaması

### Adımlar

1. Proje klasörüne gidin:
\`\`\`bash
cd mobile-reservation
\`\`\`

2. Bağımlılıkları yükleyin:
\`\`\`bash
npm install
\`\`\`

3. Uygulamayı başlatın:
\`\`\`bash
npm start
\`\`\`

4. Expo Go uygulamasıyla QR kodu okutun veya Android emulator'da çalıştırın:
\`\`\`bash
npm run android
\`\`\`

## Klasör Yapısı

\`\`\`
mobile-reservation/
├── app/                      # Expo Router ekranları
│   ├── (auth)/               # Kimlik doğrulama ekranları
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/               # Ana sekmeler
│   │   ├── _layout.tsx
│   │   ├── index.tsx         # Ana sayfa
│   │   ├── my-trips.tsx      # Rezervasyonlarım
│   │   ├── admin.tsx         # Admin paneli
│   │   └── profile.tsx       # Profil
│   ├── _layout.tsx           # Root layout
│   ├── index.tsx             # Splash ekranı
│   ├── trip-list.tsx
│   ├── seat-selection.tsx
│   ├── confirm.tsx
│   └── reservation-success.tsx
├── components/               # Yeniden kullanılabilir bileşenler
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── TripCard.tsx
│   ├── SeatPicker.tsx
│   └── ReservationCard.tsx
├── stores/                   # Zustand state yönetimi
│   ├── authStore.ts
│   ├── tripStore.ts
│   └── reservationStore.ts
├── types/                    # TypeScript tipleri
│   └── index.ts
├── constants/                # Sabit değerler
│   └── defaultData.ts
├── utils/                    # Yardımcı fonksiyonlar
│   └── storage.ts
├── app.json                  # Expo yapılandırması
├── tailwind.config.js        # TailwindCSS yapılandırması
└── package.json
\`\`\`

## Önemli Kodlar

### FlatList Kullanımı (RecyclerView Karşılığı)
\`app/trip-list.tsx\` dosyasında FlatList kullanılmıştır:

\`\`\`typescript
<FlatList
  data={filteredTrips}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TripCard trip={item} onPress={() => handleTripSelect(item.id)} />
  )}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
\`\`\`

### Örtülü Intent (Share API)
\`app/(tabs)/profile.tsx\` ve \`app/reservation-success.tsx\` dosyalarında Share API kullanılmıştır:

\`\`\`typescript
import { Share } from 'react-native';

const handleShare = async () => {
  await Share.share({
    message: 'Rezervasyon bilgileri...',
    title: 'Rezervasyon',
  });
};
\`\`\`

### Ekran Kilidi (Portrait Only)
\`app.json\` dosyasında orientation portrait olarak ayarlanmıştır:

\`\`\`json
{
  "expo": {
    "orientation": "portrait"
  }
}
\`\`\`

## Ekran Görüntüleri

Uygulama çalıştırıldığında aşağıdaki ekranlar görüntülenebilir:

1. Giriş ekranı - Hızlı test girişi butonları mevcut
2. Ana sayfa - Sefer arama formu
3. Sefer listesi - Bulunan seferler
4. Koltuk seçimi - Otobüs/uçak koltuk düzeni
5. Onay ekranı - Yolcu bilgileri ve ödeme
6. Başarılı rezervasyon - Paylaşım butonu
7. Admin paneli - Sefer ekleme/silme

## Geliştirici

Bu proje Mobil Programlama dersi kapsamında geliştirilmiştir.

## Lisans

Bu proje eğitim amaçlıdır.

