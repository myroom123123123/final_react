import React, { useState } from "react";
import "./SignInModal.css";
import Eye from "../../assets/img/eye.png";

const SignInModal = ({ isOpen, onClose, onLogin, onSwitchToRegister }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        const newErrors = {};

        // Валідація email
        if (!email.trim()) {
            newErrors.email = "Введіть email";
        }

        // Валідація пароля
        if (!password) {
            newErrors.password = "Введіть пароль";
        }

        setErrors(newErrors);

        // Якщо є помилки валідації - не перевіряємо далі
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        // Перевірка чи існує користувач
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            setErrors({ email: "Невірний email або пароль" });
            return;
        }

        // Успішний вхід
        localStorage.setItem("currentUser", JSON.stringify(user));
        if (onLogin) {
            onLogin(user);
        }
    };

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
                {errors.email && <p className="error-text">{errors.email}</p>}
                <input 
                    type="email" 
                    placeholder="Ваша робоча електронна пошта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={errors.email ? "input-error" : ""}
                />

                <label className="label">Пароль</label>
                {errors.password && <p className="error-text">{errors.password}</p>}
                <div className="password-field">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={errors.password ? "input-error" : ""}
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

                <button className="sign-btn" onClick={handleSubmit}>Увійти</button>

                <p className="bottom-text">
                    Немає облікового запису? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister && onSwitchToRegister(); }}>Зареєструватися</a>
                </p>

                <div className="social-text">Або увійдіть за допомогою</div>
                <div className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a> 
                    <a href="https://accounts.google.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-google"></i></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
    );
};

export default SignInModal;
