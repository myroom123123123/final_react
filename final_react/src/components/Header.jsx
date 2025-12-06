import SignInModal from "./../screens/SignInModal/SignInModal";
import SignRegister from "../screens/RegisterModal/RegisterModal";
import React, { useState } from "react";
import "./Header.css";
import logo from "../assets/img/logo.png";
import globe from "../assets/img/globe.png";
import line from "../assets/img/line.png";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
        setOpen(false);
    };

    const handleRegister = () => {
        setIsLoggedIn(true);
        setOpenRegister(false);
    };

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    
                    <nav className="nav">
                        <a href="#" className="nav-link">ГОЛОВНА</a>
                        <img src={line} alt="" className="divider" />
                        <a href="#" className="nav-link">ПРО НАС</a>
                        <img src={line} alt="" className="divider" />
                        <a href="#" className="nav-link">ЗАБРОНЮВАТИ</a>
                        <img src={line} alt="" className="divider" />
                        <a href="#" className="nav-link">КОНТАКТИ</a>
                        <img src={line} alt="" className="divider" />
                        <a href="#" className="nav-link nav-link-multi">ОСОБИСТИЙ<br/>КАБІНЕТ</a>
                    </nav>

                    <div className="auth-section">
                        <img src={line} alt="" className="divider" />
                        {!isLoggedIn ? (
                            <div className="auth-buttons">
                                <button 
                                    className="auth-btn"
                                    onClick={() => setOpen(true)}
                                >
                                    Вхід
                                </button>
                                <span className="separator">/</span>
                                <button 
                                    className="auth-btn"
                                    onClick={() => setOpenRegister(true)}
                                >
                                    Реєстрація
                                </button>
                            </div>
                        ) : (
                            <div className="language-selector">
                                <img src={globe} alt="Language" className="globe-icon" />
                                <span className="language">UA</span>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            
            <SignRegister 
                setOpenRegister={openRegister} 
                onCloseRegist={() => setOpenRegister(false)}
                onRegister={handleRegister}
            />
            <SignInModal 
                isOpen={open} 
                onClose={() => setOpen(false)}
                onLogin={handleLogin}
            />
        </>
    );
}
export default Header;