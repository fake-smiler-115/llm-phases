import { applyTokenization } from "./src/bpe.ts";
import { applyEmbedding } from "./src/embedding.ts";
import { createPositionVectors } from "./src/positionEmbedding.ts";
import { printMatrix } from "./src/selfAttention.ts";
import { transformerBlock } from "./src/transformerBlock.ts";
import {
  Corpus,
  FeedForwardWeights,
  LayerNormParams,
  Matrix,
} from "./src/types.ts";

const addVectors = (left: number[], right: number[]): number[] =>
  left.map((value, index) => value + right[index]);

const intilazeNorms = () => ({
  gamma: [1, 1, 1, 1],
  beta: [0, 0, 0, 0],
});

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

  console.log({ firstDataSet, tokenIds, tokenLabels });

  const queryWeights: Matrix = [
    [1, 0, 1, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
  ];
  const keyWeights: Matrix = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
  ];
  const valueWeights: Matrix = [
    [1, 0, 0, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 0],
    [1, 1, 0, 0],
  ];

  const layerNorm1Params: LayerNormParams = intilazeNorms();
  const layerNorm2Params: LayerNormParams = intilazeNorms();

  const feedForwardWeights: FeedForwardWeights = {
    w1: [
      [0.2, -0.1, 0.3, 0.1, -0.2, 0.4, 0.1, -0.3],
      [0.1, 0.2, -0.3, 0.4, 0.1, -0.1, 0.2, 0.3],
      [-0.2, 0.3, 0.1, -0.4, 0.2, 0.1, -0.3, 0.2],
      [0.4, -0.2, 0.1, 0.2, -0.1, 0.3, -0.2, 0.1],
    ],
    b1: [0, 0, 0, 0, 0, 0, 0, 0],
    w2: [
      [0.1, -0.2, 0.3, 0.1],
      [0.2, 0.1, -0.1, 0.3],
      [-0.3, 0.2, 0.1, -0.1],
      [0.1, 0.3, -0.2, 0.2],
      [0.2, -0.1, 0.1, 0.1],
      [-0.1, 0.2, 0.3, -0.2],
      [0.1, 0.1, -0.2, 0.3],
      [0.3, -0.1, 0.2, -0.1],
    ],
    b2: [0, 0, 0, 0],
  };

  printMatrix("X", input);
  printMatrix("Wq", queryWeights);
  printMatrix("Wk", keyWeights);
  printMatrix("Wv", valueWeights);
  transformerBlock(
    input,
    queryWeights,
    keyWeights,
    valueWeights,
    layerNorm1Params,
    feedForwardWeights,
    layerNorm2Params,
    tokenLabels,
  );
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
