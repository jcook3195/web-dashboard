import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Workout.scss";

const Workout = () => {
  const [exercises, setExercises] = useState([]);
  const [prevPage, setPrevPage] = useState();
  const [nextPage, setNextPage] = useState();

  const muscles = {
    1: "Biceps",
    2: "Rear Delts",
    3: "Serratus Anterior",
    4: "Pecs",
    5: "Triceps",
    6: "Abs",
    7: "Calves(Outer)",
    8: "Ass",
    9: "Traps",
    10: "Quads",
    11: "Hamstrings",
    12: "Lats",
    13: "Brachialis",
    14: "Obliques",
    15: "Calves(Inner)",
  };

  const prevClickHandler = () => {
    console.log(prevPage);
    if (prevPage === null) {
      return null;
    } else {
      getExercises(prevPage);
    }

    console.log(exercises);
  };

  const nextClickHandler = () => {
    console.log(nextPage);
    getExercises(nextPage);
    console.log(exercises);
  };

  const getExercises = async (url) => {
    const config = {
      headers: {
        Authorization: "Token 25ed6f16dfe35327cf2efa8f85ca53ecf1aff153",
      },
    };

    const exercises = await axios
      .get(url, config)
      .then((res) => {
        console.log(res.data);
        setExercises(res.data.results);
        setPrevPage(res.data.previous);
        setNextPage(res.data.next);
      })
      .catch((err) => console.log(err));

    return exercises;
  };

  const getMuscles = async (url) => {
    const config = {
      headers: {
        Authorization: "Token 25ed6f16dfe35327cf2efa8f85ca53ecf1aff153",
      },
    };

    const muscles = await axios
      .get(url, config)
      .then((res) => {
        console.log(res.data);
        setExercises(res.data.results);
        setPrevPage(res.data.previous);
        setNextPage(res.data.next);
      })
      .catch((err) => console.log(err));

    return muscles;
  };

  useEffect(() => {
    getExercises("https://wger.de/api/v2/exercise/");
    getMuscles("https://wger.de/api/v2/muscle/");
  }, []);

  return (
    <div className="row">
      <div className="col 12">
        <ul>
          {Object.keys(exercises).map((key) => (
            <li>
              {exercises[key].name} - Muscle: {muscles[exercises[key].muscles]}
            </li>
          ))}
        </ul>
        <button onClick={prevClickHandler}>Prev</button>
        <button onClick={nextClickHandler}>Next</button>
      </div>
    </div>
  );
};

export default Workout;
