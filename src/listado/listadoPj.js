import { BASE_URL } from "../main";
import "./listadoPj.css";
import {
  getFavorites,
  toggleFavorite,
  isFavorite,
  STORAGE_KEYS,
} from "../utils/localStorage.js";
import { initModal, openCharacterModal } from "../modal/modal.js";

async function fetchListadoPersonajes() {
  try {
    const res = await fetch(`${BASE_URL}/characters?limit=100`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
}

export async function renderListadoPersonajes() {
  const listado = document.querySelector("#listado-personajes");
  if (!listado) return;

  // Inicializar el modal
  initModal();

  const data = await fetchListadoPersonajes();
  const personajes = data.items || data;

  personajes.forEach((personaje) => {
    const card = document.createElement("article");
    card.className = "card-personaje";

    const isFav = isFavorite(STORAGE_KEYS.CHARACTERS, personaje.id);

    card.innerHTML = `
      <h3>${personaje.name}</h3>
      
      <div class="card-image-container">
        <button class="favorite-btn ${isFav ? "active" : ""}" data-id="${
      personaje.id
    }"></button>
        <img src="${personaje.image}" alt="${personaje.name}" />
      </div>
      
      <p><strong>Raza:</strong> ${personaje.race}</p>
      <p><strong>KI:</strong> ${personaje.ki}</p>
      <p><strong>Género:</strong> ${personaje.gender}</p>
      
      <button class="details-btn" data-id="${
        personaje.id
      }">Ver Detalles</button>
    `;

    // Event listener para el botón de favorito
    const favoriteBtn = card.querySelector(".favorite-btn");
    favoriteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isNowFavorite = toggleFavorite(STORAGE_KEYS.CHARACTERS, personaje);
      favoriteBtn.classList.toggle("active", isNowFavorite);
    });

    // Event listener para el botón de detalles
    const detailsBtn = card.querySelector(".details-btn");
    detailsBtn.addEventListener("click", () => {
      openCharacterModal(personaje);
    });

    listado.appendChild(card);
  });
}
