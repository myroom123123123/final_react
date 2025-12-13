import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { uk } from 'date-fns/locale';
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
    const [rememberMe, setRememberMe] = useState(false);

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

    const isSecondStepValid = formData.gender && formData.birthDate && formData.phone;
    const isFirstStepValid = formData.fullName && formData.email && formData.password && formData.confirmPassword;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Перевірка, чи всі поля заповнені
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.gender || !formData.birthDate || !formData.phone) {
            return;
        }
        // Перевірка, чи email вже існує
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const emailExists = users.some(user => user.email === formData.email);
        if (emailExists) {
            alert("Користувач з такою електронною поштою вже існує.");
            return;
        }
        // Зберігаємо користувача
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
        if (rememberMe) {
            localStorage.setItem("currentUser", JSON.stringify(newUser));
        } else {
            sessionStorage.setItem("currentUser", JSON.stringify(newUser));
        }
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
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={e => setRememberMe(e.target.checked)}
                                /> Залишатися в системі
                            </label>
                            <a className="forgot" href="#">Забули пароль?</a>
                        </div>

                        <button className="sign-btn" onClick={handleFirstStep} disabled={!isFirstStepValid}>Зареєструватися</button>

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
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
                            <DatePicker
                                value={formData.birthDate ? new Date(formData.birthDate) : null}
                                onChange={(date) => {
                                    if (date instanceof Date && !isNaN(date)) {
                                        setFormData({ ...formData, birthDate: date.toISOString() });
                                    } else {
                                        setFormData({ ...formData, birthDate: '' });
                                    }
                                }}
                                views={["year", "month", "day"]}
                                openTo="year"
                                disableFuture
                                minDate={new Date(1900, 0, 1)}
                                maxDate={new Date()}
                                adapterLocale={uk}
                                slotProps={{
                                    textField: {
                                        variant: 'standard',
                                        fullWidth: true,
                                        InputProps: {
                                            disableUnderline: true,
                                            style: {
                                                border: '1px solid #ddd',
                                                borderRadius: '6px',
                                                padding: '12px',
                                                fontSize: '16px',
                                                background: '#fff',
                                                height: '40px',
                                                marginTop: '6px',
                                                marginBottom: '16px',
                                                boxSizing: 'border-box',
                                                width: '340px',
                                            },
                                        },
                                        inputProps: {
                                            style: {
                                                padding: '0',
                                                height: '24px',
                                                fontSize: '16px',
                                            },
                                            placeholder: 'дд.мм.рррр',
                                            maxLength: 8 // для ручного вводу
                                        },
                                        onKeyPress: handleKeyPressStep2,
                                    }
                                }}
                            />
                        </LocalizationProvider>
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
                            <button className="sign-btn" onClick={handleSubmit} disabled={!isSecondStepValid}>Завершити реєстрацію</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RegisterModel;
