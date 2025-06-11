export const Prestige = ({ credits, setCredits, setDuiktcoins }) => {
    const handlePrestige = () => {
      if (credits >= 1_000_000) {
        const duikt = Math.floor(Math.sqrt(credits / 1_000_000));
        setDuiktcoins((d) => d + duikt);
        setCredits(0);
      }
    };
  
    return (
      <div className="prestige">
        <h2>Престиж</h2>
        <button onClick={handlePrestige} disabled={credits < 1_000_000}>
          Скинути за Duiktcoins
        </button>
      </div>
    );
  };