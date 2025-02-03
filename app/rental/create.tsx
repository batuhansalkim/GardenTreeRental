import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CreateRentalScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Yeni İlan Oluştur</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>İlan Başlığı</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: Elma Ağacı"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tür</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity style={[styles.typeButton, styles.typeButtonActive]}>
              <Ionicons name="leaf" size={20} color="#fff" />
              <Text style={styles.typeButtonTextActive}>Ağaç</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.typeButton}>
              <Ionicons name="grid" size={20} color="#2E7D32" />
              <Text style={styles.typeButtonText}>Bahçe</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fiyat (₺/ay)</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Konum</Text>
          <TextInput
            style={styles.input}
            placeholder="Örn: Kadıköy, İstanbul"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Açıklama</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="İlanınız hakkında detaylı bilgi verin"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.addImageButton}>
          <Ionicons name="camera" size={24} color="#2E7D32" />
          <Text style={styles.addImageText}>Fotoğraf Ekle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>İlanı Yayınla</Text>
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
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E7D32',
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
    backgroundColor: '#fff',
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
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 