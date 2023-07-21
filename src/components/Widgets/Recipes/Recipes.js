import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Recipes.scss";

// const getRecipes = () => {
//   axios
//     .get(
//       "https://api.edamam.com/api/recipes/v2?type=public&app_id=6949de07&app_key=%2034e1e73afd47b00b76c47ce820741f74&diet=high-protein&calories=10-650&imageSize=LARGE&imageSize=REGULAR&random=true"
//     )
//     .then((response) => {
//       const recipes = response.data.hits;
//       //   let newRec;

//       //   for (let i = 0; i <= recipes.length; i++) {
//       //     console.log(recipes[i].recipe);
//       //     newRec = recipes[i].recipe;
//       //   }
//     })
//     .catch((error) => {
//       console.log(error);
//       return "No recipes found";
//     });
// };

// const fetchRecipes = async () => {
//   const result = await axios(
//     "https://api.edamam.com/api/recipes/v2?type=public&app_id=6949de07&app_key=%2034e1e73afd47b00b76c47ce820741f74&diet=high-protein&calories=10-650&imageSize=LARGE&imageSize=REGULAR&random=true"
//   );

//   setRecipes(result.data.hits);
// };

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  // const recipesClickHandler = () => {
  //   setRecipes(fetchRecipes);
  //   console.log(recipes);
  // };

  const newRecipesClickHandler = async () => {
    const result = await axios(
      "https://api.edamam.com/api/recipes/v2?type=public&app_id=6949de07&app_key=%2034e1e73afd47b00b76c47ce820741f74&diet=high-protein&calories=10-650&imageSize=LARGE&imageSize=REGULAR&random=true"
    );

    console.log("new");
    console.log(result.data.hits);

    setRecipes(result.data.hits);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const result = await axios(
        "https://api.edamam.com/api/recipes/v2?type=public&app_id=6949de07&app_key=%2034e1e73afd47b00b76c47ce820741f74&diet=high-protein&calories=10-650&imageSize=LARGE&imageSize=REGULAR&random=true"
      );

      console.log("use effect");
      console.log(result.data.hits);

      setRecipes(result.data.hits);
    };

    fetchRecipes();
  }, []);

  //   useEffect(() => {
  //       axios
  //         .get(
  //           "https://api.edamam.com/api/recipes/v2?type=public&app_id=6949de07&app_key=%2034e1e73afd47b00b76c47ce820741f74&diet=high-protein&calories=10-650&imageSize=LARGE&imageSize=REGULAR&random=true"
  //         )
  //         .then((response) => {
  //           const recipes = response.data.hits;
  //           console.log(recipes);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //   }, []);

  return (
    <div className="recipes-row">
      <h2 className="text-center">Recipes</h2>
      <div className="recipe-cards d-flex flex-wrap align-items-center">
        {Object.keys(recipes).map((keyName, i) => (
          <div className="card recipes-card">
            <a href={recipes[keyName].recipe.uri}>
              <div className="card-body">
                <h5 className="card-title">{recipes[keyName].recipe.label}</h5>
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
      <button className="btn btn-secondary" onClick={newRecipesClickHandler}>
        New Recipes
      </button>
    </div>
  );
};

export default Recipes;
