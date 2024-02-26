import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from "./fooddetails.module.css";
export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "68546968b23e4b83adca05483f3e46df";
  useEffect(() => {
    async function fetchFood() {
      try {
        const response = await axios.get(URL, {
          params: {
            apiKey: API_KEY,
          },
        });
        console.log(response.data);
        setFood(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    }
    fetchFood();
  }, [foodId]);
  // foodId her değiştiğinde fetch işlemi tekrar yapılacak
  return (
    <div className={styles.recipeCard}>
      <div>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⏰{food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            👦<strong>Serves {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🍎 Vegetarian" : "🍖 Non-Vegetarian"}
            </strong>
          </span>
        </div>
        <div>
          <strong>
            $<span>{food.pricePerServing / 100} Per Serving</span>
          </strong>
        </div>
      </div>

      <h2>Instructions</h2>
      <div className={styles.recipeInstructions}>
        <ol>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            food.analyzedInstructions[0].steps.map((step) => (
              <li>{step.step}</li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}
