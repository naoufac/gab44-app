import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import { Stack } from 'expo-router'
import { Card } from '../src/components/Card'
import { colors, spacing, radius } from '../src/theme'

export default function AboutScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'About Gab44' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.logo}>gab44</Text>
          <Text style={styles.tagline}>astrology with soul</Text>
          <Text style={styles.version}>v1.0.0</Text>
        </View>

        <Card style={{ marginTop: spacing.xl }}>
          <Text style={styles.sectionTitle}>What is Gab44?</Text>
          <Text style={styles.body}>
            Daily horoscopes, zodiac compatibility, tarot readings, numerology,
            healing meditations, and an AI council that actually listens.
            Built by Naoufal with love from Thailand.
          </Text>
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <Text style={styles.sectionTitle}>The Council</Text>
          <Text style={styles.body}>
            When you ask a question, it passes through four AI minds — nao44 (Opus),
            Mistral, MiniMax, and Minouch — who debate, then answer as one.
            No generic fortune cookie answers. Real guidance.
          </Text>
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <Text style={styles.sectionTitle}>Powered by</Text>
          <Text style={styles.body}>
            Cloudflare Workers (edge-first, globally fast){'\n'}
            MiniMax M2.7 (daily horoscopes){'\n'}
            ElevenLabs (voice readings){'\n'}
            React Native + Expo (this app)
          </Text>
        </Card>

        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() => Linking.openURL('https://gab44.com')}
        >
          <Text style={styles.linkText}>gab44.com</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Made with love. Free to use, always.</Text>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: 120 },
  hero: { alignItems: 'center', paddingTop: 40, paddingBottom: 20 },
  logo: { fontSize: 48, fontWeight: '800', color: colors.fg },
  tagline: { fontSize: 18, color: colors.fgDim, marginTop: 4 },
  version: { fontSize: 12, color: colors.fgMuted, marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.accent2, marginBottom: 8 },
  body: { fontSize: 15, lineHeight: 23, color: colors.fg },
  linkBtn: {
    marginTop: spacing.xl, alignSelf: 'center',
    backgroundColor: colors.accent, paddingHorizontal: 28, paddingVertical: 14,
    borderRadius: radius.full,
  },
  linkText: { color: colors.fgOnAccent, fontSize: 16, fontWeight: '700' },
  footer: { fontSize: 13, color: colors.fgMuted, textAlign: 'center', marginTop: spacing.lg },
})
