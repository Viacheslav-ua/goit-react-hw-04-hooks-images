/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import S from "./App.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import Modal from "./components/Modal";
import Loader from "./components/Loader";

type Picture = {
  id: number;
  webformatURL: string;
  largeImageURL: string;
};

const App: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [largeURL, setLargeURL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (keyword !== "") {
      responseAPI(keyword, page);
    }
  }, [keyword, page]);

  useEffect(() => {
    if (pictures.length !== 0) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [pictures]);

  const responseAPI = (keyword: string, page: number) => {
    const BASE_URL = "https://pixabay.com/api/";
    const API_KEY = "22997657-91d4620e666f378f8f41767fa";
    setLoading(true);
    fetch(
      `${BASE_URL}?q=${keyword}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.totalHits === 0) {
          return Promise.reject(
            new Error("No images matching the search string")
          );
        }
        return res;
      })

      .then((res) => getPictures(res))
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  const getPictures = (obj: any) => {
    const arrPictures: Picture[] = obj.hits.map((item: Picture) => {
      return {
        id: item.id,
        webformatURL: item.webformatURL,
        largeImageURL: item.largeImageURL,
      };
    });

    setPictures((state) => {
      return [...state, ...arrPictures];
    });
  };

  const resetState = (str: string) => {
    setKeyword(str);
    setPage(1);
    setPictures([]);
  };

  const onLoadMore = () => {
    setPage((state) => state + 1);
  };

  const toggleModal = (): void => {
    setShowModal((state) => !state);
  };

  const openModalPicture = (url: string) => {
    setLargeURL(url);
    setShowModal(true);
  };

  return (
    <div className={S.App}>
      <Searchbar onSubmit={resetState} />

      {loading && <Loader />}
      <ImageGallery>
        {pictures.map((item: Picture) => (
          <ImageGalleryItem
            key={item.id}
            largeImageURL={item.largeImageURL}
            webformatURL={item.webformatURL}
            openModal={openModalPicture}
          />
        ))}
      </ImageGallery>
      {pictures.length % 12 === 0 && pictures.length !== 0 && (
        <Button onLoadMore={onLoadMore} />
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeURL} alt="" />
        </Modal>
      )}

      <ToastContainer autoClose={3000} />
    </div>
  );
};
export default App;
