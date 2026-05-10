import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { colors } from '../theme'

interface LoadingProps {
  message?: string
}

export function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
    padding: 40,
  },
  text: {
    fontSize: 14,
    color: colors.fgMuted,
    marginTop: 16,
  },
})
