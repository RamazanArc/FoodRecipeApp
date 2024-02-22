import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "68546968b23e4b83adca05483f3e46df";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");
  useEffect(() => {
    async function fetchFood() {
      try {
        const response = await axios.get(URL, {
          params: {
            query: query,
            apiKey: API_KEY,
          },
        });
        console.log(response.data.results);
        setFoodData(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchFood();
  }, [query]);
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
    </div>
  );
}
