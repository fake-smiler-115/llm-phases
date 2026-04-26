export type WordsFrequency ={
[key : string] : number
}

export type Words =  {
    symbols: string[];
    freq: number;
}[]

// type Pair = {
//   firstSymbol : string,
//   secondSymbol : string,
//   freq : number
// }

// export type Pairs = Pair[]

export type Pairs = {
  [key : string] : number
}

export type Vocabulary = string[];

export type Mergers = string[][];

export type  VocabularyMap = {
  [key : string] : number
}

export type Corpus = string[];