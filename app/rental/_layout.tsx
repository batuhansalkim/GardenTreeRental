import { Stack } from 'expo-router';

export default function RentalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Kiralık İlanlar',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'İlan Detayı',
        }}
      />
    </Stack>
  );
} 