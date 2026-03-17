import React, { useState, useEffect } from 'react';
import '../../styles/slider.css';

const slides = [
  {
    id: 1,
    badge: "Liquid Staking",
    title: "Varlıklarınızı Özgür Bırakın",
    desc: "ETH ve SOL varlıklarınızı stake ederken likiditenizi koruyun. DeFi'nin en yüksek getiri oranlarıyla tanışın.",
    img: "https://res.cloudinary.com/dazvkvpch/image/upload/v1773481213/image1.jpg",
  },
  {
    id: 2,
    badge: "Cross-Chain Bridge",
    title: "Zincirler Arası Sınırsız Geçiş",
    desc: "Varlıklarınızı saniyeler içinde farklı ağlara transfer edin. Ultra düşük komisyon ve maksimum güvenlik.",
    img: "https://res.cloudinary.com/dazvkvpch/image/upload/v1773481218/image2.jpg",
  },
  {
    id: 3,
    badge: "Yield Farming",
    title: "Pasif Gelirin Geleceği",
    desc: "Otomatik stratejilerle portföyünüzü büyütün. Merkeziyetsiz havuzlarda likidite sağlayarak ödüller kazanın.",
    img: "https://res.cloudinary.com/dazvkvpch/image/upload/v1773481218/image3.jpg",
  }
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  // Otomatik geçiş (opsiyonel)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="modern-slider">
      {slides.map((slide, index) => (
        <div className={`slide-item ${index === current ? 'active' : ''}`} key={slide.id}>
          <img src={slide.img} alt={slide.title} className="slide-bg" />
          <div className="slide-overlay"></div>
          
          <div className="slide-content">
            <span className="slide-badge">Yeni Nesil</span>
            <h2>{slide.title}</h2>
            <p>{slide.desc}</p>
            <div className="slide-actions">
              <button className="btn-primary">Hemen Başla</button>
              <button className="btn-outline">İncele</button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigasyon Okları */}
      <button className="nav-arrow prev" onClick={prevSlide}>&#10094;</button>
      <button className="nav-arrow next" onClick={nextSlide}>&#10095;</button>

      {/* Sayfalama Noktaları */}
      <div className="dots-container">
        {slides.map((_, index) => (
          <div 
            key={index} 
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;