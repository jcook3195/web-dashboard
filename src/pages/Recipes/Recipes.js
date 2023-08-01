import React, { useEffect, useState } from "react";

import { getSavedRecipes } from "../../firebase/crud";
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

const formatMacroServings = (servings, macro) => {
  const perServing = macro / servings;
  const roundedMacroPerServing = Math.round(perServing);

  return roundedMacroPerServing;
};

const Recipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      let savedRecipes = [];
      const result = await getSavedRecipes();

      result.forEach((doc) => {
        savedRecipes.push({
          id: doc.id,
          recipe: doc.data(),
        });
      });

      setSavedRecipes(savedRecipes);
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className="row recipes-row">
      <div className="col-12">
        <h2 className="text-center recipes-header">Saved Recipes</h2>
        <div className="recipe-cards d-flex flex-wrap align-items-center mb-5">
          {Object.keys(savedRecipes).map((key, i) => {
            const recImgUrl = savedRecipes[key].recipe.recipe.img;
            const recUrl = savedRecipes[key].recipe.recipe.url;
            const cleanImgUrl = recImgUrl.replace(/['"]+/g, "");
            const cleanRecUrl = recUrl.replace(/['"]+/g, "");

            return (
              <div
                className="card recipes-card"
                key={savedRecipes[key].recipe.recipe.title + i}
              >
                <a
                  href={cleanRecUrl}
                  title={savedRecipes[key].recipe.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="card-body">
                    <div className="recipe-title-container">
                      <h5 className="card-title">
                        {limitStrtingLength(
                          savedRecipes[key].recipe.recipe.title
                        )}
                      </h5>
                    </div>
                    <img src={cleanImgUrl} alt="" />
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-12 text-center">
                        <p>
                          {savedRecipes[key].recipe.recipe.servings} Servings
                        </p>
                      </div>
                      <div className="col-12 text-center">
                        <p>
                          Cals-
                          {formatMacroServings(
                            savedRecipes[key].recipe.recipe.servings,
                            savedRecipes[key].recipe.recipe.calories
                          )}
                          | P-
                          {formatMacroServings(
                            savedRecipes[key].recipe.recipe.servings,
                            savedRecipes[key].recipe.recipe.protein
                          )}
                          g | C-
                          {formatMacroServings(
                            savedRecipes[key].recipe.recipe.servings,
                            savedRecipes[key].recipe.recipe.carbs
                          )}
                          g | F-
                          {formatMacroServings(
                            savedRecipes[key].recipe.recipe.servings,
                            savedRecipes[key].recipe.recipe.fat
                          )}
                          g
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
