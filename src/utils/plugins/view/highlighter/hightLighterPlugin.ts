import { common, createLowlight } from "lowlight";

import { IPlugin } from "../../../../dtos/IPlugin";

const lowlight = createLowlight(common);

export const highLighterPlugin: IPlugin = (text, options, originalText) => {
  const tree = lowlight.highlight("js", originalText);

  console.log(tree);
  // text.replace("__CURSOR_POSITION");
  return { text, options, originalText };
};
