import { FileType } from "../dtos/FileType";

type FileInfo = {
  type: FileType;
  language?: string;
  extension: string;
};

export function getFileInfo(fileName?: string, size = 0): FileInfo {
  if (!fileName) {
    throw new Error("Can not read wile info");
  }

  const [extension, ...rest]: string[] = fileName.split(".").reverse() || [
    "",
    "",
  ];
  if (
    ["png", "jpg", "webp", "svg", "gif", "ico"].includes(
      extension.toLowerCase()
    )
  ) {
    return { type: "image", extension };
  }

  // 10 Kb
  if (size > 1024 * 10) {
    return { type: "text", extension };
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
    }[extension] || "";

  if (name.includes("CMake")) {
    language = "cpp";
  } else if (name === ".gitignore") {
    language = "git";
  }

  return {
    type: "code",
    language,
    extension,
  };
}
