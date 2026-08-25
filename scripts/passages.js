export const LENGTH_BANDS = Object.freeze({
  short: Object.freeze({ min: 25, max: 40 }),
  medium: Object.freeze({ min: 41, max: 65 }),
  long: Object.freeze({ min: 66, max: 90 })
});

export const PASSAGES = Object.freeze([
  {
    id: 'alice-in-wonderland-01',
    title: 'Alice’s Adventures in Wonderland',
    author: 'Lewis Carroll',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/11/pg11.txt',
    difficulty: 'easy',
    text: 'The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.'
  },
  {
    id: 'alice-in-wonderland-02',
    title: 'Alice’s Adventures in Wonderland',
    author: 'Lewis Carroll',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/11/pg11.txt',
    difficulty: 'easy',
    text: 'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”'
  },
  {
    id: 'alice-in-wonderland-03',
    title: 'Alice’s Adventures in Wonderland',
    author: 'Lewis Carroll',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/11/pg11.txt',
    difficulty: 'easy',
    text: 'This speech caused a remarkable sensation among the party. Some of the birds hurried off at once: one old Magpie began wrapping itself up very carefully, remarking, “I really must be getting home; the night-air doesn’t suit my throat!” and a Canary called out in a trembling voice to its children, “Come away, my dears! It’s high time you were all in bed!” On various pretexts they all moved off, and Alice was soon left alone.'
  },
  {
    id: 'wizard-of-oz-01',
    title: 'The Wonderful Wizard of Oz',
    author: 'L. Frank Baum',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/55/pg55.txt',
    difficulty: 'easy',
    text: 'Uncle Henry never laughed. He worked hard from morning till night and did not know what joy was. He was gray also, from his long beard to his rough boots, and he looked stern and solemn, and rarely spoke.'
  },
  {
    id: 'wizard-of-oz-02',
    title: 'The Wonderful Wizard of Oz',
    author: 'L. Frank Baum',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/55/pg55.txt',
    difficulty: 'easy',
    text: 'It was Toto that made Dorothy laugh, and saved her from growing as gray as her other surroundings. Toto was not gray; he was a little black dog, with long silky hair and small black eyes that twinkled merrily on either side of his funny, wee nose. Toto played all day long, and Dorothy played with him, and loved him dearly.'
  },
  {
    id: 'wizard-of-oz-03',
    title: 'The Wonderful Wizard of Oz',
    author: 'L. Frank Baum',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/55/pg55.txt',
    difficulty: 'easy',
    text: 'The north and south winds met where the house stood, and made it the exact center of the cyclone. In the middle of a cyclone the air is generally still, but the great pressure of the wind on every side of the house raised it up higher and higher, until it was at the very top of the cyclone; and there it remained and was carried miles and miles away as easily as you could carry a feather.'
  },
  {
    id: 'peter-pan-01',
    title: 'Peter Pan',
    author: 'J. M. Barrie',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/16/pg16.txt',
    difficulty: 'easy',
    text: '“Oh no, he isn’t grown up,” Wendy assured her confidently, “and he is just my size.” She meant that he was her size in both mind and body; she didn’t know how she knew, she just knew it.'
  },
  {
    id: 'peter-pan-02',
    title: 'Peter Pan',
    author: 'J. M. Barrie',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/16/pg16.txt',
    difficulty: 'easy',
    text: 'Mr. Darling used to boast to Wendy that her mother not only loved him but respected him. He was one of those deep ones who know about stocks and shares. Of course no one really knows, but he quite seemed to know, and he often said stocks were up and shares were down in a way that would have made any woman respect him.'
  },
  {
    id: 'peter-pan-03',
    title: 'Peter Pan',
    author: 'J. M. Barrie',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/16/pg16.txt',
    difficulty: 'easy',
    text: 'Of all delectable islands the Neverland is the snuggest and most compact, not large and sprawly, you know, with tedious distances between one adventure and another, but nicely crammed. When you play at it by day with the chairs and table-cloth, it is not in the least alarming, but in the two minutes before you go to sleep it becomes very real. That is why there are night-lights.'
  },
  {
    id: 'pride-and-prejudice-01',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/1342/pg1342.txt',
    difficulty: 'medium',
    text: '“Ay, so it is,” cried her mother, “and Mrs. Long does not come back till the day before; so, it will be impossible for her to introduce him, for she will not know him herself.”'
  },
  {
    id: 'pride-and-prejudice-02',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/1342/pg1342.txt',
    difficulty: 'medium',
    text: 'However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.'
  },
  {
    id: 'pride-and-prejudice-03',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/1342/pg1342.txt',
    difficulty: 'medium',
    text: '“Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week.”'
  },
  {
    id: 'frankenstein-01',
    title: 'Frankenstein',
    author: 'Mary Wollstonecraft Shelley',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/84/pg84.txt',
    difficulty: 'medium',
    text: 'On perceiving me, the stranger addressed me in English, although with a foreign accent. “Before I come on board your vessel,” said he, “will you have the kindness to inform me whither you are bound?”'
  },
  {
    id: 'frankenstein-02',
    title: 'Frankenstein',
    author: 'Mary Wollstonecraft Shelley',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/84/pg84.txt',
    difficulty: 'medium',
    text: 'How slowly the time passes here, encompassed as I am by frost and snow! Yet a second step is taken towards my enterprise. I have hired a vessel and am occupied in collecting my sailors; those whom I have already engaged appear to be men on whom I can depend and are certainly possessed of dauntless courage.'
  },
  {
    id: 'frankenstein-03',
    title: 'Frankenstein',
    author: 'Mary Wollstonecraft Shelley',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/84/pg84.txt',
    difficulty: 'medium',
    text: 'When my guest was a little recovered I had great trouble to keep off the men, who wished to ask him a thousand questions; but I would not allow him to be tormented by their idle curiosity, in a state of body and mind whose restoration evidently depended upon entire repose. Once, however, the lieutenant asked why he had come so far upon the ice in so strange a vehicle.'
  },
  {
    id: 'sherlock-holmes-01',
    title: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/1661/pg1661.txt',
    difficulty: 'medium',
    text: '“The man who wrote it was presumably well to do,” I remarked, endeavouring to imitate my companion’s processes. “Such paper could not be bought under half a crown a packet. It is peculiarly strong and stiff.”'
  },
  {
    id: 'sherlock-holmes-02',
    title: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/1661/pg1661.txt',
    difficulty: 'medium',
    text: '“Quite so,” he answered, lighting a cigarette, and throwing himself down into an armchair. “You see, but you do not observe. The distinction is clear. For example, you have frequently seen the steps which lead up from the hall to this room.”'
  },
  {
    id: 'sherlock-holmes-03',
    title: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/1661/pg1661.txt',
    difficulty: 'medium',
    text: 'I could not help laughing at the ease with which he explained his process of deduction. “When I hear you give your reasons,” I remarked, “the thing always appears to me to be so ridiculously simple that I could easily do it myself, though at each successive instance of your reasoning I am baffled until you explain your process. And yet I believe that my eyes are as good as yours.”'
  },
  {
    id: 'tale-of-two-cities-01',
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/98/pg98.txt',
    difficulty: 'hard',
    text: 'The last burst carried the mail to the summit of the hill. The horses stopped to breathe again, and the guard got down to skid the wheel for the descent, and open the coach-door to let the passengers in.'
  },
  {
    id: 'tale-of-two-cities-02',
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/98/pg98.txt',
    difficulty: 'hard',
    text: '“Come on at a footpace! d’ye mind me? And if you’ve got holsters to that saddle o’ yourn, don’t let me see your hand go nigh ’em. For I’m a devil at a quick mistake, and when I make one it takes the form of Lead. So now let’s look at you.”'
  },
  {
    id: 'tale-of-two-cities-03',
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/98/pg98.txt',
    difficulty: 'hard',
    text: 'Jerry, left alone in the mist and darkness, dismounted meanwhile, not only to ease his spent horse, but to wipe the mud from his face, and shake the wet out of his hat-brim, which might be capable of holding about half a gallon. After standing with the bridle over his heavily-splashed arm, until the wheels of the mail were no longer within hearing and the night was quite still again, he turned to walk down the hill.'
  },
  {
    id: 'moby-dick-01',
    title: 'Moby-Dick; or, The Whale',
    author: 'Herman Melville',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/2701/pg2701.txt',
    difficulty: 'hard',
    text: 'It was now about nine o’clock, and the room seeming almost supernaturally quiet after these orgies, I began to congratulate myself upon a little plan that had occurred to me just previous to the entrance of the seamen.'
  },
  {
    id: 'moby-dick-02',
    title: 'Moby-Dick; or, The Whale',
    author: 'Herman Melville',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/2701/pg2701.txt',
    difficulty: 'hard',
    text: 'By reason of these things, then, the whaling voyage was welcome; the great flood-gates of the wonder-world swung open, and in the wild conceits that swayed me to my purpose, two and two there floated into my inmost soul, endless processions of the whale, and, mid most of them all, one grand hooded phantom, like a snow hill in the air.'
  },
  {
    id: 'moby-dick-03',
    title: 'Moby-Dick; or, The Whale',
    author: 'Herman Melville',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/2701/pg2701.txt',
    difficulty: 'hard',
    text: 'I told him that I never liked to sleep two in a bed; that if I should ever do so, it would depend upon who the harpooneer might be, and that if he (the landlord) really had no other place for me, and the harpooneer was not decidedly objectionable, why rather than wander further about a strange town on so bitter a night, I would put up with the half of any decent man’s blanket.'
  },
  {
    id: 'dracula-01',
    title: 'Dracula',
    author: 'Bram Stoker',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/345/pg345.txt',
    difficulty: 'hard',
    text: '“You will need, after your journey, to refresh yourself by making your toilet. I trust you will find all you wish. When you are ready, come into the other room, where you will find your supper prepared.”'
  },
  {
    id: 'dracula-02',
    title: 'Dracula',
    author: 'Bram Stoker',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/345/pg345.txt',
    difficulty: 'hard',
    text: 'Just as I had come to this conclusion I heard a heavy step approaching behind the great door, and saw through the chinks the gleam of a coming light. Then there was the sound of rattling chains and the clanking of massive bolts drawn back. A key was turned with the loud grating noise of long disuse, and the great door swung back.'
  },
  {
    id: 'dracula-03',
    title: 'Dracula',
    author: 'Bram Stoker',
    source: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/cache/epub/345/pg345.txt',
    difficulty: 'hard',
    text: 'How these papers have been placed in sequence will be made manifest in the reading of them. All needless matters have been eliminated, so that a history almost at variance with the possibilities of later-day belief may stand forth as simple fact. There is throughout no statement of past things wherein memory may err, for all the records chosen are exactly contemporary, given from the standpoints and within the range of knowledge of those who made them.'
  }
]);

export function wordCount(text) {
  const trimmed = typeof text === 'string' ? text.trim() : '';
  return trimmed ? trimmed.split(/\s+/u).length : 0;
}

export function isInLengthBand(text, lengthBand) {
  const range = LENGTH_BANDS[lengthBand];
  if (!range) return false;
  const count = wordCount(text);
  return count >= range.min && count <= range.max;
}

export function selectPassage(
  pool,
  difficulty,
  lengthBand,
  previousPassageId,
  random = Math.random
) {
  const matching = pool.filter((passage) => (
    passage.difficulty === difficulty && isInLengthBand(passage.text, lengthBand)
  ));

  if (matching.length === 0) {
    throw new Error(`No passages available for ${difficulty}/${lengthBand}.`);
  }

  // A one-item pool intentionally repeats; avoiding it would leave no valid run.
  const candidates = matching.length > 1 && previousPassageId
    ? matching.filter((passage) => passage.id !== previousPassageId)
    : matching;
  const index = Math.min(candidates.length - 1, Math.floor(random() * candidates.length));
  return candidates[index];
}
