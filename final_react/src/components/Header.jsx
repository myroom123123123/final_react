import SignInModal from "./../screens/SignInModal/SignInModal";
import SignRegister from "../screens/RegisterModal/RegisterModal";
import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../assets/img/logo.png";
import line from "../assets/img/line.png";
import menuIcon from "../assets/img/menu.svg";

const Header = ({ setCurrentPage, isLoggedIn, onLogin, onRegister }) => {
    const [open, setOpen] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogin = (user) => {
        setOpen(false);
        if (onLogin) {
            onLogin(user);
        }
    };

    const handleRegister = (user) => {
        setOpenRegister(false);
        if (onRegister) {
            onRegister(user);
        }
    };

    const switchToRegister = () => {
        setOpen(false);
        setOpenRegister(true);
    };

    const switchToSignIn = () => {
        setOpenRegister(false);
        setOpen(true);
    };

    const handleNavigation = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if ((open || openRegister) && window.innerWidth <= 768) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [open, openRegister]);

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <button className="burger-menu-btn" onClick={() => setMobileMenuOpen((v) => !v)}>
                        <img src={menuIcon} alt="menu" />
                    </button>
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    {mobileMenuOpen && (
                        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}></div>
                    )}
                    <nav className={`nav${mobileMenuOpen ? ' nav-mobile-open' : ''}`}>
                        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavigation('home'); setMobileMenuOpen(false); }}>ГОЛОВНА</a>
                        <img src={line} alt="" className="divider" />
                        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavigation('about'); setMobileMenuOpen(false); }}>ПРО НАС</a>
                        <img src={line} alt="" className="divider" />
                        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavigation('booking'); setMobileMenuOpen(false); }}>ЗАБРОНЮВАТИ</a>
                        <img src={line} alt="" className="divider" />
                        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavigation('contact'); setMobileMenuOpen(false); }}>КОНТАКТИ</a>
                        <img src={line} alt="" className="divider" />
                        <a href="#" className="nav-link nav-link-multi" onClick={(e) => { e.preventDefault(); handleNavigation('profile'); setMobileMenuOpen(false); }}>ОСОБИСТИЙ<br/>КАБІНЕТ</a>
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
                            <button 
                                className="favorites-btn"
                                onClick={() => handleNavigation('favorites')}
                                title="Обране"
                            >
                                ♡
                            </button>
                        )}
                    </div>
                </div>
            </header>
            
            <SignRegister 
                setOpenRegister={openRegister} 
                onCloseRegist={() => setOpenRegister(false)}
                onRegister={handleRegister}
                onSwitchToSignIn={switchToSignIn}
            />
            <SignInModal 
                isOpen={open} 
                onClose={() => setOpen(false)}
                onLogin={handleLogin}
                onSwitchToRegister={switchToRegister}
            />
        </>
    );
}
export default Header;