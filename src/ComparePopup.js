import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AddProductToCompare from './AddProdToCompare';

const ORANGE = '#FF7043';

const popupOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const popupContainer = {
  background: '#fff',
  borderRadius: 10,
  boxShadow: '0 4px 32px rgba(77, 72, 72, 0.18)',
  padding: '22px 18px 12px 18px',
  width: '600px',
  maxWidth: '98vw',
  position: 'relative'
};

const closeBtn = {
  position: 'absolute',
  top: 10,
  right: 16,
  fontSize: 21,
  color: '#999',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
};

const productBoxGroup = {
  display: 'flex',
  gap: 18,
  margin: '18px 0',
  justifyContent: 'flex-start'
};

const slotBox = {
  width: 120,
  height: 170,
  border: '2px dashed #DDD',
  borderRadius: 7,
  background: '#faf6f3',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
};

const queueText = {
  color: '#555',
  fontSize: 15,
  marginBottom: 0,
  paddingLeft: 4
};

const compareBtn = {
  background: ORANGE,
  color: '#fff',
  border: 'none',
  padding: '10px 30px',
  borderRadius: 7,
  fontWeight: 700,
  fontSize: 17,
  marginRight: 16,
  letterSpacing: 1,
  cursor: 'pointer'
};

const addBtn = {
  background: 'none',
  color: ORANGE,
  border: 'none',
  padding: 0,
  margin: '0 6px',
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: 15,
  letterSpacing: 1,
};

const priceGreen = {
  color: '#07a569',
  fontWeight: 700,
  fontSize: 18,
};

export default function ComparePopup({ onClose, mobiles, setCompareMobiles }) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [addSlotIndex, setAddSlotIndex] = useState(null);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    setCompareMobiles(mobiles.filter(m => m.id !== id));
  };

  const handleAddProduct = (mobile) => {
    const exists = mobiles.some(m => m.id === mobile.id);
    if (!exists && mobiles.length < 4) {
      setCompareMobiles([...mobiles, mobile]);
      setShowAddProduct(false);
      setAddSlotIndex(null);
    }
  };

  const isSignedIn = () => !!localStorage.getItem('jwt_token');

  const handleCompareNow = () => {
    if (isSignedIn()) {
      navigate('/compare', { state: { mobiles } });
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={popupOverlay}>
      <div style={popupContainer}>
        <button style={closeBtn} onClick={onClose} title="Close">&times;</button>
        <div style={queueText}>
          {mobiles.length} product{mobiles.length !== 1 ? 's' : ''} in your <span style={{ color: ORANGE }}>compare queue</span>
        </div>
        <div style={productBoxGroup}>
          {mobiles.map((phone, idx) => (
            <div key={phone.id} style={{
              ...slotBox,
              border: '2px solid #e3e3e3'
            }}>
              <button
                onClick={() => handleRemove(phone.id)}
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 4,
                  background: 'none',
                  border: 'none',
                  color: '#D22',
                  fontWeight: 700,
                  fontSize: 18,
                  cursor: 'pointer',
                  lineHeight: 1,
                  zIndex: 2
                }}
                title="Remove"
              >×</button>
              <img src={phone.img} alt={phone.name || phone.mobile_name} style={{ width: 70, margin: '0 auto 10px' }} />
              <div style={{ fontSize: 14, marginBottom: 5 }}>{phone.name || phone.mobile_name}</div>
              <div style={priceGreen}>₹{phone.price}</div>
            </div>
          ))}
          {[...Array(4 - mobiles.length)].map((_, idx) => (
            <div key={idx} style={slotBox}>
              <div style={{
                width: 46,
                height: 46,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
                background: '#f8ece7',
                borderRadius: '50%',
                marginBottom: 7,
                color: ORANGE,
              }}>+</div>
              <button
                style={addBtn}
                onClick={() => { setShowAddProduct(true); setAddSlotIndex(idx); }}
              >
                ADD PRODUCT
              </button>
              {showAddProduct && addSlotIndex === idx && (
                <AddProductToCompare
                  excludeMobileId={mobiles.map(m => m.id)}
                  onClose={() => { setShowAddProduct(false); setAddSlotIndex(null); }}
                  onSelect={handleAddProduct}
                />
              )}
            </div>
          ))}
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 18,
          marginTop: 7,
          marginBottom: 3
        }}>
          <button style={compareBtn} onClick={handleCompareNow}>
            COMPARE NOW
          </button>
        </div>
      </div>
    </div>
  );
}
