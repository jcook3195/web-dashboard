import React from "react";

import "./DateModal.scss";

const DateModal = () => {
  const months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  const date = new Date();
  const month = date.getMonth();

  console.log(month);

  return (
    <div className="date-modal-container">
      <h2>{months[6] + " " + date.getDate()}</h2>
    </div>
  );
};

export default DateModal;
