"use client";

import React from "react";

type FileNameProps = {
  name: string;
  entry: File;
  //
};

export const FileName: React.FC<FileNameProps> = ({ name }) => {
  const onChangeHandler = (e: any) => {
    console.log(e.target.innerText, name);
  };

  return (
    <span contentEditable="plaintext-only" onInput={onChangeHandler}>
      {name}
    </span>
  );
};
