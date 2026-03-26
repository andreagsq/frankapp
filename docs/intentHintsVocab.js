/**
 * Canonical intentHints vocabulary + aliases.
 * Use canonical keys in new data; typos and slang in queries still match via aliases.
 *
 * To extend: add one key per intent, with all spellings/synonyms in the array (lowercase).
 */
export const INTENT_HINT_VOCAB = {
  margaritas: ['margarita', 'margaritas', 'margs', 'marg'],
  lunch: ['lunch', 'midday'],
  'tex-mex': ['tex-mex', 'tex mex', 'texmex'],
  'greenhouse patio': ['greenhouse patio', 'greenhouse'],
  patio: ['patio', 'patios', 'beer garden'],
  rooftop: ['rooftop', 'roof deck', 'rooftops'],
  brunch: ['brunch'],
  coffee: ['coffee', 'espresso', 'latte'],
  cocktails: ['cocktail', 'cocktails', 'negroni', 'martini'],
  'natural wine': ['natural wine', 'orange wine'],
  dive: ['dive bar', 'dive'],
  bbq: ['bbq', 'barbecue', 'brisket'],
  tacos: ['taco', 'tacos', 'taqueria'],
  pizza: ['pizza'],
  sushi: ['sushi'],
  ramen: ['ramen'],
  patio_seating: ['outdoor seating', 'outside seating'],
  dogs: ['dog friendly', 'dogs welcome', 'pup'],
  'remote work': ['remote work', 'wfh', 'work from here', 'laptop'],
  'live music': ['live music', 'gig', 'venue'],
  date_night: ['date night', 'date spot'],
  late_night: ['late night', 'late-night', 'after midnight', 'open late', 'midnight'],
  wellness: ['wellness', 'yoga', 'run club'],
  kolaches: ['kolache', 'kolaches'],
  merch: ['merch', 'merchandise'],
  'seasonal drinks': ['seasonal drink', 'seasonal menu', 'seasonal'],
  'lake views': ['lake view', 'lady bird', 'lake austin', 'waterfront'],
  events: ['events', 'movie night', 'lights', 'festival'],
  'local icon': ['local favorite', 'locals love', 'iconic austin'],
  bodega: ['bodega', 'corner store'],
};

/** Canonical labels for copy-paste in insider batches (same strings as keys). */
export const INTENT_HINT_CANONICAL_LIST = Object.keys(INTENT_HINT_VOCAB).sort();

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .trim();
}

/** Map a stored hint (canonical or alias) to its vocab key, or null. */
export function intentHintToCanonical(hint) {
  const h = norm(hint);
  if (!h) return null;
  for (const [canonical, aliases] of Object.entries(INTENT_HINT_VOCAB)) {
    const all = [canonical, ...aliases].map(norm);
    if (all.some((a) => a === h || (a.length > 2 && (h.includes(a) || a.includes(h))))) return canonical;
  }
  return null;
}

/** True if user query matches any alias for this canonical key. */
export function queryMatchesIntentCanonical(ql, canonical) {
  const aliases = INTENT_HINT_VOCAB[canonical];
  if (!aliases) return false;
  const all = [canonical, ...aliases].map(norm);
  return all.some((a) => a.length > 1 && ql.includes(a));
}

/**
 * Score boost from place.intentHints + vocab. Unknown hints still get a small substring match.
 * @param {string} ql - lowercased query
 * @param {{ intentHints?: string[], frank?: string, badge?: string, tags?: string[], chips?: string[] }} p - place
 * @returns {number} points to add
 */
export function scoreIntentHintsMatch(ql, p) {
  let s = 0;
  const hints = p.intentHints || [];
  const seen = new Set();

  for (const raw of hints) {
    const canon = intentHintToCanonical(raw);
    if (canon && !seen.has(canon)) {
      seen.add(canon);
      if (queryMatchesIntentCanonical(ql, canon)) s += 12;
      continue;
    }
    const r = norm(raw);
    if (r && ql.includes(r)) s += 8;
  }

  return s;
}
