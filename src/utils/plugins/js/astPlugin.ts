// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AbstractSyntaxTree from "abstract-syntax-tree";
import eslint, { AST } from "eslint";

import { IPlugin } from "../../../dtos/IPlugin";

export const astPlugin: IPlugin = (text, options, originalText) => {
  if (options.language === "javascript") {
    eslint.ESLint;
    const ast = new AbstractSyntaxTree(originalText);
    console.log(ast);
  }

  return {
    text,
    options,
    originalText,
  };
};
