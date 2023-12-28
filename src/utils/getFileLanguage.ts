type FileLanguage = {
  type: "image" | "text" | "code";
  language?: string;
};

export function getFileLanguage(fileName?: string, size = 0): FileLanguage {
  if (!fileName) {
    return { type: "text" };
  }

  const [ext, ...rest]: string[] = fileName.split(".").reverse() || ["", ""];
  if (["png", "PNG", "jpg", "JPG", "webp", "svg", "gif", "ico"].includes(ext)) {
    return { type: "image" };
  }

  // 10 Kb
  if (size > 1024 * 10) {
    return { type: "text" };
  }

  const name = rest.join(".");

  let language =
    {
      ts: "typescript",
      js: "javascript",
      json: "json",
      cpp: "cpp",
      h: "cpp",
      md: "markdown",
    }[ext] || "";

  if (name.includes("CMake")) {
    language = "cpp";
  } else if (name === ".gitignore") {
    language = "git";
  }

  return {
    type: "code",
    language,
  };
}
