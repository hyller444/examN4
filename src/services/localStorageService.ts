
// Service générique pour gérer le localStorage
const localStorageService = {
  // Sauvegarder des données dans le localStorage
  setItem: (key: string, data: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans localStorage:', error);
    }
  },

  // Récupérer des données depuis le localStorage
  getItem: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Erreur lors de la récupération depuis localStorage:', error);
      return defaultValue;
    }
  },

  // Supprimer des données du localStorage
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erreur lors de la suppression depuis localStorage:', error);
    }
  }
};

export default localStorageService;
