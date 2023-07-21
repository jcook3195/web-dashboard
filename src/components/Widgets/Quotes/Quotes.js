import React, { useState } from "react";

import quotes from "../../../data/quotes_0.json";

import "./Quotes.scss";

const pickQuote = (quotes) => {
  const keys = Object.keys(quotes);
  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex];
  const quote = quotes[randomKey];

  return quote;
};

const Quotes = () => {
  const [quote, setQuote] = useState(pickQuote(quotes));

  const quoteClickHandler = () => {
    setQuote(pickQuote(quotes));
    console.log(quote);
  };

  return (
    <div className="card quote-card">
      <div className="card-body">
        <h5 className="card-title">{quote.quote}</h5>
        <p className="card-text">
          <em>- {quote.author}</em>
        </p>
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col-6">
            <p className="card-text">
              Categories:
              <br />
              {quote.category}
            </p>
          </div>
          <div className="col-6 text-right">
            <button className="btn btn-secondary" onClick={quoteClickHandler}>
              New Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
