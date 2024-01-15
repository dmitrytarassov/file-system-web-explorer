import { sliceText } from "./sliceText";

export const deleteSelection = (
  text: string,
  start: number,
  end: number
): string => {
  if (start === end) {
    return text;
  }

  const [_start, _end] = sliceText(text, start, end);

  return `${_start}${_end}`;
};
