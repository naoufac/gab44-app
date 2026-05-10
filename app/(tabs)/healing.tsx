import { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'
import { Ionicons } from '@expo/vector-icons'
import { Card } from '../../src/components/Card'
import { colors, spacing, radius } from '../../src/theme'

const TRACKS = [
  {
    title: 'Deep Healing',
    duration: '10:01',
    description: 'Body scan meditation to release tension and restore inner peace.',
    file: 'track-01-deep-healing',
    color: '#6943e0',
  },
  {
    title: 'Deep Sleep',
    duration: '10:12',
    description: 'Gentle sleep meditation with soft voice and calming silence.',
    file: 'track-02-deep-sleep',
    color: '#0ca8c9',
  },
  {
    title: 'Anxiety Relief',
    duration: '10:17',
    description: 'Box breathing and 5-senses grounding to calm anxiety.',
    file: 'track-03-anxiety-relief',
    color: '#2e9e6a',
  },
  {
    title: 'Abundance',
    duration: '10:54',
    description: 'Powerful abundance affirmations spoken three times for daily listening.',
    file: 'track-04-abundance',
    color: '#d59315',
  },
  {
    title: 'Letting Go',
    duration: '10:11',
    description: 'Guided release and forgiveness meditation.',
    file: 'track-05-letting-go',
    color: '#c4308a',
  },
]

const BASE_URL = 'https://nao00.nchobah.com/healing'

export default function HealingScreen() {
  const [playing, setPlaying] = useState<string | null>(null)
  const [sound, setSound] = useState<Audio.Sound | null>(null)

  async function playTrack(file: string) {
    if (sound) {
      await sound.unloadAsync()
      setSound(null)
    }

    if (playing === file) {
      setPlaying(null)
      return
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: `${BASE_URL}/${file}.mp3` },
        { shouldPlay: true }
      )
      setSound(newSound)
      setPlaying(file)

      newSound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          setPlaying(null)
          setSound(null)
        }
      })
    } catch {
      setPlaying(null)
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Healing Sounds</Text>
      <Text style={styles.subtitle}>10-minute meditations to reset, sleep, heal</Text>

      {TRACKS.map(track => (
        <TouchableOpacity key={track.file} onPress={() => playTrack(track.file)}>
          <Card style={styles.trackCard}>
            <View style={styles.trackRow}>
              <View style={[styles.playBtn, { backgroundColor: track.color + '20' }]}>
                <Ionicons
                  name={playing === track.file ? 'pause' : 'play'}
                  size={24}
                  color={track.color}
                />
              </View>
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{track.title}</Text>
                <Text style={styles.trackDesc}>{track.description}</Text>
                <Text style={[styles.trackDuration, { color: track.color }]}>{track.duration}</Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with love by Naoufal</Text>
        <Text style={styles.footerText}>Free to listen, always</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: 120 },
  title: { fontSize: 32, fontWeight: '800', color: colors.fg },
  subtitle: { fontSize: 16, color: colors.fgDim, marginBottom: spacing.xl },
  trackCard: { marginBottom: spacing.md },
  trackRow: { flexDirection: 'row', alignItems: 'center' },
  playBtn: {
    width: 52, height: 52, borderRadius: 26,
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  trackInfo: { flex: 1 },
  trackTitle: { fontSize: 17, fontWeight: '700', color: colors.fg },
  trackDesc: { fontSize: 13, color: colors.fgDim, marginTop: 4, lineHeight: 18 },
  trackDuration: { fontSize: 12, fontWeight: '600', marginTop: 6 },
  footer: { alignItems: 'center', marginTop: spacing.xl },
  footerText: { fontSize: 13, color: colors.fgMuted },
})
