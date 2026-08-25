import { handleKeyDown, initGame, resetTest } from './game.js';
import { loadState, state, updateSettings } from './state.js';

const difficultySelect = document.getElementById('difficultySelect');
const passageLengthSelect = document.getElementById('passageLengthSelect');
const resetButton = document.getElementById('resetButton');
const resultRestartButton = document.getElementById('resultRestartButton');
const resultModal = document.getElementById('resultModal');
const passageStream = document.getElementById('passageStream');

function syncControls() {
  difficultySelect.value = state.settings.difficulty;
  passageLengthSelect.value = state.settings.lengthBand;
}

function handleSettingsChange() {
  updateSettings({
    difficulty: difficultySelect.value,
    lengthBand: passageLengthSelect.value
  });
  syncControls();
  resetTest();
}

loadState();
syncControls();
initGame();

window.addEventListener('keydown', handleKeyDown);
difficultySelect.addEventListener('change', handleSettingsChange);
passageLengthSelect.addEventListener('change', handleSettingsChange);
resetButton.addEventListener('click', () => resetTest());
resultRestartButton.addEventListener('click', () => resetTest());
passageStream.addEventListener('click', () => passageStream.focus({ preventScroll: true }));
resultModal.addEventListener('cancel', (event) => event.preventDefault());
