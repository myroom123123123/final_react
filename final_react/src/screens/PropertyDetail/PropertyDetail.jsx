import React, { useState, useEffect } from "react";
import { db } from '../../firebase';
import { collection, addDoc, getDocs, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore';
import "./PropertyDetail.css";
import Bakota1 from "../../assets/img/Bakota.jpg";
import Bakota2 from "../../assets/img/Bakota2.png";
import Bakota3 from "../../assets/img/Bakota3.png";
import Bakota4 from "../../assets/img/Bakota4.png";

import Karpaty1 from "../../assets/img/Karpaty.png";
import Karpaty2 from "../../assets/img/Karpaty2.png";
import Karpaty3 from "../../assets/img/Karpaty3.png";
import Karpaty4 from "../../assets/img/Karpaty4.png";

import Kyiv1 from "../../assets/img/Kyiv.jpg";
import Kyiv2 from "../../assets/img/Kyiv2.png";
import Kyiv3 from "../../assets/img/Kyiv3.png";
import Kyiv4 from "../../assets/img/Kyiv4.png";

import Odessa1 from "../../assets/img/Odessa.jpg";
import Odessa2 from "../../assets/img/Odessa2.png";
import Odessa3 from "../../assets/img/Odessa.3.png";
import Odessa4 from "../../assets/img/Odessa4.png";

import singleBed from "../../assets/img/singlebed.png";
import bed from "../../assets/img/bed.png";
import person from "../../assets/img/person.png";
import group from "../../assets/img/group.png";

const PropertyDetail = ({ property, setCurrentPage }) => {
    let currentUserObj = null;
    if (localStorage.getItem('currentUser')) {
        currentUserObj = JSON.parse(localStorage.getItem('currentUser'));
    } else if (sessionStorage.getItem('currentUser')) {
        currentUserObj = JSON.parse(sessionStorage.getItem('currentUser'));
    }
    const isAuthenticated = Boolean(currentUserObj);
    const currentUser = currentUserObj ? currentUserObj.fullName : '';
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [rooms, setRooms] = useState(0);
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [picker, setPicker] = useState({ open: false, type: null });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [reviews, setReviews] = useState([]);
    // Завантаження відгуків з Firestore
    useEffect(() => {
        if (!property?.id) return;
        const fetchReviews = async () => {
            const q = query(
                collection(db, 'reviews'),
                where('propertyId', '==', property.id),
                orderBy('date', 'asc')
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({ ...doc.data(), _id: doc.id }));
            setReviews(data);
        };
        fetchReviews();
    }, [property?.id]);
    const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
    const [showReviewForm, setShowReviewForm] = useState(false);
    const propertyImages = {
        "Бакота": [Bakota1, Bakota2, Bakota3, Bakota4],
        "Карпати": [Karpaty1, Karpaty2, Karpaty3, Karpaty4],
        "Київ": [Kyiv1, Kyiv2, Kyiv3, Kyiv4],
        "Одеська область": [Odessa1, Odessa2, Odessa3, Odessa4]
    };

    const images = propertyImages[property?.location] || [Bakota1, Bakota2, Bakota3, Bakota4];

    const handleCheckAvailability = () => {
        const isAvailable = Math.random() > 0.5;
        if (isAvailable) {
            setModalMessage("Є вільні місця! Ви можете забронювати.");
        } else {
            setModalMessage("На жаль, вільних місць немає на обрані дати.");
        }
        setShowModal(true);
    };

    const handleShowPrice = () => {
        setModalMessage("Ціна: від 1500 грн/ніч");
        setShowModal(true);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (newReview.name.trim() && newReview.comment.trim()) {
            const reviewToSave = {
                ...newReview,
                propertyId: property.id,
                date: new Date().toISOString()
            };
            await addDoc(collection(db, 'reviews'), reviewToSave);
            setNewReview({ name: '', rating: 5, comment: '' });
            setShowReviewForm(false);
            // Оновити список після додавання
            const q = query(
                collection(db, 'reviews'),
                where('propertyId', '==', property.id),
                orderBy('date', 'asc')
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({ ...doc.data(), _id: doc.id }));
            setReviews(data);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        await deleteDoc(doc(db, 'reviews', reviewId));
        setReviews(reviews.filter(r => r._id !== reviewId));
    };

    return (
        <div className="property-detail-container">
            <div className="property-detail-header">
                <h2>{property?.name || "Бронювання будиночка в Карпатах"}</h2>
            </div>

            <div className="property-detail-content">
                <button className="back-button" onClick={() => setCurrentPage('booking')}>
                    ← Назад
                </button>


                {/* Desktop layout */}
                <div className="content-layout desktop-layout">
                    <div className="left-column">
                        <div className="main-image">
                            <img src={images[0]} alt="Головне фото" />
                        </div>
                        <div className="small-image">
                            <img src={images[1]} alt="Фото 2" />
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="property-description">
                            {(property?.detailText || 'Опис недоступний').split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="bottom-images">
                            <img src={images[2]} alt="Фото 3" />
                            <img src={images[3]} alt="Фото 4" />
                        </div>
                    </div>
                </div>

                {/* Mobile layout: 2x2 grid, text below */}
                <div className="mobile-images-grid">
                    <div className="row">
                        <img src={images[0]} alt="Фото 1" />
                        <img src={images[1]} alt="Фото 2" />
                    </div>
                    <div className="row">
                        <img src={images[2]} alt="Фото 3" />
                        <img src={images[3]} alt="Фото 4" />
                    </div>
                    <div className="property-description mobile-description">
                        {(property?.detailText || 'Опис недоступний').split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                <div className="availability-section">
                    <h3>Наявність місць</h3>
                    <div className="availability-form">
                        <p className="form-text">Коли б Ви хотіли зупинись в помешканні Полонини Карпат?</p>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Дата заїзду</label>
                                <input 
                                    type="date" 
                                    value={checkInDate}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Дата виїзду</label>
                                <input 
                                    type="date" 
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group-small">
                                <label>Номери</label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    value={rooms}
                                    readOnly
                                    onClick={() => {
                                        if (window.innerWidth <= 600) setPicker({ open: true, type: 'rooms' });
                                    }}
                                    style={{ cursor: window.innerWidth <= 600 ? 'pointer' : 'auto' }}
                                />
                            </div>
                            <div className="form-group-small">
                                <label>Дорослі</label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    value={adults}
                                    readOnly
                                    onClick={() => {
                                        if (window.innerWidth <= 600) setPicker({ open: true, type: 'adults' });
                                    }}
                                    style={{ cursor: window.innerWidth <= 600 ? 'pointer' : 'auto' }}
                                />
                            </div>
                            <div className="form-group-small">
                                <label>Діти</label>
                                <input 
                                    type="number" 
                                    min="0" 
                                    value={children}
                                    readOnly
                                    onClick={() => {
                                        if (window.innerWidth <= 600) setPicker({ open: true, type: 'children' });
                                    }}
                                    style={{ cursor: window.innerWidth <= 600 ? 'pointer' : 'auto' }}
                                />
                                        {/* Модальне вікно для вибору кількості */}
                                        {picker.open && (
                                            <div className="mobile-picker-modal" onClick={() => setPicker({ open: false, type: null })}>
                                                <div className="mobile-picker-content" onClick={e => e.stopPropagation()}>
                                                    <h4>Оберіть кількість</h4>
                                                    <div className="mobile-picker-options">
                                                        {[1,2,3,4].map(num => (
                                                            <button key={num} onClick={() => {
                                                                if (picker.type === 'rooms') setRooms(num);
                                                                if (picker.type === 'adults') setAdults(num);
                                                                if (picker.type === 'children') setChildren(num);
                                                                setPicker({ open: false, type: null });
                                                            }}>{num}</button>
                                                        ))}
                                                    </div>
                                                    <button className="mobile-picker-cancel" onClick={() => setPicker({ open: false, type: null })}>Скасувати</button>
                                                </div>
                                            </div>
                                        )}
                            </div>
                        </div>
                        <button className="check-availability-btn" onClick={handleCheckAvailability}>
                            Перевірити наявність вільних місць
                        </button>
                    </div>
                </div>

                <div className="booking-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Вміщує</th>
                                <th>Тип розміщення</th>
                                <th>Ціна</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="capacity-info">
                                        {(Number(adults) + Number(children)) === 0 && <span className="no-people">—</span>}
                                        {(Number(adults) + Number(children)) === 1 && <img src={person} alt="person" className="icon-person" />}
                                        {(Number(adults) + Number(children)) === 2 && (
                                            <>
                                                <img src={person} alt="person" className="icon-person" />
                                                <img src={person} alt="person" className="icon-person" />
                                            </>
                                        )}
                                        {(Number(adults) + Number(children)) >= 3 && <img src={group} alt="group" className="icon-group" />}
                                    </div>
                                </td>
                                <td>
                                    <div className="room-type">
                                        {(Number(adults) + Number(children)) === 0 ? (
                                            <span className="no-people">—</span>
                                        ) : (
                                            <>
                                                <p>Двомісний номер</p>
                                                <div className="room-features">
                                                    {(Number(adults) + Number(children)) === 1 && (
                                                        <>
                                                            <img src={singleBed} alt="single bed" className="icon-bed" />
                                                            <span>1 односпальне ліжко</span>
                                                        </>
                                                    )}
                                                    {(Number(adults) + Number(children)) === 2 && (
                                                        <>
                                                            <img src={bed} alt="bed" className="icon-bed" />
                                                            <span>1 широке двоспальне ліжко</span>
                                                        </>
                                                    )}
                                                    {(Number(adults) + Number(children)) === 3 && (
                                                        <>
                                                            <img src={bed} alt="bed" className="icon-bed" />
                                                            <img src={singleBed} alt="single bed" className="icon-bed" />
                                                            <span>1 двоспальне і 1 односпальне ліжко</span>
                                                        </>
                                                    )}
                                                    {(Number(adults) + Number(children)) >= 4 && (
                                                        <>
                                                            <img src={bed} alt="bed" className="icon-bed" />
                                                            <img src={bed} alt="bed" className="icon-bed" />
                                                            <span>2 двоспальні ліжка</span>
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <button className="show-price-btn" onClick={handleShowPrice}>
                                        Показати ціни
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="reviews-section">
                    <h3>Відгуки</h3>
                    {isAuthenticated && !showReviewForm && (
                        <button className="submit-review-btn" onClick={() => setShowReviewForm(true)}>
                            Залишити відгук
                        </button>
                    )}
                    {isAuthenticated && showReviewForm && (
                        <form className="review-form" onSubmit={handleReviewSubmit}>
                            <div className="review-form-group">
                                <label>Ваше ім'я</label>
                                <input
                                    type="text"
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="review-form-group">
                                <label>Оцінка</label>
                                <select
                                    value={newReview.rating}
                                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                                >
                                    <option value={5}>⭐⭐⭐⭐⭐</option>
                                    <option value={4}>⭐⭐⭐⭐</option>
                                    <option value={3}>⭐⭐⭐</option>
                                    <option value={2}>⭐⭐</option>
                                    <option value={1}>⭐</option>
                                </select>
                            </div>
                            <div className="review-form-group">
                                <label>Ваш відгук</label>
                                <textarea
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    rows="4"
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-review-btn">Залишити відгук</button>
                        </form>
                    )}
                    {!isAuthenticated && (
                        <div className="not-auth-message">Тільки зареєстровані користувачі можуть залишати відгуки.</div>
                    )}
                    <div className="reviews-list" style={{marginTop: '30px'}}>
                        {reviews.length === 0 ? (
                            <p className="no-reviews">Поки що немає відгуків. Будьте першим!</p>
                        ) : (
                            reviews.map((review, index) => (
                                <div key={index} className="review-item">
                                    <div className="review-header">
                                        <span className="review-name">{review.name}</span>
                                        <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                                        {isAuthenticated && review.name === currentUser && (
                                            <button className="delete-review-btn" onClick={() => handleDeleteReview(index)}>
                                                Видалити
                                            </button>
                                        )}
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                    <span className="review-date">{
  review.date
    ? (() => {
        const d = new Date(review.date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        const hour = String(d.getHours()).padStart(2, '0');
        const min = String(d.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hour}:${min}`;
      })()
    : ""
}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <button className="scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    ↑
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <p>{modalMessage}</p>
                        <button className="modal-btn" onClick={() => setShowModal(false)}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyDetail;
