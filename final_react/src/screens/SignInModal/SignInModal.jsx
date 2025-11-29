import React, { useState } from "react";
import Eye from "../../assets/img/eye.png";
import "./SignInModal.css";

const SignInModal = ({ isOpen, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>

                <h3>Вхід</h3>
                <p className="subtitle">
                    Увійдіть до свого облікового запису, використовуючи email та пароль,
                    надані під час реєстрації.
                </p>

                <label className="label">Email</label>
                <input type="email" placeholder="Ваша робоча електронна пошта" />

                <label className="label">Пароль</label>
                <div className="password-field">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••••••" 
                    />
                    <span 
                        className="eye" 
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={Eye} className="eye-img" alt="Eye"/>
                    </span>
                </div>

                <div className="extra">
                    <label className="remember">
                        <input type="checkbox" /> Залишатися в системі
                    </label>
                    <a className="forgot" href="#">Забули пароль?</a>
                </div>

                <button className="sign-btn">Увійти</button>

                <p className="bottom-text">
                    Немає облікового запису? <a href="#">Зареєструватися</a>
                </p>

                <div className="social-text">Або увійдіть за допомогою</div>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook-f"></i></a> 
                    <a href="#"><i className="fab fa-google"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
    );
};

export default SignInModal;
