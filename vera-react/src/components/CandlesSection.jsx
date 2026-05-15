import { useState, useEffect } from "react";

const CandlesSection = () => {
  const [candleData, setCandleData] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");

  // ES6 fetch — JSON дата ачаалах
  useEffect(() => {
    const loadCandles = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/candles");
        const data = await res.json();
        setCandleData(data);
      } catch (err) {
        console.error("❌ Candles дата алдаа:", err);
      }
    };
    loadCandles();
  }, []);

  const filtered = currentFilter === "all"
    ? candleData
    : candleData.filter(c => c.scent === currentFilter);

  const filters = [
    { key: "all", label: "All" },
    { key: "floral", label: "🌸 Floral" },
    { key: "woody", label: "🌲 Woody" },
    { key: "fresh", label: "🌿 Fresh" },
    { key: "sweet", label: "🍯 Sweet" },
    { key: "spice", label: "🌶 Spice" },
  ];

  const addToCart = (name) => {
    alert(`🕯️ "${name}" added to cart`);
  };

  return (
    <div style={{ padding: "120px 40px 80px" }}>
      <div className="section-heading">Candle Collection</div>
      <div className="section-sub">SCENTS FOR EVERY MOOD</div>
      <div className="section-divider"></div>

      {/* Filter bar */}
      <div className="filter-bar">
        {filters.map(f => (
          <button
            key={f.key}
            className={`filter-chip ${currentFilter === f.key ? "active" : ""}`}
            onClick={() => setCurrentFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Candles grid */}
      <div className="candles-grid">
        {filtered.map((c, i) => (
          <div className="candle-card" key={i}>
            <img src={c.img} alt={c.name} />
            <div className="candle-card-body">
              <div className="candle-card-name">{c.name}</div>
              <div className="candle-card-desc">{c.desc}</div>
              <div className="candle-card-footer">
                <div className="candle-price">${c.price}</div>
                {c.tag && (
                  <span className={`candle-tag ${c.tag === "new" ? "new" : c.tag === "sale" ? "sale" : ""}`}>
                    {c.tag}
                  </span>
                )}
              </div>
              <button className="add-cart-btn" onClick={() => addToCart(c.name)}>
                + Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandlesSection;