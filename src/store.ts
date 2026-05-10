// Simple local state — user's sign preference + reading journal, persisted in AsyncStorage.
import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Sign, DailyHoroscope } from './api/client'

const SIGN_KEY = 'gab44:user_sign'
const JOURNAL_KEY = 'gab44:journal'

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

// Journal — save daily readings for looking back
export interface JournalEntry {
  date: string
  sign: string
  text: string
  savedAt: number
}

export async function saveToJournal(horoscope: DailyHoroscope): Promise<void> {
  const raw = await AsyncStorage.getItem(JOURNAL_KEY)
  const entries: JournalEntry[] = raw ? JSON.parse(raw) : []

  // Don't duplicate same date+sign
  const exists = entries.some(e => e.date === horoscope.date && e.sign === horoscope.sign)
  if (exists) return

  entries.unshift({
    date: horoscope.date,
    sign: horoscope.sign,
    text: horoscope.text,
    savedAt: Date.now(),
  })

  // Keep last 90 days
  const trimmed = entries.slice(0, 90)
  await AsyncStorage.setItem(JOURNAL_KEY, JSON.stringify(trimmed))
}

export async function getJournal(): Promise<JournalEntry[]> {
  const raw = await AsyncStorage.getItem(JOURNAL_KEY)
  return raw ? JSON.parse(raw) : []
}
