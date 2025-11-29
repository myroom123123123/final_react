import React, { useState } from "react";
import Eye from "../../assets/img/eye.png";
import "./RegisterModal.css";

const RegisterModel = ({ setOpenRegister, onCloseRegist }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    if (!setOpenRegister) return null;

    return (
        <div className="overlay" onClick={onCloseRegist}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onCloseRegist}>×</button>

                <h3>Реєстрація</h3>
                <p className="subtitle">
                    Створіть обліковий запис, вказавши ваші дані.
                </p>

                <label className="label">Повне ім'я</label>
                <input type="text" placeholder="Ваше повне ім'я" />

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

                <label className="label">Повторити пароль</label>
                <div className="password-field">
                    <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="••••••••••••" 
                    />
                    <span 
                        className="eye" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

                <button className="sign-btn">Зареєструватися</button>

                <p className="bottom-text">
                    Вже є обліковий запис? <a href="#">Увійти</a>
                </p>

                <div className="social-text">Або зареєструйтесь за допомогою</div>
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

export default RegisterModel;
