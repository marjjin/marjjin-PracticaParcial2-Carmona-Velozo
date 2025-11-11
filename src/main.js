import { initHeader } from "./Header/header.js";
import { initFooter } from "./Footer/footer.js";
import "./style.css";

// -----------------------------
import {
  fetchCardsPersonajes,
  renderCardsPersonajes,
  fetchCardsPlanetas,
  renderCardsPlanetas,
} from "./CardsInicio/cards.js";
export const BASE_URL = "https://dragonball-api.com/api";

//----------------------------------------------
// Inicializa el header
initHeader();

//----------------------------------------------
fetchCardsPersonajes() //Muestra 6 personajes por página
  .then((data) => {
    renderCardsPersonajes(data);
  })
  .catch((error) => {
    console.error("Error al cargar los personajes:", error);
  });

fetchCardsPlanetas() //Muestra planetas de Dragon Ball
  .then((data) => {
    renderCardsPlanetas(data);
  })
  .catch((error) => {
    console.error("Error al cargar los planetas:", error);
  });
//----------------------------------------------
// Inicializa el footer
initFooter();
