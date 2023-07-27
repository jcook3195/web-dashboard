import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "../../UIElements/Button";

import "./Recipes.scss";

const limitStrtingLength = (str) => {
  if (str.length > 40) {
    const shortStr = str.substring(0, 39);
    const formattedStr = shortStr.trim() + "...";

    return formattedStr;
  } else {
    return str;
  }
};

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  const newRecipesClickHandler = async () => {
    const result = await axios(
      "https://api.edamam.com/api/recipes/v2?type=public&app_id=6949de07&app_key=%2034e1e73afd47b00b76c47ce820741f74&diet=high-protein&calories=10-650&imageSize=LARGE&imageSize=REGULAR&random=true"
    );

    setRecipes(result.data.hits);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const result = await axios(
        "https://api.edamam.com/api/recipes/v2?type=public&app_id=6949de07&app_key=%2034e1e73afd47b00b76c47ce820741f74&diet=high-protein&calories=10-650&imageSize=LARGE&imageSize=REGULAR&random=true"
      );

      setRecipes(result.data.hits);
    };

    fetchRecipes();
  }, []);

  return (
    <div className="row recipes-row">
      <div className="col-12">
        <h2 className="text-center recipes-header">The Menu</h2>
        <div className="recipe-cards d-flex flex-wrap align-items-center mb-5">
          {Object.keys(recipes).map((keyName, i) => (
            <div
              className="card recipes-card"
              key={recipes[keyName].recipe.label}
            >
              <a
                href={recipes[keyName].recipe.uri}
                title={recipes[keyName].recipe.label}
              >
                <div className="card-body">
                  <div className="recipe-title-container">
                    <h5 className="card-title">
                      {limitStrtingLength(recipes[keyName].recipe.label)}
                    </h5>
                  </div>
                  <img src={recipes[keyName].recipe.image} alt="" />
                </div>
                <div className="card-footer">
                  <div className="row">
                    <div className="col-12 text-center">
                      <p>{recipes[keyName].recipe.yield} Servings</p>
                    </div>
                    <div className="col-12 text-center">
                      <p>
                        Cals-
                        {Math.round(
                          recipes[keyName].recipe.calories /
                            recipes[keyName].recipe.yield
                        )}{" "}
                        | P-
                        {Math.round(
                          recipes[keyName].recipe.totalNutrients.PROCNT
                            .quantity / recipes[keyName].recipe.yield
                        )}
                        g | C-
                        {Math.round(
                          recipes[keyName].recipe.totalNutrients.CHOCDF
                            .quantity / recipes[keyName].recipe.yield
                        )}
                        g | F-
                        {Math.round(
                          recipes[keyName].recipe.totalNutrients.FAT.quantity /
                            recipes[keyName].recipe.yield
                        )}
                        g
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 text-center">
        <Button classNames="btn-custom" onClickEvent={newRecipesClickHandler}>
          New Recipes
        </Button>
      </div>
    </div>
  );
};

export default Recipes;
