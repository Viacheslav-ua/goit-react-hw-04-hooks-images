import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import S from "./App.module.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import Modal from "./components/Modal"
import Loader from "./components/Loader"
type Picture = {
  id: number;
  webformatURL: string;
  largeImageURL: string;
};

interface StateTypes {
  pictures: Picture[];
  keyword: string;
  page: number;
  largeURL: string;
  loading: boolean;
  showModal: boolean;
}

class App extends Component {
  state: StateTypes = {
    pictures: [],
    keyword: "",
    page: 1,
    largeURL: "",
    loading: false,
    showModal: false,
  };

  componentDidUpdate(prevProps: any, prevState: StateTypes) {
    if (prevState.keyword !== this.state.keyword 
      || prevState.page !== this.state.page) {
            this.responseAPI(this.state.keyword, this.state.page)
    }

    if (prevState.pictures !== this.state.pictures) {
      if(prevState.pictures.length !== 0) {
        window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
        });
      }
    }
  }

  responseAPI = (keyword: string, page: number) => {
    const BASE_URL = "https://pixabay.com/api/";
    const API_KEY = "22997657-91d4620e666f378f8f41767fa";
    this.setState({ loading: true });
    fetch(
      `${BASE_URL}?q=${keyword}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(res => {

        if (res.totalHits === 0) {
          return Promise.reject(new Error('No images matching the search string'))
        }
        return res
      })

      .then((res) => this.getPictures(res))
      .catch(err => {
        toast.error(err.message)
      })
      .finally(() => this.setState({ loading: false }))
  };

  getPictures = (obj: any) => {
    const arrPictures = obj.hits.map((item: Picture) => {
      return {
        id: item.id,
        webformatURL: item.webformatURL,
        largeImageURL: item.largeImageURL,
      };
    });

    this.setState((prevState: StateTypes) => {
    return { pictures: [...prevState.pictures, ...arrPictures] }
    });
  };

  setKeyword = (str: string) => {
    this.setState({
      keyword: str,
      page: 1,
      pictures: [],
    });
  }

  onLoadMore = () => {
    this.setState((prevState: StateTypes) => ({ page: prevState.page + 1 }));
  }

  toggleModal = (): void => {
    this.setState(({ showModal }: StateTypes) => ({
      showModal: !showModal,
    }));
  };

  openModalPicture = (url: string) => {
    this.setState({ largeURL: url, showModal: true })
  }

  render() {
    return (
      <div className={S.App}>
        <Searchbar onSubmit={this.setKeyword} />
        
        {this.state.loading && <Loader />}
        <ImageGallery >
          {this.state.pictures.map((item: Picture) => (
            <ImageGalleryItem
              key={item.id}
              largeImageURL={item.largeImageURL}
              webformatURL={item.webformatURL}
              openModal={this.openModalPicture} />
          ))}
        </ImageGallery>
        {(this.state.pictures.length % 12 === 0 
          && this.state.pictures.length !== 0) && <Button onLoadMore={this.onLoadMore} />}
        
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.largeURL} alt="" />
          </Modal>
          
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
export default App;
