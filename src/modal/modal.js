import "./modal.css";

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

export function initModal() {
  if (document.getElementById("modal-overlay")) return;

  const modal = createModalElement();
  document.body.appendChild(modal);

  const closeBtn = document.getElementById("modal-close");
  const overlay = document.getElementById("modal-overlay");

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeModal();
    }
  });
}

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

export function closeModal() {
  const modal = document.getElementById("modal-overlay");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}
