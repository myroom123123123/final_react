import React from "react";
import "./Contact.css";

const Contact = () => {
    const handleMapClick = () => {
        window.open('https://www.google.com/maps/place/%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%9C%D0%B0%D0%BB%D0%B5%D0%B2%D0%B8%D1%87%D0%B0,+4,+%D0%9A%D0%B8%D1%97%D0%B2,+02000/@50.4851493,30.4498959,17z/', '_blank');
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h2>Контакти</h2>
            </div>
            
            <div className="contact-content">
                <div className="contact-info-grid">
                    <div className="contact-info-item">
                        <h3>Телефон</h3>
                        <p>+38(063)051-61-24</p>
                    </div>
                    
                    <div className="contact-info-item">
                        <h3>Графік роботи</h3>
                        <p>пн-пт 08:00-22:00</p>
                        <p>сб 09:00-21:00</p>
                        <p>нд 10:00-20:00</p>
                    </div>
                    
                    <div className="contact-info-item">
                        <h3>Ел. пошта</h3>
                        <p>mroom9195@gmail.com</p>
                    </div>
                </div>
                
                <div className="contact-address-section">
                    <div className="address-info">
                        <h3>Адреса офісу</h3>
                        <p>м. Київ, вул. Малевича, буд. 4</p>
                    </div>
                    
                    <div className="map-container" onClick={handleMapClick}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.8735088662447!2d30.44989591573!3d50.48514937947736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50f5c6451d%3A0x6d3b68b5c5e00e8f!2z0LLRg9C70LjRhtGPINCc0LDQu9C10LLQuNGH0LAsIDQsINCa0LjRl9Cy!5e0!3m2!1suk!2sua!4v1702201234567!5m2!1suk!2sua"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Карта офісу"
                        ></iframe>
                    </div>
                </div>
            </div>
        
        </div>
    );
};

export default Contact;
