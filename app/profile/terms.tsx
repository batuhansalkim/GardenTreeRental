import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TermsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Kullanım Koşulları</Text>
        
        <Text style={styles.section}>1. Genel Kurallar</Text>
        <Text style={styles.text}>
          Garden Tree Rental uygulamasını kullanarak, aşağıdaki koşulları kabul etmiş olursunuz.
        </Text>

        <Text style={styles.section}>2. Sorumluluklar</Text>
        <Text style={styles.text}>
          • Uygulama üzerinden yapılan kiralamalarda sorumluluk taraflara aittir.{'\n'}
          • Paylaşılan bilgilerin doğruluğundan kullanıcılar sorumludur.{'\n'}
          • Kötüye kullanım durumunda hesabınız askıya alınabilir.
        </Text>

        <Text style={styles.section}>3. Gizlilik</Text>
        <Text style={styles.text}>
          Kişisel verileriniz gizlilik politikamız kapsamında korunmaktadır.
        </Text>

        <Text style={styles.section}>4. İlan Kuralları</Text>
        <Text style={styles.text}>
          • İlanlar gerçek ve mevcut ürünler için olmalıdır.{'\n'}
          • Yanıltıcı bilgiler içeren ilanlar kaldırılacaktır.{'\n'}
          • Fiyatlandırma politikası adil ve şeffaf olmalıdır.
        </Text>

        <Text style={styles.version}>Son güncelleme: 2024</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E7D32',
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 15,
  },
  version: {
    marginTop: 30,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
}); 