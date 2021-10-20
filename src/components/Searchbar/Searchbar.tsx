import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import S from "./Searchbar.module.css";
import { toast } from "react-toastify";

interface propsType {
  onSubmit: any;
}

const Searchbar: React.FC<propsType> = ({ onSubmit }) => {
  const [keyword, setKeyword] = useState<string>("");

  const handleInputChang = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim() === "") {
      toast.error("Enter a word");
      return;
    }
    onSubmit(keyword);
  };

  return (
    <header className={S.Searchbar}>
      <form className={S.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={S.Button}>
          <ImSearch />
          <span className={S.ButtonLabel}>Search</span>
        </button>

        <input
          className={S.Input}
          name="keyword"
          value={keyword}
          type="text"
          onChange={handleInputChang}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
export default Searchbar;
