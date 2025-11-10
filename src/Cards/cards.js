import { BASE_URL } from "../main";
import "./cards.css";

export async function fetchCards() {
  try {
    const res = await fetch(`${BASE_URL}/characters`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Datos recibidos:", data);
    return data;
  } catch (error) {
    console.error("Error en fetchCards:", error);
    throw error;
  }
}

export function renderCards(data) {
  const app = document.querySelector("#app");

  // Crear el contenedor de cards
  const cardsContainer = document.createElement("section");
  cardsContainer.id = "cards-container";

  // Obtener los personajes (la API devuelve data.items)
  const characters = data.items || data;

  // Crear una card para cada personaje
  characters.forEach((data) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h2>${data.name}</h2>
      <div class="image-container">
        <img src="${data.image}" alt="${data.name}" />
      </div>
      <p><strong>Raza:</strong> ${data.race}</p>
      <p><strong>KI:</strong> ${data.ki}</p>
      <p><strong>Género:</strong> ${data.gender}</p>
    `;
    cardsContainer.appendChild(card);
  });

  app.appendChild(cardsContainer);
}
