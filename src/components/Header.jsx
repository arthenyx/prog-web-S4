import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1 className='title'>ART MATCHER</h1>
            <p className='catchphrase'>—  Your curated art flow  —</p>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/discover">Discover</Link></li>
                    <li><Link to="/style-matcher">Style Matcher</Link></li>
                    <li><Link to="/favorites">Favorites</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;