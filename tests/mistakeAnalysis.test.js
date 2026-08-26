import test from 'node:test';
import assert from 'node:assert/strict';
import {
  aggregateCharacterMistakes,
  aggregateSubstitutions,
  buildInsights,
  buildTargetedRetry,
  findDifficultWords,
  getTechniqueHint
} from '../scripts/mistakeAnalysis.js';

const mistake = (expected, actual, word, characterIndex = 0) => ({ expected, actual, word, characterIndex });
const runs = [
  { id: 'one', completedAt: '2026-08-20T00:00:00Z', mistakes: [mistake('[', 'p', 'array[index]'), mistake('[', 'p', 'array[index]'), mistake('x', 'z', 'extra')] },
  { id: 'two', completedAt: '2026-08-21T00:00:00Z', mistakes: [mistake('[', 'p', 'array[index]'), mistake('x', 'y', 'extra')] }
];

test('aggregates expected characters and substitutions', () => {
  assert.deepEqual(aggregateCharacterMistakes(runs)[0], { char: '[', count: 3 });
  assert.deepEqual(aggregateSubstitutions(runs)[0], { expected: '[', actual: 'p', count: 3 });
});

test('difficult words count distinct affected runs', () => {
  assert.deepEqual(findDifficultWords(runs), [
    { word: 'array[index]', affectedRuns: 2, totalMistakes: 3 },
    { word: 'extra', affectedRuns: 2, totalMistakes: 2 }
  ]);
  assert.deepEqual(findDifficultWords([{ id: 'one', mistakes: Array(4).fill(mistake('x', 'y', 'once')) }]), []);
});

test('insights require three occurrences across two runs and include cautious hints', () => {
  const insights = buildInsights(runs);
  assert.equal(insights.length, 2);
  assert.equal(insights[0].affectedRuns, 2);
  assert.equal(getTechniqueHint('['), 'Bracket keys are normally typed with the right pinky.');
  assert.equal(getTechniqueHint('a'), null);
});

test('targeted retry produces a bounded drill and empty history produces no drill', () => {
  const drill = buildTargetedRetry(runs).split(' ');
  assert.ok(drill.length >= 20 && drill.length <= 40);
  assert.equal(buildTargetedRetry([]), '');
});
