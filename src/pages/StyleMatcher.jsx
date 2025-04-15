import React, { useState, useEffect } from 'react';
import { useFavorites } from '../data/FavoritesContext';
import questions from '../data/testData.js';
import { fetchArtworksByStyle } from '../api/api.js';
import '../styles/StyleMatcher.css';

// Fonction pour récupérer les œuvres recommandées
const getRecommendedArtworks = async () => {
  const selectedStyles = getSelectedStyles();
  const artworks = await fetchArtworksByStyle(selectedStyles);
  setRecommendedArtworks(artworks);
};

function StyleMatcher() {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recommendedArtworks, setRecommendedArtworks] = useState([]);
  const { addToFavorites } = useFavorites();

  const handleAddToFavorites = (artwork) => {
    addToFavorites(artwork); // Ajouter l'œuvre aux favoris via le contexte
  };

  // Fonction pour gérer les changements de réponse
  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
    });
  };

  // Fonction pour passer à la question suivante
  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  // Fonction pour revenir à la question précédente
  const previousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  // Fonction pour récupérer les styles choisis
  const getSelectedStyles = () => {
    const selectedStyles = [];
    for (let questionId in answers) {
      const selectedOption = questions.find(q => q.id === parseInt(questionId)).options[answers[questionId]];
      selectedStyles.push(selectedOption.style);
    }
    return selectedStyles;
  };

  // Fonction pour afficher les résultats
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // Récupérer les œuvres en fonction des styles après soumission
  useEffect(() => {
    if (isSubmitted) {
      const fetchRecommendedArtworks = async () => {
        const selectedStyles = getSelectedStyles();
        const artworks = await fetchArtworksByStyle(selectedStyles);
        setRecommendedArtworks(artworks);
      };

      fetchRecommendedArtworks();
    }
  }, [isSubmitted]);

  // Fonction pour recommencer le test
  const retakeTest = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setRecommendedArtworks([]);
    
  };

  return (
    <div>
    <h2 className='page-greeting'>Style Matcher Test</h2>
    <div className="style-matcher">
      {!isSubmitted ? (
        <div className="question-container">
          <h3>{questions[currentQuestionIndex].question}</h3>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={`question-${questions[currentQuestionIndex].id}`}
                  value={index}
                  checked={answers[questions[currentQuestionIndex].id] === index}
                  onChange={() => handleAnswerChange(questions[currentQuestionIndex].id, index)}
                />
                {option.text}
              </label>
            ))}
          </div>

          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button type="button" onClick={previousQuestion}>Previous Question</button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button type="button" onClick={nextQuestion}>Next Question</button>
            ) : (
              <button type="button" onClick={handleSubmit}>See Results</button>
            )}
          </div>
        </div>
      ) : (
        <div className="result-container">
          <h3>Test completed !</h3>
          <p>Here are your recommended artworks :</p>

          <div className="recommended-artworks">
            {recommendedArtworks.length > 0 ? (
              recommendedArtworks.map(artwork => (
                <div key={artwork.id} className="artwork-card">
                  <img 
                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/500,/0/default.jpg`} 
                    alt={artwork.title} 
                  />
                  <h4>{artwork.title}</h4>
                  <p>{artwork.artist_title || 'Unknown Artist'}</p>
                  <p>{artwork.style_title || 'Unknown Style'}</p>
                  {artwork.is_on_view ? (
                    <p><strong>Currently on view</strong> in {artwork.gallery_title || 'an unknown gallery'}.</p>
                  ) : (
                    <p><strong>Not currently on view</strong> at the museum.</p>
                  )}

                  {/* Ajouter aux favoris */}
                  <button onClick={() => handleAddToFavorites(artwork)}>Add to Favorites</button>
                </div>
              ))
            ) : (
              <p>Loading artworks...</p>
            )}
          </div>

          <button type="button" onClick={retakeTest}>Retake the Test</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default StyleMatcher;