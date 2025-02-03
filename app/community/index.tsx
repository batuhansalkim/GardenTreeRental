import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DUMMY_POSTS = [
  {
    id: '1',
    username: 'Ahmet Yılmaz',
    userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    content: 'Elma ağacımdan ilk hasadı yaptım! Çok mutluyum 🌳🍎',
    image: 'https://images.unsplash.com/photo-1613488329064-aafbeb1e4db1',
    likes: 24,
    comments: 5,
    time: '2 saat önce'
  },
  {
    id: '2',
    username: 'Ayşe Demir',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    content: 'Hobi bahçemde organik domates yetiştirmeye başladım. Tavsiyelerinizi bekliyorum!',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a',
    likes: 15,
    comments: 8,
    time: '4 saat önce'
  }
];

export default function CommunityScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.createPost}>
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="add-circle" size={24} color="#2E7D32" />
          <Text style={styles.createButtonText}>Gönderi Oluştur</Text>
        </TouchableOpacity>
      </View>

      {DUMMY_POSTS.map((post) => (
        <View key={post.id} style={styles.post}>
          <View style={styles.postHeader}>
            <Image source={{ uri: post.userImage }} style={styles.userImage} />
            <View>
              <Text style={styles.username}>{post.username}</Text>
              <Text style={styles.time}>{post.time}</Text>
            </View>
          </View>

          <Text style={styles.content}>{post.content}</Text>
          
          {post.image && (
            <Image source={{ uri: post.image }} style={styles.postImage} />
          )}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={24} color="#666" />
              <Text style={styles.actionText}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={24} color="#666" />
              <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  createPost: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
  },
  createButtonText: {
    marginLeft: 10,
    color: '#2E7D32',
    fontWeight: '600',
  },
  post: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    color: '#666',
    fontSize: 12,
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    color: '#666',
  },
}); 