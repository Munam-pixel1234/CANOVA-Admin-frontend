import React from "react";
import styles from "./employees.module.css";

const BulkDeleteBar = ({ count, onDelete }) => {
  return (
    <div className={styles.bulkBar}>
      <span>{count} selected</span>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default BulkDeleteBar;
