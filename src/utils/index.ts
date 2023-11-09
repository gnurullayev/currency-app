export const paginationCount = (count: number, dataLength: number) => {
  return Math.ceil(dataLength / count);
};
