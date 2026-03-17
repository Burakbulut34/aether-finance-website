import React from 'react';
import '../../styles/aboutus.css';

const AboutUS = () => {
  return (
    <div className="about-section-wrapper">
      <div className="about-container">
        
        {/* Sol Taraf: Görsel ve Box Shadow Katmanı */}
        <div className="about-visual">
          <div className="about-image-wrapper">
            <img 
              src="https://res.cloudinary.com/dazvkvpch/image/upload/v1773609118/image4.png" 
              alt="Finans Plaza" 
              className="about-img"
            />
            {/* Resmin üzerindeki gölge ve derinlik efekti */}
            <div className="about-shadow-overlay"></div>
          </div>
          <div className="experience-badge">
            <span className="years">12+</span>
            <span className="exp-text">Yıllık Finans Tecrübesi</span>
          </div>
        </div>

        {/* Sağ Taraf: Metin İçeriği */}
        <div className="about-content">
          <span className="about-subtitle">BİZ KİMİZ?</span>
          <h2 className="about-title">Geleceğinizi Güvenle <br/><span>İnşa Ediyoruz</span></h2>
          <p className="about-description">
            Finansal piyasalarda 10 yılı aşkın süredir bireysel ve kurumsal yatırımcılara 
            stratejik yol haritaları sunuyoruz. Karmaşık borsa ve kripto ekosistemini 
            sizin için basitleştiriyor, şeffaf ve sürdürülebilir büyüme odaklı 
            danışmanlık veriyoruz.
          </p>
          <div className="about-stats">
            <div className="stat-item">
              <h4>Belli Değil</h4>
              <p>Yönetilen Varlık</p>
            </div>
            <div className="stat-item">
              <h4>Belli Değil</h4>
              <p>Aktif Yatırımcı</p>
            </div>
          </div>
          <button className="about-cta">Hikayemizi Keşfedin</button>
        </div>

      </div>
    </div>
  );
};

export default AboutUS;