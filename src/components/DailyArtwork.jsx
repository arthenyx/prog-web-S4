import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArtworks } from '../api/api';
import { useFavorites } from '../data/FavoritesContext'; // Importer le contexte des favoris
import '../styles/DailyArtwork.css';

export default function DailyArtwork() {
    const [featuredArtwork, setFeaturedArtwork] = useState(null);
    const { addToFavorites } = useFavorites(); // Utiliser addToFavorites du contexte des favoris
    
    useEffect(() => {
        const loadFeaturedArtwork = async () => {
            const data = await fetchArtworks(1, 1); // Récupérer une œuvre aléatoire pour "l'œuvre du jour"
            setFeaturedArtwork(data[0]); // On prend la première œuvre de la réponse
        };
    
        loadFeaturedArtwork();
    }, []);

    const handleAddToFavorites = (artwork) => {
        addToFavorites(artwork); // Ajouter l'œuvre aux favoris via le contexte
    };

    return (
        <div>
            {featuredArtwork && (
                <div className="featured-artwork">
                    <h2>Artwork of the Day</h2>
                    <img
                        src={`https://www.artic.edu/iiif/2/${featuredArtwork.image_id}/full/500,/0/default.jpg`}
                        alt={featuredArtwork.title}
                    />
                    <h3>{featuredArtwork.title}</h3>
                    <p>Artist: {featuredArtwork.artist_title || "Unknown artist"}</p>
                    <p>Date: {featuredArtwork.date_display || "Date unknown"}</p>
                    <Link to={`/artwork/${featuredArtwork.id}`}>More details</Link>
                    <button onClick={() => handleAddToFavorites(featuredArtwork)}>Add to Favorites</button>
                </div>
            )}
        </div>
    );
}
