import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const USER_DATA = {
  name: 'Ahmet Yılmaz',
  email: 'ahmet@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  stats: {
    trees: 3,
    gardens: 1,
    ratings: 4.8
  }
};

const MENU_ITEMS = [
  {
    icon: 'leaf',
    title: 'Kiraladıklarım',
    badge: '4'
  },
  {
    icon: 'heart',
    title: 'Favorilerim',
    badge: '6'
  },
  {
    icon: 'notifications',
    title: 'Bildirimler',
    badge: '2'
  },
  {
    icon: 'settings',
    title: 'Ayarlar'
  },
  {
    icon: 'help-circle',
    title: 'Yardım'
  }
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: USER_DATA.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{USER_DATA.name}</Text>
        <Text style={styles.email}>{USER_DATA.email}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{USER_DATA.stats.trees}</Text>
          <Text style={styles.statLabel}>Ağaç</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{USER_DATA.stats.gardens}</Text>
          <Text style={styles.statLabel}>Bahçe</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{USER_DATA.stats.ratings}</Text>
          <Text style={styles.statLabel}>Puan</Text>
        </View>
      </View>

      <View style={styles.menu}>
        {MENU_ITEMS.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={24} color="#2E7D32" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <View style={styles.menuItemRight}>
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    color: '#666',
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    color: '#666',
    marginTop: 5,
  },
  menu: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
}); 