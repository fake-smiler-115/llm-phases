export const createPositionVectors = (length: number, noOfVectors: number) => {
  const positionVectors = [];
  for (let i = 0; i < length; i++) {
    const currentPositionVectors = [];
    for (let j = 0; j < noOfVectors; j++) {
      currentPositionVectors.push(Math.random());
    }
    positionVectors.push(currentPositionVectors);
  }

  console.log({positionVectors});
  return positionVectors;
};
