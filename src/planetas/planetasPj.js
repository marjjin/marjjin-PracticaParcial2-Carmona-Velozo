import { BASE_URL } from "../main";
import "./planetasPj.css";
import {
  getFavorites,
  toggleFavorite,
  isFavorite,
  STORAGE_KEYS,
} from "../utils/localStorage.js";

async function fetchListadoPlanetas() {
  try {
    const res = await fetch(`${BASE_URL}/planets?limit=100`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching planets:", error);
    throw error;
  }
}

export async function renderListadoPlanetas() {
  const listado = document.querySelector("#listado-planetas");
  if (!listado) return;

  const data = await fetchListadoPlanetas();
  const planetas = data.items || data;

  planetas.forEach((planeta) => {
    const card = document.createElement("article");
    card.className = "card-planeta";

    const isFav = isFavorite(STORAGE_KEYS.PLANETS, planeta.id);

    card.innerHTML = `
      <h3>${planeta.name}</h3>
      
      <div class="card-image-container">
        <button class="favorite-btn ${isFav ? "active" : ""}" data-id="${
      planeta.id
    }"></button>
        <img src="${planeta.image}" alt="${planeta.name}" />
      </div>
      
      <p><strong>Destruido:</strong> ${planeta.isDestroyed ? "Sí" : "No"}</p>
      <p><strong>Descripción:</strong> ${planeta.description}</p>
    `;

    // Event listener para el botón de favorito
    const favoriteBtn = card.querySelector(".favorite-btn");
    favoriteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isNowFavorite = toggleFavorite(STORAGE_KEYS.PLANETS, planeta);
      favoriteBtn.classList.toggle("active", isNowFavorite);
    });

    listado.appendChild(card);
  });
}
