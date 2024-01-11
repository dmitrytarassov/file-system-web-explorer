import { toHtml } from "hast-util-to-html";
import { common, createLowlight } from "lowlight";
import "./dracula.css";

const lowlight = createLowlight(common);

import { IPlugin } from "../../../../dtos/IPlugin";

export const hePlugin: IPlugin = (text, options, originalText) => {
  const lang: string | undefined = {
    typescript: "ts",
    javascript: "js",
    markdown: "md",
    html: "html",
    css: "css",
  }[options.language];
  const newText = lang ? toHtml(lowlight.highlight(lang, text)) : text;

  return {
    text: newText,
    options: {
      ...options,
    },
    originalText,
  };
};
