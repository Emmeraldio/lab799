import React from "react";
import styles from "../styles/ClickButton.module.scss";

function ClickButton({ onClick }) {
  return (
    <button className={styles.clickButton} onClick={onClick}>
      Заробити кредити
    </button>
  );
}

export default ClickButton;  // <- додай цей рядок
