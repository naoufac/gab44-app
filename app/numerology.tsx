import { useState } from 'react'
import {
  View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native'
import { Stack } from 'expo-router'
import { Card } from '../src/components/Card'
import { colors, spacing, radius } from '../src/theme'

function calcLifePath(dob: string): number {
  const digits = dob.replace(/\D/g, '')
  if (digits.length < 8) return 0
  let sum = 0
  for (const d of digits) sum += parseInt(d)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    let next = 0
    for (const d of String(sum)) next += parseInt(d)
    sum = next
  }
  return sum
}

const LIFE_PATH_INFO: Record<number, { title: string; tagline: string; description: string }> = {
  1: { title: 'The Leader', tagline: 'Independence, ambition, originality', description: 'You are a natural-born leader with a strong desire to be number one. Your independence and drive push you toward innovation and self-reliance. You forge your own path.' },
  2: { title: 'The Diplomat', tagline: 'Cooperation, sensitivity, balance', description: 'You are the peacemaker, the mediator, the one who sees both sides. Your sensitivity to others makes you a natural healer and partner. Harmony is your superpower.' },
  3: { title: 'The Communicator', tagline: 'Creativity, expression, joy', description: 'You are the artist, the entertainer, the one who lights up rooms with words and ideas. Self-expression is your life force. Joy is your compass.' },
  4: { title: 'The Builder', tagline: 'Stability, discipline, hard work', description: 'You are the foundation upon which things are built. Methodical, reliable, grounded. You turn dreams into structures and chaos into order.' },
  5: { title: 'The Freedom Seeker', tagline: 'Adventure, change, versatility', description: 'You are meant to experience life fully \u2014 travel, variety, sensory richness. Routine is your enemy. Freedom is your oxygen.' },
  6: { title: 'The Nurturer', tagline: 'Responsibility, love, service', description: 'You are the caretaker, the one who holds families and communities together. Love and responsibility flow through everything you do.' },
  7: { title: 'The Seeker', tagline: 'Wisdom, introspection, spirituality', description: 'You are the philosopher, the analyst, the one who needs to understand why. Your inner world is vast and your intuition is sharp.' },
  8: { title: 'The Powerhouse', tagline: 'Abundance, authority, achievement', description: 'You are built for material and spiritual abundance. Business, wealth, and influence come naturally when you align your ambition with your values.' },
  9: { title: 'The Humanitarian', tagline: 'Compassion, wisdom, completion', description: 'You see the big picture. Your empathy spans cultures and lifetimes. You are here to give back, to teach, to complete cycles with grace.' },
  11: { title: 'The Intuitive (Master Number)', tagline: 'Illumination, inspiration, idealism', description: 'You carry the energy of spiritual insight and creative vision. You are a channel for higher wisdom, meant to inspire others through your sensitivity and light.' },
  22: { title: 'The Master Builder', tagline: 'Vision, practicality, legacy', description: 'You combine the spiritual insight of 11 with the practical power of 4. You are meant to build things that outlast you \u2014 systems, institutions, movements.' },
  33: { title: 'The Master Teacher', tagline: 'Healing, blessing, selfless service', description: 'The rarest life path. You embody unconditional love and spiritual teaching. Your life is about uplifting others through pure compassion.' },
}

export default function NumerologyScreen() {
  const [dob, setDob] = useState('')
  const [result, setResult] = useState<number | null>(null)

  function calculate() {
    const n = calcLifePath(dob)
    if (n > 0) setResult(n)
  }

  const info = result ? LIFE_PATH_INFO[result] : null

  return (
    <>
      <Stack.Screen options={{ title: 'Numerology Calculator' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Life Path Number</Text>
        <Text style={styles.subtitle}>Enter your birthday to discover your path</Text>

        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.label}>Date of birth</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.fgMuted}
            value={dob}
            onChangeText={setDob}
            keyboardType="numbers-and-punctuation"
            returnKeyType="done"
            onSubmitEditing={calculate}
          />
          <TouchableOpacity style={styles.calcBtn} onPress={calculate}>
            <Text style={styles.calcBtnText}>Calculate</Text>
          </TouchableOpacity>
        </Card>

        {info && result && (
          <Card featured style={{ marginTop: spacing.lg }}>
            <View style={styles.resultHeader}>
              <View style={styles.numCircle}>
                <Text style={styles.numText}>{result}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.resultTitle}>Life Path {result}: {info.title}</Text>
                <Text style={styles.resultTagline}>{info.tagline}</Text>
              </View>
            </View>
            <Text style={styles.resultDesc}>{info.description}</Text>
          </Card>
        )}

        {/* All life paths overview */}
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>All Life Paths</Text>
        {Object.entries(LIFE_PATH_INFO).map(([num, info]) => (
          <Card key={num} style={{ marginTop: spacing.sm }}>
            <View style={styles.overviewRow}>
              <View style={[styles.miniCircle, parseInt(num) > 9 && styles.masterCircle]}>
                <Text style={[styles.miniNum, parseInt(num) > 9 && styles.masterNum]}>{num}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.overviewTitle}>{info.title}</Text>
                <Text style={styles.overviewTag}>{info.tagline}</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: 120 },
  title: { fontSize: 32, fontWeight: '800', color: colors.fg },
  subtitle: { fontSize: 16, color: colors.fgDim, marginBottom: spacing.md },
  label: { fontSize: 14, fontWeight: '600', color: colors.fg, marginBottom: 8 },
  input: {
    backgroundColor: colors.bgMuted, borderRadius: radius.md,
    paddingHorizontal: 16, paddingVertical: 14, fontSize: 18,
    color: colors.fg, fontWeight: '600', textAlign: 'center',
  },
  calcBtn: {
    marginTop: 14, backgroundColor: colors.cyan, paddingVertical: 14,
    borderRadius: radius.full, alignItems: 'center',
  },
  calcBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  resultHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  numCircle: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: colors.cyan + '18',
    justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  numText: { fontSize: 24, fontWeight: '800', color: colors.cyan },
  resultTitle: { fontSize: 18, fontWeight: '700', color: colors.fg },
  resultTagline: { fontSize: 13, color: colors.fgDim, marginTop: 2 },
  resultDesc: { fontSize: 15, lineHeight: 23, color: colors.fg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.fg },
  overviewRow: { flexDirection: 'row', alignItems: 'center' },
  miniCircle: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bgMuted,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  masterCircle: { backgroundColor: colors.amber + '18' },
  miniNum: { fontSize: 14, fontWeight: '700', color: colors.fg },
  masterNum: { color: colors.amber },
  overviewTitle: { fontSize: 15, fontWeight: '700', color: colors.fg },
  overviewTag: { fontSize: 12, color: colors.fgDim, marginTop: 2 },
})
