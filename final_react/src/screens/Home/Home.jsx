import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Bakota from '../../assets/img/Bakota.jpg';
import Kyiv from '../../assets/img/Kyiv.jpg';
import Odessa from '../../assets/img/Odessa.jpg';
import Karpaty from '../../assets/img/Karpaty.png';
import Couple from '../../assets/img/Couple.png';

function Home({ setCurrentPage, setSelectedProperty }) {
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
            if (errors[name]) {
                setErrors((prev) => ({ ...prev, [name]: '' }));
            }
        };

        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [errors, setErrors] = useState({ name: '', phone: '' });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Swipe state
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    const minSwipeDistance = 50; // px

    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const onTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;
        const distance = touchStartX.current - touchEndX.current;
        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                // swipe left
                nextSlide();
            } else {
                // swipe right
                prevSlide();
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Будь ласка, введіть ім'я";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Будь ласка, введіть номер телефону';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch('https://formspree.io/f/xdkqwrwk', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone
                })
            });
            if (response.ok) {
                setShowSuccessMessage(true);
                setFormData({ name: '', phone: '' });
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            } else {
                alert('Сталася помилка при надсиланні. Спробуйте ще раз.');
            }
        } catch (error) {
            alert('Сталася помилка при надсиланні. Спробуйте ще раз.');
        }
    };

    const slides = [
        {
            id: 1,
            image: Bakota,
            title: 'Бакота',
            location: 'Бакота',
            name: 'Бронювання будиночка в Бакоті',
            description: 'У Хмельницькій області розташований загублений край - Бакота. Мальовничий каньйон з давньою історією захоплює своїми просторами та незвичною атмосферою. Бджільництво, свіжий мед із польових трав, дотик до природи.',
            detailText: 'У Хмельницькій області розташований загублений край - Бакота. Мальовничий каньйон з давньою історією захоплює своїми просторами та незвичною атмосферою.\n\nБджільництво, свіжий мед із польових трав, дотик до природи. Тут ви знайдете справжній спокій та єднання з українською природою.'
        },
        {
            id: 2,
            image: Kyiv,
            title: 'Київ',
            location: 'Київ',
            name: 'Бронювання будиночка в Києві',
            description: 'Неподалік центра Києва розташувалось автентичне українське село на території однойменного села Пирогово. Дерев\'яні млини, запашний хліб, приготовлений своїми руками, українські пісні та багато іншого чекає на вас уже зараз.',
            detailText: 'Неподалік центра Києва розташувалось автентичне українське село на території однойменного села Пирогово.\n\nДерев\'яні млини, запашний хліб, приготовлений своїми руками, українські пісні та багато іншого чекає на вас уже зараз.'
        },
        {
            id: 3,
            image: Odessa,
            title: 'Одеса',
            location: 'Одеська область',
            name: 'Бронювання будиночка в Одесі',
            description: 'В Одеській області знаходиться мальовниче містечко Вилкове. Його ще називають «українською Венецією». Вилкове - це містечко на воді, весь в каналах. Розташоване в місці, де зустрічаються річка Дунай і Чорне море. Люди пересуваються переважно човнами. Нетипове українське село не залишить Вас без вражень.',
            detailText: 'В Одеській області знаходиться мальовниче містечко Вилкове. Його ще називають «українською Венецією».\n\nВилкове - це містечко на воді, весь в каналах. Розташоване в місці, де зустрічаються річка Дунай і Чорне море.'
        },
        {
            id: 4,
            image: Karpaty,
            title: 'Карпати',
            location: 'Карпати',
            name: 'Бронювання будиночка в Карпатах',
            description: 'Полонини Карпат, у селі Орів посеред гір розташувався затишний куточок для незабутніх вражень. Справжні українські гори, власноручне сироваріння на полонині, водоспади та вікові дерева чекають на Вас.',
            detailText: 'Полонини Карпат, у селі Орів посеред гір розташувався затишний куточок для незабутніх вражень.\n\nСправжні українські гори, власноручне сироваріння на полонині, водоспади та вікові дерева чекають на Вас.'
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">HolidayTime</h1>
                    <p className="hero-subtitle">Автентичний відпочинок серед українського колориту!</p>
                </div>
            </section>
            <section className="carousel-section">
                <div
                    className="carousel"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <button className="carousel-btn prev" onClick={prevSlide}>
                        &#8249;
                    </button>
                    
                    <div className="carousel-content">
                        <img 
                            src={slides[currentSlide].image} 
                            alt={slides[currentSlide].title}
                            className="carousel-image"
                        />
                        <div className="carousel-text">
                            <button 
                                className="view-btn" 
                                onClick={() => {
                                    setSelectedProperty(slides[currentSlide]);
                                    setCurrentPage('propertyDetail');
                                }}
                            >
                                Переглянути →
                            </button>
                            <p className="carousel-description">{slides[currentSlide].description}</p>
                        </div>

                    </div>

                    <button className="carousel-btn next" onClick={nextSlide}>
                        &#8250;
                    </button>
                </div>
            </section>
            <section className="about-section">
                <div className="about-content">
                    <div className="about-image">
                        <img src={Couple} alt="Пара біля вікна" />
                    </div>
                    <div className="about-text">
                        <p>
                            Автентичний відпочинок у затишних локаціях. <br />  
                            Незабутня природа та місцеві колорит <br />
                            гарантують Вам незабутні враження.
                        </p>
                    </div>
                </div>
            </section>
            <section className="contact-section">
                {!showSuccessMessage ? (
                    <>
                        <h2 className="contact-title">Зворотній зв'язок</h2>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Ім'я</label>
                                {errors.name && <span className="error-text">{errors.name}</span>}
                                <input 
                                    type="text" 
                                    name="name"
                                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                                    placeholder="Введіть ім'я"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Номер телефону</label>
                                {errors.phone && <span className="error-text">{errors.phone}</span>}
                                <input 
                                    type="tel" 
                                    name="phone"
                                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                                    placeholder="Введіть номер телефону"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="submit-btn">Запросити дзвінок</button>
                        </form>
                    </>
                ) : (
                    <div className="success-message-container">
                        <h2 className="success-title">Дякуємо за звернення!</h2>
                        <p className="success-text">
                            Менеджер з вами зв'яжеться найближчим часом
                        </p>
                        <div className="success-icon">✓</div>
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

export default Home;