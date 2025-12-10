import React, { useState, useEffect } from 'react';
import './About.css';

function About() {
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

    return (
        <div className="about-page">
            <div className="about-hero">
                <h1 className="about-hero-title">Про нас</h1>
            </div>

            <section className="about-banner">
                <div className="about-banner-content">
                    <h2 className="about-banner-title">HolidayTime</h2>
                    <p className="about-banner-subtitle">
                        Відпочинок, емоції, враження, нетипові маршрути, неймовірні локації -<br />
                        це все про сільський еко-туризм в Україні
                    </p>
                </div>
            </section>

            <section className="about-content-section">
                <div className="about-text-block">
                    <p>Наша команда зібрала найколоритніші місця нашої країни саме для тебе.</p>
                    
                    <p>
                        Місія нашої компанії подарувати незабутні враження та показати Україну з іншої сторони. 
                        Пройти разом з Вами лісовими стежками, щоб попоїсти свіжого карпатського сиру. 
                        Пірнути у каньйон та побачити занурене  під товщу років село Бакота. 
                        Покататись на гандолах в "українській Венеції".
                    </p>
                    
                    <p>Пізнати Україну разом!</p>
                </div>
            </section>
            {showScrollTop && (
                <button className="scroll-top-btn" onClick={scrollToTop}>
                    ↑
                </button>
            )}
        </div>
    );
}

export default About;
