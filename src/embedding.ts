import { Corpus, Mergers, Vocabulary, VocabularyMap } from "./types.ts";
import { parseSentense } from "./word_frequency.ts";

const createIntoLegoPieces= (words : string[], vocabulary : Vocabulary) => {
  // return words.map(word => {
  //   if (vocabulary.includes(word)) return word;

  // })
  return words;
}

const createTokenizDataSets = (corpus : Corpus, vocabularyMap : VocabularyMap, vocabulary : Vocabulary,) => {
  const tokenizDataSet = [];
  corpus.forEach(sentence =>  {
    const words = parseSentense(sentence).split(' ').filter(x => x);
    const legoPeices = createIntoLegoPieces(words, vocabulary)
    const tokenIds = words.map(word => vocabularyMap[word]);
    console.log({sentence, words, tokenIds});
    tokenizDataSet.push({sentence, words, tokenIds});
  });

}

export const applyEmbedding = (corpus : Corpus, vocabulary : Vocabulary, mergers : Mergers, vocabularyMap : VocabularyMap) => {
  const tokenizDataSet = createTokenizDataSets(corpus, vocabularyMap, vocabulary);
}