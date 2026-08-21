import test from 'node:test';
import assert from 'node:assert/strict';
import { EASY_WORDS, HARD_WORDS, MEDIUM_WORDS, buildWordList } from '../scripts/wordBank.js';

test('word banks contain at least 150 unique words in total', () => {
  const allWords = [...EASY_WORDS, ...MEDIUM_WORDS, ...HARD_WORDS];
  assert.ok(EASY_WORDS.length >= 50);
  assert.ok(MEDIUM_WORDS.length >= 50);
  assert.ok(HARD_WORDS.length >= 50);
  assert.equal(new Set(allWords).size, allWords.length);
});

test('buildWordList honors every supported length and difficulty', () => {
  for (const difficulty of ['easy', 'medium', 'hard']) {
    for (const count of [10, 25, 50]) {
      const result = buildWordList(difficulty, count, () => 0.42);
      assert.equal(result.length, count);
      assert.equal(new Set(result).size, count);
    }
  }
});

test('buildWordList falls back to the medium bank for an unknown difficulty', () => {
  const result = buildWordList('impossible', 10, () => 0.5);
  assert.ok(result.every((word) => MEDIUM_WORDS.includes(word)));
});
