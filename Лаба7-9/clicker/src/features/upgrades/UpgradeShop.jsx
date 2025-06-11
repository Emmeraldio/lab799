import React from 'react';
import upgradesData from './upgradesData';
import './UpgradeShop.scss';

const UpgradeShop = ({ credits, setCredits, setClickPower, setPassiveIncome, upgradeDiscount = 1 }) => {
  const handleBuy = (upgrade) => {
    const discountedCost = Math.ceil(upgrade.cost * upgradeDiscount);

    if (credits < discountedCost) {
      alert('Недостатньо кредитів');
      return;
    }
    setCredits(credits - discountedCost);

    switch (upgrade.type) {
      case 'clickPower':
        setClickPower((prev) => prev + upgrade.value);
        break;
      case 'passiveIncome':
        setPassiveIncome((prev) => prev + upgrade.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="upgrade-shop">
      <h2>Магазин апгрейдів</h2>
      <div className="upgrades-list">
        {upgradesData.map((upgrade) => {
          const discountedCost = Math.ceil(upgrade.cost * upgradeDiscount);
          const canBuy = credits >= discountedCost;
          return (
            <div key={upgrade.id} className="upgrade-card">
              <h3>{upgrade.name}</h3>
              <p>
                Ціна: 
                {upgradeDiscount < 1 ? (
                  <>
                    <span style={{ textDecoration: 'line-through', marginRight: '8px' }}>
                      {upgrade.cost}
                    </span>
                    <span>{discountedCost}</span> кредитів
                  </>
                ) : (
                  <>{upgrade.cost} кредитів</>
                )}
              </p>
              <button
                className={canBuy ? 'buy-btn' : 'buy-btn disabled'}
                onClick={() => handleBuy(upgrade)}
                disabled={!canBuy}
              >
                Купити
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradeShop;
