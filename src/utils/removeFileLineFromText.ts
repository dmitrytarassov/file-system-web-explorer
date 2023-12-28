export const removeFileLineFromText = (text: string): string =>
  text
    .split("\n")
    .map((line, index) =>
      line.startsWith(`${index + 1} `)
        ? line.replace(`${index + 1} `, "")
        : line
    )
    .join("\n");
