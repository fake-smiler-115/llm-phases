import { Pairs, Words, WordsFrequency } from "./types.ts";
import { countWordsFrequency, findVocabulary } from "./word_frequency.ts";

const convertIntoTheWordsChars = (wordsFrequency: WordsFrequency) : Words => {
  return Object.entries(wordsFrequency).map(([word, freq]) => ({
    symbols: word.split(""),
    freq,
  }));
};

const generatePairs = (words :Words):Pairs => {
  const pairs:Pairs = {};
  words.forEach(word => {
    const symbols = word.symbols;
    for (let i =0; i < symbols.length - 1; i++) {
      const firstSymbol = symbols[i];
      const secondSymbol = symbols[i + 1];
      if(pairs[`${firstSymbol}|${secondSymbol}`]) {
        pairs[`${firstSymbol}|${secondSymbol}`] += word.freq;
      }
      if(!pairs[`${firstSymbol}|${secondSymbol}`]) {
        pairs[`${firstSymbol}|${secondSymbol}`] = word.freq;
      }
    }
  })

  return pairs;
}

const findMostCommonPair = (pairs : Pairs) => 
   Object.entries(pairs).sort(([,a],[,b]) => b - a)[0][0];

const joinMostCommonPair = (mostCommonPair : string, words : Words) => {
  const [firstSymbol, secondSymbol] = mostCommonPair.split('|');
  words.forEach(word => {
    const symbols = word.symbols;
    const firstSymbolIndex = symbols.findIndex(symbol => symbol === firstSymbol);

    if(firstSymbolIndex === -1)return;
    if(symbols[firstSymbolIndex + 1] !== secondSymbol) return;
    symbols.splice(firstSymbolIndex, 2, firstSymbol + secondSymbol)
  })
}

export const tokeniz = (
  wordsFrequency: WordsFrequency,
  vocabulary: string[],
) => {
  const mergers = [];
  const words = convertIntoTheWordsChars(wordsFrequency);
  // const initialLenght = vocabulary.length;
  // vocabulary.length < 30000 condition loop run times
  while (true) {
    const pairs = generatePairs(words);
    if(Object.keys(pairs).length === 0) break;
    const mostCommonPair = findMostCommonPair(pairs);
    joinMostCommonPair(mostCommonPair, words);
    mergers.push(mostCommonPair.split('|'))
    vocabulary.push(mostCommonPair.split('|').join(''));
  }

  console.log(mergers);
  return mergers;
};

export const createVocubalaryMap = (vocabulary : string[]) => {
  const vocabularyMap : {[key : string] : number} = {};
  vocabulary.forEach((symbol, index) => {
    vocabularyMap[symbol] = index;
  })

  return vocabularyMap;
}

export const applyBPEAlogthim = (corpus : string[]) => {
  const wordsFrequency = countWordsFrequency(corpus);  
  const vocabulary = findVocabulary(Object.keys(wordsFrequency));
  console.log(vocabulary.length);
  const mergers =  tokeniz(wordsFrequency, vocabulary);
  const vocabularyMap = createVocubalaryMap(vocabulary);

  return {vocabulary, mergers, vocabularyMap};
}