import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavDropDown";
import AddProductToCompare from "./AddProdToCompare";

const ORANGE = "#FF7043";
const cardBorder = "#c2d9fc";
const highlight = "#e7f5dd";
const lightGrey = "#f8fafb";

const outerWrap = {
  background: lightGrey,
  minHeight: "100vh",
  padding: 0,
  fontFamily: "Inter,sans-serif"
};

const tableWrap = {
  maxWidth: 1120,
  margin: "0 auto 48px auto",
  borderRadius: 12,
  boxShadow: "0 3px 28px rgba(77,77,112,0.10)",
  background: "#fff",
  overflowX: "auto"
};

const nameStyle = {
  fontWeight: 700,
  fontSize: 16,
  color: "#232323",
  marginBottom: 3
};

const priceStyle = {
  color: ORANGE,
  fontWeight: 700,
  fontSize: 15
};

const cardImg = {
  width: 56,
  borderRadius: 8,
  background: "#f7f7f7",
  marginBottom: 8
};

const removeBtn = {
  position: "absolute",
  top: 7,
  right: 8,
  background: "none",
  border: "none",
  color: "#A22",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer"
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

const specs = [
  { label: "Specs Score", key: "specScore" },
  { label: "Mobile Name", key: "mobile_name" },
  { label: "Price", key: "price" },
  { label: "Display Size", key: "display" },
  { label: "RAM", key: "ram" },
  { label: "Processor", key: "processor" },
  { label: "Front Camera", key: "camera" },
  { label: "Weight", key: "weight" },
  { label: "Battery", key: "battery" }
];

export default function CompareResult() {
  const location = useLocation();
  const initialMobiles = location.state?.mobiles || [];
  const [compareIds, setCompareIds] = useState(initialMobiles.map(m => m.id));
  const [fullMobiles, setFullMobiles] = useState([]);
  const [specScores, setSpecScores] = useState({});
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/mobile/allMobiles")
      .then((res) => res.json())
      .then((data) => {
        const result = compareIds
          .map(id => data.find(m => m.id === id))
          .filter(Boolean);
        setFullMobiles(result);
      });
  }, [compareIds]);

  useEffect(() => {
    if (!compareIds.length) return;
    fetch("http://localhost:8080/api/mobile/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobileIds: compareIds })
    })
      .then(res => res.json())
      .then(data => {
        const scoreMap = {};
        data.forEach(obj => {
          if (obj.mobile?.id != null) scoreMap[obj.mobile.id] = obj.score;
        });
        setSpecScores(scoreMap);
      });
  }, [compareIds]);

  const scoreValues = Object.values(specScores);
  const maxScore = scoreValues.length ? Math.max(...scoreValues) : null;
  const bestMobileIds = Object.keys(specScores)
    .filter(id => specScores[id] === maxScore)
    .map(id => Number(id));

  const handleRemove = idx => {
    const newIds = [...compareIds];
    newIds.splice(idx, 1);
    setCompareIds(newIds);
  };

  const handleAddMobile = (mobile) => {
    if (!compareIds.includes(mobile.id) && compareIds.length < 4) {
      setCompareIds([...compareIds, mobile.id]);
    }
    setShowAddProduct(false);
  };

  return (
    <div style={outerWrap}>
      <NavBar />
      <div style={tableWrap}>
        <table style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          fontSize: 15
        }}>
          <thead>
            <tr>
              <th
                rowSpan={specs.length + 1}
                style={{
                  background: "#e4efff",
                  color: "#333",
                  fontWeight: 900,
                  textAlign: "left",
                  fontSize: 18,
                  borderTopLeftRadius: 12,
                  borderBottom: `2px solid ${cardBorder}`,
                  minWidth: 130,
                  padding: "16px 18px",
                  verticalAlign: "top"
                }}
              >
                Overview
              </th>
              {fullMobiles.map((mobile, idx) => {
                const isBestCol = bestMobileIds.includes(mobile.id);
                return (
                  <th key={mobile.id}
                    style={{
                      background: isBestCol ? highlight : "#e4efff",
                      color: isBestCol ? "#176B23" : "#333",
                      fontWeight: 700,
                      borderBottom: `2px solid ${cardBorder}`,
                      textAlign: "center",
                      minWidth: 170,
                      padding: 0,
                      borderLeft: idx === 0 ? `2px solid ${cardBorder}` : undefined,
                      borderTopRightRadius: idx === fullMobiles.length - 1 ? 12 : 0,
                      boxShadow: isBestCol ? "0 2px 11px rgba(33,183,75,0.16)" : undefined,
                      transition: "background 0.18s"
                    }}>
                    <div style={{
                      position: "relative",
                      background: "#fff",
                      boxShadow: "0 2px 11px rgba(77,112,112,0.09)",
                      borderRadius: 11,
                      padding: "11px 8px 9px 8px",
                      margin: "7px 10px 11px 10px",
                      textAlign: "center",
                    }}>
                      <button
                        style={removeBtn}
                        title="Remove"
                        onClick={() => handleRemove(idx)}
                      >×</button>
                      <img src={mobile.img} alt={mobile.mobile_name} style={cardImg} />
                      <div style={nameStyle}>{mobile.mobile_name}</div>
                      <div style={priceStyle}>₹{mobile.price}</div>
                    </div>
                  </th>
                );
              })}
              {[...Array(4 - fullMobiles.length)].map((_, idx) => (
                <th key={`empty-${idx}`} style={{
                  background: "#f7fafb",
                  color: "#bbb",
                  minWidth: 154,
                  borderBottom: `2px solid ${cardBorder}`,
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: 36, margin: "22px 0 7px 0", color: ORANGE }}>+</div>
                  <button style={addBtn} onClick={() => setShowAddProduct(true)}>Add Product</button>
                  {showAddProduct && (
                    <AddProductToCompare
                      excludeMobileId={compareIds}
                      onClose={() => setShowAddProduct(false)}
                      onSelect={handleAddMobile}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec, rowIdx) => (
              <tr key={spec.key}>
                <td style={{
                  fontWeight: 600,
                  color: "#2c4265",
                  background: "#f7faff",
                  minWidth: 132,
                  padding: "9px 23px",
                  borderRight: `1.5px solid #e0e4f5`
                }}>{spec.label}</td>
                {fullMobiles.map((mobile, colIdx) => {
                  const isBestCol = bestMobileIds.includes(mobile.id);
                  return (
                    <td key={colIdx} style={{
                      textAlign: "center",
                      background: isBestCol ? highlight : (rowIdx % 2 === 0 ? "#fafdfe" : "#eff5fa"),
                      color:
                        spec.key === "specScore" && isBestCol
                          ? "#176B23"
                          : "#214169",
                      fontWeight: spec.key === "specScore" ? 700 : 500,
                      fontSize: spec.key === "specScore" ? 18 : "15px",
                      padding: "10px 0",
                      minWidth: 120,
                      maxWidth: 260,
                      whiteSpace: "pre-line",
                      borderRadius: spec.key === "specScore" && isBestCol ? 12 : 0,
                      boxShadow: spec.key === "specScore" && isBestCol ? "0 2px 8px rgba(29,183,75,0.09)" : undefined,
                      transition: "background 0.18s"
                    }}>
                      {spec.key === "specScore"
                        ? (specScores[mobile.id] ?? "-")
                        : (mobile[spec.key] || "-")}
                    </td>
                  );
                })}
                {[...Array(4 - fullMobiles.length)].map((_, idx) => (
                  <td key={`empty-row-${idx}`}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
