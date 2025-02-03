import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const RENTAL_DETAILS: { [key: string]: any } = {
  '1': {
    id: '1',
    title: 'Elma Ağacı',
    type: 'tree',
    price: 150,
    location: 'Kadıköy, İstanbul',
    description: 'Özenle bakılan, 5 yaşında elma ağacı. Yılda ortalama 50-60 kg meyve vermektedir. Düzenli ilaçlama ve bakımı yapılmaktadır.',
    features: ['5 yaşında', 'Yarı gölgeli alan', 'Düzenli bakım', 'Organik'],
    images: [
      'https://images.unsplash.com/photo-1613488329064-aafbeb1e4db1',
      'https://images.unsplash.com/photo-1618088129969-bcb0c051985e',
      'https://images.unsplash.com/photo-1501595091296-3aa970afb3ff'
    ],
    owner: {
      name: 'Mehmet Yılmaz',
      phone: '+905551234567',
      rating: 4.8
    }
  },
  '2': {
    id: '2',
    title: 'Hobi Bahçesi',
    type: 'garden',
    price: 300,
    location: 'Beşiktaş, İstanbul',
    description: '50m² kullanım alanlı hobi bahçesi. İçerisinde küçük bir kulübe, su kuyusu ve hazır sebze yatakları bulunmaktadır.',
    features: ['50m²', 'Kulübe', 'Su kuyusu', 'Otopark'],
    images: [
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e',
      'https://images.unsplash.com/photo-1592150621744-aca64f48394a',
      'https://images.unsplash.com/photo-1589927986089-35812388d1f4'
    ],
    owner: {
      name: 'Ayşe Kaya',
      phone: '+905559876543',
      rating: 4.9
    }
  }
};

export default function RentalDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // Veri kontrolü
  const rental = RENTAL_DETAILS[id as string];
  
  if (!rental) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>İlan bulunamadı!</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCall = async (phoneNumber: string) => {
    try {
      await Linking.openURL(`tel:${phoneNumber}`);
    } catch (error) {
      Alert.alert(
        "Hata",
        "Arama yapılırken bir sorun oluştu. Lütfen daha sonra tekrar deneyin."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal pagingEnabled style={styles.imageContainer}>
        {rental.images.map((image: string, index: number) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.image}
          />
        ))}
      </ScrollView>

      <View style={styles.content}>
        <Text style={styles.title}>{rental.title}</Text>
        <Text style={styles.price}>{rental.price} ₺/ay</Text>
        
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={styles.location}>{rental.location}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Açıklama</Text>
        <Text style={styles.description}>{rental.description}</Text>

        <Text style={styles.sectionTitle}>Özellikler</Text>
        <View style={styles.features}>
          {rental.features.map((feature: string, index: number) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#2E7D32" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>İlan Sahibi</Text>
        <View style={styles.ownerContainer}>
          <View style={styles.ownerInfo}>
            <Text style={styles.ownerName}>{rental.owner.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{rental.owner.rating}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => handleCall(rental.owner.phone)}
          >
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>İletişime Geç</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#2E7D32',
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    height: 300,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  features: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#444',
  },
  ownerContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  ownerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    color: '#666',
  },
  contactButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 