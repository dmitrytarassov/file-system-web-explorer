export function getErrorDescription(input: string): string | null {
  switch (input) {
    case "The user aborted a request.":
      return null;
    default:
      return input;
  }
}
