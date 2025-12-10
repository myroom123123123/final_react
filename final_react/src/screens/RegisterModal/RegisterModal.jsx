import React, { useState } from "react";
import "./RegisterModal.css";
import Eye from "../../assets/img/eye.png";

const RegisterModel = ({ setOpenRegister, onCloseRegist, onRegister, onSwitchToSignIn }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        birthDate: '',
        phone: ''
    });

    if (!setOpenRegister) return null;

    const handleKeyPressStep1 = (e) => {
        if (e.key === 'Enter') {
            handleFirstStep(e);
        }
    };

    const handleKeyPressStep2 = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const handleFirstStep = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Зберігаємо користувача
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const newUser = {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            gender: formData.gender,
            birthDate: formData.birthDate,
            phone: formData.phone
        };
        
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        
        if (onRegister) {
            onRegister(newUser);
        }
    };

    return (
        <div className="overlay" onClick={onCloseRegist}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onCloseRegist}>×</button>

                {step === 1 ? (
                    <>
                        <h3>Реєстрація</h3>
                        <p className="subtitle">
                            Створіть обліковий запис, вказавши ваші дані.
                        </p>

                        <label className="label">Повне ім'я</label>
                        <input 
                            type="text" 
                            placeholder="Ваше повне ім'я" 
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            onKeyPress={handleKeyPressStep1}
                        />

                        <label className="label">Email</label>
                        <input 
                            type="email" 
                            placeholder="Ваша робоча електронна пошта" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            onKeyPress={handleKeyPressStep1}
                        />

                        <label className="label">Пароль</label>
                        <div className="password-field">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••••••" 
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                onKeyPress={handleKeyPressStep1}
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
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                onKeyPress={handleKeyPressStep1}
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

                        <button className="sign-btn" onClick={handleFirstStep}>Зареєструватися</button>

                        <p className="bottom-text">
                            Вже є обліковий запис? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignIn && onSwitchToSignIn(); }}>Увійти</a>
                        </p>

                        <div className="social-text">Або зареєструйтесь за допомогою</div>
                        <div className="social-icons">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://accounts.google.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-google"></i></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </>
                ) : (
                    <>
                        <h3>Додаткова інформація</h3>
                        <p className="subtitle">
                            Будь ласка, заповніть додаткові дані для завершення реєстрації.
                        </p>

                        <label className="label">Стать</label>
                        <div className="gender-selection">
                            <label className="gender-option">
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="male"
                                    checked={formData.gender === 'male'}
                                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                />
                                <span>Чоловіча</span>
                            </label>
                            <label className="gender-option">
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="female"
                                    checked={formData.gender === 'female'}
                                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                />
                                <span>Жіноча</span>
                            </label>
                        </div>

                        <label className="label">Дата народження</label>
                        <input 
                            type="date" 
                            value={formData.birthDate}
                            onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                            onKeyPress={handleKeyPressStep2}
                        />

                        <label className="label">Мобільний телефон</label>
                        <input 
                            type="tel" 
                            placeholder="+380 XX XXX XX XX"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            onKeyPress={handleKeyPressStep2}
                        />

                        <div className="button-group">
                            <button className="back-btn" onClick={() => setStep(1)}>Назад</button>
                            <button className="sign-btn" onClick={handleSubmit}>Завершити реєстрацію</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RegisterModel;
