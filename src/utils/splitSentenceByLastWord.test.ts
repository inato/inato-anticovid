import { splitSentenceByLastWord } from "./splitSentenceByLastWord";

describe("splitSentenceByLastWord", () => {
  it("should split a sentence into two parts with second part containing the last word", () => {
    const sentence = `Proflaxis Using Hydroxychloroquine Plus Vitamins-Zinc During COVID-19 Pandemia`;
    const [firstPart, lastPart] = splitSentenceByLastWord(sentence);

    expect(firstPart).toBe(
      `Proflaxis Using Hydroxychloroquine Plus Vitamins-Zinc During COVID-19`
    );

    expect(lastPart).toBe(`Pandemia`);
  });

  it("should split a empty string into two empty strings", () => {
    const sentence = ``;
    const [firstPart, lastPart] = splitSentenceByLastWord(sentence);

    expect(firstPart).toBe(``);

    expect(lastPart).toBe(``);
  });

  it("should split a one-word string into one empty string and one string containing the word", () => {
    const sentence = `one-word`;
    const [firstPart, lastPart] = splitSentenceByLastWord(sentence);

    expect(firstPart).toBe(``);

    expect(lastPart).toBe(`one-word`);
  });
});
