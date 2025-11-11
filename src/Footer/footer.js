
import "./footer.css";

export function initFooter() {
  const icons = document.querySelectorAll(".social-icons a");

  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      console.log(`Abriendo ${icon.getAttribute("aria-label")}`);
    });
  });

  console.log("Footer con íconos clickeables inicializado.");
}
