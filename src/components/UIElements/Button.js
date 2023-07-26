import React from "react";

import "./Button.scss";

const Button = (props) => {
  return (
    <button className={`btn ${props.classNames}`} onClick={props.onClickEvent}>
      {props.children}
    </button>
  );
};

export default Button;
