export interface IPlugin {
  (
    text: string,
    options: {
      cursorPosition: number;
      selectionStart: number;
      selectionEnd: number;
    }
  ): {
    text: string;
    options: {
      cursorPosition: number;
      selectionStart: number;
      selectionEnd: number;
    };
  };
}
