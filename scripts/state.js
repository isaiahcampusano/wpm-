import { createPassageRunState } from './passageRun.js';

const STORAGE_KEY = 'terminalVelocityData';
export const DIFFICULTIES = Object.freeze(['easy', 'medium', 'hard']);
export const LENGTH_BANDS = Object.freeze(['short', 'medium', 'long']);
export const DEFAULT_SETTINGS = Object.freeze({ difficulty: 'medium', lengthBand: 'medium' });

export const state = {
  ...createPassageRunState(),
  isActive: false,
  peakWpm: 0,
  previousPassageId: null,
  settings: { ...DEFAULT_SETTINGS },
  history: []
};

export function validateSettings(candidate = {}) {
  const difficulty = DIFFICULTIES.includes(candidate.difficulty)
    ? candidate.difficulty
    : DEFAULT_SETTINGS.difficulty;

  let lengthBand = LENGTH_BANDS.includes(candidate.lengthBand)
    ? candidate.lengthBand
    : null;

  if (!lengthBand && candidate.wordCount !== undefined) {
    // Migrate the three settings used by the word-list version. Unknown legacy
    // values reset to Medium rather than risking an invalid saved selection.
    lengthBand = ({ 10: 'short', 25: 'medium', 50: 'long' })[Number(candidate.wordCount)] ?? null;
  }

  return { difficulty, lengthBand: lengthBand ?? DEFAULT_SETTINGS.lengthBand };
}

function sanitizeHistory(candidate) {
  if (!Array.isArray(candidate)) return [];
  return candidate
    .filter((entry) => {
      if (!entry || typeof entry !== 'object') return false;
      return Number.isFinite(entry.wpm)
        && entry.wpm >= 0
        && Number.isFinite(entry.accuracy)
        && entry.accuracy >= 0
        && entry.accuracy <= 100
        && DIFFICULTIES.includes(entry.difficulty)
        && !Number.isNaN(new Date(entry.date).getTime());
    })
    .slice(0, 20)
    .map((entry) => ({
      wpm: Math.round(entry.wpm),
      accuracy: Math.round(entry.accuracy),
      difficulty: entry.difficulty,
      date: new Date(entry.date).toISOString()
    }));
}

export function updateSettings(patch) {
  state.settings = validateSettings({ ...state.settings, ...patch });
  saveState();
}

export function saveState(storage = globalThis.localStorage) {
  if (!storage) return false;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({
      settings: validateSettings(state.settings),
      history: sanitizeHistory(state.history)
    }));
    return true;
  } catch (error) {
    console.warn('Could not save typing game state:', error);
    return false;
  }
}

export function loadState(storage = globalThis.localStorage) {
  if (!storage) return false;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    state.settings = validateSettings(parsed?.settings);
    state.history = sanitizeHistory(parsed?.history);
    return true;
  } catch (error) {
    state.settings = { ...DEFAULT_SETTINGS };
    state.history = [];
    console.warn('Could not load typing game state:', error);
    return false;
  }
}

export function resetRunState(passage = null) {
  Object.assign(state, createPassageRunState(passage), {
    isActive: false,
    peakWpm: 0
  });
}

export function pushHistory(entry) {
  state.history = sanitizeHistory([entry, ...state.history]);
  saveState();
}

export { STORAGE_KEY };
