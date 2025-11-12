import "./modal.css";

/**
 * Crea el HTML del modal
 * @returns {HTMLElement} El elemento del modal
 */
function createModalElement() {
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.id = "modal-overlay";

  modalOverlay.innerHTML = `
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="modal-title" id="modal-title"></h2>
        <button class="modal-close" id="modal-close" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body" id="modal-body"></div>
    </div>
  `;

  return modalOverlay;
}

/**
 * Inicializa el modal y lo agrega al DOM
 */
export function initModal() {
  // Verificar si ya existe el modal
  if (document.getElementById("modal-overlay")) return;

  const modal = createModalElement();
  document.body.appendChild(modal);

  // Event listeners
  const closeBtn = document.getElementById("modal-close");
  const overlay = document.getElementById("modal-overlay");

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeModal();
    }
  });
}

/**
 * Abre el modal con contenido de personaje
 * @param {Object} personaje - Datos del personaje
 */
export function openCharacterModal(personaje) {
  const modal = document.getElementById("modal-overlay");
  const title = document.getElementById("modal-title");
  const body = document.getElementById("modal-body");

  title.textContent = personaje.name;

  body.innerHTML = `
    <div class="modal-image-container">
      <img src="${personaje.image}" alt="${personaje.name}" />
    </div>
    
    <div class="modal-info-grid">
      <div class="modal-info-item">
        <span class="modal-info-label">Raza</span>
        <span class="modal-info-value">${personaje.race}</span>
      </div>
      <div class="modal-info-item">
        <span class="modal-info-label">Género</span>
        <span class="modal-info-value">${personaje.gender}</span>
      </div>
      <div class="modal-info-item">
        <span class="modal-info-label">KI Base</span>
        <span class="modal-info-value">${personaje.ki}</span>
      </div>
      <div class="modal-info-item">
        <span class="modal-info-label">KI Máximo</span>
        <span class="modal-info-value">${personaje.maxKi}</span>
      </div>
      <div class="modal-info-item">
        <span class="modal-info-label">Afiliación</span>
        <span class="modal-info-value">${personaje.affiliation || "N/A"}</span>
      </div>
    </div>
    
    ${
      personaje.description
        ? `
      <div class="modal-description">
        <h3>Descripción</h3>
        <p>${personaje.description}</p>
      </div>
    `
        : ""
    }
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

/**
 * Abre el modal con contenido de planeta
 * @param {Object} planeta - Datos del planeta
 */
export function openPlanetModal(planeta) {
  const modal = document.getElementById("modal-overlay");
  const title = document.getElementById("modal-title");
  const body = document.getElementById("modal-body");

  title.textContent = planeta.name;

  body.innerHTML = `
    <div class="modal-image-container">
      <img src="${planeta.image}" alt="${planeta.name}" />
    </div>
    
    <div class="modal-info-grid">
      <div class="modal-info-item">
        <span class="modal-info-label">Estado</span>
        <span class="modal-info-value">${
          planeta.isDestroyed ? "Destruido" : "Intacto"
        }</span>
      </div>
    </div>
    
    ${
      planeta.description
        ? `
      <div class="modal-description">
        <h3>Descripción</h3>
        <p>${planeta.description}</p>
      </div>
    `
        : ""
    }
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

/**
 * Cierra el modal
 */
export function closeModal() {
  const modal = document.getElementById("modal-overlay");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}
