import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Card } from '../../src/components/Card'
import { SIGNS, SIGN_EMOJI, capitalize } from '../../src/api/client'
import { colors, spacing, radius } from '../../src/theme'

const SECTIONS = [
  {
    title: 'Zodiac Signs',
    subtitle: '12 signs, deep profiles',
    icon: 'star-outline' as const,
    color: colors.accent,
    items: SIGNS.map(s => ({ label: `${SIGN_EMOJI[s]} ${capitalize(s)}`, route: `/zodiac/${s}` })),
  },
  {
    title: 'Tarot',
    subtitle: '22 Major Arcana + 56 Minor',
    icon: 'layers-outline' as const,
    color: colors.violet,
    route: '/tarot/index',
  },
  {
    title: 'Compatibility',
    subtitle: '78 zodiac pair readings',
    icon: 'heart-half-outline' as const,
    color: colors.magenta,
    route: '/(tabs)/chart',
  },
  {
    title: 'Numerology',
    subtitle: 'Life path numbers 1-9 + master numbers',
    icon: 'calculator-outline' as const,
    color: colors.cyan,
    route: '/numerology',
  },
  {
    title: 'Moon Phases',
    subtitle: '8 phases x 12 signs',
    icon: 'moon-outline' as const,
    color: colors.fgDim,
  },
  {
    title: 'Houses',
    subtitle: '12 astrological houses',
    icon: 'home-outline' as const,
    color: colors.green,
  },
  {
    title: 'Retrogrades',
    subtitle: 'Mercury, Venus, Mars & more',
    icon: 'refresh-outline' as const,
    color: colors.amber,
  },
  {
    title: 'Healing Sounds',
    subtitle: 'Guided meditations & crystals',
    icon: 'musical-notes-outline' as const,
    color: colors.water,
    route: '/(tabs)/healing',
  },
]

export default function ExploreScreen() {
  const router = useRouter()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.subtitle}>Your cosmic library</Text>

      {/* Zodiac sign grid */}
      <Text style={styles.sectionTitle}>Zodiac Signs</Text>
      <View style={styles.signGrid}>
        {SIGNS.map(sign => (
          <TouchableOpacity
            key={sign}
            style={styles.signCell}
            onPress={() => router.push(`/zodiac/${sign}`)}
          >
            <Text style={styles.signEmoji}>{SIGN_EMOJI[sign]}</Text>
            <Text style={styles.signName}>{capitalize(sign)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Topic cards */}
      <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>Topics</Text>
      {SECTIONS.slice(1).map((section, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => section.route && router.push(section.route as any)}
          disabled={!section.route}
        >
          <Card style={styles.topicCard}>
            <View style={styles.topicRow}>
              <View style={[styles.iconCircle, { backgroundColor: section.color + '18' }]}>
                <Ionicons name={section.icon} size={24} color={section.color} />
              </View>
              <View style={styles.topicText}>
                <Text style={styles.topicTitle}>{section.title}</Text>
                <Text style={styles.topicSub}>{section.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.fgMuted} />
            </View>
          </Card>
        </TouchableOpacity>
      ))}

      {/* About */}
      <TouchableOpacity
        style={styles.aboutBtn}
        onPress={() => router.push('/about')}
      >
        <Text style={styles.aboutText}>About Gab44</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: 120 },
  title: { fontSize: 32, fontWeight: '800', color: colors.fg },
  subtitle: { fontSize: 16, color: colors.fgDim, marginBottom: spacing.lg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.fg, marginBottom: spacing.md },
  signGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  signCell: {
    width: '22%',
    backgroundColor: colors.bgCard,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    alignItems: 'center',
  },
  signEmoji: { fontSize: 24 },
  signName: { fontSize: 11, fontWeight: '600', color: colors.fg, marginTop: 4 },
  topicCard: { marginBottom: spacing.sm },
  topicRow: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  topicText: { flex: 1 },
  topicTitle: { fontSize: 16, fontWeight: '700', color: colors.fg },
  topicSub: { fontSize: 13, color: colors.fgDim, marginTop: 2 },
  aboutBtn: { marginTop: spacing.xl, alignSelf: 'center', paddingVertical: 12 },
  aboutText: { fontSize: 14, color: colors.fgMuted, fontWeight: '600' },
})
