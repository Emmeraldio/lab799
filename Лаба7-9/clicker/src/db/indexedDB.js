export const saveGame = async (state) => {
    localStorage.setItem('clicker-save', JSON.stringify(state));
  };
  
  export const loadGame = async () => {
    const saved = localStorage.getItem('clicker-save');
    return saved ? JSON.parse(saved) : null;
  };