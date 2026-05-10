import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter, Stack } from 'expo-router'
import { Card } from '../../src/components/Card'
import { MAJOR_ARCANA } from '../../src/data/tarot'
import { colors, spacing, radius } from '../../src/theme'

const NUMERAL = [
  '0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI',
]

export default function TarotIndex() {
  const router = useRouter()

  return (
    <>
      <Stack.Screen options={{ title: 'Tarot - Major Arcana' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Major Arcana</Text>
        <Text style={styles.subtitle}>22 cards of the soul's journey</Text>

        {MAJOR_ARCANA.map(card => (
          <TouchableOpacity key={card.slug} onPress={() => router.push(`/tarot/${card.slug}`)}>
            <Card style={styles.cardRow}>
              <View style={styles.numBadge}>
                <Text style={styles.numText}>{NUMERAL[card.number]}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{card.name}</Text>
                <Text style={styles.cardTagline}>{card.tagline}</Text>
                <View style={styles.keywords}>
                  {card.keywords.map((kw, i) => (
                    <View key={i} style={styles.kwPill}>
                      <Text style={styles.kwText}>{kw}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: 120 },
  title: { fontSize: 32, fontWeight: '800', color: colors.fg },
  subtitle: { fontSize: 16, color: colors.fgDim, marginBottom: spacing.xl },
  cardRow: { marginBottom: spacing.sm, flexDirection: 'row', alignItems: 'center' },
  numBadge: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.violet + '18', justifyContent: 'center', alignItems: 'center',
    marginRight: 14,
  },
  numText: { fontSize: 14, fontWeight: '800', color: colors.violet },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: '700', color: colors.fg },
  cardTagline: { fontSize: 13, color: colors.fgDim, marginTop: 2 },
  keywords: { flexDirection: 'row', gap: 6, marginTop: 6, flexWrap: 'wrap' },
  kwPill: { backgroundColor: colors.bgMuted, paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.full },
  kwText: { fontSize: 11, color: colors.fgDim },
})
