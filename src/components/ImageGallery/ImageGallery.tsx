import React from "react";
import S from "./ImageGallery.module.css";

interface PropsType {

}

const ImageGallery: React.FC<PropsType> = ({ children }) => {
  return (
    <ul className={S.ImageGallery}>
      {children}
    </ul>
  )
};
export default ImageGallery;
