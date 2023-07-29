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

// const savedRecipes = await

// savedRecipes.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
// });

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
    const recipe = {
      title: data.recipe.label,
      url: data.recipe.url,
      img: data.recipe.image,
      servings: data.recipe.yield,
      calories: data.recipe.calories / data.recipe.yield,
      protein: data.recipe.totalNutrients.PROCNT.quantity / data.recipe.yield,
      carbs: data.recipe.totalNutrients.CHOCDF.quantity / data.recipe.yield,
      fats: data.recipe.totalNutrients.FAT.quantity / data.recipe.yield,
    };

    createRecipeDoc(recipe);
    console.log(recipe);
    noticeTimer(`${recipe.title} recipe has been saved.`);
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

      setSavedRecipes(result);
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
                            recipes[keyName].recipe.totalNutrients.FAT
                              .quantity / recipes[keyName].recipe.yield
                          )}
                          g
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
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
            ))}
          </div>
        </div>
        <div className="col-12 text-center">
          <Button classNames="btn-custom" onClickEvent={newRecipesClickHandler}>
            New Recipes
          </Button>
        </div>
      </div>
      {showNotice && <Notice alertType={noticeType}>{noticeMsg}</Notice>}
      <div className="row saved-recipes-row">
        <div className="col-12">
          {Object.keys(savedRecipes).map((key) => (
            <div key={savedRecipes[key]}>{JSON.stringify(savedRecipes)}</div>
          ))}
          {/* {savedRecipes.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            <div key={doc.id}>
              <p>{doc.data().recipe.title}</p>
            </div>;
          })} */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Recipes;
