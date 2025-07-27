import React from 'react';
import Image from 'next/image';
import bgImage from '../assets/1111.jpg';
import './hero.css';

const categories = [
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders","For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers","For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers","For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers","For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers", "For Builders",
  "For Creators", "For Tech Enthusiasts", "For Aero Minds",
  "For Biz Leaders", "For Founders", "For Designers",
  "Starter Pack", "For AR Innovators", "For Drone Engineers",
  "For Marketers", "For Strategists", "For Explorers"
];

const Hero = () => {
  return (
    <div className="hero-img-wrapper">
      <Image src={bgImage} alt="background" className="hero-img" />
      <div className="overlayp">
        <div className="tagG">Trusted by <strong> 50,000+ </strong> ambitious learners</div>
        <h1>
          Your dream skill is, not days, not hours but <span className="highlight-red">minutes</span> away
        </h1>
        <p>Built for Innovators, Entrepreneur & Hustlers</p>
        <button className="btn red">Explore Programs</button>

        
        <div className="hero-scroll-row">
          <div className="scroll-track3">
            {categories.concat(categories).map((cat, idx) => (
              <button key={`top-${idx}`} className="category-btn">{cat}</button>
            ))}
            {categories.concat(categories).map((cat, idx) => (
              <button key={`top-${idx}`} className="category-btn">{cat}</button>
            ))}
            {categories.concat(categories).map((cat, idx) => (
              <button key={`top-${idx}`} className="category-btn">{cat}</button>
            ))}
            {categories.concat(categories).map((cat, idx) => (
              <button key={`top-${idx}`} className="category-btn">{cat}</button>
            ))}
          </div>
        </div>

        
        <div className="hero-scroll-row second-row">
          <div className="scroll-track3">
            {categories.concat(categories).map((cat, idx) => (
              <button key={`bottom-${idx}`} className="category-btn">{cat}</button>
            ))}
            {categories.concat(categories).map((cat, idx) => (
              <button key={`bottom-${idx}`} className="category-btn">{cat}</button>
            ))}
            {categories.concat(categories).map((cat, idx) => (
              <button key={`bottom-${idx}`} className="category-btn">{cat}</button>
            ))}
            {categories.concat(categories).map((cat, idx) => (
              <button key={`bottom-${idx}`} className="category-btn">{cat}</button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
