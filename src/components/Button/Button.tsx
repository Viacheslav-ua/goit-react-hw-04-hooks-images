import React from "react";
import S from "./Button.module.css"

const Button: React.FC<any> = ({onLoadMore}) => (
  <button type="button" onClick={onLoadMore} className={S.Button}>Load more</button>
)
export default Button;
