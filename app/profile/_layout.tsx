import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          title: 'Profil'
        }}
      />
      <Stack.Screen 
        name="active-listings"
        options={{
          title: 'Aktif İlanlarım',
          headerBackTitle: 'Geri'
        }}
      />
      <Stack.Screen 
        name="listing-history"
        options={{
          title: 'Geçmiş İlanlarım',
          headerBackTitle: 'Geri'
        }}
      />
      <Stack.Screen 
        name="edit"
        options={{
          title: 'Profili Düzenle',
          headerBackTitle: 'Geri'
        }}
      />
      <Stack.Screen 
        name="terms"
        options={{
          title: 'Kullanım Koşulları',
          headerBackTitle: 'Geri'
        }}
      />
    </Stack>
  );
} 