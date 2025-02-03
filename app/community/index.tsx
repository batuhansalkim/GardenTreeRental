import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

// Örnek veriler için interface tanımlamaları
interface Comment {
  id: string;
  username: string;
  userImage: string;
  content: string;
  time: string;
}

interface Post {
  id: string;
  username: string;
  userImage: string;
  content: string;
  image?: string;
  location?: string;
  likes: number;
  comments: Comment[];
  time: string;
  isLiked?: boolean;
}

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    username: 'Ahmet Yılmaz',
    userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    content: 'Elma ağacımdan ilk hasadı yaptım! Çok mutluyum 🌳🍎',
    image: 'https://images.unsplash.com/photo-1613488329064-aafbeb1e4db1',
    likes: 24,
    comments: [
      {
        id: '1',
        username: 'Mehmet Demir',
        userImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
        content: 'Harika görünüyor! Kaç kilo hasat aldın?',
        time: '1 saat önce'
      }
    ],
    time: '2 saat önce',
    isLiked: false
  },
  {
    id: '2',
    username: 'Ayşe Demir',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    content: 'Hobi bahçemde organik domates yetiştirmeye başladım. Tavsiyelerinizi bekliyorum!',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a',
    likes: 15,
    comments: [],
    time: '4 saat önce'
  }
];

export default function CommunityScreen() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [postData, setPostData] = useState({
    content: '',
    image: null as string | null,
    location: null as string | null,
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Üzgünüz', 'Fotoğraf seçmek için izin gerekiyor');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPostData({ ...postData, image: result.assets[0].uri });
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Üzgünüz', 'Konum bilgisi için izin gerekiyor');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (address[0]) {
      const locationStr = `${address[0].district}, ${address[0].city}`;
      setPostData({ ...postData, location: locationStr });
    }
  };

  const handleCreatePost = () => {
    if (!postData.content.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      username: 'Ahmet Yılmaz',
      userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      content: postData.content,
      image: postData.image,
      location: postData.location,
      likes: 0,
      comments: [],
      time: 'Şimdi',
      isLiked: false
    };

    setPosts([newPost, ...posts]);
    setIsModalVisible(false);
    setPostData({ content: '', image: null, location: null });
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      username: 'Ahmet Yılmaz',
      userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      content: newComment,
      time: 'Şimdi'
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment]
        };
      }
      return post;
    }));

    setNewComment('');
  };

  const handleShare = (post: Post) => {
    Alert.alert(
      "Paylaş",
      "Bu gönderiyi paylaşmak istediğiniz platformu seçin:",
      [
        { text: "WhatsApp", onPress: () => console.log("WhatsApp Share") },
        { text: "Instagram", onPress: () => console.log("Instagram Share") },
        { text: "Kopyala", onPress: () => console.log("Copy Link") },
        { text: "İptal", style: "cancel" }
      ]
    );
  };

  const renderComments = (post: Post) => {
    if (isCommentsVisible !== post.id) return null;

    return (
      <View style={styles.commentsContainer}>
        {post.comments.map(comment => (
          <View key={comment.id} style={styles.commentItem}>
            <Image source={{ uri: comment.userImage }} style={styles.commentUserImage} />
            <View style={styles.commentContent}>
              <Text style={styles.commentUsername}>{comment.username}</Text>
              <Text style={styles.commentText}>{comment.content}</Text>
              <Text style={styles.commentTime}>{comment.time}</Text>
            </View>
          </View>
        ))}
        <View style={styles.addCommentContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Yorum yaz..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity 
            style={styles.sendCommentButton}
            onPress={() => handleAddComment(post.id)}
          >
            <Ionicons name="send" size={24} color="#2E7D32" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.createPostCard}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' }}
          style={styles.userAvatar}
        />
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.createButtonText}>Neler yetiştiriyorsun?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoButton}>
          <Ionicons name="camera" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.postList}>
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <View style={styles.postHeader}>
              <Image source={{ uri: post.userImage }} style={styles.userImage} />
              <View>
                <Text style={styles.username}>{post.username}</Text>
                <Text style={styles.time}>{post.time}</Text>
              </View>
            </View>

            <Text style={styles.content}>{post.content}</Text>
            
            {post.location && (
              <View style={styles.postLocationContainer}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.postLocationText}>{post.location}</Text>
              </View>
            )}

            {post.image && (
              <Image source={{ uri: post.image }} style={styles.postImage} />
            )}

            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleLike(post.id)}
              >
                <Ionicons 
                  name={post.isLiked ? "heart" : "heart-outline"} 
                  size={24} 
                  color={post.isLiked ? "#e74c3c" : "#666"} 
                />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => setIsCommentsVisible(
                  isCommentsVisible === post.id ? null : post.id
                )}
              >
                <Ionicons name="chatbubble-outline" size={24} color="#666" />
                <Text style={styles.actionText}>{post.comments.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleShare(post)}
              >
                <Ionicons name="share-outline" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {renderComments(post)}
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Gönderi Oluştur</Text>
              <TouchableOpacity 
                onPress={() => {
                  setIsModalVisible(false);
                  setPostData({ content: '', image: null, location: null });
                }}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.userInfo}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' }}
                  style={styles.modalUserAvatar}
                />
                <Text style={styles.userName}>Ahmet Yılmaz</Text>
              </View>

              <TextInput
                style={styles.postInput}
                placeholder="Düşüncelerini paylaş..."
                multiline
                numberOfLines={4}
                value={postData.content}
                onChangeText={(text) => setPostData({ ...postData, content: text })}
              />

              {postData.image && (
                <View style={styles.selectedImageContainer}>
                  <Image 
                    source={{ uri: postData.image }} 
                    style={styles.selectedImage} 
                  />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={() => setPostData({ ...postData, image: null })}
                  >
                    <Ionicons name="close-circle" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}

              {postData.location && (
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={20} color="#2E7D32" />
                  <Text style={styles.locationText}>{postData.location}</Text>
                  <TouchableOpacity 
                    onPress={() => setPostData({ ...postData, location: null })}
                  >
                    <Ionicons name="close-circle" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.attachments}>
                <TouchableOpacity 
                  style={styles.attachmentButton}
                  onPress={pickImage}
                >
                  <Ionicons name="camera" size={24} color="#2E7D32" />
                  <Text style={styles.attachmentText}>Fotoğraf</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.attachmentButton}
                  onPress={getLocation}
                >
                  <Ionicons name="location" size={24} color="#2E7D32" />
                  <Text style={styles.attachmentText}>Konum</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={[
                  styles.shareButton,
                  !postData.content && styles.shareButtonDisabled
                ]}
                onPress={handleCreatePost}
                disabled={!postData.content}
              >
                <Text style={styles.shareButtonText}>Paylaş</Text>
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
  createPostCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    marginRight: 12,
  },
  createButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 25,
    marginRight: 12,
  },
  createButtonText: {
    color: '#666',
    fontSize: 16,
    paddingLeft: 5,
  },
  photoButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
  },
  postList: {
    flex: 1,
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
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    padding: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  postInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  attachments: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  attachmentText: {
    marginLeft: 5,
    color: '#2E7D32',
    fontWeight: '600',
  },
  shareButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  shareButtonDisabled: {
    backgroundColor: '#ccc',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  commentsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    padding: 10,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  commentUserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendCommentButton: {
    padding: 5,
  },
  selectedImageContainer: {
    marginBottom: 15,
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  locationText: {
    flex: 1,
    marginLeft: 8,
    color: '#444',
    fontSize: 14,
  },
  postLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  postLocationText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 5,
  },
}); 