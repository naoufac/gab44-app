import { useState } from 'react'
import {
  View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity,
  ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Card } from '../../src/components/Card'
import { askCouncil, type CouncilResponse } from '../../src/api/client'
import { colors, spacing, radius } from '../../src/theme'

interface Message {
  role: 'user' | 'council'
  text: string
  steps?: CouncilResponse['council_steps']
  duration_ms?: number
}

export default function CouncilScreen() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [showSteps, setShowSteps] = useState<number | null>(null)

  async function send() {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: q }])
    setLoading(true)

    try {
      const res = await askCouncil(q)
      setMessages(prev => [...prev, {
        role: 'council',
        text: res.final_output,
        steps: res.council_steps,
        duration_ms: res.duration_ms,
      }])
    } catch (e: any) {
      setMessages(prev => [...prev, {
        role: 'council',
        text: 'The council is resting. Try again in a moment.',
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {messages.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>{'\u{1F52E}'}</Text>
            <Text style={styles.emptyTitle}>The Council of nao44</Text>
            <Text style={styles.emptyText}>
              Ask anything. Your question passes through Opus, Mistral, MiniMax, and Minouch —
              four AI minds that debate, then answer as one.
            </Text>
            <View style={styles.suggestions}>
              {[
                "What does today's energy mean for my creative work?",
                "How do I let go of something that no longer serves me?",
                "Give me a 3-card tarot reading for this week",
              ].map((s, i) => (
                <TouchableOpacity key={i} style={styles.suggestionBtn} onPress={() => { setInput(s); }}>
                  <Text style={styles.suggestionText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {messages.map((msg, i) => (
          <View key={i} style={msg.role === 'user' ? styles.userBubble : styles.councilBubble}>
            {msg.role === 'council' && (
              <Text style={styles.councilLabel}>nao44 council</Text>
            )}
            <Text style={msg.role === 'user' ? styles.userText : styles.councilText}>
              {msg.text}
            </Text>
            {msg.steps && msg.steps.length > 0 && (
              <TouchableOpacity onPress={() => setShowSteps(showSteps === i ? null : i)}>
                <Text style={styles.stepsToggle}>
                  {showSteps === i ? 'Hide' : 'Show'} council steps ({msg.steps.length} advisors, {Math.round((msg.duration_ms || 0) / 1000)}s)
                </Text>
              </TouchableOpacity>
            )}
            {showSteps === i && msg.steps?.map((step, j) => (
              <View key={j} style={styles.stepCard}>
                <Text style={styles.stepAdvisor}>
                  {step.advisor} ({Math.round(step.confidence * 100)}% confidence, {Math.round(step.duration_ms / 1000)}s)
                </Text>
                <Text style={styles.stepText}>{step.response}</Text>
              </View>
            ))}
          </View>
        ))}

        {loading && (
          <View style={styles.councilBubble}>
            <Text style={styles.councilLabel}>nao44 council</Text>
            <ActivityIndicator color={colors.violet} />
            <Text style={styles.thinkingText}>The council is deliberating...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input bar */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Ask the council anything..."
          placeholderTextColor={colors.fgMuted}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={send}
          returnKeyType="send"
          editable={!loading}
          multiline
        />
        <TouchableOpacity onPress={send} style={styles.sendBtn} disabled={loading || !input.trim()}>
          <Ionicons name="arrow-up-circle" size={36} color={input.trim() ? colors.accent : colors.fgMuted} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: 20 },
  empty: { alignItems: 'center', paddingTop: 40 },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: 24, fontWeight: '800', color: colors.fg, marginBottom: 8 },
  emptyText: { fontSize: 15, color: colors.fgDim, textAlign: 'center', lineHeight: 22, paddingHorizontal: 20 },
  suggestions: { marginTop: 24, width: '100%' },
  suggestionBtn: {
    backgroundColor: colors.bgCard, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    padding: 14, marginBottom: 10,
  },
  suggestionText: { fontSize: 14, color: colors.fg },
  userBubble: {
    alignSelf: 'flex-end', backgroundColor: colors.accent, borderRadius: radius.lg,
    borderBottomRightRadius: 4, padding: 14, marginBottom: 12, maxWidth: '80%',
  },
  userText: { fontSize: 15, color: colors.fgOnAccent, lineHeight: 22 },
  councilBubble: {
    alignSelf: 'flex-start', backgroundColor: colors.bgCard, borderRadius: radius.lg,
    borderBottomLeftRadius: 4, padding: 16, marginBottom: 12, maxWidth: '90%',
    borderWidth: 1, borderColor: colors.border,
  },
  councilLabel: { fontSize: 11, fontWeight: '700', color: colors.violet, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  councilText: { fontSize: 15, color: colors.fg, lineHeight: 23 },
  thinkingText: { fontSize: 13, color: colors.fgMuted, marginTop: 8 },
  stepsToggle: { fontSize: 12, color: colors.violet, marginTop: 10, fontWeight: '600' },
  stepCard: { marginTop: 8, padding: 10, backgroundColor: colors.bgMuted, borderRadius: radius.sm },
  stepAdvisor: { fontSize: 11, fontWeight: '700', color: colors.fgDim, marginBottom: 4 },
  stepText: { fontSize: 13, color: colors.fg, lineHeight: 19 },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end',
    paddingHorizontal: 12, paddingVertical: 8, paddingBottom: 32,
    backgroundColor: colors.bgCard, borderTopWidth: 1, borderTopColor: colors.border,
  },
  input: {
    flex: 1, backgroundColor: colors.bgMuted, borderRadius: radius.lg,
    paddingHorizontal: 16, paddingVertical: 12, fontSize: 15,
    color: colors.fg, maxHeight: 120, marginRight: 8,
  },
  sendBtn: { paddingBottom: 2 },
})
