// Simple local state — user's sign preference, persisted in AsyncStorage.
import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Sign } from './api/client'

const SIGN_KEY = 'gab44:user_sign'

export function useUserSign() {
  const [sign, setSignState] = useState<Sign | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem(SIGN_KEY).then(v => {
      if (v) setSignState(v as Sign)
      setLoading(false)
    })
  }, [])

  const setSign = useCallback(async (s: Sign) => {
    setSignState(s)
    await AsyncStorage.setItem(SIGN_KEY, s)
  }, [])

  return { sign, setSign, loading }
}
