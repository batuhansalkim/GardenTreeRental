import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const USER_DATA = {
  name: 'Ahmet Yılmaz',
  email: 'ahmet@example.com',
  phone: '+90 555 123 4567',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  memberSince: '2023',
  stats: {
    activeListings: 3,
    completedRentals: 8,
    totalEarnings: 2450,
    rating: 4.8,
  }
};

const MENU_SECTIONS = [
  {
    title: 'İlanlarım',
    items: [
      {
        icon: 'leaf',
        title: 'Aktif İlanlarım',
        badge: '3',
        action: 'activeListings'
      },
      {
        icon: 'time',
        title: 'Geçmiş İlanlarım',
        action: 'listingHistory'
      }
    ]
  },
  {
    title: 'Hesap',
    items: [
      {
        icon: 'person',
        title: 'Kişisel Bilgiler',
        action: 'editProfile'
      },
      {
        icon: 'notifications',
        title: 'Bildirim Ayarları',
        isToggle: true
      }
    ]
  },
  {
    title: 'Diğer',
    items: [
      {
        icon: 'help-circle',
        title: 'Yardım & Destek',
        action: 'support'
      },
      {
        icon: 'document-text',
        title: 'Kullanım Koşulları',
        action: 'terms'
      },
      {
        icon: 'log-out',
        title: 'Çıkış Yap',
        isDestructive: true,
        action: 'logout'
      }
    ]
  }
];

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const router = useRouter();

  const handleMenuPress = (action?: string, isDestructive?: boolean) => {
    if (isDestructive && action === 'logout') {
      Alert.alert(
        "Çıkış Yap",
        "Hesabınızdan çıkış yapmak istediğinize emin misiniz?",
        [
          {
            text: "İptal",
            style: "cancel"
          },
          {
            text: "Çıkış Yap",
            style: 'destructive',
            onPress: () => {
              router.replace('/(tabs)');
            }
          }
        ]
      );
      return;
    }

    switch (action) {
      case 'activeListings':
        router.push('./active-listings');
        break;
      
      case 'listingHistory':
        router.push('./listing-history');
        break;
      
      case 'editProfile':
        router.push('./edit');
        break;
      
      case 'support':
        Alert.alert(
          "Yardım & Destek",
          "Size nasıl yardımcı olabiliriz?",
          [
            {
              text: "E-posta Gönder",
              onPress: () => {
                Linking.openURL('mailto:destek@gardentreerental.com');
              }
            },
            {
              text: "Ara",
              onPress: () => {
                Linking.openURL('tel:+902121234567');
              }
            },
            {
              text: "İptal",
              style: "cancel"
            }
          ]
        );
        break;
      
      case 'terms':
        router.push('./terms');
        break;
    }
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotifications(value);
    Alert.alert(
      value ? 'Bildirimler Açık' : 'Bildirimler Kapalı',
      value ? 'Artık bildirimleri alacaksınız.' : 'Artık bildirim almayacaksınız.'
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profil Başlığı */}
      <View style={styles.header}>
        <Image source={{ uri: USER_DATA.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{USER_DATA.name}</Text>
        <Text style={styles.memberInfo}>Üyelik: {USER_DATA.memberSince}</Text>
      </View>

      {/* İstatistikler */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{USER_DATA.stats.activeListings}</Text>
          <Text style={styles.statLabel}>Aktif İlan</Text>
        </View>
        <View style={[styles.statItem, styles.statBorder]}>
          <Text style={styles.statNumber}>{USER_DATA.stats.completedRentals}</Text>
          <Text style={styles.statLabel}>Kiralama</Text>
        </View>
        <View style={[styles.statItem, styles.statBorder]}>
          <Text style={styles.statNumber}>{USER_DATA.stats.rating}</Text>
          <Text style={styles.statLabel}>Puan</Text>
        </View>
      </View>

      {/* Menü Bölümleri */}
      {MENU_SECTIONS.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => (
            <TouchableOpacity
              key={itemIndex}
              style={[
                styles.menuItem,
                item.isDestructive && styles.destructiveItem
              ]}
              onPress={() => handleMenuPress(item.action, item.isDestructive)}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons 
                  name={item.icon as any} 
                  size={24} 
                  color={item.isDestructive ? '#FF3B30' : '#2E7D32'} 
                />
                <Text style={[
                  styles.menuItemText,
                  item.isDestructive && styles.destructiveText
                ]}>
                  {item.title}
                </Text>
              </View>
              
              {item.isToggle ? (
                <Switch
                  value={notifications}
                  onValueChange={handleNotificationToggle}
                  trackColor={{ false: '#767577', true: '#4CAF50' }}
                  thumbColor={notifications ? '#2E7D32' : '#f4f3f4'}
                />
              ) : item.badge ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              ) : !item.isDestructive && (
                <Ionicons name="chevron-forward" size={20} color="#666" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <Text style={styles.version}>Versiyon 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  memberInfo: {
    color: '#666',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 1,
    padding: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    color: '#666',
    marginTop: 5,
    fontSize: 12,
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 15,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#000',
  },
  badge: {
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  destructiveItem: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  destructiveText: {
    color: '#FF3B30',
  },
  version: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
    fontSize: 12,
  },
}); 