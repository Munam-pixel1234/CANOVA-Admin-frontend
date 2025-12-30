import React from "react";
import styles from "./Header.module.css";


const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.searchBox}>
        <img
        src="/assets/icons/Search.png"
        alt="search"
        className={styles.searchIcon}
         />
        <input
          type="text"
          placeholder="Search here..."
          className={styles.searchInput}
        />
      </div>
    </header>
  );
};

export default Header;
