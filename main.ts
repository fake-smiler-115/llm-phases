import { applyTokenization } from "./src/bpe.ts";
import { applyEmbedding } from "./src/embedding.ts";
import { createPositionVectors } from "./src/positionEmbedding.ts";
import { selfAttention } from "./src/selfAttention.ts";
import { Corpus, Matrix } from "./src/types.ts";

const addVectors = (left: number[], right: number[]): number[] =>
  left.map((value, index) => value + right[index]);

const main = (corpus: Corpus) => {
  const contextTokensSize = 5;
  const noOfVectors = 4;
  const { vocabulary, mergers, vocabularyMap } = applyTokenization(corpus);
  const { tokenizDataSet, vectors } = applyEmbedding(
    corpus,
    vocabulary,
    mergers,
    vocabularyMap,
    noOfVectors,
  );
  const positionVectors = createPositionVectors(contextTokensSize, noOfVectors);

  const firstDataSet = tokenizDataSet[0];
  const tokenIds = firstDataSet.tokenIds.flat().slice(0, contextTokensSize);
  const tokenLabels = firstDataSet.legoPeices
    .flat()
    .slice(0, contextTokensSize);

  const input = tokenIds.map((tokenId, index) =>
    addVectors(vectors[tokenId], positionVectors[index]),
  );

  console.log({ firstDataSet, tokenIds, tokenLabels, input });

  const queryWeights: Matrix = [
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 0],
    [1, 0, 0],
  ];
  const keyWeights: Matrix = [
    [1, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ];
  const valueWeights: Matrix = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 0],
  ];

  selfAttention(input, queryWeights, keyWeights, valueWeights, tokenLabels);
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
