
import "./header.css";

export function initHeader() {
  const logo = document.querySelector(".logo-img");

  // Ejemplo: animación o efecto al hacer click en el logo
  if (logo) {
    logo.addEventListener("click", () => {
      alert("¡Bienvenido al universo Dragon Ball!");
    });
  }
}
