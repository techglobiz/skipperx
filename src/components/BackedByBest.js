import React, { useEffect, useRef, useState } from 'react';
import isroLogo from '../assets/isro-logo.png';
import amanImage from '../assets/aman-gupta.png';
import zah from '../assets/zah.png';
import zahc from '../assets/zahc.png';
import ramya from '../assets/ramyaa.png';
import akhil from '../assets/akhil.png';
import akhilc from '../assets/akhilc.png';
import './BackedByBest.css'; // Assuming you have a CSS file for styling
import Image from "next/image";


const bestTestimonials = [
  {
    name: 'Aman Gupta',
    title: 'Scientist Engineer',
    quote: `"I once looked at the stars wondering how to reach them. Today, I help launch satellites into space. 
      If I can get here with limited resources but unlimited belief so can you. Dream big, stay consistent, and never stop learning."`,
    image: amanImage,
    logo: isroLogo,
    year: '2022',
    logoWidth: '71.25px',
    logoHeight: '74px',
  },
  {
    name: 'Zaheen Haider Naqvi',
    title: 'Digital Marketing Manager',
    quote: `"I started with zero followers, no fancy degree just a strong curiosity and the courage to experiment. Today, I lead digital strategies at Corizo that reach millions. Remember, growth isn't a hack. It’s a habit. Keep learning, keep testing."`,
    image: zah,
    logo: zahc,
    year: '2022',
    logoWidth: '123px',
    logoHeight: '35px',
  },
  {
    name: 'Ramya Shrivastav',
    title: 'Psychology Mentor',
    quote: `"I was once the ‘strong one’ who never asked for help until I realized true strength is understanding yourself.Today, I help students turn their emotions into power.Growth starts when you pause and listen within."`,
    image: ramya,
    logo: zahc,
    year: '2022',
    logoWidth: '123px',
    logoHeight: '35px',
  },
  {
    name: 'Akhil Vadakattu',
    title: 'Finance Controller',
    quote: `"Numbers never scared me what scared me was not understanding them. From balancing bills to managing multi-crore budgets, I’ve learned that finance isn’t just math, it’s mindset.Master money, and you master freedom."`,
    image: akhil,
    logo: akhilc,
    year: '2022',
    logoWidth: '150px',
    logoHeight: '32.5px',
  }
];

const BackedByBest = () => {
  const [index, setIndex] = useState(1); // Start at first real slide
  const [transition, setTransition] = useState(true);
  const intervalRef = useRef(null);
  const isHovered = useRef(false);

  const length = bestTestimonials.length;
  const fullSlides = [bestTestimonials[length - 1], ...bestTestimonials, bestTestimonials[0]];

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  const handleTransitionEnd = () => {
    if (index === length + 1) {
      setTimeout(() => {
        setTransition(false);
        setIndex(1);
      }, 30);
    } else if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(length);
      }, 30);
    }
  };

  useEffect(() => {
    if (!transition) {
      setTimeout(() => setTransition(true), 30);
    }
  }, [transition]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      if (!isHovered.current) {
        next();
      }
    }, 3500);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const pauseAutoSlide = () => {
    isHovered.current = true;
    stopAutoSlide();
  };

  const resumeAutoSlide = () => {
    isHovered.current = false;
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  return (
    <div className="best-container">
      <div className="best-heading-section">
        <hr className="left" />
        <h1>Backed By the Best</h1>
        <hr className="right" />
      </div>
      <p className="best-subheading">Real journeys, Real breakthroughs, Real impact</p>

      <div
        className="best-carousel-wrapper"
        onMouseEnter={pauseAutoSlide}
        onMouseLeave={resumeAutoSlide}
      >
        <button className="best-arrow left" onClick={prev}>&#10094;</button>
        <div
          className="best-carousel-track"
          style={{
            transform: `translateX(-${Math.min(index, fullSlides.length - 1) * 100}%)`,
            transition: transition ? 'transform 0.6s ease' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {fullSlides.map((t, i) => (
            <div className="best-slide" key={i}>
              <div className="best-content">
                <div className="best-text-block">
                  <p className="best-member-since">MEMBER SINCE <strong>{t.year}</strong></p>
                  <p className="best-quote"><em>{t.quote}</em></p>
                  <div className="best-author">
                    <div className="best-name-logo">
                      <div className="best-name-text">
                        <p className="best-name">
                          {t.name}<br />
                          <span className="best-title">{t.title}</span>
                        </p>
                      </div>
                      <div className="best-divider"></div>
                      <Image
                        src={t.logo}
                        alt="Logo"
                        className="best-logo"
                        style={{ width: t.logoWidth, height: t.logoHeight }}
                      />
                    </div>
                  </div>
                </div>
                <div className="best-image-block">
                  <Image src={t.image} alt={t.name} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="best-arrow right" onClick={next}>&#10095;</button>
      </div>
    </div>
  );
};

export default BackedByBest;
