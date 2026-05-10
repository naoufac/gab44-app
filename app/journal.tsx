import { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { Card } from '../src/components/Card'
import { getJournal, type JournalEntry } from '../src/store'
import { capitalize, SIGN_EMOJI, type Sign } from '../src/api/client'
import { colors, spacing } from '../src/theme'

export default function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([])

  useEffect(() => {
    getJournal().then(setEntries)
  }, [])

  return (
    <>
      <Stack.Screen options={{ title: 'Reading Journal' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your Journal</Text>
        <Text style={styles.subtitle}>Past readings, saved automatically</Text>

        {entries.length === 0 ? (
          <Card style={{ marginTop: spacing.xl }}>
            <Text style={styles.emptyText}>
              No readings saved yet. Go to the Today tab and read your daily horoscope — it'll appear here automatically.
            </Text>
          </Card>
        ) : (
          entries.map((entry, i) => {
            const s = entry.sign as Sign
            const dateStr = new Date(entry.date + 'T12:00:00').toLocaleDateString('en-US', {
              weekday: 'short', month: 'short', day: 'numeric',
            })
            return (
              <Card key={i} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entrySign}>
                    {SIGN_EMOJI[s]} {capitalize(s)}
                  </Text>
                  <Text style={styles.entryDate}>{dateStr}</Text>
                </View>
                <Text style={styles.entryText}>{entry.text}</Text>
              </Card>
            )
          })
        )}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: 120 },
  title: { fontSize: 32, fontWeight: '800', color: colors.fg },
  subtitle: { fontSize: 16, color: colors.fgDim, marginBottom: spacing.lg },
  emptyText: { fontSize: 15, color: colors.fgDim, lineHeight: 22 },
  entryCard: { marginBottom: spacing.sm },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  entrySign: { fontSize: 16, fontWeight: '700', color: colors.accent2 },
  entryDate: { fontSize: 13, color: colors.fgMuted },
  entryText: { fontSize: 15, lineHeight: 23, color: colors.fg },
})
