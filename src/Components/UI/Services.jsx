import React from 'react';
import { TrendingUp, Cpu, ShieldCheck } from 'lucide-react';
import '../../styles/services.css';

// Box bileşeninde style kısmına dikkat: background (gradient için) kullanıyoruz.
const Box = ({ icon: Icon, title, items, gradient }) => (
  <div className="services-card" style={{ background: gradient }}>
    {/* Parlama efekti için dekoratif bir katman */}
    <div className="card-glass-overlay"></div>
    
    <div className="services-icon-box">
      <Icon size={32} strokeWidth={1.5} />
    </div>
    
    <h2 className="services-card-title">{title}</h2>
    
    <ul className="services-list">
      {items.map((item, index) => (
        <li key={index} className="services-list-item">{item}</li>
      ))}
    </ul>
  </div>
);

function App() {
  // Her kutu için ayrı ayrı linear-gradient tanımladık:
  const boxes = [
    {
      title: "Hisse Senedi Piyasası Analizi",
      icon: TrendingUp,
      // 1. Kutu: Altın/Kahve tonlarında gradyan
      gradient: "linear-gradient(135deg, #23231B 0%, #463F29 100%)",
      items: ["Hisse Senedi Analizi", "Borsa Stratejileri", "Teknik Analiz", "Piyasa Yorumları"]
    },
    {
      title: "Kripto Portföy Stratejisi",
      icon: Cpu,
      // 2. Kutu: Koyu Turkuaz/Petrol tonlarında gradyan
      gradient: "linear-gradient(135deg, #0A2023 0%, #103234 100%)",
      items: ["Kripto Portföy Yönetimi", "Altcoin Analizleri", "DeFi Stratejileri", "Risk Yönetimi"]
    },
    {
      title: "Emeklilik Planlama",
      icon: ShieldCheck,
      // 3. Kutu: Koyu Gri/Mavi tonlarında gradyan
      gradient: "linear-gradient(135deg, #0C1E24 0%, #102F32 100%)",
      items: ["Emeklilik Planlama", "Fon Yönetimi", "Gelecek Hazırlığı", "Vergi Danışmanlığı"]
    }
  ];

  return (
    <div className="services-section-wrapper" id="services">
      <div className="services-header">
        <span className="sub-title">Hizmetlerimiz</span>
        <h1 className="main-title">Profesyonel Yatırım Çözümleri</h1>
      </div>
      <div className="services-grid-container">
        {boxes.map((box, i) => (
          <Box key={i} {...box} />
        ))}
      </div>
    </div>
  );
}

export default App;