import { Sentence } from '@/constants/lessons';

export interface QuizQuestion {
  /** English sentence with the target word replaced by ___  */
  displaySentence: string;
  /** The correct answer word (without punctuation) */
  correctAnswer: string;
  /** Two choices to display, shuffled */
  options: [string, string];
  /** Which index (0 or 1) holds the correct answer */
  correctOptionIndex: 0 | 1;
}

// Words that are too common / grammatically boring to blank
const SKIP = new Set([
  'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'i', 'my', 'me', 'we', 'our', 'you', 'your', 'he', 'she', 'his', 'her',
  'it', 'its', 'they', 'their', 'them',
  'to', 'of', 'in', 'at', 'on', 'by', 'for', 'from', 'with', 'into', 'up',
  'and', 'or', 'but', 'so', 'that', 'this', 'these', 'those',
  'do', 'did', 'will', 'can', 'could', 'would', 'should', 'have', 'has', 'had',
  'not', 'no', 'yes', 'very', 'too', 'also', 'just', 'now', 'then', 'here',
  'go', 'get',
]);

function strip(word: string): string {
  return word.replace(/[.,?!'"-]/g, '');
}

function isEligible(word: string): boolean {
  const clean = strip(word).toLowerCase();
  return clean.length >= 3 && !SKIP.has(clean);
}

/** Stable hash so quiz layout is consistent across re-renders */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function buildQuiz(sentences: Sentence[]): QuizQuestion[] {
  // All eligible words across the whole lesson — used as distractor pool
  const pool: string[] = sentences
    .flatMap((s) => s.english.split(' ').filter(isEligible).map(strip))
    .filter((w, i, arr) => arr.indexOf(w) === i); // unique

  return sentences.map((sentence, sentIdx) => {
    const words = sentence.english.split(' ');

    // Find eligible word positions
    const eligible = words
      .map((w, i) => ({ raw: w, clean: strip(w), i }))
      .filter(({ clean }) => isEligible(clean));

    // Prefer the word ~60% through the eligible list — usually a noun/verb
    const targetEntry =
      eligible.length > 0
        ? eligible[Math.floor(eligible.length * 0.6)]
        : { raw: words[words.length - 1], clean: strip(words[words.length - 1]), i: words.length - 1 };

    const correctWord = targetEntry.clean;

    // Build display sentence: replace target word with ___
    const displayWords = words.map((w, i) => {
      if (i !== targetEntry.i) return w;
      const punct = w.slice(strip(w).length); // preserve trailing punctuation
      return '___' + punct;
    });

    // Pick distractor: prefer a word from a different sentence, same lesson
    const otherWords = sentences
      .filter((_, i) => i !== sentIdx)
      .flatMap((s) => s.english.split(' ').filter(isEligible).map(strip))
      .filter((w) => w.toLowerCase() !== correctWord.toLowerCase());

    const distractorPool = otherWords.length > 0 ? otherWords : pool.filter((w) => w.toLowerCase() !== correctWord.toLowerCase());
    const wrongWord =
      distractorPool.length > 0
        ? distractorPool[(hash(correctWord) + sentIdx * 7) % distractorPool.length]
        : 'good';

    // Shuffle using a stable seed so layout doesn't change on re-render
    const correctFirst = (hash(correctWord) + sentIdx) % 2 === 0;
    const options: [string, string] = correctFirst
      ? [correctWord, wrongWord]
      : [wrongWord, correctWord];
    const correctOptionIndex: 0 | 1 = correctFirst ? 0 : 1;

    return {
      displaySentence: displayWords.join(' '),
      correctAnswer: correctWord,
      options,
      correctOptionIndex,
    };
  });
}
