import { useState, useEffect } from 'react'
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl, Share,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Card } from '../../src/components/Card'
import { SignPicker } from '../../src/components/SignPicker'
import { useUserSign } from '../../src/store'
import { getDailyHoroscope, capitalize, SIGN_EMOJI, type Sign, type DailyHoroscope } from '../../src/api/client'
import { getTodayMoon } from '../../src/data/moon'
import { colors, spacing, radius } from '../../src/theme'

export default function TodayScreen() {
  const { sign, setSign, loading: signLoading } = useUserSign()
  const [horoscope, setHoroscope] = useState<DailyHoroscope | null>(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function fetchHoroscope(s: Sign) {
    setLoading(true)
    setError(null)
    try {
      const h = await getDailyHoroscope(s)
      setHoroscope(h)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (sign) fetchHoroscope(sign)
  }, [sign])

  async function onRefresh() {
    if (!sign) return
    setRefreshing(true)
    await fetchHoroscope(sign)
    setRefreshing(false)
  }

  if (signLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    )
  }

  // First time — sign picker
  if (!sign) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.welcome}>gab44</Text>
        <Text style={styles.subtitle}>astrology with soul</Text>
        <Text style={styles.prompt}>What's your sign?</Text>
        <SignPicker selected={null} onSelect={setSign} />
      </ScrollView>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandMark}>gab44</Text>
        <Text style={styles.title}>
          {SIGN_EMOJI[sign]} {capitalize(sign)}
        </Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </Text>
      </View>

      {/* Moon phase widget */}
      {(() => {
        const moon = getTodayMoon()
        return (
          <Card style={{ marginBottom: spacing.md }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 36, marginRight: 14 }}>{moon.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: colors.fg }}>{moon.label}</Text>
                <Text style={{ fontSize: 13, color: colors.fgDim, marginTop: 2 }}>{moon.message}</Text>
                <Text style={{ fontSize: 11, color: colors.fgMuted, marginTop: 4 }}>{moon.illumination}% illuminated</Text>
              </View>
            </View>
          </Card>
        )
      })()}

      {/* Sign switcher */}
      <SignPicker selected={sign} onSelect={setSign} compact />

      {/* Daily horoscope */}
      {loading ? (
        <Card style={{ marginTop: spacing.lg }}>
          <ActivityIndicator color={colors.accent} />
          <Text style={styles.loadingText}>Reading the stars...</Text>
        </Card>
      ) : error ? (
        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.errorText}>Could not read the stars right now.</Text>
          <TouchableOpacity onPress={() => fetchHoroscope(sign)} style={styles.retryBtn}>
            <Text style={styles.retryText}>Try again</Text>
          </TouchableOpacity>
        </Card>
      ) : horoscope ? (
        <Card featured style={{ marginTop: spacing.lg }}>
          <Text style={styles.cardTitle}>Today's Reading</Text>
          <Text style={styles.horoscopeText}>{horoscope.text}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <Text style={styles.source}>
              {horoscope.source === 'fallback-pool' ? 'curated' : 'fresh'} reading
            </Text>
            <TouchableOpacity
              onPress={() => Share.share({
                message: `${SIGN_EMOJI[sign]} ${capitalize(sign)} — ${horoscope.date}\n\n${horoscope.text}\n\nvia gab44`,
              })}
              style={{ paddingHorizontal: 14, paddingVertical: 6, backgroundColor: colors.bgMuted, borderRadius: 999 }}
            >
              <Text style={{ fontSize: 12, fontWeight: '600', color: colors.accent }}>Share</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ) : null}

      {/* Quick actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push(`/zodiac/${sign}`)}
        >
          <Text style={styles.actionEmoji}>{SIGN_EMOJI[sign]}</Text>
          <Text style={styles.actionLabel}>My Sign</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push('/tarot/daily')}
        >
          <Text style={styles.actionEmoji}>{'\u{1F0CF}'}</Text>
          <Text style={styles.actionLabel}>Daily Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push('/council/ask')}
        >
          <Text style={styles.actionEmoji}>{'\u{1F52E}'}</Text>
          <Text style={styles.actionLabel}>Ask Council</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: 120 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg },
  welcome: { fontSize: 48, fontWeight: '800', color: colors.fg, textAlign: 'center', marginTop: 60 },
  subtitle: { fontSize: 18, color: colors.fgDim, textAlign: 'center', marginBottom: 40 },
  prompt: { fontSize: 20, fontWeight: '700', color: colors.fg, textAlign: 'center', marginBottom: spacing.lg },
  header: { marginBottom: spacing.md },
  brandMark: { fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: colors.fgMuted, fontWeight: '700' },
  title: { fontSize: 36, fontWeight: '800', color: colors.fg, marginTop: 4 },
  date: { fontSize: 14, color: colors.fgDim, marginTop: 4 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: colors.accent2, marginBottom: 12 },
  horoscopeText: { fontSize: 17, lineHeight: 26, color: colors.fg },
  source: { fontSize: 11, color: colors.fgMuted, marginTop: 12, textTransform: 'uppercase', letterSpacing: 1 },
  loadingText: { fontSize: 14, color: colors.fgMuted, textAlign: 'center', marginTop: 12 },
  errorText: { fontSize: 15, color: colors.fgDim, textAlign: 'center' },
  retryBtn: { marginTop: 12, alignSelf: 'center', backgroundColor: colors.accent, paddingHorizontal: 20, paddingVertical: 10, borderRadius: radius.full },
  retryText: { color: colors.fgOnAccent, fontWeight: '600', fontSize: 14 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: spacing.xl },
  actionBtn: { alignItems: 'center', padding: spacing.md },
  actionEmoji: { fontSize: 32, marginBottom: 6 },
  actionLabel: { fontSize: 12, fontWeight: '600', color: colors.fgDim },
})
