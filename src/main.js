import "./style.css";
import { fetchCards, renderCards } from "./Cards/cards.js";
export const BASE_URL = "https://dragonball-api.com/api";

// Obtener y mostrar las cards
fetchCards()
  .then((data) => {
    renderCards(data);
  })
  .catch((error) => {
    console.error("Error al cargar los personajes:", error);
  });
