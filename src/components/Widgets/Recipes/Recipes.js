import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "../../UIElements/Button";

import "./Recipes.scss";

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
    <div className="recipes-row">
      <h2 className="text-center">Recipes</h2>
      <div className="recipe-cards d-flex flex-wrap align-items-center">
        {Object.keys(recipes).map((keyName, i) => (
          <div
            className="card recipes-card"
            key={recipes[keyName].recipe.label}
          >
            <a href={recipes[keyName].recipe.uri}>
              <div className="card-body">
                <div className="recipe-title-container">
                  <h5 className="card-title">
                    {recipes[keyName].recipe.label}
                  </h5>
                </div>
                <img src={recipes[keyName].recipe.image} alt="" />
                <p>
                  Servings: {recipes[keyName].recipe.yield} | Calories:
                  {Math.round(
                    recipes[keyName].recipe.calories /
                      recipes[keyName].recipe.yield
                  )}{" "}
                  | Protien:
                  {Math.round(
                    recipes[keyName].recipe.totalNutrients.PROCNT.quantity /
                      recipes[keyName].recipe.yield
                  )}
                  g | Carbs:
                  {Math.round(
                    recipes[keyName].recipe.totalNutrients.CHOCDF.quantity /
                      recipes[keyName].recipe.yield
                  )}
                  g | Fats:
                  {Math.round(
                    recipes[keyName].recipe.totalNutrients.FAT.quantity /
                      recipes[keyName].recipe.yield
                  )}
                  g
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
      <Button classNames="btn-primary" onClickEvent={newRecipesClickHandler}>
        New Recipes
      </Button>
    </div>
  );
};

export default Recipes;
