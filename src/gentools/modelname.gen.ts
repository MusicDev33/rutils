export const generateModelName = (fileName: string): string => {
  let modelName = fileName.split('.')[0][0].toUpperCase() + fileName.split('.')[0].substring(1);

  // Model Names shouldn't have more than two words
  if (modelName.includes('-')) {
    const splitName = modelName.split('-');
    let secondWord = splitName[1];
    secondWord = secondWord.split('.')[0][0].toUpperCase() + secondWord.split('.')[0].substring(1);
    modelName = splitName[0] + secondWord;
  }

  return modelName;
};
