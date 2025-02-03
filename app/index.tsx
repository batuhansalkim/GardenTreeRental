import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const FEATURED_ITEMS = [
  {
    id: '1',
    title: 'Elma Ağacı',
    type: 'tree',
    price: 150,
    location: 'Kadıköy',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1613488329064-aafbeb1e4db1'
  },
  {
    id: '2',
    title: 'Hobi Bahçesi',
    type: 'garden',
    price: 300,
    location: 'Beşiktaş',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e'
  },
  // Diğer öne çıkan ilanlar...
];

const CATEGORIES = [
  {
    id: 'trees',
    title: 'Ağaçlar',
    icon: 'leaf',
    color: '#4CAF50'
  },
  {
    id: 'gardens',
    title: 'Bahçeler',
    icon: 'flower',
    color: '#8BC34A'
  },
  {
    id: 'new',
    title: 'Yeni İlanlar',
    icon: 'star',
    color: '#FFC107'
  },
  {
    id: 'nearby',
    title: 'Yakınımdakiler',
    icon: 'location',
    color: '#FF5722'
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={styles.container}>
      {/* Üst Banner */}
      <View style={styles.banner}>
        <Text style={styles.welcomeText}>Hoş Geldiniz!</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Ağaç veya bahçe ara..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Kategoriler */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Kategoriler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => router.push(`/rental?category=${category.id}`)}
            >
              <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                <Ionicons name={category.icon as any} size={24} color="#fff" />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Öne Çıkan İlanlar */}
      <View style={styles.featuredContainer}>
        <Text style={styles.sectionTitle}>Öne Çıkan İlanlar</Text>
        {FEATURED_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.featuredCard}
            onPress={() => router.push(`/rental/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.featuredImage} />
            <View style={styles.featuredContent}>
              <View style={styles.featuredHeader}>
                <Text style={styles.featuredTitle}>{item.title}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFC107" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
              <View style={styles.featuredDetails}>
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={14} color="#666" />
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>
                <Text style={styles.priceText}>{item.price} ₺/ay</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Hızlı Erişim */}
      <View style={styles.quickAccessContainer}>
        <TouchableOpacity 
          style={styles.quickAccessButton}
          onPress={() => router.push('/rental/create')}
        >
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.quickAccessText}>İlan Ver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    backgroundColor: '#2E7D32',
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoriesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  featuredContainer: {
    padding: 20,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  featuredContent: {
    padding: 15,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: '#666',
    fontWeight: '600',
  },
  featuredDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    color: '#666',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  quickAccessContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  quickAccessButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    gap: 10,
  },
  quickAccessText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
