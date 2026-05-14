import "../../style.css";
import CandlesSection from "./components/CandlesSection";
import ShopSection from "./components/ShopSection";
import { useState } from "react";

const App = () => {
  const [page, setPage] = useState("candles");
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const addToCart = (name) => {
    setCart(prev => prev + 1);
    setToast(`🕯️ "${name}" added to cart`);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div>
      {/* Toast */}
      <div style={{
        position:"fixed", bottom:30, left:"50%",
        transform: toastVisible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(80px)",
        background:"#111", color:"#fff", padding:"14px 24px",
        borderRadius:"14px", fontFamily:"'Sora',sans-serif", fontSize:"13px",
        boxShadow:"0 8px 30px rgba(0,0,0,0.2)", zIndex:999,
        transition:"transform 0.35s ease", pointerEvents:"none"
      }}>
        {toast}
      </div>

      {/* Nav */}
      <div style={{position:"fixed",top:0,left:0,right:0,zIndex:50,display:"flex",justifyContent:"center",padding:"14px 20px",background:"rgba(246,243,238,0.85)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(0,0,0,0.06)"}}>
        <div className="nav-wrapper" style={{position:"static",top:"unset",margin:0}}>
          <div className="nav-container">
            <button className="nav-btn" onClick={() => window.location.href='http://127.0.0.1:5500/vera.html'}>Home</button>
            <button className={`nav-btn ${page === "candles" ? "active-nav" : ""}`} onClick={() => setPage("candles")}>Candles</button>
            <button className={`nav-btn ${page === "shop" ? "active-nav" : ""}`} onClick={() => setPage("shop")}>
              Shop <span className="cart-badge">{cart}</span>
            </button>
            <button className="nav-btn" onClick={() => window.location.href='http://127.0.0.1:5500/vera.html'}>About</button>
            <button className="nav-btn" onClick={() => window.location.href='http://127.0.0.1:5500/vera.html'}>Contact</button>
          </div>
          <button className="nav-btn login">Log In</button>
        </div>
      </div>

      {page === "candles" && <CandlesSection addToCart={addToCart} />}
      {page === "shop" && <ShopSection addToCart={addToCart} />}
    </div>
  );
};

export default App;
