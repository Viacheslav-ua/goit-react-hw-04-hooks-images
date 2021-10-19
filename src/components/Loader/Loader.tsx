import React from 'react';
import Spinner from 'react-loader-spinner';
import S from "./Loader.module.css"

 const Loader = () => (
  <div className={S.Loader}>
    <Spinner
            type="TailSpin"
            color="#00BFFF"
            height={80}
            width={80}
          />
  </div>
);
export default Loader