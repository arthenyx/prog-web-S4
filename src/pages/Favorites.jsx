import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArtworkCard.css';
import { useFavorites } from '../data/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="favorites-page">
      <h2 className='page-greeting'>Your favorite artworks</h2>
      {favorites.length === 0 ? (
        <p>No artworks added to favorites yet.</p>
      ) : (
        <div className="artworks-container">
          {favorites.map(artwork => (
            <div key={artwork.id} className="artwork-card">
              <img 
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/500,/0/default.jpg`} 
                alt={artwork.title} 
              />
              <h4>{artwork.title}</h4>
              <p>{artwork.artist_title || 'Unknown Artist'}</p>

              <div className="button-container">
                <Link to={`/artwork/${artwork.id}`}>More details</Link>
                <button onClick={() => removeFromFavorites(artwork.id)}>
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
