import React from 'react';

const skins = [
  { id: 'default', name: 'Стандартний', className: 'skin-default' },
  { id: 'dark', name: 'Темна тема', className: 'skin-dark' },
  // додай інші скіни
];

function SkinSelector({ currentSkin, setCurrentSkin }) {
  return (
    <div>
      <h2>Обрати скін</h2>
      {skins.map((skin) => (
        <button
          key={skin.id}
          onClick={() => setCurrentSkin(skin.className)}
          disabled={currentSkin === skin.className}
        >
          {skin.name}
        </button>
      ))}
    </div>
  );
}

export default SkinSelector;
