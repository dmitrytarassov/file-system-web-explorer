"use client";

import { FileOpen, Image, TextFields } from "@mui/icons-material";
import c from "programming-languages-logos/src/c/c.svg";
import cpp from "programming-languages-logos/src/cpp/cpp.svg";
import csharp from "programming-languages-logos/src/csharp/csharp.svg";
import css from "programming-languages-logos/src/css/css.svg";
import go from "programming-languages-logos/src/go/go.svg";
import haskell from "programming-languages-logos/src/haskell/haskell.svg";
import html from "programming-languages-logos/src/html/html.svg";
import java from "programming-languages-logos/src/java/java.svg";
import javascript from "programming-languages-logos/src/javascript/javascript.svg";
import kotlin from "programming-languages-logos/src/kotlin/kotlin.svg";
import lua from "programming-languages-logos/src/lua/lua.svg";
import php from "programming-languages-logos/src/php/php.svg";
import python from "programming-languages-logos/src/python/python.svg";
import r from "programming-languages-logos/src/r/r.svg";
import ruby from "programming-languages-logos/src/ruby/ruby.svg";
import swift from "programming-languages-logos/src/swift/swift.svg";
import typescript from "programming-languages-logos/src/typescript/typescript.svg";
import React from "react";

import { allIcons } from "./icons";

import { getFileInfo } from "../../utils/getFileInfo";

const icons: {
  [key: string]: string;
} = {
  ...allIcons,
  c,
  cpp,
  csharp,
  go,
  haskell,
  html,
  java,
  javascript,
  kotlin,
  lua,
  php,
  python,
  r,
  ruby,
  swift,
  typescript,
};

type LanguageLogoProps = {
  fileName: string;
  //
};

export const LanguageLogo: React.FC<LanguageLogoProps> = ({ fileName }) => {
  const info = getFileInfo(fileName);

  const frameworkLogo = info.framework ? icons[info.framework] : false;

  const icon = frameworkLogo || icons[info.language || ""];

  return (
    <>
      {info.type === "image" ? (
        <Image />
      ) : info.type === "text" ? (
        <TextFields />
      ) : icon ? (
        <img src={icon} alt={info.language} />
      ) : (
        <FileOpen />
      )}
    </>
  );
};
