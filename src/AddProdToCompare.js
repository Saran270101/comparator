import React, { useEffect, useState } from 'react';

const ORANGE = '#FF7043';
const headerBlue = '#0290ff';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.12)',
  zIndex: 1100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start'
};

const popupStyle = {
  width: 600,
  maxWidth: '98vw',
  borderRadius: 10,
  overflow: 'hidden',
  background: '#fff',
  marginTop: 60,
  boxShadow: '0 4px 32px rgba(77, 72, 72, 0.16)',
  display: 'flex',
  flexDirection: 'column'
};

const headerStyle = {
  background: headerBlue,
  color: '#fff',
  padding: '11px 16px 10px 10px',
  fontWeight: 600,
  fontSize: 17,
  display: 'flex',
  alignItems: 'center'
};

const closeBtn = {
  border: 'none',
  background: 'none',
  color: '#fff',
  fontSize: 22,
  marginRight: 10,
  cursor: 'pointer',
  marginTop: 2
};

const searchHeaderStyle = {
  padding: '14px 12px 2px 12px',
  color: '#333',
  fontWeight: 500
};

const searchBox = {
  width: '100%',
  background: '#fff9d7',
  border: '1px solid #f3eabb',
  color: '#353535',
  padding: '10px 14px',
  borderRadius: 6,
  fontSize: 16,
  outline: 'none',
  margin: '5px 0 13px 0',
  boxSizing: 'border-box'
};

const productList = {
  maxHeight: 340,
  overflowY: 'auto',
  margin: '0 10px 16px 10px',
  borderRadius: 7,
  boxSizing: 'border-box'
};

const productRow = {
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #ededed',
  padding: '12px 8px 12px 4px',
  cursor: 'pointer',
  transition: 'background .2s'
};

const productImg = {
  width: 44,
  height: 44,
  objectFit: 'contain',
  borderRadius: 5,
  background: '#f7f7f8',
  marginRight: 14,
  border: '1px solid #eee'
};

const productInfo = {
  flex: 1,
  minWidth: 0
};

const productName = {
  fontWeight: 600,
  fontSize: 16,
  color: '#232323',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const productPrice = {
  color: '#07a569',
  fontWeight: 700,
  fontSize: 17,
  marginTop: 2
};

export default function AddProductToCompare({ onClose, onSelect, excludeMobileId }) {
  const [mobiles, setMobiles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [hovered, setHovered] = useState(-1);

  useEffect(() => {
    fetch('http://localhost:8080/api/mobile/allMobiles')
      .then(res => res.json())
      .then(data => {
        let filteredData = data;
        if (excludeMobileId) {
          if (Array.isArray(excludeMobileId)) {
            filteredData = data.filter(m => !excludeMobileId.includes(m.id));
          } else {
            filteredData = data.filter(m => m.id !== excludeMobileId);
          }
        }
        setMobiles(filteredData);
        setFiltered(filteredData);
      });
  }, [excludeMobileId]);

  useEffect(() => {
    const s = search.trim().toLowerCase();
    setFiltered(
      !s
        ? mobiles
        : mobiles.filter(
            m => m.mobile_name.toLowerCase().includes(s)
          )
    );
  }, [search, mobiles]);

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <div style={headerStyle}>
          <button style={closeBtn} title="Close" onClick={onClose}>
            &#10005;
          </button>
          Add Product To Comparison
        </div>
        <div style={searchHeaderStyle}>
          Search or select a product and it'll be added to comparison.
        </div>
        <div style={{padding: '0 12px 0 12px'}}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={searchBox}
            autoFocus
          />
        </div>
        <div style={productList}>
          {filtered.length === 0 && (
            <div style={{padding: 22, textAlign: 'center', color: '#999', fontSize: 16}}>
              No mobiles found.
            </div>
          )}
          {filtered.map((mobile, idx) => (
            <div
              key={mobile.id}
              style={{
                ...productRow,
                background: hovered === idx ? '#F4F9FF' : '#fff'
              }}
              onClick={() => onSelect && onSelect(mobile)}
              tabIndex={0}
              onKeyDown={e => { if(e.key === 'Enter') onSelect && onSelect(mobile); }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(-1)}
            >
              <img src={mobile.img} alt={mobile.mobile_name} style={productImg}/>
              <div style={productInfo}>
                <div style={productName}>{mobile.mobile_name}</div>
                <div style={productPrice}>₹{mobile.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
