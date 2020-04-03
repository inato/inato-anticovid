export const splitSentenceByLastWord = (sentence: string) => {
  const splitTitle = sentence.split(` `);
  const lastWord = splitTitle.pop();
  const firstPart = splitTitle.join(` `);

  return [firstPart, lastWord];
};
