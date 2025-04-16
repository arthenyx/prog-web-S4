import React, { useEffect, useState } from 'react';
import { fetchArtworks } from '../api/api';
import ArtworkCard from '../components/ArtworkCard';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import '../styles/Discover.css';

function Discover() {
    const [artworks, setArtworks] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [onlyOnView, setOnlyOnView] = useState(() => {
        // garder le filtre actif même après un refresh de page
        const saved = localStorage.getItem("onlyOnView");
        return saved === "true";
    });

    const artworksPerPage = 10;

    // Charger les oeuvres selon la page
    useEffect(() => {
        const loadArtworks = async () => {
            const data = await fetchArtworks(currentPage, artworksPerPage);
            setArtworks(data);
        };
  
        loadArtworks();
    }, [currentPage]);  // Recharger à chaque changement de page

    // Trier les oeuvres par date
    const sortedArtworks = [...artworks].sort((a, b) => {
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

    // Appliquer le filtre "en exposition"
    const filteredArtworks = sortedArtworks.filter((artwork) =>
        onlyOnView ? artwork.is_on_view : true
    );

    // Changer de page
    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));

    return (
        <div>
            <h2 className='page-greeting'>Browse all artworks</h2>

            {/* Tri */}
            <div className="sort-container">
                <Sort sortOrder={sortOrder} onSortChange={setSortOrder} />
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

            {/* Affichage */}
            {filteredArtworks.length > 0 ? (
                <div className="artworks-container">
                    {filteredArtworks.map((artwork) => (
                        <ArtworkCard key={artwork.id} artwork={artwork} />
                    ))}
                </div>
            ) : (
                <p>No artworks found for the selected criteria.</p>
            )}

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    );
}

export default Discover;
