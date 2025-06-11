export const BonusPanel = ({ setCredits }) => {
    const giveBonus = () => {
      const bonus = Math.floor(Math.random() * 500 + 100);
      setCredits((c) => c + bonus);
    };
  
    return (
      <div className="bonus-panel">
        <h2>Бонуси</h2>
        <button onClick={giveBonus}>Випадковий бонус</button>
      </div>
    );
  };