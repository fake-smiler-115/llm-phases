import {
  multiplyMatrices,
  printMatrix,
  selfAttention,
} from "./selfAttention.ts";
import {
  FeedForwardWeights,
  LayerNormParams,
  Matrix,
  TransformerBlockResult,
} from "./types.ts";

export const addMatrices = (left: Matrix, right: Matrix): Matrix =>
  left.map((row, rowIndex) =>
    row.map((value, columnIndex) => value + right[rowIndex][columnIndex]),
  );

const calculateMean = (row: number[]): number => {
  const sum = row.reduce((total, value) => total + value, 0);
  return sum / row.length;
};

const calculateVariance = (row: number[], mean: number): number => {
  const squaredDeviations = row.reduce(
    (total, value) => total + (value - mean) ** 2,
    0,
  );
  return squaredDeviations / row.length;
};

// layernorms formula = ((value - mean) / sqrt(variance + epsilon)) * gamma + beta.

export const layerNorm = (
  matrix: Matrix,
  { gamma, beta }: LayerNormParams,
  epsilon = 1e-5,
): Matrix => {
  return matrix.map((row) => {
    const mean = calculateMean(row);
    const variance = calculateVariance(row, mean);
    const stdDev = Math.sqrt(variance + epsilon);

    return row.map(
      (value, index) => ((value - mean) / stdDev) * gamma[index] + beta[index],
    );
  });
};

const gelu = (x: number): number =>
  0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x ** 3)));

const linearLayer = (
  input: Matrix,
  weights: Matrix,
  bias: number[],
): Matrix => {
  const projected = multiplyMatrices(input, weights);
  return projected.map((row) => row.map((value, index) => value + bias[index]));
};

export const feedForward = (
  input: Matrix,
  { w1, b1, w2, b2 }: FeedForwardWeights,
): Matrix => {
  const hidden = linearLayer(input, w1, b1);
  const activated = hidden.map((row) => row.map(gelu));
  return linearLayer(activated, w2, b2);
};

export const transformerBlock = (
  input: Matrix,
  queryWeights: Matrix,
  keyWeights: Matrix,
  valueWeights: Matrix,
  layerNorm1Params: LayerNormParams,
  feedForwardWeights: FeedForwardWeights,
  layerNorm2Params: LayerNormParams,
  tokenLabels: string[] = [],
): TransformerBlockResult => {
  const attention = selfAttention(
    input,
    queryWeights,
    keyWeights,
    valueWeights,
    tokenLabels,
  );

  const residual1 = addMatrices(input, attention.output);
  const norm1 = layerNorm(residual1, layerNorm1Params);
  printMatrix("Residual 1 = X + AttentionOutput", residual1);
  printMatrix("LayerNorm 1 output", norm1);

  const ffnOutput = feedForward(norm1, feedForwardWeights);
  printMatrix("FFN(norm1)", ffnOutput);

  const residual2 = addMatrices(norm1, ffnOutput);
  const norm2 = layerNorm(residual2, layerNorm2Params);

  printMatrix("Residual 2 = norm1 + FFN(norm1)", residual2);
  printMatrix("LayerNorm 2 output (Transformer block output)", norm2);

  return {
    attention,
    residual1,
    norm1,
    ffnOutput,
    residual2,
    norm2,
    output: norm2,
  };
};
