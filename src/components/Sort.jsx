import React from 'react';

function Sort({ sortOrder, onSortChange }) {
    return (
        <div>
            <label htmlFor="sort">Sort by:</label>
            <select 
                id="sort" 
                value={sortOrder} 
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="date-asc">Date (Oldest → Newest)</option>
                <option value="date-desc">Date (Newest → Oldest)</option>
                <option value="title-asc">Title (A → Z)</option>
                <option value="title-desc">Title (Z → A)</option>
                <option value="artist-asc">Artist (A → Z)</option>
                <option value="artist-desc">Artist (Z → A)</option>
            </select>
        </div>
    );
}

export default Sort;
