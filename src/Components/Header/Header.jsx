import React, { useState, useEffect, useRef } from "react"; // useRef ekledik
import "./header.css";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  // 1. Bir referans oluşturuyoruz
  const nodeRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    const handleMediaQueryChange = e => setIsSmallScreen(e.matches);

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    setIsSmallScreen(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  const toggleNav = () => setNavVisibility(!isNavVisible);

  return (
    <header className="Header">
      <Link to="/"><img src={logo} className="Logo" alt="logo" /></Link>
      
      {/* 2. nodeRef'i buraya tanımlıyoruz */}
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        nodeRef={nodeRef} 
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        {/* 3. Aynı ref'i içindeki nav elementine de bağlıyoruz */}
        <nav className="Nav" ref={nodeRef}>
          <Link to="/about">Hakkımızda</Link>
          <Link to="/services">Hizmetler</Link>
          <Link to="/contact">İletişim</Link>
          <a href="/">Destek</a>
        </nav>
      </CSSTransition>
      
      <button onClick={toggleNav} className="Burger">
        <FontAwesomeIcon 
        icon={faBitcoin} 
        style={{ color: '#f7931a', fontSize: '30px' }} 
      />
      </button>
    </header>
  );
}