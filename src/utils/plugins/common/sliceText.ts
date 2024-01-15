export const sliceText = (
  text: string,
  start: number,
  end: number
): [string, string] => {
  const _originalText = text;

  const _end = _originalText.slice(end);
  const _start = _originalText.slice(0, start);

  return [_start, _end];
};
