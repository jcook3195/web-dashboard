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
  // const [quote, setQuote] = useState(pickQuote(quotes));
  const [singleQuote, setSingleQuote] = useState();
  const [singleAuthor, setSingleAuthor] = useState();
  const [quotes, setQuotes] = useState([]);

  // const quoteClickHandler = () => {
  //   setQuotes(pickQuote(quotes));
  //   console.log(quotes);
  // CHANGE OF PLANS IN HERE, NOW YOU NEED TO GENERATE A NEW INDEX BETWEEN 1-50 AND GET A RANDOM QUOTE FROM QUOTES STATE
  // };

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
    <div className="card quote-card">
      <div className="card-body text-center">
        <h5 className="card-title">{singleQuote}</h5>
        <p className="card-text">
          <em>- {singleAuthor}</em>
        </p>
      </div>
    </div>
  );
};

export default Quotes;
