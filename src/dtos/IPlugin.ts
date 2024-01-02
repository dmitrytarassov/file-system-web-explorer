export interface IPlugin {
  (
    text: string,
    options: {
      language: string;
      cursorPosition: number;
      selectionStart: number;
      selectionEnd: number;
    },
    originalText: string
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
  };
}
