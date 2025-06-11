import React from "react";
import skins from "../../utils/skins";
import styles from "./SkinsShop.module.scss";

export default function SkinsShop({ selectedSkinId, setSelectedSkinId, clickCount }) {
  return (
    <div className={styles.skinsShop}>
      <h2>Магазин скинів</h2>
      <div className={styles.skinsList}>
        {skins.map((skin) => {
          const unlocked = clickCount >= (skin.id - 1) * 1000;
          const isSelected = selectedSkinId === skin.id;
          return (
            <div
              key={skin.id}
              className={`${styles.skinItem} ${
                isSelected ? styles.selected : ""
              } ${!unlocked ? styles.locked : ""}`}
              style={{
                backgroundColor: skin.backgroundColor,
                color: skin.textColor,
                borderColor: isSelected ? "#ffd700" : "transparent",
                cursor: unlocked ? "pointer" : "not-allowed",
                opacity: unlocked ? 1 : 0.4,
              }}
              onClick={() => unlocked && setSelectedSkinId(skin.id)}
              title={unlocked ? skin.name : `Розблокується після ${(skin.id - 1) * 1000} кліків`}
            >
              {skin.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
