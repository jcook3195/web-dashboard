import React, { useState, useEffect } from "react";
import axios from "axios";

// import quotes from "../../../data/quotes_0.json";

import "./Quotes.scss";

// const pickQuote = (quotes) => {
//   const keys = Object.keys(quotes);
//   const randomIndex = Math.floor(Math.random() * keys.length);
//   const randomKey = keys[randomIndex];
//   const quote = quotes[randomKey];

//   return quote;
// };

const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const rndInt = randomIntFromInterval(1, 50);

const Quotes = () => {
  const [singleQuote, setSingleQuote] = useState();
  const [singleAuthor, setSingleAuthor] = useState();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios
      .post(
        `https://zenquotes.io/api/quotes/${process.env.REACT_APP_QUOTES_API_KEY}`
      )
      .then((response) => {
        const allQuotes = response.data;

        setSingleQuote(allQuotes[rndInt].q);
        setSingleAuthor(allQuotes[rndInt].a);
        setQuotes(allQuotes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-3 mb-3 quote-card">
      <div className="text-center">
        <h1 className="card-title">
          <blockquote>"{singleQuote}"</blockquote>
        </h1>
        <h2 className="card-text">
          <em>- {singleAuthor}</em>
        </h2>
      </div>
    </div>
  );
};

export default Quotes;
