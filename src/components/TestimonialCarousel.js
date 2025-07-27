import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import testimonials from "./testimonialData";
import navya from '../assets/navya.png';
import sai from '../assets/sai.jpg';
import hari from '../assets/harih.jpg';
import sakshi from '../assets/saksh.png';
import './TestimonialCarousel.css'; // Assuming you have a CSS file for styles


const TestimonialCarousel = () => {
  const [index, setIndex] = useState(1); // Start from first real slide
  const [transition, setTransition] = useState(true);
  const isHovered = useRef(false);
  const intervalRef = useRef(null);

  const length = testimonials.length;
  const extendedSlides = [testimonials[length - 1], ...testimonials, testimonials[0]];

  // Safely update index
  const nextSlide = () => {
    setIndex((prev) => Math.min(prev + 1, length + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  // Prevent auto-play overflow
  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      if (!isHovered.current) {
        setIndex((prev) => {
          const next = prev + 1;
          return next > length + 1 ? length + 1 : next;
        });
      }
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleTransitionEnd = () => {
    if (index === length + 1) {
      setTransition(false);
      setIndex(1);
    } else if (index === 0) {
      setTransition(false);
      setIndex(length);
    }
  };

  useEffect(() => {
    if (!transition) {
      const id = setTimeout(() => setTransition(true), 30);
      return () => clearTimeout(id);
    }
  }, [transition]);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  // Optional: Debug logs
  useEffect(() => {
    console.log("Current index:", index, "Transition:", transition);
  }, [index, transition]);

  // Clamp render index to avoid visual glitch
  const safeIndex = Math.max(0, Math.min(index, length + 1));

  return (
    <section className="carousel-container">
      <h2>
        <span className="lefttt" /> Approved by the Ones Who Built the{" "}
        <span className="highlight">Best</span>{" "}
        <span className="righttt" />
      </h2>
      <p className="subtitle">Not Just Students – Leaders Learn from Us Too</p>

      <div
        className="carousel-wrapper"
        onMouseEnter={() => {
          isHovered.current = true;
          stopAutoPlay();
        }}
        onMouseLeave={() => {
          isHovered.current = false;
          startAutoPlay();
        }}
      >
        <button className="nav prev" onClick={prevSlide}>
          ‹
        </button>

        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${safeIndex * 100}%)`,
            transition: transition ? "transform 0.6s ease-in-out" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((item, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-left">
                <Image
                  src={require(`../assets/${item.logo}`)}
                  alt={item.company}
                  className="company-logoo"
                  style={item.logoSize}
                />
                <p className="quote">“{item.quote}”</p>
                <p className="name">{item.name}</p>
                <p className="position">{item.position}</p>
              </div>
              <div className="testimonial-right">
                <Image
                  src={require(`../assets/${item.image}`)}
                  alt={item.name}
                  className="person-img"
                  style={item.imageSize}
                />
              </div>
            </div>
          ))}
        </div>

        <button className="nav next" onClick={nextSlide}>
          ›
        </button>
      </div>

      <div className="carousel-dots">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`dot ${index === i + 1 ? "active" : ""}`}
            onClick={() => setIndex(i + 1)}
          ></span>
        ))}
      </div>

      <div className="trust-foter">
        <div className="avatars">
          <Image src={navya} alt="avatar" />
          <Image src={hari} alt="avatar" />
          <Image src={sakshi} alt="avatar" />
          <Image src={sai} alt="avatar" />
          <span>Be one of them</span>
        </div>
        <button className="avabtn">Apply Now</button>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
