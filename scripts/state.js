const STORAGE_KEY = 'terminalVelocityData';
export const DIFFICULTIES = Object.freeze(['easy', 'medium', 'hard']);
export const WORD_COUNTS = Object.freeze([10, 25, 50]);
export const DEFAULT_SETTINGS = Object.freeze({ difficulty: 'medium', wordCount: 10 });

export const state = {
  wordList: [],
  currentWordIndex: 0,
  currentCharIndex: 0,
  typedChars: [],
  totalKeystrokes: 0,
  correctKeystrokes: 0,
  startTime: null,
  endTime: null,
  isActive: false,
  isFinished: false,
  peakWpm: 0,
  settings: { ...DEFAULT_SETTINGS },
  history: []
};

export function validateSettings(candidate = {}) {
  const difficulty = DIFFICULTIES.includes(candidate.difficulty)
    ? candidate.difficulty
    : DEFAULT_SETTINGS.difficulty;
  const numericCount = Number(candidate.wordCount);
  const wordCount = WORD_COUNTS.includes(numericCount)
    ? numericCount
    : DEFAULT_SETTINGS.wordCount;
  return { difficulty, wordCount };
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

export function resetRunState() {
  Object.assign(state, {
    wordList: [],
    currentWordIndex: 0,
    currentCharIndex: 0,
    typedChars: [],
    totalKeystrokes: 0,
    correctKeystrokes: 0,
    startTime: null,
    endTime: null,
    isActive: false,
    isFinished: false,
    peakWpm: 0
  });
}

export function pushHistory(entry) {
  const nextHistory = sanitizeHistory([entry, ...state.history]);
  state.history = nextHistory;
  saveState();
}

export { STORAGE_KEY };
