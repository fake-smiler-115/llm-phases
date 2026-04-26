import { Vocabulary, WordsFrequency } from "./types.ts";

export const parseSentense = (sentense : string):string => {
  return sentense.replaceAll(/[\s]+/g, ' $').replaceAll(/[\.]+/g, ' . ').replaceAll(/[\,]+/g, ' , ')
  // return sentense;
}

export const countWordsFrequency = (corpus: string[]) : WordsFrequency => {
  const words = corpus.flatMap(sentense => parseSentense(sentense).split(' '));
  const wordsFrequency:WordsFrequency = {};
  words.forEach((word) => {
    if (wordsFrequency[word]) {
      return (wordsFrequency[word] += 1);
    }
    wordsFrequency[word] = 1;
  });
  return wordsFrequency;
};


export const findVocabulary = (words : string[]) : Vocabulary => {
  const characters = words.join('').split('');
  const vocabulary = new Set(characters);
  return [...vocabulary];
}