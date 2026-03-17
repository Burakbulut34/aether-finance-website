import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { ResponsiveContainer, AreaChart, Area, YAxis } from "recharts";
import { Bitcoin, Coins, CircleDot, Database, Smartphone, XCircle, Zap, Layers } from "lucide-react";
import "../../styles/financecoin.css";

const COIN_CONFIGS = [
  { pair: "BTCUSDT", name:"BITCOIN", symbol: "BTC", icon: Bitcoin, color: "#F7931A" },
  { pair: "ETHUSDT", name:"ETHEREUM", symbol: "ETH", icon: Coins, color: "#627EEA" },
  { pair: "SOLUSDT", name:"SOLANA", symbol: "SOL", icon: Smartphone, color: "#14F195" },
  { pair: "AVAXUSDT", name:"AVALANCHE", symbol: "AVAX", icon: Zap, color: "#E84142" },
  { pair: "BNBUSDT", name:"BINANCE COIN", symbol: "BNB", icon: CircleDot, color: "#F3BA2F" },
  { pair: "ARBUSDT", name:"ARBITRUM", symbol: "ARB", icon: Layers, color: "#28A0F0" },
  { pair: "ADAUSDT", name:"CARDANO", symbol: "ADA", icon: Database, color: "#0033AD" },
  { pair: "XRPUSDT", name:"XRP", symbol: "XRP", icon: XCircle, color: "#ffffff" }
];

const CryptoBox = ({ coin }) => {
  const Icon = coin.icon;
  const isPositive = parseFloat(coin.priceChangePercent) >= 0;

  return (
    <a href={`https://pro.btcturk.com/kolay-al-sat/${coin.symbol}TRY`} target="_blank" rel="noopener noreferrer" className="crypto-card-anchor">
      <div className="crypto-item-box">
        <div className="coin-info-row">
          <div className="coin-icon-wrapper" style={{ background: `${coin.color}22` }}>
            <Icon size={24} color={coin.color} />
          </div>
          <span className="coin-name-text">{coin.name}</span>
          <div className="coin-meta">
            <span className="coin-symbol">{coin.symbol}</span>
            <span className={`coin-change ${isPositive ? "up" : "down"}`}>
              {isPositive ? "▲" : "▼"} {Math.abs(parseFloat(coin.priceChangePercent)).toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="price-display">
          <span className="price-value">
            ${parseFloat(coin.lastPrice).toLocaleString("en-US", { 
                minimumFractionDigits: coin.symbol === "ARB" || coin.symbol === "ADA" ? 4 : 2 
            })}
          </span>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={coin.history} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`grad-${coin.symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={coin.color} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={coin.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis hide domain={['auto', 'auto']} /> 
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={coin.color} 
                fill={`url(#grad-${coin.symbol})`} 
                strokeWidth={2.5} 
                dot={false}
                isAnimationActive={true}
                // Akışın sırrı bu iki satırda:
                animationDuration={1000} // Veri gelme hızıyla (1sn) tam uyum
                animationEasing="linear" // Sabit hızda kayma
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </a>
  );
};

export default function FinanceCoin() {
  const [data, setData] = useState([]);
  const historyRef = useRef({}); 

  const fetchData = useCallback(async () => {
    try {
      const tickerRes = await axios.get("https://api.binance.com/api/v3/ticker/24hr");
      
      const updatedData = COIN_CONFIGS.map((config) => {
        const ticker = tickerRes.data.find(t => t.symbol === config.pair);
        const currentPrice = parseFloat(ticker.lastPrice);

        // Grafik uzunluğunu 30 saniye tutuyoruz
        if (!historyRef.current[config.symbol]) {
          historyRef.current[config.symbol] = Array(30).fill({ price: currentPrice });
        }
        
        // Yeni fiyatı sona ekle, en eskiyi çıkar (Kuyruk yapısı)
        const updatedHistory = [...historyRef.current[config.symbol].slice(1), { price: currentPrice }];
        historyRef.current[config.symbol] = updatedHistory;

        return { ...config, ...ticker, history: updatedHistory };
      });

      setData(updatedData);
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000); // Her saniye veri çek
    return () => clearInterval(interval);
  }, [fetchData]);

  if (data.length === 0) return null;

  return (
    <div className="market-insight-wrapper">
      <div className="market-header">
        <h2 className="market-main-title">PİYASA İZLEME</h2>
        <div className="live-indicator"><span className="pulse-dot"></span> LIVE</div>
      </div>
      <div className="crypto-grid">
        {data.map((coin) => <CryptoBox key={coin.pair} coin={coin} />)}
      </div>
    </div>
  );
}