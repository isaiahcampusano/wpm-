import test from 'node:test';
import assert from 'node:assert/strict';
import { backspace, createPassageRunState, typeCharacter } from '../scripts/passageRun.js';
import { calcAccuracy, calcWPM } from '../scripts/stats.js';

const passage = Object.freeze({ text: 'A, b.' });

test('a correct character advances and increments both counters', () => {
  const run = createPassageRunState(passage);
  assert.deepEqual(typeCharacter(run, 'A', 1_000), { accepted: true, correct: true, finished: false });
  assert.equal(run.currentIndex, 1);
  assert.equal(run.correctKeystrokes, 1);
  assert.equal(run.totalKeystrokes, 1);
  assert.equal(run.typedText, 'A');
});

test('an incorrect character starts the timer, counts, and locks progress', () => {
  const run = createPassageRunState(passage);
  typeCharacter(run, 'x', 2_000);
  assert.equal(run.startedAt, 2_000);
  assert.equal(run.currentIndex, 0);
  assert.equal(run.correctKeystrokes, 0);
  assert.equal(run.totalKeystrokes, 1);
  assert.equal(run.errorChar, 'x');

  typeCharacter(run, 'y', 2_100);
  assert.equal(run.currentIndex, 0);
  assert.equal(run.totalKeystrokes, 2);
  assert.equal(run.errorChar, 'y');
});

test('Backspace clears only a current error and allows retry at the same index', () => {
  const run = createPassageRunState(passage);
  typeCharacter(run, 'x', 1_000);
  assert.equal(backspace(run), true);
  assert.equal(run.currentIndex, 0);
  assert.equal(run.errorChar, null);
  typeCharacter(run, 'A', 1_100);
  assert.equal(run.currentIndex, 1);
  assert.equal(backspace(run), false);
  assert.equal(run.currentIndex, 1);
});

test('spaces and punctuation must match exactly', () => {
  const run = createPassageRunState(passage);
  typeCharacter(run, 'A', 1_000);
  typeCharacter(run, ' ', 1_010);
  assert.equal(run.currentIndex, 1);
  assert.equal(run.errorChar, ' ');
  backspace(run);
  typeCharacter(run, ',', 1_020);
  typeCharacter(run, 'x', 1_030);
  assert.equal(run.currentIndex, 2);
  assert.equal(run.errorChar, 'x');
  backspace(run);
  typeCharacter(run, ' ', 1_040);
  assert.equal(run.currentIndex, 3);
});

test('startedAt is null before input and set once on the first printable key', () => {
  const run = createPassageRunState(passage);
  assert.equal(run.startedAt, null);
  typeCharacter(run, 'A', 3_000);
  typeCharacter(run, ',', 4_000);
  assert.equal(run.startedAt, 3_000);
});

test('the final correct character finishes exactly once and rejects later input', () => {
  const run = createPassageRunState({ text: 'a' });
  typeCharacter(run, 'a', 5_000);
  assert.equal(run.currentIndex, 1);
  assert.equal(run.finishedAt, 5_000);
  assert.deepEqual(typeCharacter(run, 'b', 6_000), { accepted: false, correct: false, finished: true });
  assert.equal(run.totalKeystrokes, 1);
  assert.equal(run.finishedAt, 5_000);
});

test('completed accuracy retains corrected mistakes and WPM uses correct keys', () => {
  const run = createPassageRunState({ text: 'ab' });
  typeCharacter(run, 'x', 1_000);
  backspace(run);
  typeCharacter(run, 'a', 30_000);
  typeCharacter(run, 'b', 61_000);
  assert.equal(run.finishedAt, 61_000);
  assert.equal(calcAccuracy(run.correctKeystrokes, run.totalKeystrokes), 67);
  assert.equal(calcWPM(run.correctKeystrokes, run.startedAt, run.finishedAt), 0);
  assert.equal(calcWPM(run.totalKeystrokes, run.startedAt, run.finishedAt), 1);
});
