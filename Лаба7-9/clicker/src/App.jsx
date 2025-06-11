import { useState, useEffect, useRef } from "react";
import ClickButton from "./components/ClickButton";
import UpgradeShop from "./features/upgrades/UpgradeShop";
import SkinsShop from "./features/skins/SkinsShop";
import skins from "./utils/skins";
import Wheel from "./components/Wheel";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/global.scss";

function App() {
  const [credits, setCredits] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [duiktcoins, setDuiktcoins] = useState(0);
  const [prestigeMultiplier, setPrestigeMultiplier] = useState(1);
  const [selectedSkinId, setSelectedSkinId] = useState(1);
  const [upgradeDiscount, setUpgradeDiscount] = useState(1);
  const [clickCount, setClickCount] = useState(0);

  const [clickDebuffActive, setClickDebuffActive] = useState(false);
  const [passiveDebuffActive, setPassiveDebuffActive] = useState(false);
  const [upgradeCostDebuffActive, setUpgradeCostDebuffActive] = useState(false);
  const [doubleIncomeActive, setDoubleIncomeActive] = useState(false);

  const [passiveIncome, setPassiveIncome] = useState(0);
  const [wheelSpun, setWheelSpun] = useState(false);

  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState("");

  const clickSound = useRef(null);
  useEffect(() => {
    clickSound.current = new Audio("/sounds/click.mp3");
    clickSound.current.volume = 0.5;
  }, []);

  useEffect(() => {
    const savedSkin = localStorage.getItem("selectedSkinId");
    if (savedSkin) setSelectedSkinId(Number(savedSkin));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedSkinId", selectedSkinId);
  }, [selectedSkinId]);

  const skin = skins.find((s) => s.id === selectedSkinId) || skins[0];

  const prestige = () => {
    const newCoins = Math.floor(credits / 1000);
    if (newCoins === 0) {
      alert("Потрібно більше кредитів для престижу!");
      return;
    }
    setDuiktcoins((dc) => dc + newCoins);
    setCredits(0);
    setClickPower(1);
    setPrestigeMultiplier(1 + 0.05 * (duiktcoins + newCoins));
  };

  const effectiveClickPower = clickDebuffActive ? clickPower * 0.5 : clickPower;
  const effectivePassiveIncome = passiveDebuffActive ? passiveIncome * 0.5 : passiveIncome;
  const effectiveUpgradeDiscount = upgradeDiscount * (upgradeCostDebuffActive ? 1.5 : 1);
  const effectiveIncomeMultiplier = doubleIncomeActive ? prestigeMultiplier * 2 : prestigeMultiplier;

  useEffect(() => {
    if (effectivePassiveIncome > 0) {
      const interval = setInterval(() => {
        setCredits((c) => {
          const newC = c + effectivePassiveIncome * effectiveIncomeMultiplier;
          checkAchievements(newC, clickCount);
          return newC;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [effectivePassiveIncome, effectiveIncomeMultiplier]);

  const [clickAnim, setClickAnim] = useState(false);

  const handleClick = () => {
    setClickAnim(true);
    setTimeout(() => setClickAnim(false), 300);
    setCredits((c) => {
      const newCredits = c + effectiveClickPower * effectiveIncomeMultiplier;
      checkAchievements(newCredits, clickCount + 1);
      return newCredits;
    });
    setClickCount((count) => count + 1);

    // 🔊 Відтворити звук кліку
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch(() => {});
    }
  };

  const addCredits = (amount) => {
    setCredits((c) => {
      const newCredits = c + amount * effectiveIncomeMultiplier;
      checkAchievements(newCredits, clickCount);
      return newCredits;
    });
  };

  const addPrestige = (amount) => {
    setDuiktcoins((dc) => dc + amount);
    setPrestigeMultiplier((prev) => prev + 0.05 * amount);
  };

  const addBonus = (type, duration) => {
    switch (type) {
      case "doubleIncome":
        setDoubleIncomeActive(true);
        setTimeout(() => setDoubleIncomeActive(false), duration);
        break;
      case "clickDebuff":
        setClickDebuffActive(true);
        setTimeout(() => setClickDebuffActive(false), duration);
        break;
      case "passiveDebuff":
        setPassiveDebuffActive(true);
        setTimeout(() => setPassiveDebuffActive(false), duration);
        break;
      case "upgradeCostDebuff":
        setUpgradeCostDebuffActive(true);
        setTimeout(() => setUpgradeCostDebuffActive(false), duration);
        break;
      default:
        console.log(`Отримано бонус: ${type} на ${duration} мс`);
    }
  };

  const checkAchievements = (newCredits, newClickCount) => {
    const newAch = [];
    if (newCredits >= 100 && !achievements.includes("100 Кредитів"))
      newAch.push("100 Кредитів");
    if (newCredits >= 1000 && !achievements.includes("1000 Кредитів"))
      newAch.push("1000 Кредитів");
    if (newClickCount >= 50 && !achievements.includes("50 Кліків"))
      newAch.push("50 Кліків");
    if (newClickCount >= 200 && !achievements.includes("200 Кліків"))
      newAch.push("200 Кліків");

    newAch.forEach((ach) => {
      setAchievements((prev) => [...prev, ach]);
      setShowAchievement(ach);
      setTimeout(() => setShowAchievement(""), 4000);
    });
  };

  return (
    <motion.div
      className="app"
      style={{
        backgroundColor: skin.backgroundColor,
        color: skin.textColor,
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Клікер Гра</h1>

      <div className="stats">
        <div>Кредити: {Math.floor(credits)}</div>
        <div>Клік: +{Math.floor(effectiveClickPower)}</div>
        <div>Пасивний дохід: {Math.floor(effectivePassiveIncome)}</div>
        <div>Duiktcoins: {duiktcoins}</div>
        <div>Множник доходу: {(effectiveIncomeMultiplier * 100).toFixed(0)}%</div>
        <div>Кількість кліків: {clickCount}</div>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleClick}
        className="click-button"
        style={{ backgroundColor: skin.buttonColor, color: skin.textColor }}
      >
        Заробити кредити
      </motion.button>

      <button className="prestige-button" onClick={prestige}>
        Престиж (скинути за Duiktcoins)
      </button>

      <UpgradeShop
        credits={credits}
        setCredits={setCredits}
        setClickPower={setClickPower}
        upgradeDiscount={effectiveUpgradeDiscount}
        setUpgradeDiscount={setUpgradeDiscount}
      />

      <SkinsShop
        selectedSkinId={selectedSkinId}
        setSelectedSkinId={setSelectedSkinId}
        clickCount={clickCount}
      />

      <Wheel
        addCredits={addCredits}
        addPrestige={addPrestige}
        addBonus={addBonus}
        wheelSpun={wheelSpun}
        setWheelSpun={setWheelSpun}
      />

      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="achievement-popup"
            style={{
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#fff4c2",
              color: "#333",
              padding: "12px 24px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
              fontSize: "1.1rem",
              zIndex: 1000,
              fontWeight: "bold",
            }}
          >
            🏆 Досягнення: {showAchievement}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
