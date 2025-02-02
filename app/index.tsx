import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Merhaba</Text>
        <Text style={styles.text}>Hoş Geldiniz</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    color: 'black',
    marginVertical: 10,
  },
});
