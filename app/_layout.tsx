import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { colors } from '../src/theme'

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.fg,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="zodiac/[sign]" options={{ title: 'Sign Details' }} />
        <Stack.Screen name="tarot/[slug]" options={{ title: 'Tarot Card' }} />
        <Stack.Screen name="council/ask" options={{ title: 'Ask the Council' }} />
        <Stack.Screen name="tarot/daily" options={{ title: 'Daily Card Draw' }} />
        <Stack.Screen name="numerology" options={{ title: 'Numerology' }} />
      </Stack>
    </>
  )
}
