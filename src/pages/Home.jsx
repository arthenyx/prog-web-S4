import React from 'react';
import NewsSlider from "../components/Carousel.jsx";
import DailyArtwork from '../components/DailyArtwork.jsx';

function Home() {
  return ( 
    <div>
      <h2 className='page-greeting'>Welcome to Art Matcher</h2>
      <NewsSlider />
      <DailyArtwork />
    </div>
  );
}

export default Home;
