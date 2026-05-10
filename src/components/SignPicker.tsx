import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { SIGNS, SIGN_EMOJI, SIGN_DATES, capitalize, type Sign } from '../api/client'
import { colors, radius, spacing } from '../theme'

interface SignPickerProps {
  selected: Sign | null
  onSelect: (sign: Sign) => void
  compact?: boolean
}

export function SignPicker({ selected, onSelect, compact }: SignPickerProps) {
  if (compact) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {SIGNS.map(sign => (
          <TouchableOpacity
            key={sign}
            style={[styles.pill, selected === sign && styles.pillActive]}
            onPress={() => onSelect(sign)}
          >
            <Text style={[styles.pillText, selected === sign && styles.pillTextActive]}>
              {SIGN_EMOJI[sign]} {capitalize(sign)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )
  }

  return (
    <View style={styles.grid}>
      {SIGNS.map(sign => (
        <TouchableOpacity
          key={sign}
          style={[styles.cell, selected === sign && styles.cellActive]}
          onPress={() => onSelect(sign)}
        >
          <Text style={styles.emoji}>{SIGN_EMOJI[sign]}</Text>
          <Text style={[styles.name, selected === sign && styles.nameActive]}>
            {capitalize(sign)}
          </Text>
          <Text style={styles.dates}>{SIGN_DATES[sign]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  cell: {
    width: '30%',
    backgroundColor: colors.bgCard,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
  },
  cellActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  emoji: { fontSize: 28, marginBottom: 4 },
  name: { fontSize: 14, fontWeight: '700', color: colors.fg },
  nameActive: { color: colors.accent },
  dates: { fontSize: 10, color: colors.fgMuted, marginTop: 2 },
  scroll: { paddingVertical: spacing.sm },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.full,
    backgroundColor: colors.bgMuted,
    marginRight: spacing.sm,
  },
  pillActive: {
    backgroundColor: colors.accent,
  },
  pillText: { fontSize: 14, fontWeight: '600', color: colors.fg },
  pillTextActive: { color: colors.fgOnAccent },
})
