import React, { useEffect } from "react";
import axios from "axios";

import "./Workout.scss";

const Workout = () => {
  const getExercises = async () => {
    const config = {
      headers: {
        Authorization: "Token 25ed6f16dfe35327cf2efa8f85ca53ecf1aff153",
      },
    };

    const url = "https://wger.de/api/v2/exercise/";

    const exercises = await axios
      .get(url, config)
      .then((res) => console.log(res.data.results))
      .catch((err) => console.log(err));

    return exercises;
  };

  useEffect(() => {
    getExercises();
  }, []);

  return <div>Workout</div>;
};

export default Workout;
