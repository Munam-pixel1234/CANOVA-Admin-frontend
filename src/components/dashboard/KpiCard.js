// src/components/dashboard/KpiCard.jsx
import React from "react";
import styles from "./dashboard.module.css";

const KpiCard = ({ title, value }) => {
  return (
    <div className={styles.kpiCard}>
      <p className={styles.kpiTitle}>{title}</p>
      <p className={styles.kpiValue}>{value}</p>
    </div>
  );
};

export default KpiCard;
