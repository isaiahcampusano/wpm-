export function createPassageRunState(passage = null) {
  return {
    passage,
    currentIndex: 0,
    typedText: '',
    correctKeystrokes: 0,
    totalKeystrokes: 0,
    startedAt: null,
    finishedAt: null,
    errorChar: null
  };
}

export function typeCharacter(runState, character, now = Date.now()) {
  if (!runState.passage || runState.finishedAt !== null || typeof character !== 'string' || [...character].length !== 1) {
    return { accepted: false, correct: false, finished: runState.finishedAt !== null };
  }

  if (runState.startedAt === null) runState.startedAt = now;
  runState.totalKeystrokes += 1;
  runState.typedText += character;

  // Once an error is visible, printable input remains locked out until Backspace.
  if (runState.errorChar !== null) {
    runState.errorChar = character;
    return { accepted: true, correct: false, finished: false };
  }

  const expected = runState.passage.text[runState.currentIndex];
  if (character !== expected) {
    runState.errorChar = character;
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
  if (runState.finishedAt !== null || runState.errorChar === null) return false;
  runState.errorChar = null;
  return true;
}
