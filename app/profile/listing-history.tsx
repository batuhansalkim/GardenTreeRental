import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface ListingItem {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  type: 'tree' | 'garden';
  status: 'completed' | 'cancelled';
  date: string;
}

export default function ListingHistoryScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: ListingItem }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push(`/rental/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price} ₺/ay</Text>
        <Text style={styles.location}>
          <Ionicons name="location" size={14} color="#666" /> {item.location}
        </Text>
        <View style={styles.statusContainer}>
          <Text style={[
            styles.status,
            item.status === 'completed' ? styles.statusCompleted : styles.statusCancelled
          ]}>
            {item.status === 'completed' ? 'Tamamlandı' : 'İptal Edildi'}
          </Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[]} // Geçmiş ilanlar buraya gelecek
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Geçmiş ilanınız bulunmuyor.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  card: {
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
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusCompleted: {
    backgroundColor: '#e8f5e9',
    color: '#2E7D32',
  },
  statusCancelled: {
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
}); 