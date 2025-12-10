import React, { useState, useEffect } from "react";
import "./Profile.css";
import line3 from "../../assets/img/line3.png";
import userIcon from "../../assets/img/user.png";

const Profile = ({ isLoggedIn, currentUser, setCurrentPage, onOpenRegister }) => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [showAvatarOptions, setShowAvatarOptions] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        birthDate: '',
        phone: '',
        gender: ''
    });

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
            setAvatar(currentUser.avatar || null);
            setFormData({
                fullName: currentUser.fullName || '',
                email: currentUser.email || '',
                birthDate: currentUser.birthDate || '',
                phone: currentUser.phone || '',
                gender: currentUser.gender || ''
            });
        }
    }, [currentUser]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                const updatedUser = { ...user, avatar: reader.result };
                const users = JSON.parse(localStorage.getItem("users") || "[]");
                const userIndex = users.findIndex(u => u.email === user.email);
                if (userIndex !== -1) {
                    users[userIndex] = updatedUser;
                    localStorage.setItem("users", JSON.stringify(users));
                }
                localStorage.setItem("currentUser", JSON.stringify(updatedUser));
                setUser(updatedUser);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        setAvatar(null);
        const updatedUser = { ...user, avatar: null };
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem("users", JSON.stringify(users));
        }
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const handleSave = () => {
        const updatedUser = { ...user, ...formData };
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem("users", JSON.stringify(users));
        }
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        
        setUser(updatedUser);
        setIsEditing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setCurrentPage('home');
        window.location.reload();
    };

    if (!isLoggedIn || !user) {
        return (
            <div className="profile-container">
                <div className="profile-header">
                    <h2>Особистий кабінет</h2>
                </div>
                <div className="profile-not-logged-wrapper">
                    <div className="not-logged-in">
                        <div className="user-icon-placeholder">
                            <img src={userIcon} alt="User" />
                        </div>
                        <h3>Ви не авторизовані</h3>
                        <p>Щоб переглядати особистий кабінет, будь ласка, зареєструйтеся або увійдіть до системи</p>
                        <button className="register-btn" onClick={onOpenRegister}>
                            Зареєструватися
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>Особистий кабінет</h2>
            </div>
            
            <div className="profile-wrapper">
                <div className="profile-content">
                <div className="profile-left">
                    <div className="user-icon">
                        <img src={avatar || userIcon} alt="User" />
                    </div>
                    <input 
                        type="file" 
                        id="avatar-upload" 
                        accept="image/*" 
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                    />
                    {!showAvatarOptions ? (
                        <button className="change-photo-btn" onClick={() => setShowAvatarOptions(true)}>
                            Змінити аватар
                        </button>
                    ) : (
                        <>
                            <button className="change-photo-btn" onClick={() => { document.getElementById('avatar-upload').click(); setShowAvatarOptions(false); }}>
                                Завантажити фото
                            </button>
                            {avatar && (
                                <button className="change-photo-btn" onClick={() => { handleRemoveAvatar(); setShowAvatarOptions(false); }} style={{ background: '#9B6969' }}>
                                    Видалити аватар
                                </button>
                            )}
                            <button className="change-photo-btn" onClick={() => setShowAvatarOptions(false)} style={{ background: '#7A7A7A' }}>
                                Скасувати
                            </button>
                        </>
                    )}
                    <button className="settings-btn" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Скасувати' : 'Редагувати'}
                    </button>
                </div>

                <div className="profile-right">
                    <div className="info-field">
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            />
                        ) : (
                            <span className="name">{user.fullName || 'Не вказано'}</span>
                        )}
                    </div>
                    <img src={line3} alt="" className="field-divider" />

                    <div className="info-field">
                        <label>Стать:</label>
                        {isEditing ? (
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                            >
                                <option value="">Не вказано</option>
                                <option value="male">Чоловіча</option>
                                <option value="female">Жіноча</option>
                            </select>
                        ) : (
                            <span className="filled-info">
                                {user.gender === 'male' ? 'чоловіча' : user.gender === 'female' ? 'жіноча' : 'Не вказано'}
                            </span>
                        )}
                    </div>
                    <img src={line3} alt="" className="field-divider" />

                    <div className="info-field">
                        <label>Дата народження:</label>
                        {isEditing ? (
                            <input
                                type="date"
                                value={formData.birthDate}
                                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                            />
                        ) : (
                            <span className="filled-info">{user.birthDate || 'Не вказано'}</span>
                        )}
                    </div>
                    <img src={line3} alt="" className="field-divider" />

                    <div className="info-field">
                        <label>Мобільний телефон:</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        ) : (
                            <span className="filled-info">{user.phone || 'Не вказано'}</span>
                        )}
                    </div>
                    <img src={line3} alt="" className="field-divider" />

                    <div className="info-field">
                        <label>Ел. пошта:</label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        ) : (
                            <span className="filled-info">{user.email}</span>
                        )}
                    </div>
                </div>
            </div>
            
            {isEditing ? (
                <button className="save-btn" onClick={handleSave}>
                    Зберегти
                </button>
            ) : (
                <button className="logout-btn" onClick={handleLogout}>
                    Вийти
                </button>
            )}
            </div>
        </div>
    );
};

export default Profile;
