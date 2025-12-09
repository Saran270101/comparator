import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ORANGE = '#FF7043';

const navStyle = {
    background: ORANGE,
    color: '#fff',
    padding: '16px 48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 700,
    position: 'relative',
};

const navLinks = {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    fontWeight: 500,
    position: 'relative',
};

const logoStyle = {
    fontSize: '1.9rem',
    letterSpacing: '.5px',
    color: '#fff',
};

const dropdownBtn = {
    cursor: 'pointer',
    color: '#fff',
    fontWeight: 600,
    position: 'relative',
    userSelect: 'none',
    marginRight: 20,
    padding: '6px 14px',
};

const dropdownMenu = {
    position: 'absolute',
    top: '100%',
    left: 0,
    background: '#fff',
    color: '#232323',
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
    marginTop: 6,
    minWidth: 160,
    zIndex: 1000,
    padding: '8px 0',
};

const dropdownMenuItem = {
    padding: '10px 20px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontWeight: 500,
};

const categories = [
    {
        label: 'Electronics',
        subCategories: ['Laptops', 'Mobiles', 'Accessories']
    },
    {
        label: 'Fashion',
        subCategories: ['Men', 'Women', 'Kids']
    },
    {
        label: 'Appliances',
        subCategories: ['Refrigerators', 'Microwaves', 'Washing Machines']
    },
    {
        label: 'Babies Store',
        subCategories: ['Toys', 'Clothes', 'Feeding']
    }
];

const brands = [
    { label: 'Apple' },
    { label: 'Samsung' },
    { label: 'Nike' },
    { label: 'Adidas' },
];

const deals=[
    {label:'upto 10%'},
    {label:'upto 25%'},
    {label:'upto 50%'},
    {label:'upto 75%'},
]

export default function NavBar() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({}); // object to track expanded state
    const [searchQuery, setSearchQuery] = useState('');

    const toggleCategoryExpand = (categoryLabel) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryLabel]: !prev[categoryLabel]
        }));
    };

    const toggleDropdown = (name) => {
        if (openDropdown === name) {
            setOpenDropdown(null);
            setSelectedCategory(null);
        } else {
            setOpenDropdown(name);
            if (name !== 'categories') {
                setSelectedCategory(null);
            }
        }
    };
    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
    };

    const closeDropdown = () => setOpenDropdown(null);

    const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

    const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert('Search for: ' + searchQuery);
    // Add your search logic here or navigate to search results page
  };

    return (
        <nav style={navStyle} onMouseLeave={closeDropdown}>
            <div style={logoStyle}>E-Shop</div>
            <div style={navLinks}>
                <div style={{ position: 'relative' }}>   {/* Wrapper to anchor absolute dropdown */}
                    <div style={dropdownBtn} onClick={() => toggleDropdown('categories')}>
                        Categories ▼
                    </div>

                    {openDropdown === 'categories' && (
                        <div
                            style={{
                                ...dropdownMenu,
                                position: 'absolute',    // absolutely position dropdown below parent
                                top: '100%',
                                left: 0,
                                zIndex: 9999
                            }}
                        >
                            {/* The main categories list */}
                            {categories.map(cat => (
                                <div
                                    key={cat.label}
                                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px' }}
                                    onClick={() => toggleCategoryExpand(cat.label)}
                                >
                                    <div style={{ flex: 1 }}>{cat.label}</div>
                                    <div style={{ marginLeft: 10 }}>
                                        {expandedCategories[cat.label] ? 'v' : '>'}
                                    </div>
                                </div>
                            ))}

                            {/* Subcategories positioned on right side */}
                            {Object.entries(expandedCategories).map(([label, isOpen]) =>
                                isOpen ? (
                                    <div
                                        key={label}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: '100%',
                                            backgroundColor: '#f9f9f9',
                                            margin: '0 0 0 4px',
                                            borderRadius: '4px',
                                            padding: '8px',
                                            minWidth: '160px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                                            zIndex: 1001,
                                        }}
                                    >
                                        {categories.find(c => c.label === label)?.subCategories.map(sub => (
                                            <div key={sub} style={{ padding: '4px 8px', cursor: 'pointer' }}>
                                                {sub}
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            )}
                        </div>
                    )}
                </div>


                <div style={dropdownBtn} onClick={() => toggleDropdown('brands')}>
                    Shop by Brands ▼
                    {openDropdown === 'brands' && (
                        <div style={dropdownMenu}>
                            {brands.map((brand) => (
                                <div key={brand.label} style={dropdownMenuItem} onClick={() => alert('Selected: ' + brand.label)}>
                                    {brand.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div style={dropdownBtn} onClick={() => toggleDropdown('deals')}>
                    Deals ▼
                    {openDropdown === 'deals' && (
                        <div style={dropdownMenu}>
                            {deals.map((deals) => (
                                <div key={deals.label} style={dropdownMenuItem} onClick={() => alert('Selected: ' + deals.label)}>
                                    {deals.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <form
          onSubmit={handleSearchSubmit}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <input
            type="text"
            placeholder="Search for products"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              padding: '8px 12px',
              fontSize: '1rem',
              borderRadius: 8,
              border: 'none',
              minWidth: 240,
              marginRight: 8,
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: 'white',
              color: '#111111ff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            Search
          </button>
        </form>
                {/* <span style={{ fontWeight: 700, borderBottom: '2px solid #fff', cursor: 'pointer' }}>Home</span> */}
            </div>

            <div style={navLinks}>
                <Link to="/login" style={{ color: '#fff', fontWeight: 700, textDecoration: 'none' }}>
                    Sign In
                </Link>
                {/* <span>
                    <span role="img" aria-label="cart">
                        🛒
                    </span>
                    &nbsp;Cart
                </span> */}
            </div>
        </nav>
    );
}
