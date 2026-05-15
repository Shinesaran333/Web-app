import { useState, useEffect } from "react";

const ShopSection = () => {
  const [shopData, setShopData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(120);
  const [sortBy, setSortBy] = useState("featured");
  const [categories, setCategories] = useState([
    "Pillar Candles",
    "Jar Candles", 
    "Taper Candles",
    "Gift Sets"
  ]);

  useEffect(() => {
    const loadShop = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/shop");
        const data = await res.json();
        setShopData(data);
      } catch (err) {
        console.error("❌ Shop дата алдаа:", err);
      }
    };
    loadShop();
  }, []);

  // Category checkbox toggle
  const toggleCategory = (cat) => {
    setCategories(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  const getSorted = () => {
    let items = shopData
      .filter(i => i.price <= maxPrice)
      .filter(i => categories.includes(i.type)); // ← category filter нэмэгдлээ
    if (sortBy === "price-low") return [...items].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") return [...items].sort((a, b) => b.price - a.price);
    if (sortBy === "newest") return [...items].reverse();
    return items;
  };

  return (
    <div style={{ padding: "120px 40px 80px" }}>
      <div className="section-heading">Shop</div>
      <div className="section-sub">HAND-POURED. SMALL BATCH. YOURS.</div>
      <div className="section-divider"></div>

      <div className="shop-layout">
        <aside className="shop-sidebar">

          {/* Category filter — нэмэгдлээ */}
          <div className="sidebar-group">
            <div className="sidebar-title">Category</div>
            {["Pillar Candles", "Jar Candles", "Taper Candles", "Gift Sets"].map(cat => (
              <label className="sidebar-option" key={cat}>
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          <div className="sidebar-group">
            <div className="sidebar-title">Price Range</div>
            <input
              type="range"
              className="price-range"
              min="10"
              max="120"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
            />
            <div className="price-display">Up to ${maxPrice}</div>
          </div>

          <div className="sidebar-group">
            <div className="sidebar-title">Sort By</div>
            <select
              onChange={e => setSortBy(e.target.value)}
              style={{ width:"100%", padding:"10px", borderRadius:"10px", border:"1px solid #ddd", fontFamily:"'Sora',sans-serif", fontSize:"13px" }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </aside>

        <div className="shop-grid">
          {getSorted().map((item, i) => (
            <div className="shop-item" key={i}>
              <img src={item.img} alt={item.name} />
              <button className="wishlist-btn" onClick={() => alert("Added to wishlist 🤍")}>♡</button>
              <div className="shop-item-body">
                <div className="shop-item-name">{item.name}</div>
                <div className="shop-item-price">${item.price}</div>
                <button className="add-cart-btn" onClick={() => alert(`🕯️ "${item.name}" added to cart`)}>
                  + Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopSection;