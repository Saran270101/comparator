import React, { useEffect, useState } from 'react';
import NavBar from './NavDropDown';
import ComparePopup from './ComparePopup';

const ORANGE = '#FF7043';

export default function Mobile() {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [compareMobiles, setCompareMobiles] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/mobile/allMobiles')
      .then(res => res.json())
      .then(data => {
        setMobiles(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert('Error loading mobiles. Try again later.');
      });
  }, []);

  const handleCompare = (mobile) => {
    if (!compareMobiles.find(m => m.id === mobile.id) && compareMobiles.length < 4) {
      setCompareMobiles([...compareMobiles, mobile]);
      setShowCompare(true);
    } else {
      setShowCompare(true);
    }
  };

  return (
    <div style={{ background: "#FFF4EE", minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif' }}>
      <NavBar />
      <h2 style={{ color: ORANGE, padding: "28px 42px 0 42px", fontWeight: 900 }}>Mobile Phones</h2>
      {loading ? (
        <div style={{ padding: 60, textAlign: 'center', fontSize: 19, color: ORANGE }}>Loading...</div>
      ) : (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        padding: '38px 24px',
        maxWidth: '1180px',
        margin: '0 auto'
      }}>
        {mobiles.map(mobile => (
          <div key={mobile.id} style={{
            background: "#fff",
            borderRadius: "13px",
            boxShadow: "0 2px 18px rgba(255,112,67,0.12)",
            minWidth: 284,
            width: 320,
            height: 430,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "24px 16px 18px",
            marginBottom: 8
          }}>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <img src={mobile.img} alt={mobile.mobile_name} style={{ width: 86 }} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#212121", margin: "7px 0" }}>
              {mobile.mobile_name}
            </div>
            <div style={{ color: "#07a569", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
              ₹{mobile.price}
            </div>
            <div style={{
              fontSize: 14,
              color: "#5d5d5d",
              marginBottom: 6,
              flexShrink: 1,
              overflowY: "auto"
            }}>
              {mobile.description}
            </div>
            <button
              style={{
                marginTop: "auto",
                width: "100%",
                background: ORANGE,
                color: "#fff",
                border: "none",
                padding: "11px",
                borderRadius: 8,
                fontSize: "1.04rem",
                fontWeight: 700,
                letterSpacing: "0.5px",
                cursor: "pointer"
              }}
              onClick={() => handleCompare(mobile)}
            >
              Compare
            </button>
          </div>
        ))}
      </div>
      )}

      {showCompare && (
        <ComparePopup
          mobiles={compareMobiles}
          setCompareMobiles={setCompareMobiles}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}
