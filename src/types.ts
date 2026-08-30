export type WordsFrequency = {
  [key: string]: number;
};

export type Words = {
  symbols: string[];
  freq: number;
}[];

// type Pair = {
//   firstSymbol : string,
//   secondSymbol : string,
//   freq : number
// }

// export type Pairs = Pair[]

export type Pairs = {
  [key: string]: number;
};

export type Vocabulary = string[];

export type Mergers = string[][];

export type VocabularyMap = {
  [key: string]: number;
};

export type Corpus = string[];

export type TokenizDataSet = {
  sentence: string;
  words: string[];
  legoPeices: string[][];
  tokenIds: number[][];
};

export type Matrix = number[][];

export type SelfAttentionResult = {
  queries: Matrix;
  keys: Matrix;
  values: Matrix;
  scores: Matrix;
  scaledScores: Matrix;
  attentionWeights: Matrix;
  output: Matrix;
};

// One gamma/beta pair per LayerNorm (learnable, one value per d_model column).
export type LayerNormParams = {
  gamma: number[];
  beta: number[];
};

// W1: (d_model x d_ff), b1: (d_ff), W2: (d_ff x d_model), b2: (d_model)
export type FeedForwardWeights = {
  w1: Matrix;
  b1: number[];
  w2: Matrix;
  b2: number[];
};

export type TransformerBlockResult = {
  attention: SelfAttentionResult;
  residual1: Matrix;
  norm1: Matrix;
  ffnOutput: Matrix;
  residual2: Matrix;
  norm2: Matrix;
  output: Matrix;
};
