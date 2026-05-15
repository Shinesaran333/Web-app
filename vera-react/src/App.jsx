import '../../style.css';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import CandlesSection from './components/CandlesSection';
import ShopSection from './components/ShopSection';
import { useState } from 'react';

const App = () => {
  const [cart, setCart] = useState(0);

  const addToCart = (name) => setCart(prev => prev + 1);

  return (
    <HashRouter>
      <div>
        {/* Nav */}
        <div style={{position:"fixed",top:0,left:0,right:0,zIndex:50,display:"flex",justifyContent:"center",padding:"14px 20px",background:"rgba(246,243,238,0.85)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(0,0,0,0.06)"}}>
          <div className="nav-wrapper" style={{position:"static",margin:0}}>
            <div className="nav-container">
              <button className="nav-btn" onClick={() => window.location.href='http://127.0.0.1:5500/vera.html'}>Home</button>
              <Link className="nav-btn" to="/candles">Candles</Link>
              <Link className="nav-btn" to="/shop">Shop <span className="cart-badge">{cart}</span></Link>
              <button className="nav-btn" onClick={() => window.location.href='http://127.0.0.1:5500/vera.html'}>About</button>
              <button className="nav-btn" onClick={() => window.location.href='http://127.0.0.1:5500/vera.html'}>Contact</button>
            </div>
            <button className="nav-btn login">Log In</button>
          </div>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/candles" element={<CandlesSection addToCart={addToCart} />} />
          <Route path="/shop" element={<ShopSection addToCart={addToCart} />} />
          <Route path="/" element={<CandlesSection addToCart={addToCart} />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
