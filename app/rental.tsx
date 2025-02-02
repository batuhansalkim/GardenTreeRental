import { View, Text, StyleSheet } from 'react-native';

export default function RentalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Kiralama Sayfası</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    color: '#2E7D32',
  },
}); 