// Bundled compatibility data from Mayor's build — same content that will be
// served by the Worker once agent/mayor is merged and deployed.
// This lets the app work immediately while the deploy is pending.

import type { Sign } from '../api/client'

function pairKey(a: string, b: string): string {
  return [a, b].sort().join('+')
}

const PAIRS: Record<string, string> = {
  'aquarius+aquarius': "Two big-brain freedom-lovers, endless ideas, zero one wanting to do dishes \u2014 agree on logistics or you'll philosophize the relationship into the ground.",
  'aquarius+aries': "Aries lights the match, Aquarius designs the rocket \u2014 wildly fun when you're aimed at the same sky, brittle the second one of you tries to lead the other.",
  'aquarius+cancer': "Cancer wants closeness, Aquarius wants air \u2014 works when you stop reading each other's quiet as rejection and start scheduling the connection on purpose.",
  'aquarius+capricorn': "The architect and the visionary \u2014 slow to warm up, quietly devoted once they do; you'll build something that outlasts everyone else's relationship.",
  'aquarius+gemini': "Group-chat soulmates: ideas ricochet, plans stack, sleep suffers \u2014 keep one boring routine in common or you'll forget where you live.",
  'aquarius+leo': "Opposites that orbit \u2014 Leo wants the spotlight, Aquarius wants the experiment; you'll either co-host the best dinner party or co-write the breakup text.",
  'aquarius+libra': "Air-on-air, all theory and aesthetic \u2014 gorgeous together, terrible at conflict; pick a small thing to disagree about weekly so the big things don't ambush you.",
  'aquarius+pisces': "The futurist and the dreamer \u2014 late-night talks that sound like manifestos, but somebody has to remember to pay rent and it's neither of you by default.",
  'aquarius+sagittarius': "Both freedom-coded, both better as travel partners than housemates \u2014 the relationship works as long as nobody confuses 'space' with 'silent treatment'.",
  'aquarius+scorpio': "Two unmovable people who think they're the rational one \u2014 when it works, it's a fortress; when it doesn't, you'll out-stubborn each other for months.",
  'aquarius+taurus': "Slow Taurus, fast Aquarius \u2014 your timelines clash; if you can each respect the other's pace without trying to fix it, this is sneaky-stable.",
  'aquarius+virgo': "Virgo wants the system, Aquarius wants the experiment \u2014 you'll fight about how, agree about why, and quietly become each other's most trusted person.",
  'aries+aries': "Two main characters in one scene \u2014 wildly fun, occasionally combustible; rotate the spotlight or somebody's storming out by Tuesday.",
  'aries+cancer': "Cancer feels everything Aries fires off without thinking \u2014 sweet when Aries softens the delivery and Cancer stops collecting receipts.",
  'aries+capricorn': "The sprinter and the marathoner \u2014 Aries impatient, Capricorn unbothered; you'll either build an empire together or drive each other up the wall.",
  'aries+gemini': "Spark plus spark \u2014 banter is the love language, boredom is the only real enemy; keep introducing each other to new people or new problems.",
  'aries+leo': "Two warm fires \u2014 loud, generous, occasionally competing for the room \u2014 works beautifully if you publicly hype each other instead of secretly keeping score.",
  'aries+libra': "Opposite signs that need each other on purpose \u2014 Aries learns the soft delivery, Libra learns the hard ask; you complete each other's missing skill set.",
  'aries+pisces': "Aries protects, Pisces softens \u2014 risky if Aries gets impatient with the dreaminess, magic if Aries stops trying to fix what doesn't need fixing.",
  'aries+sagittarius': "Two adventurers who don't slow each other down \u2014 wildly fun, big-picture aligned, but somebody has to handle the boring admin and neither of you wants to.",
  'aries+scorpio': "High-voltage chemistry, high-voltage fights \u2014 both ruled by Mars in different ways; respect each other's intensity or you'll burn the house down.",
  'aries+taurus': "Aries pushes, Taurus plants \u2014 slow burn that works once Aries stops mistaking Taurus's stillness for stuckness, and Taurus stops mistaking Aries's speed for chaos.",
  'aries+virgo': "Aries acts, Virgo edits \u2014 perfect operational duo, fragile romance; the secret is letting Virgo plan AND letting Aries break the plan when it matters.",
  'cancer+cancer': "All the feelings, all the snacks, two homebodies whispering about other people's drama \u2014 beautiful if you each schedule one outside friendship per week.",
  'cancer+capricorn': "Opposites that build \u2014 Cancer brings the warmth, Capricorn brings the structure; classic long-haul match if Capricorn doesn't dismiss feelings as inefficient.",
  'cancer+gemini': "Gemini wants to talk it out, Cancer wants to feel it out \u2014 works when Gemini slows down the words and Cancer stops translating tone into rejection.",
  'cancer+leo': "Leo shines, Cancer notices \u2014 sweet pairing if Leo remembers to actually listen back, and Cancer stops getting hurt by the bigness on principle.",
  'cancer+libra': "Two relationship-coded signs that should be incredible \u2014 both avoid hard talks, so the unsaid stuff piles up; pick a weekly time to clear the air on purpose.",
  'cancer+pisces': "Water-on-water, deeply intuitive, low-conflict almost to a fault \u2014 schedule one practical conversation a week or you'll vibe your way past every actual decision.",
  'cancer+sagittarius': "Sag wants to leave, Cancer wants to stay \u2014 works if Sag plans the trip AND the homecoming, and Cancer doesn't read the leaving as not-loving.",
  'cancer+scorpio': "Two water signs that actually understand each other's depths \u2014 loyal as a fortress; the only risk is shutting out the world together until it's just you two.",
  'cancer+taurus': "Soft, slow, stable \u2014 both want a nice meal and a quiet Sunday; one of the few combos where 'nothing dramatic happened this year' is the relationship goal.",
  'cancer+virgo': "Virgo organizes Cancer's chaos with care, Cancer reminds Virgo it's allowed to feel \u2014 classic long-haul love built on small daily acts.",
  'capricorn+capricorn': "Two CEOs trying to date each other \u2014 calendars sync better than feelings; schedule the romance with the same seriousness as the work or it slowly evaporates.",
  'capricorn+gemini': "Capricorn wants depth, Gemini wants variety \u2014 looks mismatched, works surprisingly often if Gemini commits to consistency on the small things.",
  'capricorn+leo': "Leo wants to be admired, Capricorn admires achievement \u2014 alignment is real, but Capricorn has to learn to praise out loud, not just internally approve.",
  'capricorn+libra': "Capricorn decides, Libra weighs \u2014 works if Capricorn slows down to include Libra in the choice instead of just announcing the outcome.",
  'capricorn+pisces': "The architect and the dreamer \u2014 Capricorn builds the container, Pisces fills it with meaning; one of those quiet pairings that turns out to be unbreakable.",
  'capricorn+sagittarius': "Sag's optimism unsettles Capricorn's realism \u2014 works if Capricorn lets Sag plan one impractical thing a month, and Sag respects the boring part of the budget.",
  'capricorn+scorpio': "Two private, ambitious people who actually trust each other \u2014 long-game match; the only watch-out is forgetting to be light with each other on purpose.",
  'capricorn+taurus': "Earth-on-earth \u2014 slow, loyal, deeply built; you'll be the couple everyone else asks for advice from, mostly because nothing dramatic ever happens to you.",
  'capricorn+virgo': "Both quietly perfectionist, both happiest with a project \u2014 schedule actual fun or you'll accidentally turn the relationship into a third job.",
  'gemini+gemini': "Four people in a relationship \u2014 endlessly entertaining, occasionally exhausting; pick one shared ritual that nobody is allowed to overthink.",
  'gemini+leo': "Gemini riffs, Leo performs \u2014 magnetic energy, loud laughs, group-chat legends; just don't mistake constant audience for actual intimacy.",
  'gemini+libra': "Air-on-air, all aesthetics and conversation \u2014 gorgeous together; assign someone to be the responsible one each week or rent quietly goes unpaid.",
  'gemini+pisces': "Gemini explains, Pisces feels \u2014 works when Gemini stops trying to solve Pisces's mood, and Pisces stops translating Gemini's logic as coldness.",
  'gemini+sagittarius': "Opposite signs, same restless engine \u2014 best as travel companions, business partners, or chaos co-conspirators; quiet weekends in are not your strength.",
  'gemini+scorpio': "Surface meets depth \u2014 Gemini skims, Scorpio dives; fascinating when Gemini commits to one conversation longer than 10 minutes.",
  'gemini+taurus': "Taurus wants consistency, Gemini wants novelty \u2014 works when both stop seeing the other's preference as a character flaw.",
  'gemini+virgo': "Both Mercury-ruled, both overthink everything \u2014 you'll analyze each other to death or build the most organized household on the planet.",
  'leo+leo': "Two suns in one sky \u2014 spectacular when you're both shining at different things, a power struggle when you're competing for the same stage.",
  'leo+libra': "Leo performs, Libra applauds \u2014 genuinely sweet as long as Libra gets a turn in the spotlight and Leo returns the compliments.",
  'leo+pisces': "Leo's fire and Pisces's water \u2014 either steam or mist; works when Leo protects Pisces's softness and Pisces admires Leo's strength without flattering.",
  'leo+sagittarius': "Fire-on-fire, adventure-on-adventure \u2014 the couple everyone wants to hang out with; just don't forget to check in when the party stops.",
  'leo+scorpio': "Both fixed, both intense \u2014 loyalty runs deep, but so does the stubbornness; the one who bends first wins the relationship.",
  'leo+taurus': "Two stubborn signs who both want to be right \u2014 works when you divide territory clearly and stop trying to convert each other.",
  'leo+virgo': "Leo wants praise, Virgo gives notes \u2014 friction is built in; the secret is Virgo learning to lead with what works before listing what doesn't.",
  'libra+libra': "Two people-pleasers avoiding the same conversation \u2014 beautiful surface, dangerous silence underneath; one of you has to learn to go first.",
  'libra+pisces': "Both romantics, both avoidant with conflict \u2014 the dream lasts as long as nobody needs to have a hard conversation.",
  'libra+sagittarius': "Sag expands, Libra refines \u2014 great travel chemistry, great party energy; add one shared boring commitment or it stays fun forever but never deepens.",
  'libra+scorpio': "Libra wants harmony, Scorpio wants truth \u2014 works when Scorpio stops testing and Libra stops performing.",
  'libra+taurus': "Both Venus-ruled, both love beauty \u2014 peaceful until someone has to make a hard decision, because neither of you wants to.",
  'libra+virgo': "Virgo critiques, Libra deflects \u2014 functional when you direct your perfectionism outward (a shared project) instead of at each other.",
  'pisces+pisces': "Two dreamers dreaming the same dream \u2014 magic until something practical needs doing; designate one of you as the adult this week.",
  'pisces+sagittarius': "Sag seeks truth out there, Pisces seeks truth inside \u2014 works when you share your different findings instead of arguing about whose search matters more.",
  'pisces+scorpio': "Water-on-water at its deepest \u2014 you understand each other without words; the only risk is losing the rest of the world inside your private universe.",
  'pisces+taurus': "Taurus grounds, Pisces floats \u2014 one of the gentlest matches in the zodiac; keep it gentle on purpose and it outlasts everything louder.",
  'pisces+virgo': "Opposites that heal each other \u2014 Virgo gives structure, Pisces gives meaning; classic complementary pair once you stop trying to fix each other.",
  'sagittarius+sagittarius': "Double freedom, double adventure, double commitment-phobia \u2014 exhilarating when it works, impossible to pin down when it doesn't.",
  'sagittarius+scorpio': "Sag runs light, Scorpio runs deep \u2014 interesting combo if Sag respects the depth and Scorpio respects the need for air.",
  'sagittarius+taurus': "Sag says 'let's go,' Taurus says 'let's stay' \u2014 compromise lives in the middle, but only if you actually want to meet there.",
  'sagittarius+virgo': "Sag leaps, Virgo plans \u2014 annoying in theory, unstoppable in practice if Virgo trusts the leap and Sag appreciates the safety net.",
  'scorpio+scorpio': "All or nothing times two \u2014 the most intense relationship in the zodiac; you'll either merge completely or destroy each other trying.",
  'scorpio+taurus': "Opposite signs, both fixed \u2014 magnetically attracted, dangerously stubborn; the love is real, the standoffs are legendary.",
  'scorpio+virgo': "Both private, both analytical \u2014 a slow build that turns out to be one of the most reliable matches; the trust runs deeper than either admits.",
  'taurus+taurus': "Comfort times two \u2014 the coziest match possible; the only risk is never leaving the house or challenging each other to grow.",
  'taurus+virgo': "Earth-on-earth, practical love \u2014 you'll build a life that works beautifully on paper and feels like home in person.",
  'virgo+virgo': "Two editors editing each other \u2014 works when you direct the perfectionism at a shared mission instead of at each other's flaws.",
}

export function getLocalCompatibility(a: Sign, b: Sign): string {
  const key = pairKey(a, b)
  return PAIRS[key] || `${a} and ${b} have a unique dynamic worth exploring.`
}

export function getLocalAllPairs(sign: Sign): { other: Sign; text: string }[] {
  const allSigns: Sign[] = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces']
  return allSigns
    .filter(s => s !== sign)
    .map(other => ({
      other,
      text: getLocalCompatibility(sign, other),
    }))
}
