import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { Stack } from 'expo-router'
import { Card } from '../../src/components/Card'
import { MAJOR_ARCANA } from '../../src/data/tarot'
import { colors, spacing, radius } from '../../src/theme'

export default function DailyTarotDraw() {
  const [drawn, setDrawn] = useState(false)
  const [card, setCard] = useState(MAJOR_ARCANA[0])
  const [reversed, setReversed] = useState(false)
  const [fadeAnim] = useState(new Animated.Value(0))

  function draw() {
    // Seed today's date for consistent daily draw
    const today = new Date().toISOString().slice(0, 10)
    const seed = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    const idx = seed % MAJOR_ARCANA.length
    const isReversed = (seed * 7) % 3 === 0

    setCard(MAJOR_ARCANA[idx])
    setReversed(isReversed)
    setDrawn(true)

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Daily Card Draw' }} />
      <View style={styles.container}>
        {!drawn ? (
          <View style={styles.center}>
            <Text style={styles.prompt}>Your daily card awaits</Text>
            <Text style={styles.subPrompt}>Tap to reveal today's guidance</Text>
            <TouchableOpacity style={styles.drawBtn} onPress={draw}>
              <Text style={styles.drawBtnText}>Draw Your Card</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Animated.View style={[styles.result, { opacity: fadeAnim }]}>
            <View style={[styles.cardVisual, reversed && styles.cardReversed]}>
              <Text style={styles.cardNum}>{card.number}</Text>
              <Text style={styles.cardName}>{card.name}</Text>
            </View>

            {reversed && (
              <View style={styles.reversedBadge}>
                <Text style={styles.reversedText}>Reversed</Text>
              </View>
            )}

            <Text style={styles.tagline}>{card.tagline}</Text>

            <Card style={{ marginTop: spacing.lg, width: '100%' }}>
              <Text style={styles.guidanceTitle}>Today's Guidance</Text>
              <Text style={styles.guidanceText}>
                {reversed
                  ? `${card.name} reversed invites you to look inward. The energy of "${card.tagline.toLowerCase()}" is asking for reflection rather than action today.`
                  : `${card.name} upright brings the energy of "${card.tagline.toLowerCase()}" into your day. Trust this energy and let it guide your choices.`
                }
              </Text>
              <View style={styles.kwRow}>
                {card.keywords.map((kw, i) => (
                  <View key={i} style={styles.kwPill}>
                    <Text style={styles.kwText}>{kw}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </Animated.View>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  prompt: { fontSize: 28, fontWeight: '800', color: colors.fg, textAlign: 'center' },
  subPrompt: { fontSize: 15, color: colors.fgDim, marginTop: 8, marginBottom: 32 },
  drawBtn: {
    backgroundColor: colors.violet, paddingHorizontal: 32, paddingVertical: 16,
    borderRadius: radius.full,
  },
  drawBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  result: { flex: 1, alignItems: 'center', paddingTop: 40 },
  cardVisual: {
    width: 140, height: 220, borderRadius: radius.lg,
    backgroundColor: colors.violet + '14', borderWidth: 2, borderColor: colors.violet,
    justifyContent: 'center', alignItems: 'center',
  },
  cardReversed: { transform: [{ rotate: '180deg' }] },
  cardNum: { fontSize: 36, fontWeight: '800', color: colors.violet },
  cardName: { fontSize: 14, fontWeight: '700', color: colors.violet, marginTop: 8, textAlign: 'center', paddingHorizontal: 10 },
  reversedBadge: {
    marginTop: 12, backgroundColor: colors.red + '18',
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: radius.full,
  },
  reversedText: { fontSize: 13, fontWeight: '700', color: colors.red },
  tagline: { fontSize: 18, color: colors.fgDim, marginTop: 16, textAlign: 'center', fontStyle: 'italic' },
  guidanceTitle: { fontSize: 16, fontWeight: '700', color: colors.fg, marginBottom: 8 },
  guidanceText: { fontSize: 15, lineHeight: 23, color: colors.fg },
  kwRow: { flexDirection: 'row', gap: 8, marginTop: 14, flexWrap: 'wrap' },
  kwPill: { backgroundColor: colors.violet + '14', paddingHorizontal: 12, paddingVertical: 5, borderRadius: radius.full },
  kwText: { fontSize: 12, fontWeight: '600', color: colors.violet },
})
