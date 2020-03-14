const {stdin, stdout} = process;

let filteredWord = {};
const onFilterInput = inputWords => {
  const inputWordArray = inputWords.split(',');
  const trimmedWordArray = inputWordArray.map(word => word.trim());
  return trimmedWordArray.reduce((result, current) => {
    for(let x = 0, length = current.length; x < length; x++) {
      const letter = current.charAt(x);
      filteredWord[letter] = (isNaN(filteredWord[letter]) ? 1 : filteredWord[letter] + 1);
    }
    const findDuplicates = Object.values(filteredWord);
    const hasDuplicates = findDuplicates.includes(2, 0);
    result.inputWordArray = [...result.inputWordArray, current];
    if (hasDuplicates) {
      result.outputWordArray = [...result.outputWordArray, current]
    };
    filteredWord = {};
    return result;
  }, {inputWordArray: [], outputWordArray: []});
};
stdin.on('data', input => {
  let word = input.toString();
  const dataToRender = onFilterInput(word);
  if (!dataToRender.outputWordArray.length) {
    stdout.write(`Input: ${dataToRender.inputWordArray} \n Output: No matches, array is empty. \n`);
  } else {
    stdout.write(`Input: ${dataToRender.inputWordArray} \n Output: ${dataToRender.outputWordArray} \n`);
  }
});