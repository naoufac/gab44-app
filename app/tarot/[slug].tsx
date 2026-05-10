import { useState, useEffect } from 'react'
import {
  View, Text, ScrollView, StyleSheet, ActivityIndicator,
} from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'
import { Card } from '../../src/components/Card'
import { getTarotCard, type TarotCard } from '../../src/api/client'
import { colors, spacing, radius } from '../../src/theme'

export default function TarotDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const [card, setCard] = useState<TarotCard | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    getTarotCard(slug)
      .then(setCard)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.violet} />
      </View>
    )
  }

  if (!card) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Card not found</Text>
      </View>
    )
  }

  return (
    <>
      <Stack.Screen options={{ title: card.name }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.numCircle}>
            <Text style={styles.numText}>{card.number}</Text>
          </View>
          <Text style={styles.name}>{card.name}</Text>
          <Text style={styles.tagline}>{card.tagline}</Text>
        </View>

        {/* Keywords */}
        <View style={styles.kwRow}>
          {(card.keywords || []).map((kw, i) => (
            <View key={i} style={styles.kwPill}>
              <Text style={styles.kwText}>{kw}</Text>
            </View>
          ))}
        </View>

        {/* Upright / Reversed */}
        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.dirTitle}>Upright</Text>
          <Text style={styles.dirText}>{card.upright}</Text>
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <Text style={[styles.dirTitle, { color: colors.red }]}>Reversed</Text>
          <Text style={styles.dirText}>{card.reversed}</Text>
        </Card>

        {/* Description */}
        {card.description && (
          <Card style={{ marginTop: spacing.md }}>
            <Text style={styles.descTitle}>The Story</Text>
            <Text style={styles.descText}>{card.description}</Text>
          </Card>
        )}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: 120 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg },
  errorText: { fontSize: 16, color: colors.fgDim },
  hero: { alignItems: 'center', paddingVertical: spacing.xl },
  numCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.violet + '18', justifyContent: 'center', alignItems: 'center',
  },
  numText: { fontSize: 22, fontWeight: '800', color: colors.violet },
  name: { fontSize: 32, fontWeight: '800', color: colors.fg, marginTop: 12 },
  tagline: { fontSize: 16, color: colors.fgDim, marginTop: 6, textAlign: 'center' },
  kwRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  kwPill: {
    backgroundColor: colors.violet + '14', paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: radius.full,
  },
  kwText: { fontSize: 13, fontWeight: '600', color: colors.violet },
  dirTitle: { fontSize: 16, fontWeight: '700', color: colors.green, marginBottom: 8 },
  dirText: { fontSize: 15, lineHeight: 23, color: colors.fg },
  descTitle: { fontSize: 16, fontWeight: '700', color: colors.fg, marginBottom: 8 },
  descText: { fontSize: 15, lineHeight: 23, color: colors.fg },
})
