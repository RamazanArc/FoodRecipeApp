import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
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
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    }
    fetchFood();
  }, [foodId]);
  // foodId her değiştiğinde fetch işlemi tekrar yapılacak
  return (
    <div>
      Food Details {foodId}
      {food.title}
      <img src={food.image} alt="" />
    </div>
  );
}
