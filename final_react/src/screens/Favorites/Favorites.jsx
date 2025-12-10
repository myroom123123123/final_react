import React, { useState, useEffect } from 'react';
import './Favorites.css';
import Line3 from '../../assets/img/line3.png';

function Favorites({ favoriteProperties, removeFromFavorites, setCurrentPage }) {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRemoveFavorite = (propertyId) => {
        removeFromFavorites(propertyId);
    };

    return (
        <div className="favorites-page">
            <div className="favorites-hero">
                <h1 className="favorites-hero-title">Обране</h1>
            </div>

            <section className="favorites-content">
                {favoriteProperties.length === 0 ? (
                    <div className="favorites-empty">
                        <div className="heart-icon">♥</div>
                        <p className="empty-message">Ваш список обраного поки що порожній</p>
                        <p className="empty-hint">Додавайте улюблені локації, щоб легко знаходити їх пізніше</p>
                    </div>
                ) : (
                    <div className="favorites-list">
                        {favoriteProperties.map((property) => (
                            <div key={property.id} className="favorite-card">
                                <div className="favorite-image">
                                    <img src={property.image} alt={property.name} />
                                </div>
                                <div className="favorite-info">
                                    <h2>{property.name}</h2>
                                    <img src={Line3} alt="" className="property-divider" />
                                    <p>{property.description}</p>
                                    <button className="details-btn">Детальніше</button>
                                </div>
                                <button 
                                    className="favorite-icon active"
                                    onClick={() => handleRemoveFavorite(property.id)}
                                >
                                    ♥
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {showScrollTop && (
                <button className="scroll-top-btn" onClick={scrollToTop}>
                    ↑
                </button>
            )}
        </div>
    );
}

export default Favorites;
