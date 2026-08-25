import test from 'node:test';
import assert from 'node:assert/strict';
import { LENGTH_BANDS, PASSAGES, isInLengthBand, selectPassage, wordCount } from '../scripts/passages.js';

test('the local corpus contains 27 complete, attributed public-domain passages', () => {
  assert.equal(PASSAGES.length, 27);
  assert.equal(new Set(PASSAGES.map(({ id }) => id)).size, PASSAGES.length);

  for (const passage of PASSAGES) {
    assert.match(passage.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/u);
    assert.ok(passage.title && passage.author);
    assert.equal(passage.source, 'Project Gutenberg');
    assert.match(passage.sourceUrl, /^https:\/\/www\.gutenberg\.org\//u);
    assert.ok(['easy', 'medium', 'hard'].includes(passage.difficulty));
    assert.ok(wordCount(passage.text) >= 35 && wordCount(passage.text) <= 80);
    assert.equal(passage.text.includes('\n'), false);
  }
});

test('every difficulty and length combination has multiple candidates', () => {
  for (const difficulty of ['easy', 'medium', 'hard']) {
    for (const lengthBand of Object.keys(LENGTH_BANDS)) {
      const matches = PASSAGES.filter((passage) => (
        passage.difficulty === difficulty && isInLengthBand(passage.text, lengthBand)
      ));
      assert.equal(matches.length, 3, `${difficulty}/${lengthBand}`);
    }
  }
});

test('selectPassage only returns the requested difficulty and length', () => {
  const selected = selectPassage(PASSAGES, 'hard', 'short', undefined, () => 0.5);
  assert.equal(selected.difficulty, 'hard');
  assert.equal(isInLengthBand(selected.text, 'short'), true);
});

test('selectPassage avoids the previous passage when an alternative exists', () => {
  const pool = PASSAGES.filter((passage) => passage.difficulty === 'easy' && isInLengthBand(passage.text, 'short'));
  const selected = selectPassage(pool, 'easy', 'short', pool[0].id, () => 0);
  assert.notEqual(selected.id, pool[0].id);
});

test('selectPassage permits repetition when only one candidate exists', () => {
  const only = PASSAGES.find((passage) => passage.difficulty === 'medium' && isInLengthBand(passage.text, 'long'));
  assert.equal(selectPassage([only], 'medium', 'long', only.id, () => 0), only);
});
