import { useState, useMemo } from 'react'
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Card } from '../../src/components/Card'
import { SignPicker } from '../../src/components/SignPicker'
import { useUserSign } from '../../src/store'
import { capitalize, SIGN_EMOJI, type Sign } from '../../src/api/client'
import { getLocalAllPairs } from '../../src/data/compatibility'
import { colors, spacing } from '../../src/theme'

export default function ChartScreen() {
  const { sign, setSign } = useUserSign()
  const router = useRouter()

  const matches = useMemo(() => {
    if (!sign) return []
    return getLocalAllPairs(sign)
  }, [sign])

  if (!sign) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>My Chart</Text>
        <Text style={styles.subtitle}>Pick your sign to see compatibility</Text>
        <SignPicker selected={null} onSelect={setSign} />
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>
        {SIGN_EMOJI[sign]} {capitalize(sign)} Compatibility
      </Text>
      <Text style={styles.subtitle}>How you match with every sign</Text>

      <SignPicker selected={sign} onSelect={setSign} compact />

      {matches.map((m, i) => (
        <Card key={i} style={styles.matchCard}>
          <TouchableOpacity onPress={() => router.push(`/zodiac/${m.other}`)}>
            <Text style={styles.matchTitle}>
              {SIGN_EMOJI[sign]} {capitalize(sign)} + {SIGN_EMOJI[m.other]} {capitalize(m.other)}
            </Text>
            <Text style={styles.matchText}>{m.text}</Text>
          </TouchableOpacity>
        </Card>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: 120 },
  title: { fontSize: 28, fontWeight: '800', color: colors.fg },
  subtitle: { fontSize: 15, color: colors.fgDim, marginBottom: spacing.md },
  matchCard: { marginTop: spacing.sm },
  matchTitle: { fontSize: 16, fontWeight: '700', color: colors.accent2, marginBottom: 8 },
  matchText: { fontSize: 15, lineHeight: 23, color: colors.fg },
})
