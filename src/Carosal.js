import React from "react";
import Slider from "react-slick";

const heroSlides = [
  {
    title: "Limited Time! 40% Off On Laptops",
    image: "https://m.media-amazon.com/images/I/7156bBh8W2L._AC_UY218_.jpg",
    description: "Get unmatched deals on the latest laptops. Hurry, limited stock!",
    cta: "Shop Laptops"
  },
  {
    title: "Best Headphones Offers",
    image: "https://img.icons8.com/color/220/headphones--v1.png",
    description: "Top brands, top sound quality, best prices today only.",
    cta: "Shop Headphones"
  },
  {
    title: "Amazon Specials! Extra 10% Cashback",
    image: "https://img.icons8.com/color/220/online-shopping.png",
    description: "Bonus discounts on selected electronics.",
    cta: "See Offers"
  }
  // Add more slides as desired
];

const heroSlideStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#fff",
  borderRadius: "22px",
  boxShadow: "0 4px 28px rgba(77, 72, 72, 0.08)",
  maxWidth: "1100px",
  margin: '32px auto',
  padding: "36px 38px 30px 38px",
  minHeight: 310
};

const heroLeft = {
  maxWidth: "530px"
};

const heroTitle = {
  color: "#222",
  fontSize: "2.45rem",
  lineHeight: 1.2,
  fontWeight: 900,
  marginBottom: 18
};

const heroText = {
  color: "#999",
  fontSize: "1.05rem",
  marginBottom: 17
};

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

const heroImage = {
  width: "185px",
  borderRadius: "11px",
  boxShadow: "0 2px 18px rgba(255,112,67,0.11)"
};

export default function HeroCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3200
  };

  return (
    <section style={{marginTop: 12, marginBottom: 12}}>
      <Slider {...settings}>
        {heroSlides.map((slide, idx) => (
          <div key={idx}>
            <div style={heroSlideStyle}>
              <div style={heroLeft}>
                <h1 style={heroTitle}>{slide.title}</h1>
                <div style={heroText}>
                  {slide.description}
                </div>
                <button style={heroBtn}>{slide.cta}</button>
              </div>
              <img
                src={slide.image}
                alt={slide.title}
                style={heroImage}
              />
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
