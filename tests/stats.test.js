import test from 'node:test';
import assert from 'node:assert/strict';
import { calcAccuracy, calcRawWPM, calcWPM, formatTime } from '../scripts/stats.js';

test('WPM uses the five-character standard', () => {
  assert.equal(calcWPM(50, 1_000, 61_000), 10);
  assert.equal(calcRawWPM(75, 1_000, 61_000), 15);
});

test('WPM safely handles missing or invalid timing', () => {
  assert.equal(calcWPM(20, null, 10_000), 0);
  assert.equal(calcWPM(20, 10_000, 10_000), 0);
  assert.equal(calcWPM(-2, 1_000, 61_000), 0);
});

test('accuracy is bounded and defaults to 100 percent', () => {
  assert.equal(calcAccuracy(0, 0), 100);
  assert.equal(calcAccuracy(8, 10), 80);
  assert.equal(calcAccuracy(15, 10), 100);
});

test('elapsed time is formatted as minutes and padded seconds', () => {
  assert.equal(formatTime(0), '0:00');
  assert.equal(formatTime(65_900), '1:05');
});
