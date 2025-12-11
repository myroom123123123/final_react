import React, { useState } from 'react';
import './Booking.css';
import Bakota from '../../assets/img/Bakota.jpg';
import Karpaty from '../../assets/img/Karpaty.png';
import Kyiv from '../../assets/img/Kyiv.jpg';
import Odessa from '../../assets/img/Odessa.jpg';
import Line3 from '../../assets/img/line3.png';
import Line7 from '../../assets/img/line7.png';

const Booking = ({ favorites, addToFavorites, removeFromFavorites, isLoggedIn, onOpenRegister, setCurrentPage, setSelectedProperty }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.custom-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  const properties = [
    {
      id: 1,
      name: 'Незвідана Бакота',
      location: 'Бакота',
      description: 'У Хмельницькій області розташований загублений край - Бакота. Мальовничий каньйон з давньою історією захоплює своїми просторами та незвичною атмосферою. Бджільництво, свіжий мед із польових трав, дотик до природи.',
      image: Bakota,
      detailText: 'Стародавні печери на березі Дністровського водосховища, що вражають своєю історією та красою. Наші будиночки розкинулися на пагорбах з видом на безкрайні водні простори та каньйон.\n\nВи можете обрати кількість кімнат та місць, яке буде ідеальним для Вас. Територія, де розташовані будиночки, підійде як і для великих компаній, яким потрібно бути поряд у декількох будинках, так і для пар, які хочуть бути на одинці.'
    },
    {
      id: 2,
      name: 'Полонини Карпат',
      location: 'Карпати',
      description: 'Полонини Карпат, у селі Орів посеред гір розташувався затишний куточок для незабутніх вражень. Справжні українські гори, власноручне сироваріння на полонині, водоспади та вікові дерева чекають на Вас.',
      image: Karpaty,
      detailText: 'Затишні дерев\'яні будиночки, які захоплять вас на околиці лісу, зустрічають Вас судомним краєвидом на ранкові полонини.\n\nВи можете обрати кількість кімнат та місць, яке буде ідеальним для Вас. Територія, де жити безпечна будиночка, підійде як і для великих компаній, яким потрібно бути поряд у декількох будинках, так і для пар, які хочуть бути на одинці.'
    },
    {
      id: 3,
      name: 'Автентична Київщина',
      location: 'Київ',
      description: 'Неподалік центра Києва розташувалось автентичне українське село на території однойменного села Пирогово. Дерев\'яні млини, запашний хліб, приготовлений своїми руками, українські пісні та багато іншого чекає на вас уже зараз.',
      image: Kyiv,
      detailText: 'Автентичні українські хати на території музею просто неба, де оживає історія наших предків. Наші будиночки стилізовані під традиційну архітектуру з усіма сучасними зручностями.\n\nВи можете обрати кількість кімнат та місць, яке буде ідеальним для Вас. Територія, де розташовані будиночки, підійде як і для великих компаній, яким потрібно бути поряд у декількох будинках, так і для пар, які хочуть бути на одинці.'
    },
    {
      id: 4,
      name: 'Нетипова Одещина',
      location: 'Одеська область',
      description: 'В Одеській області знаходиться мальовниче містечко Вилкове. Його ще називають «українською Венецією». Вилкове - це містечко на воді, весь в каналах. Розташоване в місці, де зустрічаються річка Дунай і Чорне море. Люди пересуваються переважно човнами. Нетипове українське село не залишить Вас без вражень.',
      image: Odessa,
      detailText: 'Українська Венеція з мережею каналів, де життя пливе у ритмі води і човнів. Наші будиночки розташовані на березі каналів з власними причалами та видом на дельту Дунаю.\n\nВи можете обрати кількість кімнат та місць, яке буде ідеальним для Вас. Територія, де розташовані будиночки, підійде як і для великих компаній, яким потрібно бути поряд у декількох будинках, так і для пар, які хочуть бути на одинці.'
    }
  ];

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleFavorite = (property) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    
    if (favorites[property.id]) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <h1>Забронювати будиночок</h1>
      </div>

      <div className="booking-content">
        <div className="filter-section">
          <div className="custom-dropdown">
            <div 
              className="dropdown-header"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedFilter || 'Оберіть місцерозташування'}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-list">
                <div 
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedFilter('');
                    setIsDropdownOpen(false);
                  }}
                >
                  Усі
                </div>
                <img src={Line7} alt="" className="dropdown-divider" />
                <div 
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedFilter('Бакота');
                    setIsDropdownOpen(false);
                  }}
                >
                  Бакота
                </div>
                <img src={Line7} alt="" className="dropdown-divider" />
                <div 
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedFilter('Карпати');
                    setIsDropdownOpen(false);
                  }}
                >
                  Карпати
                </div>
                <img src={Line7} alt="" className="dropdown-divider" />
                <div 
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedFilter('Київ');
                    setIsDropdownOpen(false);
                  }}
                >
                  Київ
                </div>
                <img src={Line7} alt="" className="dropdown-divider" />
                <div 
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedFilter('Одеська область');
                    setIsDropdownOpen(false);
                  }}
                >
                  Одеська область
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="properties-list">
          {properties
            .filter(property => {
              if (!selectedFilter) return true;
              if (selectedFilter === 'Бакота') return property.name.includes('Бакота');
              if (selectedFilter === 'Карпати') return property.name.includes('Карпат');
              if (selectedFilter === 'Київ') return property.name.includes('Київ');
              if (selectedFilter === 'Одеська область') return property.name.includes('Одещин');
              return true;
            })
            .map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image" onClick={() => { setSelectedProperty(property); setCurrentPage('propertyDetail'); }}>
                <img src={property.image} alt={property.name} />
              </div>
              <div className="property-info">
                <h2>{property.name}</h2>
                <img src={Line3} alt="" className="property-divider" />
                <p>{property.description}</p>
                <button className="details-btn" onClick={() => { setSelectedProperty(property); setCurrentPage('propertyDetail'); }}>Детальніше</button>
              </div>
              <button 
                className={`favorite-icon ${favorites[property.id] ? 'active' : ''}`}
                onClick={() => toggleFavorite(property)}
              >
                {favorites[property.id] ? '♥' : '♡'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}

      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowAuthModal(false)}>×</button>
            <h3>Потрібна авторизація</h3>
            <p>Щоб додавати об'єкти в обране, будь ласка, зареєструйтеся або увійдіть до системи</p>
            <button 
              className="modal-register-btn" 
              onClick={() => {
                setShowAuthModal(false);
                onOpenRegister();
              }}
            >
              Зареєструватися
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
