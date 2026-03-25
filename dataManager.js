// Thin data layer: re-exports place + quote + event data. Import from here so we can
// later split `places.js` into /data chunks without touching app code again.
import { PLACES, QUOTES, EVENTS } from './places.js';
export { INTENT_HINT_CANONICAL_LIST, INTENT_HINT_VOCAB } from './intentHintsVocab.js';

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
