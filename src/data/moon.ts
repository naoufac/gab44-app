// Simple moon phase calculator — no external API needed.
// Uses a well-known synodic month algorithm (John Conway's method adapted).

const SYNODIC_MONTH = 29.53058770576

export type MoonPhase =
  | 'new-moon'
  | 'waxing-crescent'
  | 'first-quarter'
  | 'waxing-gibbous'
  | 'full-moon'
  | 'waning-gibbous'
  | 'last-quarter'
  | 'waning-crescent'

export interface MoonInfo {
  phase: MoonPhase
  label: string
  emoji: string
  age: number // days into cycle
  illumination: number // 0-100
  message: string
}

const PHASE_DATA: Record<MoonPhase, { label: string; emoji: string; message: string }> = {
  'new-moon': { label: 'New Moon', emoji: '\u{1F311}', message: 'Plant seeds. Set intentions. Begin.' },
  'waxing-crescent': { label: 'Waxing Crescent', emoji: '\u{1F312}', message: 'Nurture what you started. Build momentum.' },
  'first-quarter': { label: 'First Quarter', emoji: '\u{1F313}', message: 'Take action. Push through resistance.' },
  'waxing-gibbous': { label: 'Waxing Gibbous', emoji: '\u{1F314}', message: 'Refine and adjust. Almost there.' },
  'full-moon': { label: 'Full Moon', emoji: '\u{1F315}', message: 'Celebrate. Release. Let it shine.' },
  'waning-gibbous': { label: 'Waning Gibbous', emoji: '\u{1F316}', message: 'Share what you learned. Give back.' },
  'last-quarter': { label: 'Last Quarter', emoji: '\u{1F317}', message: 'Let go. Forgive. Make space.' },
  'waning-crescent': { label: 'Waning Crescent', emoji: '\u{1F318}', message: 'Rest. Reflect. Prepare for renewal.' },
}

function moonAge(date: Date): number {
  // Known new moon: Jan 6, 2000 18:14 UTC
  const known = new Date(2000, 0, 6, 18, 14, 0).getTime()
  const diff = date.getTime() - known
  const days = diff / (1000 * 60 * 60 * 24)
  return ((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH
}

function phaseFromAge(age: number): MoonPhase {
  const eighth = SYNODIC_MONTH / 8
  if (age < eighth) return 'new-moon'
  if (age < eighth * 2) return 'waxing-crescent'
  if (age < eighth * 3) return 'first-quarter'
  if (age < eighth * 4) return 'waxing-gibbous'
  if (age < eighth * 5) return 'full-moon'
  if (age < eighth * 6) return 'waning-gibbous'
  if (age < eighth * 7) return 'last-quarter'
  return 'waning-crescent'
}

export function getTodayMoon(): MoonInfo {
  const now = new Date()
  const age = moonAge(now)
  const phase = phaseFromAge(age)
  const data = PHASE_DATA[phase]

  // Rough illumination: 0 at new, 100 at full
  const halfCycle = SYNODIC_MONTH / 2
  const illumination = age <= halfCycle
    ? Math.round((age / halfCycle) * 100)
    : Math.round(((SYNODIC_MONTH - age) / halfCycle) * 100)

  return {
    phase,
    ...data,
    age: Math.round(age * 10) / 10,
    illumination,
  }
}
