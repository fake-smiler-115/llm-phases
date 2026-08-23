import { Matrix, SelfAttentionResult } from "./types.ts";

const getDimensions = (matrix: Matrix): [number, number] => [
  matrix.length,
  matrix[0].length,
];

export const printMatrix = (name: string, matrix: Matrix): void => {
  console.log(name + ":   \n");
  console.table(matrix);
};

const multiplyMatrices = (left: Matrix, right: Matrix): Matrix => {
  const [leftRows, leftColumns] = getDimensions(left);
  const [, rightColumns] = getDimensions(right);

  const result: Matrix = [];

  for (let rowIndex = 0; rowIndex < leftRows; rowIndex++) {
    const row: number[] = [];

    for (let columnIndex = 0; columnIndex < rightColumns; columnIndex++) {
      let dotProduct = 0;

      for (let index = 0; index < leftColumns; index++) {
        dotProduct += left[rowIndex][index] * right[index][columnIndex];
      }

      row.push(dotProduct);
    }

    result.push(row);
  }

  return result;
};

const transposeMatrix = (matrix: Matrix): Matrix => {
  const [rows, columns] = getDimensions(matrix);
  const transposed: Matrix = [];

  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    const row: number[] = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      row.push(matrix[rowIndex][columnIndex]);
    }

    transposed.push(row);
  }

  return transposed;
};

const softmaxRows = (matrix: Matrix): Matrix => {
  return matrix.map((row) => {
    const exponents = row.map((value) => Math.exp(value));
    const total = exponents.reduce((sum, value) => sum + value, 0);
    return exponents.map((value) => value / total);
  });
};

const scaleScores = (scores: Matrix, keyDimension: number): Matrix =>
  scores.map((row) => row.map((score) => score / Math.sqrt(keyDimension)));

const printAttentionMeaning = (
  attentionWeights: Matrix,
  tokenLabels: string[],
): void => {
  console.log("\nMeaning of each attention row:");

  for (let rowIndex = 0; rowIndex < attentionWeights.length; rowIndex++) {
    const row = attentionWeights[rowIndex];
    const parts: string[] = [];

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      parts.push(`${tokenLabels[columnIndex]}: ${row[columnIndex].toFixed(4)}`);
    }

    const attendedTokens = parts.join(", ");
    console.log(
      `attentionWeights[${rowIndex}] shows how much "${tokenLabels[rowIndex]}" attends to -> ${attendedTokens}`,
    );
  }
};

export const selfAttention = (
  input: Matrix,
  queryWeights: Matrix,
  keyWeights: Matrix,
  valueWeights: Matrix,
  tokenLabels: string[] = [],
): SelfAttentionResult => {
  const queries = multiplyMatrices(input, queryWeights);
  const keys = multiplyMatrices(input, keyWeights);
  const values = multiplyMatrices(input, valueWeights);
  printMatrix("queries Q = X x Wq", queries);
  printMatrix("keys K = X x Wk", keys);
  printMatrix("values  = X x Wv", values);

  //Scores=QK^T
  const scores = multiplyMatrices(queries, transposeMatrix(keys));
  const scaledScores = scaleScores(scores, keys[0].length);
  const attentionWeights = softmaxRows(scaledScores);
  const output = multiplyMatrices(attentionWeights, values);
  printMatrix("Q x K transpose", scores);
  printMatrix(
    `Scaled scores (divide by sqrt(${keys[0].length}))`,
    scaledScores,
  );
  printMatrix("Attention weights", attentionWeights);
  printMatrix("Final attention output", output);
  printAttentionMeaning(attentionWeights, tokenLabels);

  return {
    queries,
    keys,
    values,
    scores,
    scaledScores,
    attentionWeights,
    output,
  };
};
