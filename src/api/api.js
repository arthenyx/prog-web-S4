const API_URL = "https://api.artic.edu/api/v1/artworks";

// Récupérer les oeuvres avec pagination
export const fetchArtworks = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des œuvres");
    }
    const data = await response.json();
    return data.data;
  } 
  catch (error) {
    console.error("Erreur de l'API:", error);
    return [];
  }
};

// Récupérer les détails d'une oeuvre
export const fetchArtworkDetails = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des détails de l'œuvre");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erreur de l'API:", error);
    return { error: "Détails non trouvés" };
  }
};

// Récupérer une oeuvre en fonction des styles
export const fetchArtworksByStyle = async (styles, limit = 5) => {
  try {
    const styleQuery = styles.map(style => `query[term][style_title]=${encodeURIComponent(style)}`).join("&");
    const response = await fetch(`${API_URL}?${styleQuery}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des œuvres par style");
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erreur de l'API:", error);
    return [];
  }
};


