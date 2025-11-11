import {
  getFavorites,
  removeFavorite,
  STORAGE_KEYS,
} from "../utils/localStorage.js";
import "./favoritos.css";

/**
 * Crea una card de personaje favorito
 * @param {Object} personaje - Datos del personaje
 * @returns {HTMLElement} Card del personaje
 */
function createCharacterCard(personaje) {
  const card = document.createElement("article");
  card.className = "card-favorito";

  card.innerHTML = `
    <h3>${personaje.name}</h3>
    
    <div class="card-image-container">
      <button class="remove-btn" data-id="${personaje.id}" data-type="character"></button>
      <img src="${personaje.image}" alt="${personaje.name}" />
    </div>
    
    <p><strong>Raza:</strong> ${personaje.race}</p>
    <p><strong>KI:</strong> ${personaje.ki}</p>
    <p><strong>Género:</strong> ${personaje.gender}</p>
  `;

  return card;
}

/**
 * Crea una card de planeta favorito
 * @param {Object} planeta - Datos del planeta
 * @returns {HTMLElement} Card del planeta
 */
function createPlanetCard(planeta) {
  const card = document.createElement("article");
  card.className = "card-favorito";

  card.innerHTML = `
    <h3>${planeta.name}</h3>
    
    <div class="card-image-container">
      <button class="remove-btn" data-id="${
        planeta.id
      }" data-type="planet"></button>
      <img src="${planeta.image}" alt="${planeta.name}" />
    </div>
    
    <p><strong>Destruido:</strong> ${planeta.isDestroyed ? "Sí" : "No"}</p>
    <p><strong>Descripción:</strong> ${planeta.description}</p>
  `;

  return card;
}

/**
 * Muestra mensaje cuando no hay favoritos
 * @param {HTMLElement} container - Contenedor donde mostrar el mensaje
 * @param {string} message - Mensaje a mostrar
 */
function showEmptyMessage(container, message) {
  const emptyDiv = document.createElement("div");
  emptyDiv.className = "empty-message";
  emptyDiv.textContent = message;
  container.appendChild(emptyDiv);
}

/**
 * Renderiza personajes favoritos
 */
export function renderFavoriteCharacters() {
  const container = document.querySelector("#favoritos-personajes");
  if (!container) return;

  container.innerHTML = "";
  const favoriteCharacters = getFavorites(STORAGE_KEYS.CHARACTERS);

  if (favoriteCharacters.length === 0) {
    showEmptyMessage(container, "No hay personajes favoritos aún 😢");
    return;
  }

  favoriteCharacters.forEach((personaje) => {
    const card = createCharacterCard(personaje);
    container.appendChild(card);
  });
}

/**
 * Renderiza planetas favoritos
 */
export function renderFavoritePlanets() {
  const container = document.querySelector("#favoritos-planetas");
  if (!container) return;

  container.innerHTML = "";
  const favoritePlanets = getFavorites(STORAGE_KEYS.PLANETS);

  if (favoritePlanets.length === 0) {
    showEmptyMessage(container, "No hay planetas favoritos aún 😢");
    return;
  }

  favoritePlanets.forEach((planeta) => {
    const card = createPlanetCard(planeta);
    container.appendChild(card);
  });
}

/**
 * Maneja el click en botones de eliminar
 * @param {Event} e - Evento de click
 */
function handleRemoveClick(e) {
  if (!e.target.classList.contains("remove-btn")) return;

  const { id, type } = e.target.dataset;
  const itemId = parseInt(id);

  if (type === "character") {
    removeFavorite(STORAGE_KEYS.CHARACTERS, itemId);
    renderFavoriteCharacters();
  } else if (type === "planet") {
    removeFavorite(STORAGE_KEYS.PLANETS, itemId);
    renderFavoritePlanets();
  }
}

/**
 * Inicializa la página de favoritos
 */
export function initFavorites() {
  renderFavoriteCharacters();
  renderFavoritePlanets();

  // Event delegation para los botones de eliminar
  document.addEventListener("click", handleRemoveClick);
}
