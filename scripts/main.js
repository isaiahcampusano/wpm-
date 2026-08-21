import { handleKeyDown, initGame, resetTest } from './game.js';
import { loadState, state, updateSettings } from './state.js';

const difficultySelect = document.getElementById('difficultySelect');
const wordCountSelect = document.getElementById('wordCountSelect');
const resetButton = document.getElementById('resetButton');
const resultRestartButton = document.getElementById('resultRestartButton');
const resultModal = document.getElementById('resultModal');
const wordStream = document.getElementById('wordStream');

function syncControls() {
  difficultySelect.value = state.settings.difficulty;
  wordCountSelect.value = String(state.settings.wordCount);
}

function handleSettingsChange() {
  updateSettings({
    difficulty: difficultySelect.value,
    wordCount: Number(wordCountSelect.value)
  });
  syncControls();
  resetTest();
}

loadState();
syncControls();
initGame();

window.addEventListener('keydown', handleKeyDown);
difficultySelect.addEventListener('change', handleSettingsChange);
wordCountSelect.addEventListener('change', handleSettingsChange);
resetButton.addEventListener('click', () => resetTest());
resultRestartButton.addEventListener('click', () => resetTest());
wordStream.addEventListener('click', () => wordStream.focus({ preventScroll: true }));
resultModal.addEventListener('cancel', (event) => event.preventDefault());
