// Thin data layer: re-exports place + quote + event data. Import from here so we can
// later split `places.js` into /data chunks without touching app code again.
// Self-contained under docs/: places.js + intentHintsVocab.js live next to this file.
// After editing ../../places.js at App Dev root, copy: cp ../../places.js ./places.js (same for intentHintsVocab.js)
import { PLACES, QUOTES, EVENTS } from './places.js?v=20260401';
export { INTENT_HINT_CANONICAL_LIST, INTENT_HINT_VOCAB } from './intentHintsVocab.js?v=20260401';

export { PLACES, QUOTES, EVENTS };

/** All place rows (single table of truth for recommendations). */
export const ALL_PLACES = PLACES;

/** Optional derived buckets for tooling / future filters (not required by the UI). */
export const derived = {
  coffee: () => PLACES.filter(p => p.cat === 'Coffee'),
  cocktails: () => PLACES.filter(p => p.cat === 'Cocktails'),
  dinner: () => PLACES.filter(p => p.cat === 'Dinner'),
  lateNight: () => PLACES.filter(p => p.cat === 'Late Night'),
  quickBite: () => PLACES.filter(p => p.cat === 'Quick Bite'),
  needsQA: () => PLACES.filter(p => p.needsQA === true),
};
