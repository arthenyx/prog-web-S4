import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArtworkDetails } from '../api/api'; 
import { useFavorites } from '../data/FavoritesContext';
import '../styles/ArtworkDetails.css';

function ArtworkDetails() {
    const { artworkId } = useParams();
    console.log("Artwork ID:", artworkId);
    const [artwork, setArtwork] = useState(null);
    const { addToFavorites } = useFavorites();

    useEffect(() => {
        const loadArtworkDetails = async () => {
            const data = await fetchArtworkDetails(artworkId);
            setArtwork(data);
        };

        loadArtworkDetails();
    }, [artworkId]);

    const handleAddToFavorites = (artwork) => {
        addToFavorites(artwork);
    };

    if (!artwork) return <p>Loading artwork details...</p>;

    return (
        <div>
        <h2 className='page-greeting'>{artwork.title}</h2>
        <div className="artwork-details-container">
            <img 
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`} 
                alt={artwork.title} 
            />
            <p><strong>Title:</strong> {artwork.title}</p>
            <p><strong>Artist:</strong> {artwork.artist_title || 'Unknown artist'}</p>
            <p><strong>Date:</strong> {artwork.date_display || 'Date unknown'}</p>
            <p><strong>Medium:</strong> {artwork.medium_display || 'Medium unknown'}</p>
            <p><strong>Style:</strong> {artwork.style_title || 'Not specified'}</p>
            <p><strong>Origin:</strong> {artwork.place_of_origin || 'Unknown'}</p>
            <p><strong>Exhibited:</strong> {artwork.is_on_view ? `Yes, in ${artwork.gallery_title}` : 'Not currently displayed'}</p>
            <p><strong>Dimensions:</strong> {artwork.dimensions || 'Not available'}</p>
            <p><strong>Description:</strong> {artwork.description || 'No description available'}</p>
            <button onClick={() => handleAddToFavorites(artwork)}>Add to Favorites</button>
        </div>
        </div>
    );
}

export default ArtworkDetails;
