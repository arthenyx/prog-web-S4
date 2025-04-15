import { useState } from 'react';
import { Link } from 'react-router-dom';
import newsData from "../data/newsData.js";
import '../styles/Carousel.css';

export default function NewsSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const selectPrevious = () => {
      if (currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    };
  
    const selectNext = () => {
      if (currentIndex < newsData.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    };

    return (
        <div className="carousel-container">
            <div className="carousel-content">
                <p>{newsData[currentIndex].content}</p>
                <div className="carousel-link">
                  <button><Link to={newsData[currentIndex].url}>{newsData[currentIndex].button}</Link></button>
                </div>
            </div>

            <div className="carousel-controls">
                <button onClick={selectPrevious} disabled={currentIndex === 0}>
                    Previous
                </button>
                <button onClick={selectNext} disabled={currentIndex === newsData.length - 1}>
                Next
                </button>
            </div>
        </div>
    );
}