import React, { useState, useRef } from 'react';

const rewards = [
  { label: '100 кредитів', value: 100 },
  { label: '200 кредитів', value: 200 },
  { label: '300 кредитів', value: 300 },
  { label: '500 кредитів', value: 500 },
  { label: '1000 кредитів', value: 1000 },
  { label: 'Престиж +1', value: 'prestige' },
  { label: 'Подвоєння доходу на 1 хв', value: 'doubleIncome' },
  { label: 'Дебаф: -50% клік (30с)', value: 'clickDebuff' },
  { label: 'Дебаф: -50% пасивний дохід (30с)', value: 'passiveDebuff' },
  { label: 'Дебаф: +50% вартість апгрейдів (30с)', value: 'upgradeCostDebuff' },
];

const Wheel = ({ addCredits, addPrestige, addBonus, wheelSpun, setWheelSpun }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);

  const spinWheel = () => {
    if (spinning) return;
    if (wheelSpun) {
      alert("Ви вже прокручували колесо!");
      return;
    }

    setResult(null);
    setSpinning(true);
    setWheelSpun(true);  // Позначаємо, що колесо прокручено

    const sectorCount = rewards.length;
    const randomSector = Math.floor(Math.random() * sectorCount);
    const degreesPerSector = 360 / sectorCount;
    const extraSpins = 5;
    const rotationDegrees = extraSpins * 360 + randomSector * degreesPerSector + degreesPerSector / 2;

    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s ease-out';
      wheelRef.current.style.transform = `rotate(${rotationDegrees}deg)`;
    }

    setTimeout(() => {
      setSpinning(false);
      const reward = rewards[randomSector];
      setResult(reward.label);

      if (typeof reward.value === 'number') {
        addCredits(reward.value);
      } else if (reward.value === 'prestige') {
        addPrestige(1);
      } else {
        addBonus(reward.value, reward.value === 'doubleIncome' ? 60000 : 30000);
      }

      if (wheelRef.current) {
        wheelRef.current.style.transition = 'none';
        wheelRef.current.style.transform = `rotate(${randomSector * degreesPerSector + degreesPerSector / 2}deg)`;
      }
    }, 4000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <div
        ref={wheelRef}
        style={{
          margin: '0 auto',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          border: '8px solid #3b6ef3',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(59,110,243,0.7)',
          background: `conic-gradient(
            #3b6ef3 0deg 36deg,
            #5c7eea 36deg 72deg,
            #7a8dea 72deg 108deg,
            #9a9bf0 108deg 144deg,
            #b6aaf7 144deg 180deg,
            #d4bafc 180deg 216deg,
            #f0c9ff 216deg 252deg,
            #d45aff 252deg 288deg,
            #a83bfa 288deg 324deg,
            #7f28e1 324deg 360deg
          )`,
        }}
      >
        {rewards.map((r, i) => {
          const deg = 360 / rewards.length;
          const rotation = i * deg;
          const radius = 110;
          const isUpsideDown = rotation > 90 && rotation < 270;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '120px',
                height: '20px',
                marginLeft: '-60px',
                marginTop: '-10px',
                transformOrigin: '50% 50%',
                transform: `
                  rotate(${rotation}deg) 
                  translate(${radius}px) 
                  rotate(${isUpsideDown ? 180 : 0}deg)
                `,
                textAlign: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '12px',
                userSelect: 'none',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {r.label}
            </div>
          );
        })}
      </div>
      <button
        onClick={spinWheel}
        disabled={spinning || wheelSpun}
        style={{
          marginTop: '15px',
          padding: '12px 30px',
          fontSize: '16px',
          fontWeight: '700',
          borderRadius: '8px',
          border: 'none',
          cursor: spinning || wheelSpun ? 'not-allowed' : 'pointer',
          background: '#3b6ef3',
          color: 'white',
          boxShadow: '0 0 10px #3b6ef3',
          transition: 'background 0.3s ease',
        }}
      >
        {spinning ? 'Крутимо...' : wheelSpun ? 'Колесо прокручено' : 'Крутити колесо фортуни'}
      </button>
      {result && (
        <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: '700', color: '#3b6ef3' }}>
          Ви отримали: {result}
        </div>
      )}
    </div>
  );
};

export default Wheel;
