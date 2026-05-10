import { View, StyleSheet, ViewStyle } from 'react-native'
import { colors, radius, shadow } from '../theme'

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
  featured?: boolean
}

export function Card({ children, style, featured }: CardProps) {
  return (
    <View style={[
      styles.card,
      shadow.sm,
      featured && styles.featured,
      style,
    ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  featured: {
    borderColor: colors.accent,
  },
})
