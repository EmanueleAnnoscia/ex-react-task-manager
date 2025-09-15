import { NavLink } from "react-router-dom";
import React from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.activeLink}` : styles.link
        }
      >
        Lista delle Task
      </NavLink>

      <NavLink
        to="/add"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.activeLink}` : styles.link
        }
      >
        Aggiungi Task
      </NavLink>
    </nav>
  );
}

export default Navbar;
