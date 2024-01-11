export interface IPlugin {
  (
    text: string,
    options: {
      language: string;
      cursorPosition: number;
      selectionStart: number;
      selectionEnd: number;
    },
    originalText: string,
    JS_AST?: any
  ): {
    text: string;
    options: {
      language: string;
      cursorPosition: number;
      selectionStart: number;
      selectionEnd: number;
    };
    previewText?: string;
    originalText: string;
    JS_AST?: any;
  };
}
