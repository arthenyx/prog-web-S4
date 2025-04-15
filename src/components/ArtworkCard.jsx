import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArtworkCard.css';
import { useFavorites } from '../data/FavoritesContext';

function ArtworkCard({ artwork }) {
    const { addToFavorites } = useFavorites();
    const handleAddToFavorites = (artwork) => {
        addToFavorites(artwork);
    };

    return (
        <div className="artwork-card">
            <img 
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/500,/0/default.jpg`} 
                alt={artwork.title} 
            />
            <h3>{artwork.title}</h3>
            <p>Artist : {artwork.artist_title || "Unknown artist"}</p>
            <p>Date : {artwork.date_display || "Date unknown"}</p>
            <div className="button-container">
                <Link to={`/artwork/${artwork.id}`}>More details</Link>
                <button onClick={() => handleAddToFavorites(artwork)}>Add to Favorites</button>
            </div>
        </div>
    );
}

export default ArtworkCard;