import React, { useState } from "react";
import "./PropertyDetail.css";

// Import images
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

const PropertyDetail = ({ property, setCurrentPage }) => {
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);

    // Map property images based on location
    const propertyImages = {
        "Бакота": [Bakota1, Bakota2, Bakota3, Bakota4],
        "Карпати": [Karpaty1, Karpaty2, Karpaty3, Karpaty4],
        "Київ": [Kyiv1, Kyiv2, Kyiv3, Kyiv4],
        "Одеська область": [Odessa1, Odessa2, Odessa3, Odessa4]
    };

    const images = propertyImages[property?.location] || [Bakota1, Bakota2, Bakota3, Bakota4];

    const handleCheckAvailability = () => {
        alert("Функція перевірки доступності буде додана незабаром");
    };

    const handleShowPrice = () => {
        alert("Ціна: від 1500 грн/ніч");
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

                <div className="content-layout">
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
                            <p>{property?.detailText || 'Опис недоступний'}</p>
                        </div>
                        <div className="bottom-images">
                            <img src={images[2]} alt="Фото 3" />
                            <img src={images[3]} alt="Фото 4" />
                        </div>
                    </div>
                </div>

                <div className="availability-section">
                    <h3>Наявність місць</h3>
                    <div className="availability-form">
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
                                    onChange={(e) => setRooms(e.target.value)}
                                />
                            </div>
                            <div className="form-group-small">
                                <label>Дорослі</label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    value={adults}
                                    onChange={(e) => setAdults(e.target.value)}
                                />
                            </div>
                            <div className="form-group-small">
                                <label>Діти</label>
                                <input 
                                    type="number" 
                                    min="0" 
                                    value={children}
                                    onChange={(e) => setChildren(e.target.value)}
                                />
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
                                <th>Вміще</th>
                                <th>Тип розміщення</th>
                                <th>Ціна</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="capacity-info">
                                        <span className="people-icon">👥</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="room-type">
                                        <p>Двомісний номер</p>
                                        <p className="room-features">1 широке двоспальне ліжко</p>
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

                <button className="scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    ↑
                </button>
            </div>

            <div className="property-footer">
                <p>© 2021 HolidayTime. All rights reserved.</p>
            </div>
        </div>
    );
};

export default PropertyDetail;
