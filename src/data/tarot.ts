// Bundled Major Arcana data — same content Mayor built into the Worker.
// Used until agent/mayor is merged and the /gab44/tarot.json endpoint goes live.

export interface LocalTarotCard {
  slug: string
  name: string
  number: number
  tagline: string
  keywords: string[]
}

export const MAJOR_ARCANA: LocalTarotCard[] = [
  { slug: 'the-fool', name: 'The Fool', number: 0, tagline: 'Leap before the net appears', keywords: ['beginnings', 'innocence', 'spontaneity'] },
  { slug: 'the-magician', name: 'The Magician', number: 1, tagline: 'You already have everything you need', keywords: ['willpower', 'manifestation', 'resourcefulness'] },
  { slug: 'the-high-priestess', name: 'The High Priestess', number: 2, tagline: 'The answer is in the silence', keywords: ['intuition', 'mystery', 'inner knowledge'] },
  { slug: 'the-empress', name: 'The Empress', number: 3, tagline: 'Create, nurture, grow', keywords: ['abundance', 'fertility', 'nature'] },
  { slug: 'the-emperor', name: 'The Emperor', number: 4, tagline: 'Structure is freedom', keywords: ['authority', 'stability', 'control'] },
  { slug: 'the-hierophant', name: 'The Hierophant', number: 5, tagline: 'Tradition has something to teach you', keywords: ['tradition', 'conformity', 'wisdom'] },
  { slug: 'the-lovers', name: 'The Lovers', number: 6, tagline: 'Choose with your whole self', keywords: ['love', 'harmony', 'choices'] },
  { slug: 'the-chariot', name: 'The Chariot', number: 7, tagline: 'Willpower moves mountains', keywords: ['determination', 'triumph', 'direction'] },
  { slug: 'strength', name: 'Strength', number: 8, tagline: 'Gentle power wins', keywords: ['courage', 'patience', 'compassion'] },
  { slug: 'the-hermit', name: 'The Hermit', number: 9, tagline: 'Go inward to go forward', keywords: ['solitude', 'wisdom', 'introspection'] },
  { slug: 'wheel-of-fortune', name: 'Wheel of Fortune', number: 10, tagline: 'This too shall turn', keywords: ['cycles', 'fate', 'change'] },
  { slug: 'justice', name: 'Justice', number: 11, tagline: 'Truth cuts clean', keywords: ['fairness', 'truth', 'accountability'] },
  { slug: 'the-hanged-man', name: 'The Hanged Man', number: 12, tagline: 'Surrender is the strategy', keywords: ['surrender', 'new perspective', 'pause'] },
  { slug: 'death', name: 'Death', number: 13, tagline: 'Endings are doorways', keywords: ['transformation', 'endings', 'release'] },
  { slug: 'temperance', name: 'Temperance', number: 14, tagline: 'Balance is an active practice', keywords: ['balance', 'moderation', 'patience'] },
  { slug: 'the-devil', name: 'The Devil', number: 15, tagline: 'Name what binds you', keywords: ['shadow', 'attachment', 'materialism'] },
  { slug: 'the-tower', name: 'The Tower', number: 16, tagline: 'What falls was never solid', keywords: ['upheaval', 'revelation', 'breakthrough'] },
  { slug: 'the-star', name: 'The Star', number: 17, tagline: 'Hope is not naive', keywords: ['hope', 'renewal', 'serenity'] },
  { slug: 'the-moon', name: 'The Moon', number: 18, tagline: 'Trust what you feel in the dark', keywords: ['illusion', 'fear', 'subconscious'] },
  { slug: 'the-sun', name: 'The Sun', number: 19, tagline: 'Joy is your birthright', keywords: ['joy', 'success', 'vitality'] },
  { slug: 'judgement', name: 'Judgement', number: 20, tagline: 'Answer the call', keywords: ['rebirth', 'reckoning', 'absolution'] },
  { slug: 'the-world', name: 'The World', number: 21, tagline: 'Completion is a beginning', keywords: ['completion', 'integration', 'accomplishment'] },
]
