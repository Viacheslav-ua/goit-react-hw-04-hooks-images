import React, { Component } from "react";
import { createPortal } from "react-dom";
import S from "./Modal.module.css";

const modalRoot: any = document.querySelector("#modal-root");
interface PropsType {
  onClose: any;
}
export default class Modal extends Component<PropsType> {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={S.Overlay} onClick={this.handleBackdropClick}>
        <div className={S.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}