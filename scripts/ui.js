import { calcAccuracy, calcWPM, formatDate, formatTime } from './stats.js';

const GAUGE_MAX = 150;
const GAUGE_REDLINE = 120;

const el = {
  wordTrack: document.getElementById('wordTrack'),
  wordStream: document.getElementById('wordStream'),
  progressFill: document.getElementById('progressFill'),
  runStatus: document.getElementById('runStatus'),
  wpmValue: document.getElementById('wpmValue'),
  wpmNeedle: document.getElementById('wpmNeedle'),
  accuracyValue: document.getElementById('accuracyValue'),
  timeValue: document.getElementById('timeValue'),
  resultModal: document.getElementById('resultModal'),
  resultStats: document.getElementById('resultStats'),
  logBody: document.getElementById('logBody'),
  logSection: document.getElementById('logSection')
};

function buildCharSpans(word) {
  return [...word].map((character) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = character;
    return span;
  });
}

export function buildWordStream(wordList, currentWordIndex = 0) {
  const fragment = document.createDocumentFragment();
  wordList.forEach((word, index) => {
    const wordElement = document.createElement('span');
    wordElement.className = 'word';
    wordElement.dataset.wordIndex = String(index);
    if (index === currentWordIndex) {
      wordElement.classList.add('word--current');
      wordElement.append(...buildCharSpans(word));
    } else {
      wordElement.textContent = word;
    }
    fragment.append(wordElement);
  });
  el.wordTrack.replaceChildren(fragment);
  requestAnimationFrame(() => scrollToCurrentWord(currentWordIndex));
}

export function markChar(charIndex, isCorrect, typedCharacter, wordLength) {
  const currentWord = el.wordTrack.querySelector('.word--current');
  if (!currentWord) return;
  if (charIndex < wordLength) {
    const character = currentWord.children[charIndex];
    character?.classList.add(isCorrect ? 'char--correct' : 'char--incorrect');
  } else {
    const overflow = document.createElement('span');
    overflow.className = 'char char--incorrect char--overflow';
    overflow.textContent = typedCharacter;
    currentWord.append(overflow);
  }
}

export function removeChar(charIndex, wordLength) {
  const currentWord = el.wordTrack.querySelector('.word--current');
  if (!currentWord) return;
  if (charIndex >= wordLength) {
    currentWord.querySelectorAll('.char--overflow').item(charIndex - wordLength)?.remove();
  } else {
    currentWord.children[charIndex]?.classList.remove('char--correct', 'char--incorrect');
  }
}

export function setCaret(charIndex, wordLength) {
  const currentWord = el.wordTrack.querySelector('.word--current');
  if (!currentWord) return;
  currentWord.classList.remove('word--caret-end');
  currentWord.querySelectorAll('.char--caret').forEach((node) => node.classList.remove('char--caret'));
  const target = currentWord.children[charIndex];
  if (target) target.classList.add('char--caret');
  else if (charIndex >= wordLength) currentWord.classList.add('word--caret-end');
}

export function advanceWord(wordList, previousIndex, newIndex, completedCorrectly) {
  const previous = el.wordTrack.querySelector(`[data-word-index="${previousIndex}"]`);
  if (previous) {
    previous.className = `word word--done${completedCorrectly ? '' : ' word--missed'}`;
    previous.textContent = wordList[previousIndex];
  }

  const next = el.wordTrack.querySelector(`[data-word-index="${newIndex}"]`);
  if (next) {
    next.className = 'word word--current';
    next.replaceChildren(...buildCharSpans(wordList[newIndex]));
  }
  requestAnimationFrame(() => scrollToCurrentWord(newIndex));
}

function scrollToCurrentWord(index) {
  const current = el.wordTrack.children[index];
  if (!current) return;
  const centeredOffset = (el.wordStream.clientWidth - current.offsetWidth) / 2 - current.offsetLeft;
  el.wordTrack.style.transform = `translateX(${centeredOffset}px)`;
}

export function updateProgress(currentWordIndex, total) {
  const percentage = total > 0 ? Math.min(100, (currentWordIndex / total) * 100) : 0;
  el.progressFill.style.width = `${percentage}%`;
}

export function updateStats(gameState, now) {
  const wpm = calcWPM(gameState.correctKeystrokes, gameState.startTime, now);
  const accuracy = calcAccuracy(gameState.correctKeystrokes, gameState.totalKeystrokes);
  const elapsed = gameState.startTime ? now - gameState.startTime : 0;
  el.wpmValue.textContent = String(wpm);
  el.accuracyValue.textContent = `${accuracy}%`;
  el.timeValue.textContent = formatTime(elapsed);
  const rotation = -180 + (Math.min(wpm, GAUGE_MAX) / GAUGE_MAX) * 180;
  el.wpmNeedle.style.setProperty('--rotation', `${rotation}deg`);
  el.wpmNeedle.classList.toggle('gauge__needle--redline', wpm >= GAUGE_REDLINE);
  return wpm;
}

export function resetGaugeAndStats() {
  el.wpmValue.textContent = '0';
  el.accuracyValue.textContent = '100%';
  el.timeValue.textContent = '0:00';
  el.wpmNeedle.style.setProperty('--rotation', '-180deg');
  el.wpmNeedle.classList.remove('gauge__needle--redline');
  el.progressFill.style.width = '0%';
  setStatus('Start typing when ready.');
}

export function setStatus(message, tone = 'neutral') {
  el.runStatus.textContent = message;
  el.runStatus.dataset.tone = tone;
}

export function flashCurrentWord() {
  const current = el.wordTrack.querySelector('.word--current');
  if (!current) return;
  current.classList.remove('word--rejected');
  void current.offsetWidth;
  current.classList.add('word--rejected');
}

function addResult(label, value) {
  const wrapper = document.createElement('div');
  wrapper.className = 'modal__stat';
  const term = document.createElement('dt');
  const description = document.createElement('dd');
  term.textContent = label;
  description.textContent = value;
  wrapper.append(term, description);
  return wrapper;
}

export function showResultModal({ finalWpm, peakWpm, accuracy, timeTakenMs }) {
  el.resultStats.replaceChildren(
    addResult('Final WPM', String(finalWpm)),
    addResult('Peak WPM', String(peakWpm)),
    addResult('Accuracy', `${accuracy}%`),
    addResult('Time', formatTime(timeTakenMs))
  );
  if (!el.resultModal.open) el.resultModal.showModal();
}

export function hideResultModal() {
  if (el.resultModal.open) el.resultModal.close();
}

export function renderLog(history) {
  el.logSection.hidden = history.length === 0;
  const rows = history.map((entry) => {
    const row = document.createElement('tr');
    [formatDate(entry.date), String(entry.wpm), `${entry.accuracy}%`, entry.difficulty.toUpperCase()]
      .forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      });
    return row;
  });
  el.logBody.replaceChildren(...rows);
}

export function focusTypingArea() {
  el.wordStream.focus({ preventScroll: true });
}
