import React, { useState, useEffect } from 'react';
import './Home.css';
import Bakota from '../../assets/img/Bakota.jpg';
import Kyiv from '../../assets/img/Kyiv.png';
import Odessa from '../../assets/img/Odessa.jpg';
import Karpaty from '../../assets/img/Karpaty.png';
import Couple from '../../assets/img/Couple.png';

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
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

    const slides = [
        {
            id: 1,
            image: Bakota,
            title: 'Бакота',
            description: 'У Хмельницькій області розташований загублений край - Бакота. Мальовничий каньйон з давньою історією захоплює своїми просторами та незвичною атмосферою. Бджільництво, свіжий мед із польових трав, дотик до природи.'
        },
        {
            id: 2,
            image: Kyiv,
            title: 'Київ',
            description: 'Неподалік центра Києва розташувалось автентичне українське село на території однойменного села Пирогово. Дерев’яні млини, запашний хліб, приготовлений своїми руками, українські пісні та багато іншого чекає на вас уже зараз.'
        },
        {
            id: 3,
            image: Odessa,
            title: 'Одеса',
            description: 'В Одеській області знаходиться мальовниче містечко Вилкове. Його ще називають «українською Венецією». Вилкове - це містечко на воді, весь в каналах. Розташоване в місці, де зустрічаються річка Дунай і Чорне море. Люди пересуваються переважно човнами. Нетипове українське село не залишить Вас без вражень.'
        },
        {
            id: 4,
            image: Karpaty,
            title: 'Карпати',
            description: 'Полонини Карпат, у селі Орів посеред гір розташувався затишний куточок для незабутніх вражень. Справжні українські гори, власноручне сироваріння на полонині, водоспади та вікові дерева чекають на Вас.'
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
                <div className="carousel">
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
                            <button className="view-btn">Переглянути →</button>
                            <p className="carousel-description">{slides[currentSlide].description}</p>
                        </div>
                    </div>

                    <button className="carousel-btn next" onClick={nextSlide}>
                        &#8250;
                    </button>
                </div>

                <div className="carousel-dots">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        ></span>
                    ))}
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
                <h2 className="contact-title">Зворотній зв'язок</h2>
                <form className="contact-form">
                    <div className="form-group">
                        <label>Ім'я</label>
                        <input type="text" className="form-input" placeholder="Введіть ім’я"/>
                    </div>
                    <div className="form-group">
                        <label>Номер телефону</label>
                        <input type="tel" className="form-input" placeholder="Введіть номер телефону" />
                    </div>
                    <button type="submit" className="submit-btn">Запросити дзвінок</button>
                </form>
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
