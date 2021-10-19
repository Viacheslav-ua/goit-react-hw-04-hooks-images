import React from "react";

import S from "./ImageGalleryItem.module.css";
type Picture = {
  key: number;
  largeImageURL: string;
  webformatURL: string;
  openModal: any;
};

const ImageGalleryItem: React.FC<Picture> = ({ webformatURL, openModal, largeImageURL}) => {
  return (
    <li className={S.GalleryItem}  onClick={() => openModal(largeImageURL)}>
      <img src={webformatURL} alt="Gallery item" className={S.Image} />
    </li>
  );
};
export default ImageGalleryItem;
