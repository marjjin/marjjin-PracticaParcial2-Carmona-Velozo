// utils/localStorage.js - Módulo para manejar localStorage de forma centralizada

/**
 * Obtiene favoritos desde localStorage
 * @param {string} key - La clave del localStorage
 * @returns {Array} Array de favoritos o array vacío
 */
export function getFavorites(key) {
  const favorites = localStorage.getItem(key);
  return favorites ? JSON.parse(favorites) : [];
}

/**
 * Guarda favoritos en localStorage
 * @param {string} key - La clave del localStorage
 * @param {Array} favorites - Array de favoritos a guardar
 */
export function saveFavorites(key, favorites) {
  localStorage.setItem(key, JSON.stringify(favorites));
}

/**
 * Agrega o quita un item de favoritos
 * @param {string} key - La clave del localStorage
 * @param {Object} item - El item a agregar/quitar
 * @returns {boolean} true si se agregó, false si se quitó
 */
export function toggleFavorite(key, item) {
  const favorites = getFavorites(key);
  const index = favorites.findIndex((fav) => fav.id === item.id);

  if (index === -1) {
    favorites.push(item);
    saveFavorites(key, favorites);
    return true;
  } else {
    favorites.splice(index, 1);
    saveFavorites(key, favorites);
    return false;
  }
}

/**
 * Verifica si un item está en favoritos
 * @param {string} key - La clave del localStorage
 * @param {number} itemId - El ID del item a verificar
 * @returns {boolean} true si está en favoritos
 */
export function isFavorite(key, itemId) {
  const favorites = getFavorites(key);
  return favorites.some((fav) => fav.id === itemId);
}

/**
 * Elimina un favorito por ID
 * @param {string} key - La clave del localStorage
 * @param {number} itemId - El ID del item a eliminar
 */
export function removeFavorite(key, itemId) {
  const favorites = getFavorites(key);
  const filtered = favorites.filter((fav) => fav.id !== itemId);
  saveFavorites(key, filtered);
}

// Constantes para las keys de localStorage
export const STORAGE_KEYS = {
  CHARACTERS: "favoriteCharacters",
  PLANETS: "favoritePlanets",
};
