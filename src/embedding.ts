import { Corpus, Mergers, TokenizDataSet, Vocabulary, VocabularyMap } from "./types.ts";
import { parseSentense } from "./word_frequency.ts";

const  createIntoLegoPieces = (target : string, vocubalary : string[]) => {
  const combinations = [];
  let word = target;
  while (word) {
    for (let index = 0; index < vocubalary.length; index++) {
      if(word.startsWith(vocubalary[index])) {
        combinations.push(vocubalary[index]);
        word = word.slice(vocubalary[index].length)
        break;
      }
    }
  }

  return combinations;
}

const createTokenizDataSets = (corpus : Corpus, vocabularyMap : VocabularyMap, vocabulary : Vocabulary,) => {
  const tokenizDataSet : TokenizDataSet[] = [];
  corpus.forEach(sentence =>  {
    const words = parseSentense(sentence).split(' ').filter(x => x);
    const legoPeices = words.map((word) => createIntoLegoPieces(word, vocabulary.toReversed()));
    const tokenIds = legoPeices.map(symbols => symbols.map((symbol) => vocabularyMap[symbol]));
    // console.log({sentence, words,legoPeices, tokenIds});
    tokenizDataSet.push({sentence, words,legoPeices, tokenIds});
  });

  return tokenizDataSet;
}

export const applyEmbedding = (corpus : Corpus, vocabulary : Vocabulary, mergers : Mergers, vocabularyMap : VocabularyMap) => {
  const tokenizDataSet = createTokenizDataSets(corpus, vocabularyMap, vocabulary);
  console.log(tokenizDataSet);
}