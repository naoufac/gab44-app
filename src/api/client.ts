// Gab44 API client — talks to the Cloudflare Worker backend.
// All content is served from the edge, globally <50ms.

const BASE = 'https://nao00.nchobah.com'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Accept': 'application/json' },
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  return res.json()
}

async function post<T>(path: string, body?: any): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  return res.json()
}

// === Daily horoscope ===

export interface DailyHoroscope {
  sign: string
  date: string
  text: string
  source: string
  cached: boolean
}

export async function getDailyHoroscope(sign: string): Promise<DailyHoroscope> {
  const data = await get<{ ok: boolean } & DailyHoroscope>(`/gab44/daily?sign=${sign}`)
  return data
}

export async function getAllDailyHoroscopes(): Promise<DailyHoroscope[]> {
  const data = await get<{ ok: boolean; signs: DailyHoroscope[]; count: number }>('/gab44/daily')
  return data.signs
}

// === Compatibility ===

export interface CompatPair {
  a: string
  b: string
  text: string
}

export async function getCompatibility(a: string, b: string): Promise<CompatPair> {
  return get<CompatPair>(`/gab44/compatibility.json?a=${a}&b=${b}`)
}

export async function getAllCompatibility(): Promise<CompatPair[]> {
  const data = await get<{ ok: boolean; pairs: CompatPair[] }>('/gab44/compatibility.json')
  return data.pairs
}

// === Tarot ===

export interface TarotCard {
  slug: string
  name: string
  number: number
  tagline: string
  keywords: string[]
  upright: string
  reversed: string
  description: string
}

export async function getAllTarot(): Promise<TarotCard[]> {
  const data = await get<{ ok: boolean; cards: TarotCard[] }>('/gab44/tarot.json')
  return data.cards
}

export async function getTarotCard(slug: string): Promise<TarotCard> {
  const data = await get<{ ok: boolean; card: TarotCard }>(`/gab44/tarot.json?slug=${slug}`)
  return data.card
}

// === Tarot Minor Arcana ===

export interface MinorCard {
  suit: string
  rank: string
  name: string
  keywords: string[]
  upright: string
  reversed: string
}

export async function getAllMinorArcana(): Promise<MinorCard[]> {
  const data = await get<{ ok: boolean; cards: MinorCard[] }>('/gab44/tarot/minor.json')
  return data.cards
}

// === Numerology ===

export interface LifePath {
  number: number
  slug: string
  title: string
  tagline: string
  master: boolean
  strengths: string[]
  challenges: string[]
  description: string
}

export async function getAllLifePaths(): Promise<LifePath[]> {
  const data = await get<{ ok: boolean; profiles: LifePath[] }>('/gab44/numerology.json')
  return data.profiles
}

export async function getLifePathFromDOB(dob: string): Promise<{ life_path: number; profile: LifePath }> {
  return get(`/gab44/numerology.json?dob=${dob}`)
}

// === Elements ===

export interface ElementProfile {
  element: string
  tagline: string
  signs: string[]
  description: string
}

export async function getAllElements(): Promise<ElementProfile[]> {
  const data = await get<{ ok: boolean; elements: ElementProfile[] }>('/gab44/elements.json')
  return data.elements
}

// === Houses ===

export interface HouseProfile {
  number: number
  name: string
  tagline: string
  sign: string
  planet: string
  description: string
}

export async function getAllHouses(): Promise<HouseProfile[]> {
  const data = await get<{ ok: boolean; houses: HouseProfile[] }>('/gab44/houses.json')
  return data.houses
}

// === Aspects ===

export interface Aspect {
  id: string
  name: string
  angle: number
  tagline: string
  description: string
}

export async function getAllAspects(): Promise<Aspect[]> {
  const data = await get<{ ok: boolean; aspects: Aspect[] }>('/gab44/aspects.json')
  return data.aspects
}

// === Glossary ===

export interface GlossaryTerm {
  id: string
  term: string
  definition: string
}

export async function getAllGlossary(): Promise<GlossaryTerm[]> {
  const data = await get<{ ok: boolean; terms: GlossaryTerm[] }>('/gab44/glossary.json')
  return data.terms
}

// === Transits ===

export interface Transit {
  id: string
  name: string
  tagline: string
  description: string
}

export async function getAllTransits(): Promise<Transit[]> {
  const data = await get<{ ok: boolean; transits: Transit[] }>('/gab44/transits.json')
  return data.transits
}

// === Council (AI) ===

export interface CouncilResponse {
  id: string
  input: string
  final_output: string
  council_steps: { advisor: string; response: string; confidence: number; duration_ms: number }[]
  duration_ms: number
}

export async function askCouncil(input: string): Promise<CouncilResponse> {
  return post('/council', { input })
}

// === Health check ===

export async function healthCheck(): Promise<{ ok: boolean; version: string }> {
  return get('/health')
}

export const SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
] as const

export type Sign = typeof SIGNS[number]

export const SIGN_EMOJI: Record<Sign, string> = {
  aries: '\u2648', taurus: '\u2649', gemini: '\u264A', cancer: '\u264B',
  leo: '\u264C', virgo: '\u264D', libra: '\u264E', scorpio: '\u264F',
  sagittarius: '\u2650', capricorn: '\u2651', aquarius: '\u2652', pisces: '\u2653',
}

export const SIGN_DATES: Record<Sign, string> = {
  aries: 'Mar 21 - Apr 19', taurus: 'Apr 20 - May 20', gemini: 'May 21 - Jun 20',
  cancer: 'Jun 21 - Jul 22', leo: 'Jul 23 - Aug 22', virgo: 'Aug 23 - Sep 22',
  libra: 'Sep 23 - Oct 22', scorpio: 'Oct 23 - Nov 21', sagittarius: 'Nov 22 - Dec 21',
  capricorn: 'Dec 22 - Jan 19', aquarius: 'Jan 20 - Feb 18', pisces: 'Feb 19 - Mar 20',
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
