import { categoryName } from "../../utils.js";
import React from "react";
import './Navigation.css'

export const Navigation = ({ category, onNavClick, className }) => {
    return (
      <nav className="navigation grid">
      <a href="#" data-href="index" className="navigation_logo">
        <img src="./assets/logo.svg" alt="Логотип" className="logo_image" />
      </a>
      <ul className="navigation_list">
        {["index", "fashion", "technology", "politics",  "sport", "karpov"].map((item) => {
          return (
            <li className="navigation_item" key={item}>
              <a
                onClick={onNavClick}
                href="#"
                className={`${className} ${
                  category === item ? "navigation_link--active" : ""
                }`}
                data-href={item}
              >
                {categoryName[item]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
    )
  }