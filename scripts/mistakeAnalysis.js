const TECHNIQUE_HINTS = Object.freeze({
  '[': 'Bracket keys are normally typed with the right pinky.',
  ']': 'Bracket keys are normally typed with the right pinky.',
  ';': 'The semicolon is normally typed with the right pinky.',
  "'": 'The apostrophe is normally typed with the right pinky.'
});

const CHARACTER_PRACTICE = Object.freeze({
  '[': ['array[index]', 'values[0]', 'items[i]'],
  ']': ['array[index]', 'values[0]', 'items[i]'],
  ';': ['let', 'x', '=', '1;', 'return', 'x;']
});

function mistakesFor(run) {
  return Array.isArray(run?.mistakes) ? run.mistakes : [];
}

function rankedEntries(counts, mapper) {
  return [...counts.entries()].map(mapper).sort((a, b) => b.count - a.count);
}

export function aggregateCharacterMistakes(runs = []) {
  const counts = new Map();
  for (const run of runs) for (const mistake of mistakesFor(run)) {
    counts.set(mistake.expected, (counts.get(mistake.expected) ?? 0) + 1);
  }
  return rankedEntries(counts, ([char, count]) => ({ char, count }));
}

export function aggregateSubstitutions(runs = []) {
  const counts = new Map();
  for (const run of runs) for (const mistake of mistakesFor(run)) {
    const key = JSON.stringify([mistake.expected, mistake.actual]);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return rankedEntries(counts, ([key, count]) => {
    const [expected, actual] = JSON.parse(key);
    return { expected, actual, count };
  });
}

export function findDifficultWords(runs = []) {
  const runIdsByWord = new Map();
  const totals = new Map();
  runs.forEach((run, index) => {
    const runId = run?.id ?? `run-index-${index}`;
    const words = new Set();
    for (const mistake of mistakesFor(run)) {
      if (!mistake.word) continue;
      words.add(mistake.word);
      totals.set(mistake.word, (totals.get(mistake.word) ?? 0) + 1);
    }
    for (const word of words) {
      if (!runIdsByWord.has(word)) runIdsByWord.set(word, new Set());
      runIdsByWord.get(word).add(runId);
    }
  });
  return [...runIdsByWord.entries()]
    .map(([word, runIds]) => ({ word, affectedRuns: runIds.size, totalMistakes: totals.get(word) }))
    .filter(({ affectedRuns }) => affectedRuns >= 2)
    .sort((a, b) => b.affectedRuns - a.affectedRuns || b.totalMistakes - a.totalMistakes);
}

export function getTechniqueHint(char) {
  return TECHNIQUE_HINTS[char] ?? null;
}

function latestRunTimestamp(runs, predicate) {
  let latest = null;
  for (const run of runs) {
    if (!predicate(run)) continue;
    const timestamp = run.completedAt ?? run.date;
    if (timestamp && (!latest || new Date(timestamp) > new Date(latest))) latest = timestamp;
  }
  return latest;
}

export function buildInsights(runs = []) {
  const substitutions = aggregateSubstitutions(runs);
  const runIdsByChar = new Map();
  runs.forEach((run, index) => {
    for (const char of new Set(mistakesFor(run).map(({ expected }) => expected))) {
      if (!runIdsByChar.has(char)) runIdsByChar.set(char, new Set());
      runIdsByChar.get(char).add(run?.id ?? `run-index-${index}`);
    }
  });
  const characters = aggregateCharacterMistakes(runs)
    .filter(({ char, count }) => count >= 3 && runIdsByChar.get(char)?.size >= 2)
    .map(({ char, count }) => ({
      type: 'character', char, occurrences: count, affectedRuns: runIdsByChar.get(char).size,
      mostRecentRunAt: latestRunTimestamp(runs, (run) => mistakesFor(run).some((mistake) => mistake.expected === char)),
      topSubstitution: substitutions.find(({ expected }) => expected === char) ?? null,
      techniqueHint: getTechniqueHint(char)
    }));
  const words = findDifficultWords(runs).filter(({ totalMistakes }) => totalMistakes >= 3).map((word) => ({
    type: 'word', word: word.word, occurrences: word.totalMistakes, affectedRuns: word.affectedRuns,
    mostRecentRunAt: latestRunTimestamp(runs, (run) => mistakesFor(run).some((mistake) => mistake.word === word.word))
  }));
  return [...characters, ...words].sort((a, b) => b.affectedRuns - a.affectedRuns
    || b.occurrences - a.occurrences
    || new Date(b.mostRecentRunAt ?? 0) - new Date(a.mostRecentRunAt ?? 0)).slice(0, 3);
}

export function buildTargetedRetry(runs = []) {
  const drill = findDifficultWords(runs).slice(0, 5).map(({ word }) => word);
  for (const { char } of aggregateCharacterMistakes(runs).slice(0, 3)) drill.push(...(CHARACTER_PRACTICE[char] ?? []));
  for (const { expected } of aggregateSubstitutions(runs).slice(0, 3)) {
    const practice = CHARACTER_PRACTICE[expected]?.[0];
    if (practice) drill.push(practice, practice);
  }
  const compact = drill.filter((word, index) => index === 0 || word !== drill[index - 1]);
  const pool = [...compact];
  for (let index = 0; compact.length < 20 && pool.length > 0; index += 1) compact.push(pool[index % pool.length]);
  return compact.slice(0, 40).join(' ');
}
