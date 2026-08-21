export const EASY_WORDS = Object.freeze([
  'able', 'air', 'apple', 'ball', 'beach', 'bird', 'blue', 'book', 'box', 'bread',
  'bright', 'cake', 'chair', 'city', 'clean', 'cloud', 'cold', 'day', 'dog', 'door',
  'dream', 'earth', 'easy', 'face', 'fast', 'fire', 'fish', 'food', 'friend', 'game',
  'garden', 'good', 'green', 'happy', 'heart', 'home', 'house', 'light', 'love', 'moon',
  'music', 'night', 'paper', 'plant', 'play', 'rain', 'read', 'river', 'road', 'room',
  'school', 'sea', 'smile', 'snow', 'song', 'star', 'sun', 'tree', 'water', 'world'
]);

export const MEDIUM_WORDS = Object.freeze([
  'active', 'answer', 'balance', 'beyond', 'border', 'breeze', 'camera', 'change', 'choice', 'circle',
  'coffee', 'corner', 'create', 'degree', 'detail', 'energy', 'engine', 'escape', 'future', 'gentle',
  'golden', 'ground', 'growth', 'honest', 'island', 'journey', 'keyboard', 'language', 'market', 'memory',
  'moment', 'motion', 'nature', 'number', 'orange', 'people', 'planet', 'project', 'quiet', 'reason',
  'record', 'rhythm', 'screen', 'signal', 'silver', 'simple', 'spirit', 'spring', 'street', 'system',
  'travel', 'unique', 'useful', 'valley', 'vision', 'window', 'winter', 'wonder', 'yellow', 'zenith'
]);

export const HARD_WORDS = Object.freeze([
  'abstraction', 'architecture', 'asynchronous', 'atmosphere', 'authenticity', 'breakthrough', 'calibration', 'chronology', 'circumstance', 'collaboration',
  'compatibility', 'comprehensive', 'concentration', 'configuration', 'consequence', 'constellation', 'contemporary', 'determination', 'development', 'differential',
  'distribution', 'efficiency', 'electromagnetic', 'entrepreneur', 'environmental', 'extraordinary', 'fragmentation', 'fundamental', 'hypothesis', 'implementation',
  'infrastructure', 'innovation', 'intermediate', 'interpretation', 'mathematical', 'metamorphosis', 'methodology', 'microprocessor', 'multidimensional', 'optimization',
  'organization', 'perspective', 'philosophical', 'probability', 'professional', 'reconciliation', 'representation', 'responsibility', 'revolutionary', 'simultaneous',
  'sophisticated', 'sustainability', 'synchronization', 'technological', 'transformation', 'transmission', 'uncharacteristic', 'understanding', 'visualization', 'vulnerability'
]);

const BANKS = Object.freeze({ easy: EASY_WORDS, medium: MEDIUM_WORDS, hard: HARD_WORDS });

export function buildWordList(difficulty = 'medium', count = 10, random = Math.random) {
  const bank = BANKS[difficulty] ?? MEDIUM_WORDS;
  const requestedCount = Number.isInteger(Number(count)) && Number(count) > 0 ? Number(count) : 10;
  const shuffled = [...bank];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  if (requestedCount <= shuffled.length) return shuffled.slice(0, requestedCount);

  const result = [];
  while (result.length < requestedCount) {
    result.push(...shuffled.slice(0, requestedCount - result.length));
  }
  return result;
}
