import { BASE_URL } from "../main";
import "./cards.css";

let page = 1;
//Llamada a la API para obtener los personajes
export async function fetchCardsPersonajes() {
  try {
    const res = await fetch(`${BASE_URL}/characters?page=${page}&limit=10`);
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
export async function fetchCardsPlanetas() {
  try {
    const res = await fetch(`${BASE_URL}/planets?page=${page}&limit=10`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Datos recibidos:", data);
    return data;
  } catch (error) {
    console.error("Error en fetchCardsPlanetas:", error);
    throw error;
  }
}
//Funcion para renderizar las cards en el DOM
export function renderCardsPersonajes(data) {
  const app = document.querySelector("#app");

  // Crear el contenedor wrapper con flechas
  const wrapper = document.createElement("div");
  wrapper.className = "cards-wrapper";

  // Flecha izquierda
  const leftArrow = document.createElement("button");
  leftArrow.className = "scroll-arrow scroll-arrow-left";
  leftArrow.innerHTML = "&#8249;";
  leftArrow.addEventListener("click", () => {
    cardsContainer.scrollBy({ left: -320, behavior: "smooth" });
  });

  // Flecha derecha
  const rightArrow = document.createElement("button");
  rightArrow.className = "scroll-arrow scroll-arrow-right";
  rightArrow.innerHTML = "&#8250;";
  rightArrow.addEventListener("click", () => {
    cardsContainer.scrollBy({ left: 320, behavior: "smooth" });
  });

  // Crear el contenedor de cards
  const cardsContainer = document.createElement("section");
  cardsContainer.id = "cards-container";

  // Obtener los personajes
  const personajes = data.items;

  //Titulo de la sección
  const tituloSeccionPj = document.createElement("button");
  tituloSeccionPj.textContent = "Personajes de Dragon Ball";
  tituloSeccionPj.className = "titulo-seccion";
  app.appendChild(tituloSeccionPj);
  // Crear una card para cada personaje
  personajes.forEach((data) => {
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

  wrapper.appendChild(leftArrow);
  wrapper.appendChild(cardsContainer);
  wrapper.appendChild(rightArrow);
  app.appendChild(wrapper);
}

//Funcion para renderizar las cards de planetas en el DOM
export function renderCardsPlanetas(data) {
  const app = document.querySelector("#app");

  // Crear el contenedor wrapper con flechas
  const wrapper = document.createElement("div");
  wrapper.className = "cards-wrapper";

  // Flecha izquierda
  const leftArrow = document.createElement("button");
  leftArrow.className = "scroll-arrow scroll-arrow-left";
  leftArrow.innerHTML = "&#8249;";
  leftArrow.addEventListener("click", () => {
    cardsContainer.scrollBy({ left: -320, behavior: "smooth" });
  });

  // Flecha derecha
  const rightArrow = document.createElement("button");
  rightArrow.className = "scroll-arrow scroll-arrow-right";
  rightArrow.innerHTML = "&#8250;";
  rightArrow.addEventListener("click", () => {
    cardsContainer.scrollBy({ left: 320, behavior: "smooth" });
  });

  // Crear el contenedor de cards
  const cardsContainer = document.createElement("section");
  cardsContainer.id = "cards-container";

  // Obtener los planetas
  const planetas = data.items;

  //Titulo de la sección
  const tituloSeccionPl = document.createElement("button");
  tituloSeccionPl.textContent = "Planetas de Dragon Ball";
  tituloSeccionPl.className = "titulo-seccion";
  app.appendChild(tituloSeccionPl);

  // Crear una card para cada planeta
  planetas.forEach((data) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h2>${data.name}</h2>
      <div class="image-container">
        <img src="${data.image}" alt="${data.name}" />
      </div>

    `;
    cardsContainer.appendChild(card);
  });

  wrapper.appendChild(leftArrow);
  wrapper.appendChild(cardsContainer);
  wrapper.appendChild(rightArrow);
  app.appendChild(wrapper);
}
