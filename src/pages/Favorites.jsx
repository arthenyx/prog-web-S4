import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArtworkCard.css';
import { useFavorites } from '../data/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  const [sortOrder, setSortOrder] = useState("title-asc");
  const [onlyOnView, setOnlyOnView] = useState(false);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortOrder) {
      case "date-asc":
        return a.date_start - b.date_start;
      case "date-desc":
        return b.date_start - a.date_start;
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "artist-asc":
        return (a.artist_title || "").localeCompare(b.artist_title || "");
      case "artist-desc":
        return (b.artist_title || "").localeCompare(a.artist_title || "");
      default:
        return 0;
    }
  });

  const filteredFavorites = sortedFavorites.filter(artwork =>
    onlyOnView ? artwork.is_on_view : true
  );

  return (
    <div className="favorites-page">
      <h2 className='page-greeting'>Your favorite artworks</h2>

      {/* Menu de tri */}
      <div className="sort-container">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortOrder} onChange={handleSortChange}>
          <option value="title-asc">Title (A → Z)</option>
          <option value="title-desc">Title (Z → A)</option>
          <option value="artist-asc">Artist (A → Z)</option>
          <option value="artist-desc">Artist (Z → A)</option>
          <option value="date-asc">Date (Oldest → Newest)</option>
          <option value="date-desc">Date (Newest → Oldest)</option>
        </select>
      </div>

      {/* Filtre en exposition */}
      <div className="filter-container">
        <label>
          <input
            type="checkbox"
            checked={onlyOnView}
            onChange={(e) => setOnlyOnView(e.target.checked)}
          />
          Show only artworks currently on view
        </label>
      </div>

      {/* Affichage des favoris */}
      {filteredFavorites.length === 0 ? (
        <p>No artworks found for the selected criteria.</p>
      ) : (
        <div className="artworks-container">
          {filteredFavorites.map(artwork => (
            <div key={artwork.id} className="artwork-card">
              <img 
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/500,/0/default.jpg`} 
                alt={artwork.title} 
              />
              <h4>{artwork.title}</h4>
              <p>{artwork.artist_title || 'Unknown Artist'}</p>
              <p>{artwork.date_display || "Date unknown"}</p>

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
