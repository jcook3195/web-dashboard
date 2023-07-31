import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "../../UIElements/Button";
import Notice from "../../UIElements/Notice";

import { createRecipeDoc, getSavedRecipes } from "../../../firebase/crud";
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
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [showNotice, setShowNotice] = useState(false);
  const [noticeMsg, setNoticeMsg] = useState("This is a notice");
  const [noticeType, setNoticeType] = useState("danger");

  const noticeTimer = (msg) => {
    setNoticeMsg(msg);
    setShowNotice(true);
    setNoticeType("success");

    setTimeout(() => {
      setShowNotice(false);
    }, 5000);
  };

  const newRecipesClickHandler = async () => {
    const result = await axios(
      "https://api.edamam.com/api/recipes/v2?type=public&app_id=6949de07&app_key=%2034e1e73afd47b00b76c47ce820741f74&diet=high-protein&calories=10-650&imageSize=LARGE&imageSize=REGULAR&random=true"
    );

    setRecipes(result.data.hits);
  };

  const saveRecipeClickHandler = (data) => {
    console.log("saving this recipe...");
    const imgUrl = data.recipe.image;
    const recUrl = data.recipe.url;
    const cleanImgUrl = imgUrl.replace(/['"]+/g, "");
    const cleanRecUrl = recUrl.replace(/['"]+/g, "");
    console.log("clean urls");
    console.log(cleanImgUrl);
    console.log(cleanRecUrl);

    const recipe = {
      title: data.recipe.label,
      url: data.recipe.url,
      img: data.recipe.image,
      servings: data.recipe.yield,
      calories: data.recipe.calories,
      protein: data.recipe.totalNutrients.PROCNT.quantity,
      carbs: data.recipe.totalNutrients.CHOCDF.quantity,
      fats: data.recipe.totalNutrients.FAT.quantity,
    };

    createRecipeDoc(recipe);
    console.log(recipe);
    noticeTimer(`${recipe.title} recipe has been saved.`);
    fetchSavedRecipesAfterSave();
  };

  const fetchSavedRecipesAfterSave = async () => {
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

  useEffect(() => {
    const fetchRecipes = async () => {
      const result = await axios(
        "https://api.edamam.com/api/recipes/v2?type=public&app_id=6949de07&app_key=%2034e1e73afd47b00b76c47ce820741f74&diet=high-protein&calories=10-650&imageSize=LARGE&imageSize=REGULAR&random=true"
      );

      setRecipes(result.data.hits);
    };

    const fetchSavedRecipes = async () => {
      let savedRecipes = [];
      const result = await getSavedRecipes();

      result.forEach((doc) => {
        savedRecipes.push({
          id: doc.id,
          recipe: doc.data(),
        });
      });

      console.log("saved recipes new shit");
      console.log(savedRecipes);

      setSavedRecipes(savedRecipes);
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  useEffect(() => {
    console.log("SAVED RECIPES:");
    console.log(savedRecipes);
  }, [savedRecipes]);

  return (
    <React.Fragment>
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
                  href={recipes[keyName].recipe.url}
                  title={recipes[keyName].recipe.label}
                  target="_blank"
                  rel="noreferrer"
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
                          {formatMacroServings(
                            recipes[keyName].recipe.yield,
                            recipes[keyName].recipe.calories
                          )}
                          | P-
                          {formatMacroServings(
                            recipes[keyName].recipe.yield,
                            recipes[keyName].recipe.totalNutrients.PROCNT
                              .quantity
                          )}
                          g | C-
                          {formatMacroServings(
                            recipes[keyName].recipe.yield,
                            recipes[keyName].recipe.totalNutrients.CHOCDF
                              .quantity
                          )}
                          g | F-
                          {formatMacroServings(
                            recipes[keyName].recipe.yield,
                            recipes[keyName].recipe.totalNutrients.FAT.quantity
                          )}
                          g
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
                <div className="card-subfooter pt-2 pb-2 w-100">
                  <div className="row">
                    <div className="col-12 text-center">
                      <Button
                        classNames="btn-custom"
                        onClickEvent={() =>
                          saveRecipeClickHandler(recipes[keyName])
                        }
                      >
                        Save Recipe
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 text-center">
          <Button classNames="btn-custom" onClickEvent={newRecipesClickHandler}>
            Load New Recipes
          </Button>
        </div>
      </div>
      {showNotice && <Notice alertType={noticeType}>{noticeMsg}</Notice>}
      <div className="row saved-recipes-row mt-5 mb-5">
        <div className="col-12 text-center">
          <hr className="mb-5" />
          <h1>Saved Recipes</h1>
        </div>
        <div className="col-12">
          {Object.keys(savedRecipes).map((key) => {
            const recImgUrl = savedRecipes[key].recipe.recipe.img;
            const recUrl = savedRecipes[key].recipe.recipe.url;
            const cleanImgUrl = recImgUrl.replace(/['"]+/g, "");
            const cleanRecUrl = recUrl.replace(/['"]+/g, "");

            return (
              <div
                className="row justify-content-center"
                key={savedRecipes[key]}
              >
                <div className="col-8">
                  <a href={cleanRecUrl} target="_blank" rel="noreferrer">
                    <div className="saved-recipe-container d-flex justify-content-between align-items-center mt-2 mb-2 p-2 pt-4 pb-4">
                      <div className="saved-recipe-img-container">
                        <img
                          src={cleanImgUrl}
                          alt={savedRecipes[key].recipe.recipe.title + " image"}
                        />
                      </div>
                      <div className="saved-recipe-title-container text-center">
                        <h4>{savedRecipes[key].recipe.recipe.title}</h4>
                      </div>
                      <div className="saved-recipe-info-container text-center">
                        <p>
                          Serves:
                          {" " + savedRecipes[key].recipe.recipe.servings}{" "}
                          <br />
                          Cals:
                          {formatMacroServings(
                            savedRecipes[key].recipe.recipe.servings,
                            savedRecipes[key].recipe.recipe.calories
                          ) + " "}
                          | P:
                          {formatMacroServings(
                            savedRecipes[key].recipe.recipe.servings,
                            savedRecipes[key].recipe.recipe.protein
                          ) + " "}
                          | C:
                          {formatMacroServings(
                            savedRecipes[key].recipe.recipe.servings,
                            savedRecipes[key].recipe.recipe.carbs
                          ) + " "}
                          | F:
                          {formatMacroServings(
                            savedRecipes[key].recipe.recipe.servings,
                            savedRecipes[key].recipe.recipe.fats
                          )}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Recipes;
