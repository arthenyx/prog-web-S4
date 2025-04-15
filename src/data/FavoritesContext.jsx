import React, { createContext, useState, useContext, useEffect } from 'react';

// Création du contexte pour les favoris
const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis le localStorage si disponibles
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Ajouter un artwork aux favoris
  const addToFavorites = (artwork) => {
    const updatedFavorites = [...favorites, artwork];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Sauvegarder dans localStorage
  };

  // Retirer un artwork des favoris
  const removeFromFavorites = (artworkId) => {
    const updatedFavorites = favorites.filter(item => item.id !== artworkId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Sauvegarder dans localStorage
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
