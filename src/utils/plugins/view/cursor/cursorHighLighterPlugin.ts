import { IPlugin } from "../../../../dtos/IPlugin";

export const cursorHighLighterPlugin: IPlugin = (
  text,
  options,
  originalText
) => {
  // text.replace("__CURSOR_POSITION");
  return { text, options, originalText };
};
