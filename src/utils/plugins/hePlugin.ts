import * as he from "he";

import { IPlugin } from "../../dtos/IPlugin";

export const hePlugin: IPlugin = (text, options) => {
  const optionValues = {
    cursorPosition:
      typeof options?.cursorPosition !== "undefined"
        ? options.cursorPosition
        : -1,
    selectionStart:
      typeof options?.selectionStart !== "undefined"
        ? options.selectionStart
        : -1,
    selectionEnd:
      typeof options?.selectionEnd !== "undefined" ? options.selectionEnd : -1,
  };

  let cursorPosition = optionValues.cursorPosition;
  let selectionStart = optionValues.selectionStart;
  let selectionEnd = optionValues.selectionEnd;

  let newText = "";

  for (const index in [...text]) {
    const letter = text[index];
    const encoded = he.encode(letter);
    const diff = encoded.length - letter.length;

    if (+index < optionValues.cursorPosition) {
      cursorPosition += diff;
    }
    if (+index < optionValues.selectionStart) {
      selectionStart += diff;
    }
    if (+index <= optionValues.selectionEnd) {
      selectionEnd += diff;
    }

    newText += encoded;
  }

  return {
    text: newText,
    options: {
      cursorPosition,
      selectionStart,
      selectionEnd,
    },
  };
};
