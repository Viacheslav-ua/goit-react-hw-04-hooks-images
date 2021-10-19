import React, { Component } from "react";
import { ImSearch } from "react-icons/im";
import S from "./Searchbar.module.css";
import { toast } from 'react-toastify';

interface propsType {
  onSubmit: any;
}

export default class Searchbar extends Component<propsType> {
  state = {
    keyword: "",
  }

  handleInputChang = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.keyword.trim() === "") {
      toast.error("Enter a word");
      return
    }
    this.props.onSubmit(this.state.keyword)
  }

  render() {
    return (
      <header className={S.Searchbar}>
        <form className={S.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={S.Button}>
            <ImSearch />
            <span className={S.ButtonLabel}>Search</span>
          </button>

          <input
            className={S.Input}
            name="keyword"
            value={this.state.keyword}
            type="text"
            onChange={this.handleInputChang}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
