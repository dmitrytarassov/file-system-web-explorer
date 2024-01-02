import { marked } from "marked";
import "./styles.css";

import { IPlugin } from "../../../dtos/IPlugin";

export const mdPreviewPlugin: IPlugin = (text, options, originalText) => {
  if (options.language !== "markdown") {
    return { text, options, originalText };
  }

  const md = marked.parse(originalText) as string;

  return {
    text,
    options,
    previewText: `<div class="md_container">${md.replaceAll(
      "<a ",
      "<a target='_blank' "
    )}</div>`,
    originalText,
  };
};
