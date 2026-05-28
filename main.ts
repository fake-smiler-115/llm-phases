import { applyTokenization } from "./src/bpe.ts";
import { applyEmbedding } from "./src/embedding.ts";
import { createPositionVectors } from "./src/positionEmbedding.ts";
import { Corpus } from "./src/types.ts";

const main = (corpus: Corpus) => {
  const contextTokensSize = 5;
  const noOfVectors = 4;
  const { vocabulary, mergers, vocabularyMap } = applyTokenization(corpus);
  const {tokenizDataSet, vectors} = applyEmbedding(corpus, vocabulary, mergers, vocabularyMap, noOfVectors);
  const positionVectors = createPositionVectors(contextTokensSize, noOfVectors);
};

const corpus = [
  "This is the Hugging Face Course.",
  "This chapter is about tokenization.",
  "This section shows several tokenizer algorithms.",
  "Hopefully, you will be able to understand how they are trained and generate tokens.",
];

// const corpus = [
//   "low",
//   "low",
//   "lower",
//   "new",
//   "newest",
//   "widest"
// ]

main(corpus);
