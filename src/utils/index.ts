/**
 * Returns the current filename
 * @param {string} filePath - This should be always __filename
 * @returns - Returns the current filename
 * @example
 * getCurrentFilename(__filename);
 */
export const getCurrentFilename = (filePath: string) => {
  const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
  return fileName.substring(0, fileName.lastIndexOf("."));
};

export const generateErrSource = (filePath: string, funcName: string) => {
  return `${getCurrentFilename(filePath)}: ${funcName}`;
};
