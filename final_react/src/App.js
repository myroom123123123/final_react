import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './screens/Home/Home'
import About from './screens/About/About'
import Favorites from './screens/Favorites/Favorites'
import Booking from './screens/Booking/Booking'
import Profile from './screens/Profile/Profile'
import Contact from './screens/Contact/Contact'
import PropertyDetail from './screens/PropertyDetail/PropertyDetail'
import RegisterModal from './screens/RegisterModal/RegisterModal'


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [favorites, setFavorites] = useState({});
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  useEffect(() => {
    // Перевіряємо localStorage (залишатись в системі) і sessionStorage (на одну сесію)
    let user = null;
    if (localStorage.getItem('currentUser')) {
      user = JSON.parse(localStorage.getItem('currentUser'));
    } else if (sessionStorage.getItem('currentUser')) {
      user = JSON.parse(sessionStorage.getItem('currentUser'));
    }
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
  }, []);
  const addToFavorites = (property) => {
    setFavorites(prev => ({ ...prev, [property.id]: true }));
    setFavoriteProperties(prev => {
      const exists = prev.find(p => p.id === property.id);
      if (!exists) {
        return [...prev, property];
      }
      return prev;
    });
  };

  const removeFromFavorites = (propertyId) => {
    setFavorites(prev => ({ ...prev, [propertyId]: false }));
    setFavoriteProperties(prev => prev.filter(p => p.id !== propertyId));
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Header 
        setCurrentPage={setCurrentPage} 
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} setSelectedProperty={setSelectedProperty} />}
      {currentPage === 'about' && <About />}
      {currentPage === 'favorites' && <Favorites favoriteProperties={favoriteProperties} removeFromFavorites={removeFromFavorites} setCurrentPage={setCurrentPage} />}
      {currentPage === 'booking' && <Booking favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} isLoggedIn={isLoggedIn} onOpenRegister={() => setOpenRegisterModal(true)} setCurrentPage={setCurrentPage} setSelectedProperty={setSelectedProperty} />}
      {currentPage === 'profile' && <Profile isLoggedIn={isLoggedIn} currentUser={currentUser} setCurrentPage={setCurrentPage} onOpenRegister={() => setOpenRegisterModal(true)} />}
      {currentPage === 'contact' && <Contact />}
      {currentPage === 'propertyDetail' && <PropertyDetail property={selectedProperty} setCurrentPage={setCurrentPage} />}
      <Footer />
      <RegisterModal 
        setOpenRegister={openRegisterModal} 
        onCloseRegist={() => setOpenRegisterModal(false)}
        onRegister={handleRegister}
      />
    </div>
  );
}

export default App;