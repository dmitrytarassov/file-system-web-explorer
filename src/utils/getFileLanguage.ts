export function getFileLanguage(fileName?: string): string {
  if (!fileName) {
    return "text";
  }
  const [ext, ...rest]: string[] = fileName.split(".").reverse() || ["", ""];

  const name = rest.join(".");

  let lang =
    {
      ts: "typescript",
      js: "javascript",
      json: "json",
      cpp: "cpp",
      h: "cpp",
      md: "markdown",
      txt: "text",
    }[ext] || "";

  if (name.includes("CMake")) {
    lang = "cpp";
  } else if (name === ".gitignore") {
    lang = "git";
  }

  return lang;
}
