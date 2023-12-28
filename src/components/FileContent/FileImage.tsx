"use client";

import React from "react";

import styles from "./styles.module.css";

type FileImageProps = {
  //
  fileName: string;
  fileData: string;
  file: File;
};

export const FileImage: React.FC<FileImageProps> = ({
  fileName,
  fileData,
  file,
}) => {
  const [imageData, set_imageData] = React.useState<string>("");

  React.useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      set_imageData(reader.result as string);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }, [file]);
  // console.log(atob(fileData));
  return (
    <div className={styles.imageContainer}>
      <img src={imageData} />
    </div>
  );
};
