# Garden Tree Rental

Bahçe ve ağaç kiralama platformu mobil uygulaması.

## Proje Hakkında

Garden Tree Rental, insanların bahçe ve ağaçlarını kiraya verebilecekleri veya kiralayabilecekleri bir mobil platformdur. Uygulama, sürdürülebilir tarım ve yeşil alanların paylaşımını teşvik etmeyi amaçlamaktadır.

## Özellikler

- 🌳 Ağaç ve Bahçe Kiralama
  - İlan oluşturma ve yönetme
  - Detaylı ilan görüntüleme
  - Fiyat ve kategori filtreleme
  - Konum bazlı arama

- 👥 Kullanıcı Profili
  - Aktif ve geçmiş ilanları görüntüleme
  - Profil düzenleme
  - Bildirim tercihleri
  - İlan yönetimi

- 🤝 Topluluk Özellikleri
  - İlan paylaşımı
  - Kullanıcı değerlendirmeleri
  - İletişim seçenekleri

## Kullanılan Teknolojiler

### Ana Teknolojiler
- **React Native**: Cross-platform mobil uygulama geliştirme
- **Expo**: Geliştirme sürecini hızlandıran React Native framework'ü
- **TypeScript**: Tip güvenliği ve daha iyi kod organizasyonu

### Paketler ve Kütüphaneler
- **expo-router**: Sayfa yönlendirme ve navigasyon
- **@expo/vector-icons**: İkon ve semboller
- **expo-image-picker**: Fotoğraf seçme ve yükleme
- **react-native**: Temel UI bileşenleri

## Proje Yapısı

## 🌱 Proje Özeti
Şehir içindeki kullanılmayan boş arazileri topluluk bahçelerine dönüştüren, mahalle sakinlerine kendi hobi bahçelerini kiralama veya bireysel olarak ağaç satın alarak organik tarım yapma imkânı sunan mobil uygulama projesi.

## 📱 Geliştirme Yol Haritası

### 1. Faz - Temel Altyapı (2 Hafta)
- [x] Proje kurulumu ve yapılandırması
- [ ] Temel navigasyon yapısı
- [ ] Kullanıcı arayüzü tasarım sistemi
- [ ] Tema ve renk paleti oluşturma
- [ ] Temel bileşenlerin geliştirilmesi (Button, Input, Card vb.)

### 2. Faz - Kullanıcı Yönetimi (2 Hafta)
- [ ] Kayıt ekranı
- [ ] Giriş ekranı
- [ ] Profil sayfası
- [ ] Kullanıcı ayarları
- [ ] Firebase entegrasyonu

### 3. Faz - Bahçe/Ağaç Kiralama Modülü (3 Hafta)
- [ ] Harita entegrasyonu
- [ ] Bahçe/ağaç listeleme sayfası
- [ ] Detay sayfası
- [ ] Kiralama işlem akışı
- [ ] Ödeme sistemi entegrasyonu

### 4. Faz - Tarım Takip Sistemi (3 Hafta)
- [ ] Bitki takip sayfası
- [ ] Gelişim takvimi
- [ ] Bildirim sistemi
- [ ] AI destekli tarım danışmanlığı
- [ ] Hava durumu entegrasyonu

### 5. Faz - Sosyal Özellikler (2 Hafta)
- [ ] Topluluk sayfası
- [ ] Paylaşım sistemi
- [ ] Yorum ve puanlama
- [ ] Eğitim içerikleri modülü

### 6. Faz - Test ve Optimizasyon (2 Hafta)
- [ ] Performans optimizasyonu
- [ ] Hata ayıklama
- [ ] Kullanıcı testleri
- [ ] Güvenlik kontrolleri

## 🛠 Kullanılan Teknolojiler
- React Native
- Expo
- Firebase
- Google Maps API
- AI API'leri
- Payment Gateway

## 📦 Proje Kurulumu

bash
Projeyi klonlayın
git clone [proje-url]
Bağımlılıkları yükleyin
cd gardentreerental
npm install
Uygulamayı başlatın
npx expo start


## 🌟 Özellikler

### Temel Özellikler
- Bahçe ve Ağaç Kiralama
- Doğal Tarım Takibi
- Meyve ve Sebze Hasadı
- Sağlık ve Gıda Güvenliği
- Sosyal ve Eğitim Modülleri
- Zamanlayıcı ve Takvim Entegrasyonu

### Kullanıcı Özellikleri
- Profil Yönetimi
- Kiralama Geçmişi
- Ürün Takibi
- Topluluk Etkileşimi
- Eğitim İçeriklerine Erişim

## 👥 Hedef Kitle
- Şehirli Kullanıcılar
- Doğa Dostları
- Aileler ve Çocuklar
- Hobici Tarımcılar
- Yerel İşletmeler

## 💼 İş Modeli
- Abonelik Sistemi
- Ürün Satışı
- Reklam ve Ortaklık Gelirleri
- Premium İçerik ve Eğitim
- Ek Hizmetler

gardentreerental/
├── app/
│ ├── layout.tsx # Ana uygulama layoutu ve tab navigasyonu
│ ├── index.tsx # Ana sayfa
│ ├── rental/ # Kiralama modülü
│ │ ├── layout.tsx # Kiralama sayfaları layoutu
│ │ ├── index.tsx # İlan listeleme ve filtreleme
│ │ └── [id].tsx # İlan detay sayfası
│ ├── profile/ # Profil modülü
│ │ ├── layout.tsx # Profil sayfaları layoutu
│ │ ├── index.tsx # Profil ana sayfa
│ │ ├── edit.tsx # Profil düzenleme
│ │ └── ... # Diğer profil sayfaları
│ └── community/ # Topluluk modülü
│ └── index.tsx # Topluluk sayfası
└── ...

## Tasarım Prensipleri

1. **Kullanıcı Deneyimi**
   - Sezgisel navigasyon
   - Tutarlı tasarım dili
   - Hızlı yükleme süreleri
   - Responsive tasarım

2. **Kod Organizasyonu**
   - TypeScript ile tip güvenliği
   - Modüler yapı
   - Yeniden kullanılabilir bileşenler
   - Clean Code prensipleri

3. **Performans**
   - Lazy loading
   - Optimize edilmiş görseller
   - Minimal render döngüleri

## Önemli Özellikler ve Uygulamalar

### 1. İlan Yönetimi
- Tarih bazlı sıralama
- Dinamik filtreleme
- Gerçek zamanlı güncelleme
- Resim yükleme desteği

### 2. Kullanıcı Arayüzü
- Material Design prensipleri
- Özelleştirilmiş bileşenler
- Animasyonlar ve geçişler
- Responsive layout

### 3. Veri Yönetimi
- Local state management
- Form validasyonları
- Error handling
- Async işlemler

## Gelecek Özellikler

- [ ] Harita entegrasyonu
- [ ] Mesajlaşma sistemi
- [ ] Ödeme entegrasyonu
- [ ] Push notifications
- [ ] Çoklu dil desteği

## Katkıda Bulunma

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakınız.

## 🤝 Katkıda Bulunma
Projeye katkıda bulunmak için lütfen bir issue açın veya pull request gönderin.

## 📄 Lisans
Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.