import { state, pushHistory, resetRunState } from './state.js';
import { PASSAGES, selectPassage } from './passages.js';
import { backspace, typeCharacter } from './passageRun.js';
import { calcAccuracy, calcWPM } from './stats.js';
import * as ui from './ui.js';

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
  const previousPassageId = state.passage?.id ?? state.previousPassageId;
  const passage = selectPassage(
    PASSAGES,
    state.settings.difficulty,
    state.settings.lengthBand,
    previousPassageId
  );
  resetRunState(passage);
  state.previousPassageId = passage.id;
  ui.hideResultModal();
  ui.buildPassage(passage);
  ui.renderPassageState(state);
  ui.resetGaugeAndStats();
  ui.renderLog(state.history);
  if (shouldFocus) ui.focusTypingArea();
}

function startStatsTimer() {
  if (state.isActive) return;
  state.isActive = true;
  ui.setStatus('Telemetry capture active.', 'active');
  statsTimer = setInterval(tickStats, 100);
}

function tickStats() {
  if (!state.isActive || state.finishedAt !== null) return;
  const now = Date.now();
  const wpm = ui.updateStats(state, now);
  recordPeakWpm(wpm, now);
}

function recordPeakWpm(wpm, now) {
  // Very short samples create meaningless four-digit spikes. Peak telemetry
  // begins after one second, while final WPM is always included on completion.
  if (state.startedAt && now - state.startedAt >= 1000) {
    state.peakWpm = Math.max(state.peakWpm, wpm);
  }
}

function handleCharacter(key) {
  const now = Date.now();
  const transition = typeCharacter(state, key, now);
  if (!transition.accepted) return;

  startStatsTimer();
  ui.renderPassageState(state);
  ui.updateProgress(state.currentIndex, state.passage.text.length);
  const wpm = ui.updateStats(state, now);
  recordPeakWpm(wpm, now);

  if (!transition.correct) {
    ui.setStatus('Input blocked — press Backspace to clear the error.', 'error');
  } else if (transition.finished) {
    finishTest();
  }
}

function handleBackspace() {
  if (!backspace(state)) return;
  ui.renderPassageState(state);
  ui.setStatus('Error cleared. Retry the highlighted character.', 'active');
}

function finishTest() {
  if (state.finishedAt === null) return;
  state.isActive = false;
  stopStatsTimer();

  const finalWpm = calcWPM(state.correctKeystrokes, state.startedAt, state.finishedAt);
  const accuracy = calcAccuracy(state.correctKeystrokes, state.totalKeystrokes);
  const timeTakenMs = Math.max(0, state.finishedAt - state.startedAt);
  const peakWpm = Math.max(state.peakWpm, finalWpm);

  pushHistory({
    wpm: finalWpm,
    accuracy,
    difficulty: state.settings.difficulty,
    date: new Date().toISOString()
  });

  ui.updateStats(state, state.finishedAt);
  ui.setStatus('Passage complete. Telemetry archived.', 'complete');
  ui.renderLog(state.history);
  ui.showResultModal({ finalWpm, peakWpm, accuracy, timeTakenMs });
}

export function handleKeyDown(event) {
  const activeElement = document.activeElement;
  if (activeElement && ['INPUT', 'SELECT', 'TEXTAREA'].includes(activeElement.tagName)) return;

  if (state.finishedAt !== null) {
    if (event.key === 'Enter') {
      event.preventDefault();
      resetTest();
    }
    return;
  }

  if (event.ctrlKey || event.metaKey || event.altKey) return;

  if (event.key === 'Backspace') {
    event.preventDefault();
    handleBackspace();
  } else if ([...event.key].length === 1) {
    event.preventDefault();
    handleCharacter(event.key);
  }
}
