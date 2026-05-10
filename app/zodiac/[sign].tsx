import { useState, useEffect, useMemo } from 'react'
import {
  View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity,
} from 'react-native'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router'
import { Card } from '../../src/components/Card'
import {
  getDailyHoroscope, capitalize, SIGNS, SIGN_EMOJI,
  SIGN_DATES, type Sign, type DailyHoroscope,
} from '../../src/api/client'
import { getLocalAllPairs } from '../../src/data/compatibility'
import { colors, spacing, radius } from '../../src/theme'

const ELEMENT_OF: Record<string, string> = {
  aries: 'fire', taurus: 'earth', gemini: 'air', cancer: 'water',
  leo: 'fire', virgo: 'earth', libra: 'air', scorpio: 'water',
  sagittarius: 'fire', capricorn: 'earth', aquarius: 'air', pisces: 'water',
}

const MODALITY_OF: Record<string, string> = {
  aries: 'cardinal', taurus: 'fixed', gemini: 'mutable', cancer: 'cardinal',
  leo: 'fixed', virgo: 'mutable', libra: 'cardinal', scorpio: 'fixed',
  sagittarius: 'mutable', capricorn: 'cardinal', aquarius: 'fixed', pisces: 'mutable',
}

const RULER_OF: Record<string, string> = {
  aries: 'Mars', taurus: 'Venus', gemini: 'Mercury', cancer: 'Moon',
  leo: 'Sun', virgo: 'Mercury', libra: 'Venus', scorpio: 'Pluto',
  sagittarius: 'Jupiter', capricorn: 'Saturn', aquarius: 'Uranus', pisces: 'Neptune',
}

const ELEMENT_COLOR: Record<string, string> = {
  fire: colors.fire, earth: colors.earth, air: colors.air, water: colors.water,
}

export default function SignDetail() {
  const { sign } = useLocalSearchParams<{ sign: string }>()
  const s = sign as Sign
  const router = useRouter()
  const [horoscope, setHoroscope] = useState<DailyHoroscope | null>(null)
  const [loading, setLoading] = useState(true)

  const matches = useMemo(() => {
    if (!s) return []
    return getLocalAllPairs(s).slice(0, 3)
  }, [s])

  useEffect(() => {
    if (!s) return
    getDailyHoroscope(s)
      .then(setHoroscope)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [s])

  if (!s) return null

  const el = ELEMENT_OF[s] || 'fire'
  const elColor = ELEMENT_COLOR[el] || colors.accent

  return (
    <>
      <Stack.Screen options={{ title: `${SIGN_EMOJI[s]} ${capitalize(s)}` }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>{SIGN_EMOJI[s]}</Text>
          <Text style={styles.heroName}>{capitalize(s)}</Text>
          <Text style={styles.heroDates}>{SIGN_DATES[s]}</Text>
        </View>

        {/* Quick facts */}
        <View style={styles.factsRow}>
          <View style={[styles.factPill, { backgroundColor: elColor + '18' }]}>
            <Text style={[styles.factLabel, { color: elColor }]}>{capitalize(el)}</Text>
          </View>
          <View style={styles.factPill}>
            <Text style={styles.factLabel}>{capitalize(MODALITY_OF[s])}</Text>
          </View>
          <View style={styles.factPill}>
            <Text style={styles.factLabel}>{RULER_OF[s]}</Text>
          </View>
        </View>

        {/* Today's reading */}
        {loading ? (
          <ActivityIndicator color={colors.accent} style={{ marginTop: 40 }} />
        ) : horoscope ? (
          <Card featured style={{ marginTop: spacing.lg }}>
            <Text style={styles.sectionTitle}>Today's Reading</Text>
            <Text style={styles.readingText}>{horoscope.text}</Text>
          </Card>
        ) : null}

        {/* Top matches */}
        {matches.length > 0 && (
          <View style={{ marginTop: spacing.xl }}>
            <Text style={styles.sectionTitle}>Top Matches</Text>
            {matches.map((m, i) => (
              <TouchableOpacity key={i} onPress={() => router.push(`/zodiac/${m.other}`)}>
                <Card style={{ marginTop: spacing.sm }}>
                  <Text style={styles.matchTitle}>
                    {SIGN_EMOJI[m.other]} {capitalize(m.other)}
                  </Text>
                  <Text style={styles.matchText}>{m.text}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Other signs */}
        <View style={{ marginTop: spacing.xl }}>
          <Text style={styles.sectionTitle}>Other Signs</Text>
          <View style={styles.otherGrid}>
            {SIGNS.filter(o => o !== s).map(o => (
              <TouchableOpacity key={o} style={styles.otherCell} onPress={() => router.push(`/zodiac/${o}`)}>
                <Text style={styles.otherEmoji}>{SIGN_EMOJI[o]}</Text>
                <Text style={styles.otherName}>{capitalize(o)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: 120 },
  hero: { alignItems: 'center', paddingVertical: spacing.xl },
  heroEmoji: { fontSize: 64 },
  heroName: { fontSize: 36, fontWeight: '800', color: colors.fg, marginTop: 8 },
  heroDates: { fontSize: 15, color: colors.fgDim, marginTop: 4 },
  factsRow: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
  factPill: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: radius.full,
    backgroundColor: colors.bgMuted,
  },
  factLabel: { fontSize: 13, fontWeight: '600', color: colors.fg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.fg, marginBottom: 8 },
  readingText: { fontSize: 17, lineHeight: 26, color: colors.fg },
  matchTitle: { fontSize: 16, fontWeight: '700', color: colors.accent2, marginBottom: 6 },
  matchText: { fontSize: 14, lineHeight: 21, color: colors.fg },
  otherGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: spacing.sm },
  otherCell: {
    width: '22%', backgroundColor: colors.bgCard, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border, padding: 10, alignItems: 'center',
  },
  otherEmoji: { fontSize: 22 },
  otherName: { fontSize: 11, fontWeight: '600', color: colors.fg, marginTop: 4 },
})
