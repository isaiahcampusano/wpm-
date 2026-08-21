import { state, pushHistory, resetRunState } from './state.js';
import { buildWordList } from './wordBank.js';
import { calcAccuracy, calcWPM } from './stats.js';
import * as ui from './ui.js';

const IGNORED_KEYS = new Set([
  'Tab', 'Enter', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Escape',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End',
  'PageUp', 'PageDown', 'Insert', 'Delete', 'F1', 'F2', 'F3', 'F4',
  'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
]);

let statsTimer = null;

function stopStatsTimer() {
  if (statsTimer !== null) {
    clearInterval(statsTimer);
    statsTimer = null;
  }
}

export function initGame() {
  resetTest(false);
}

export function resetTest(shouldFocus = true) {
  stopStatsTimer();
  resetRunState();
  state.wordList = buildWordList(state.settings.difficulty, state.settings.wordCount);
  ui.hideResultModal();
  ui.buildWordStream(state.wordList);
  ui.resetGaugeAndStats();
  ui.renderLog(state.history);
  ui.setCaret(0, state.wordList[0]?.length ?? 0);
  if (shouldFocus) ui.focusTypingArea();
}

function ensureStarted() {
  if (state.isActive) return;
  state.isActive = true;
  state.startTime = Date.now();
  ui.setStatus('Telemetry capture active.', 'active');
  statsTimer = setInterval(tickStats, 100);
}

function tickStats() {
  if (!state.isActive || state.isFinished) return;
  const now = Date.now();
  const wpm = ui.updateStats(state, now);
  recordPeakWpm(wpm, now);
}

function recordPeakWpm(wpm, now) {
  // Very short samples create meaningless four-digit spikes. Peak telemetry
  // begins after one second, while final WPM is always included on completion.
  if (state.startTime && now - state.startTime >= 1000) {
    state.peakWpm = Math.max(state.peakWpm, wpm);
  }
}

function handleCharacter(key) {
  ensureStarted();
  const currentWord = state.wordList[state.currentWordIndex];
  const characterIndex = state.currentCharIndex;
  const isCorrect = characterIndex < currentWord.length && key === currentWord[characterIndex];

  state.totalKeystrokes += 1;
  if (isCorrect) state.correctKeystrokes += 1;
  state.typedChars.push(key);
  state.currentCharIndex += 1;

  ui.markChar(characterIndex, isCorrect, key, currentWord.length);
  ui.setCaret(state.currentCharIndex, currentWord.length);
  const now = Date.now();
  const wpm = ui.updateStats(state, now);
  recordPeakWpm(wpm, now);
}

function handleBackspace() {
  if (state.currentCharIndex === 0) return;
  const currentWord = state.wordList[state.currentWordIndex];
  state.currentCharIndex -= 1;
  state.typedChars.pop();
  ui.removeChar(state.currentCharIndex, currentWord.length);
  ui.setCaret(state.currentCharIndex, currentWord.length);
}

function handleSpace() {
  if (state.typedChars.length === 0) {
    ui.setStatus('Type the word before committing it.', 'warning');
    return;
  }

  const previousIndex = state.currentWordIndex;
  const currentWord = state.wordList[previousIndex];
  const isCorrect = state.typedChars.join('') === currentWord;
  const isLastWord = previousIndex === state.wordList.length - 1;

  if (isLastWord && !isCorrect) {
    ui.flashCurrentWord();
    ui.setStatus('Final word rejected — correct it, then press Space.', 'error');
    return;
  }

  const nextIndex = previousIndex + 1;
  ui.updateProgress(nextIndex, state.wordList.length);
  if (isLastWord) {
    ui.advanceWord(state.wordList, previousIndex, nextIndex, true);
    finishTest();
    return;
  }

  state.currentWordIndex = nextIndex;
  state.currentCharIndex = 0;
  state.typedChars = [];
  ui.advanceWord(state.wordList, previousIndex, nextIndex, isCorrect);
  ui.setCaret(0, state.wordList[nextIndex].length);
  ui.setStatus(isCorrect ? 'Word committed.' : 'Word committed with errors.', isCorrect ? 'active' : 'warning');
}

function finishTest() {
  if (state.isFinished) return;
  state.isFinished = true;
  state.isActive = false;
  state.endTime = Date.now();
  stopStatsTimer();

  const finalWpm = calcWPM(state.correctKeystrokes, state.startTime, state.endTime);
  const accuracy = calcAccuracy(state.correctKeystrokes, state.totalKeystrokes);
  const timeTakenMs = Math.max(0, state.endTime - state.startTime);
  const peakWpm = Math.max(state.peakWpm, finalWpm);

  pushHistory({
    wpm: finalWpm,
    accuracy,
    difficulty: state.settings.difficulty,
    date: new Date().toISOString()
  });

  ui.updateStats(state, state.endTime);
  ui.setStatus('Sequence complete. Telemetry archived.', 'complete');
  ui.renderLog(state.history);
  ui.showResultModal({ finalWpm, peakWpm, accuracy, timeTakenMs });
}

export function handleKeyDown(event) {
  const activeElement = document.activeElement;
  if (activeElement && ['INPUT', 'SELECT', 'TEXTAREA'].includes(activeElement.tagName)) return;

  if (state.isFinished) {
    if (event.key === 'Enter') {
      event.preventDefault();
      resetTest();
    }
    return;
  }

  if (event.ctrlKey || event.metaKey || event.altKey || IGNORED_KEYS.has(event.key)) return;

  if (event.key === 'Backspace') {
    event.preventDefault();
    handleBackspace();
  } else if (event.key === ' ') {
    event.preventDefault();
    handleSpace();
  } else if (event.key.length === 1) {
    event.preventDefault();
    handleCharacter(event.key);
  }
}
