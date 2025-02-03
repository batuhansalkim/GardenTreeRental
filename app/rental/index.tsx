import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const DUMMY_DATA = [
  {
    id: '1',
    title: 'Elma Ağacı',
    type: 'tree',
    price: 150,
    location: 'Kadıköy, İstanbul',
    image: 'https://images.unsplash.com/photo-1613488329064-aafbeb1e4db1',
    description: 'Yıllık bakımlı elma ağacı',
  },
  {
    id: '2',
    title: 'Hobi Bahçesi',
    type: 'garden',
    price: 300,
    location: 'Beşiktaş, İstanbul',
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e',
    description: '50m² kullanım alanlı hobi bahçesi',
  },
  {
    id: '3',
    title: 'Kiraz Ağacı',
    type: 'tree',
    price: 200,
    location: 'Üsküdar, İstanbul',
    image: 'https://images.unsplash.com/photo-1578022761797-b8636ac1773c',
    description: 'Taze kiraz ağacı',
  },
  {
    id: '4',
    title: 'Sebze Bahçesi',
    type: 'garden',
    price: 250,
    location: 'Maltepe, İstanbul',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a',
    description: 'Hazır sebze yatakları',
  },
  {
    id: '5',
    title: 'Armut Ağacı',
    type: 'tree',
    price: 180,
    location: 'Ataşehir, İstanbul',
    image: 'https://images.unsplash.com/photo-1501595091296-3aa970afb3ff',
    description: 'Verimli armut ağacı',
  }
];

export default function RentalScreen() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'tree', // veya 'garden'
    price: '',
    location: '',
    description: ''
  });

  const handleRentalPress = (id: string) => {
    router.push(`/rental/${id}`);
  };

  const handleAddPress = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
    // Burada form verilerini işleyebilirsiniz
    setIsModalVisible(false);
    setFormData({
      title: '',
      type: 'tree',
      price: '',
      location: '',
      description: ''
    });
  };

  const handleFilterPress = (filter: string) => {
    // Filtre fonksiyonu eklenecek
    console.log('Filtre:', filter);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={24} color="#666" />
          <Text style={styles.searchText}>Bahçe veya Ağaç Ara...</Text>
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => handleFilterPress('trees')}
          >
            <Ionicons name="leaf" size={16} color="#2E7D32" />
            <Text style={styles.filterText}>Ağaçlar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => handleFilterPress('gardens')}
          >
            <Ionicons name="grid" size={16} color="#2E7D32" />
            <Text style={styles.filterText}>Bahçeler</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => handleFilterPress('price')}
          >
            <Ionicons name="cash" size={16} color="#2E7D32" />
            <Text style={styles.filterText}>Fiyat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {DUMMY_DATA.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.card}
              onPress={() => handleRentalPress(item.id)}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>{item.price} ₺/ay</Text>
                </View>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.location}>
                  <Ionicons name="location" size={16} color="#666" /> {item.location}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddPress}
      >
        <View style={styles.addButtonContent}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>İlan Ekle</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Yeni İlan Oluştur</Text>
              <TouchableOpacity 
                onPress={() => setIsModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>İlan Başlığı</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Örn: Elma Ağacı"
                  value={formData.title}
                  onChangeText={(text) => setFormData({...formData, title: text})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tür</Text>
                <View style={styles.typeContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.typeButton,
                      formData.type === 'tree' && styles.typeButtonActive
                    ]}
                    onPress={() => setFormData({...formData, type: 'tree'})}
                  >
                    <Ionicons 
                      name="leaf" 
                      size={20} 
                      color={formData.type === 'tree' ? '#fff' : '#2E7D32'} 
                    />
                    <Text style={formData.type === 'tree' ? styles.typeButtonTextActive : styles.typeButtonText}>
                      Ağaç
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.typeButton,
                      formData.type === 'garden' && styles.typeButtonActive
                    ]}
                    onPress={() => setFormData({...formData, type: 'garden'})}
                  >
                    <Ionicons 
                      name="grid" 
                      size={20} 
                      color={formData.type === 'garden' ? '#fff' : '#2E7D32'} 
                    />
                    <Text style={formData.type === 'garden' ? styles.typeButtonTextActive : styles.typeButtonText}>
                      Bahçe
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fiyat (₺/ay)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  keyboardType="numeric"
                  value={formData.price}
                  onChangeText={(text) => setFormData({...formData, price: text})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Konum</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Örn: Kadıköy, İstanbul"
                  value={formData.location}
                  onChangeText={(text) => setFormData({...formData, location: text})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Açıklama</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="İlanınız hakkında detaylı bilgi verin"
                  multiline
                  numberOfLines={4}
                  value={formData.description}
                  onChangeText={(text) => setFormData({...formData, description: text})}
                />
              </View>

              <TouchableOpacity style={styles.addImageButton}>
                <Ionicons name="camera" size={24} color="#2E7D32" />
                <Text style={styles.addImageText}>Fotoğraf Ekle</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>İlanı Yayınla</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.84,
    elevation: 2,
  },
  filterText: {
    marginLeft: 5,
    color: '#2E7D32',
    fontWeight: '600',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2E7D32',
    borderRadius: 25,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  closeButton: {
    padding: 5,
  },
  modalForm: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E7D32',
    gap: 8,
  },
  typeButtonActive: {
    backgroundColor: '#2E7D32',
  },
  typeButtonText: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E7D32',
    marginBottom: 20,
    gap: 8,
  },
  addImageText: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 