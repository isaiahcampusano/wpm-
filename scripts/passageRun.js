export function createPassageRunState(passage = null) {
  return {
    passage,
    currentIndex: 0,
    typedText: '',
    correctKeystrokes: 0,
    totalKeystrokes: 0,
    startedAt: null,
    finishedAt: null,
    errorChar: null,
    lockedAtIndex: null,
    mistakes: []
  };
}

export function getContainingWord(text, index) {
  if (typeof text !== 'string' || !Number.isInteger(index) || index < 0 || index >= text.length) return '';
  let start = index;
  let end = index;
  while (start > 0 && !/\s/u.test(text[start - 1])) start -= 1;
  while (end < text.length && !/\s/u.test(text[end])) end += 1;
  return text.slice(start, end);
}

export function typeCharacter(runState, character, now = Date.now()) {
  if (!runState.passage || runState.finishedAt !== null || typeof character !== 'string' || [...character].length !== 1) {
    return { accepted: false, correct: false, finished: runState.finishedAt !== null };
  }

  // Once an error is visible, printable input remains locked out until Backspace.
  if (runState.lockedAtIndex !== null) {
    return { accepted: false, correct: false, finished: false };
  }

  if (runState.startedAt === null) runState.startedAt = now;
  runState.totalKeystrokes += 1;
  runState.typedText += character;

  const expected = runState.passage.text[runState.currentIndex];
  if (character !== expected) {
    runState.errorChar = character;
    runState.lockedAtIndex = runState.currentIndex;
    runState.mistakes.push({
      expected,
      actual: character,
      word: getContainingWord(runState.passage.text, runState.currentIndex),
      characterIndex: runState.currentIndex
    });
    return { accepted: true, correct: false, finished: false };
  }

  runState.currentIndex += 1;
  runState.correctKeystrokes += 1;
  if (runState.currentIndex === runState.passage.text.length) {
    runState.finishedAt = now;
  }
  return { accepted: true, correct: true, finished: runState.finishedAt !== null };
}

export function backspace(runState) {
  if (runState.finishedAt !== null || runState.lockedAtIndex === null) return false;
  runState.errorChar = null;
  runState.lockedAtIndex = null;
  return true;
}
