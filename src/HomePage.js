import React from 'react';
//import { Link } from 'react-router-dom';
import NavBar from './NavDropDown';
import HeroCarousel from './Carosal';

// Theme colors
const ORANGE = '#FF7043';
const BG_LIGHT = '#FFF4EE';

// Sample category/product data (you can update or fetch dynamically)
const categories = [
    { label: 'Electronics', img: 'https://img.icons8.com/color/96/computer.png' },
    { label: 'Fashion', img: 'https://img.icons8.com/color/96/hanger.png' },
    { label: 'Appliances', img: 'https://img.icons8.com/color/96/kitchen.png' },
    { label: 'Babies Store', img: 'https://img.icons8.com/color/96/teddy-bear.png' },
    { label: 'Accessories', img: 'https://img.icons8.com/?size=100&id=2jgT7KxoKB2h&format=png&color=000000' },
];

const products = [
    { label: 'Smart Watch', price: '₹2,999', img: 'https://m.media-amazon.com/images/I/71ECaZ4Gq1L._AC_UY218_.jpg' },
    { label: 'Earphones', price: '₹1,099', img: 'https://m.media-amazon.com/images/I/61oPWuyuT2L._AC_UY218_.jpg' },
    { label: 'Samsung Charger', price: '₹799', img: 'https://m.media-amazon.com/images/I/71Gu1ib5-RL._AC_UY218_.jpg' },
    { label: 'Leather bracelet', price: '₹999', img: 'https://m.media-amazon.com/images/I/71MjW9qUriL._AC_UL320_.jpg' },
    { label: 'Earphones', price: '₹1,099', img: 'https://m.media-amazon.com/images/I/61oPWuyuT2L._AC_UY218_.jpg' },
    
];


const heroBtn = {
  background: "#FF7043",
  color: "#fff",
  border: "none",
  padding: "13px 34px",
  borderRadius: "7px",
  fontWeight: 700,
  fontSize: "1.09rem",
  marginTop: "8px",
  boxShadow: "0 2px 16px rgba(255,112,67,0.12)",
  cursor: "pointer"
};

const scrollerSection = {
    display: 'flex',
    gap: '32px',
    maxWidth: '1100px',
    margin: '35px auto',
    overflowX: 'auto',
    padding: '10px 6px',
};

const card = {
    background: '#fff',
    borderRadius: '13px',
    boxShadow: '0 2px 18px rgba(255,112,67,0.07)',
    textAlign: 'center',
    minWidth: '160px',
    padding: '18px',
};

const productCard = {
    ...card,
    minWidth: '190px',
    margin: '0 12px',
    padding: '14px 8px 16px 8px',
};

export default function HomePage() {
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const closeDropdown = () => setDropdownOpen(false);

    const onCategoryClick = (catLabel) => {
        alert(`Clicked on category: ${catLabel}`);
        closeDropdown();
        // implement actual behavior like routing or filtering
    };

    return (
        <div style={{ background: BG_LIGHT, minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif' }}>
            <NavBar />

            {/* Navigation Bar */}
            {/* <nav style={navStyle} onMouseLeave={closeDropdown}>
        <div style={logoStyle}>E-Shop</div>
        <div style={navLinks}>
          <div style={dropdownBtn} onClick={toggleDropdown}>
            Categories ▼
            {dropdownOpen && (
              <div style={dropdownMenu}>
                {categories.map((cat) => (
                  <div
                    key={cat.label}
                    style={dropdownMenuItem}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => onCategoryClick(cat.label)}
                  >
                    {cat.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={dropdownBtn} onClick={toggleDropdown}>
            Shop by Brands ▼
            {dropdownOpen && (
              <div style={dropdownMenu}>
                {brands.map((brand) => (
                  <div
                    key={brand.label}
                    style={dropdownMenuItem}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => onCategoryClick(brand.label)}
                  >
                    {brand.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <span>Deals</span>
          <span>Become a Vendor</span>
          <span style={{ fontWeight: 700, borderBottom: '2px solid #fff', cursor: 'pointer' }}>
            Home
          </span>
        </div>
        <div style={navLinks}>
          <Link to="/login" style={{ color: '#fff', fontWeight: 700, textDecoration: 'none' }}>
            Sign In
          </Link>
          <span>
            <span role="img" aria-label="cart">
              🛒
            </span>{' '}
            Cart
          </span>
        </div>
      </nav> */}

            {/* Hero Section */}
            <HeroCarousel/>
            {/* <section style={sectionHero}>
                <div style={heroLeft}>
                    <h1 style={heroTitle}>
                        Shop <span style={{ color: ORANGE }}>Computer</span> & Experience
                    </h1>
                    <div style={heroText}>
                        You cannot inspect quality into the product; it is already there.
                        <br />
                        <i>I am not a product of my circumstances. I am a product of my decisions.</i>
                    </div>
                    <button style={heroBtn}>View More</button>
                </div>
                <img
                    src="https://m.media-amazon.com/images/I/7156bBh8W2L._AC_UY218_.jpg"
                    alt="Hero Product"
                    style={heroImage}
                />
            </section> */}

            {/* Category Scroller */}
            <div style={{ marginLeft: '34px', fontWeight: 700, color: '#232323', fontSize: '1.18rem' }}>
                Top Categories
            </div>
            <div style={scrollerSection}>
                {categories.map((cat) => (
                    <div key={cat.label} style={card}>
                        <img src={cat.img} alt={cat.label} style={{ width: 55, marginBottom: 8 }} />
                        <div style={{ fontWeight: 600 }}>{cat.label}</div>
                        <span style={{ color: ORANGE, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                            Shop
                        </span>
                    </div>
                ))}
            </div>

            {/* Deals/Products */}
            <div style={{ marginLeft: '34px', fontWeight: 700, color: '#232323', fontSize: '1.15rem' }}>
                Deals of the Day
            </div>
            <div style={scrollerSection}>
                {products.map((prod) => (
                    <div key={prod.label} style={productCard}>
                        <img src={prod.img} alt={prod.label} style={{ width: 65, margin: '0 0 6px 0' }} />
                        <div style={{ fontWeight: 600, marginBottom: 2 }}>{prod.label}</div>
                        <div style={{ color: '#00A86B', fontWeight: 500 }}>{prod.price}</div>
                        <button
                            style={{
                                ...heroBtn,
                                background: '#fff',
                                color: ORANGE,
                                border: `2px solid ${ORANGE}`,
                                marginTop: 10,
                                fontSize: '0.95rem',
                                padding: '8px 24px',
                            }}
                        >
                            Compare
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}