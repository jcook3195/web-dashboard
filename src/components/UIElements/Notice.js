import React from "react";

import "./Notice.scss";

const Notice = (props) => {
  return (
    <div className={`alert alert-${props.alertType}`} role="alert">
      {props.children}
    </div>
  );
};

export default Notice;
