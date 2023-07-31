import {
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  collection,
} from "@firebase/firestore";
import { firestore } from "../firebase";

const createRecipeDoc = (recipeData) => {
  const ref = collection(firestore, "recipes"); // Firebase creates this automatically

  let data = {
    recipe: recipeData,
  };

  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};

const removeRecipeDoc = async (recipeId) => {
  await deleteDoc(doc(firestore, "recipes", recipeId));

  return true;
};

const getSavedRecipes = async () => {
  const ref = collection(firestore, "recipes");

  try {
    const savedRecipes = await getDocs(ref);

    return savedRecipes;
  } catch (err) {
    console.log(err);
  }
};

export { createRecipeDoc, removeRecipeDoc, getSavedRecipes };
