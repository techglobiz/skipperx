'use client';
import React, { useState } from 'react';
import './DroneEngineering.css'; // Assuming you have a CSS file for styling
import Image from 'next/image'; 
//import Navbar from '../components/Navbar';
import Footer from '../Footer';
import bgImage from '../../assets/dronebg.png';
import bulbIcon from '../../assets/holding-bulb.png';
import harish from '../../assets/harisha.jpg';
import sai from '../../assets/sai.jpg';
import hari from '../../assets/harih.jpg';
import sakshi from '../../assets/saksh.png';
import userIcon from '../../assets/droneashish.png'; // Assuming you have a user icon

const modules = [
  { title: "Paper Planes and Aerodynamics", content: "Learn the basics of flight using paper planes and aerodynamics." },
  { title: "Introduction to Drones", content: "Understand drone parts, types, and functionality." },
  { title: "Building and Testing the Drone", content: "Step-by-step drone assembly and flight tests." },
  { title: "Introduction to Sensors", content: "Overview of sensors used in drones." },
  { title: "Magnetometer and Barometer", content: "Dive deep into orientation and altitude sensors." },
  { title: "Understanding the Framework", content: "Learn the software framework that controls drones." },
  { title: "Project Week", content: "Build and fly your own drone in the final week." }
];

const DroneEngineering = () => {
  const scrollItems = [
    "Business Analytics",
    "Human Resource",
    "Finance",
    "Fashion Designing",
    "Marketing",
    "Blockchain",
    "UI/UX",
    "Cyber Security"
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className='dronebody'>
        <div
          className="drone-engineering-section"
          style={{
            backgroundImage: `linear-gradient(to right,rgba(35, 33, 33, 0.6),rgba(51, 28, 90, 0.6)), url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="drone-tag">
            <Image src={bulbIcon} alt="Bulb Icon" className="drone-tag-icon" />
            For Innovators
          </div>
          <h1 className="drone-title">
            Design, Build & Launch Your Own Drones with Our{' '}
            <span className="highlight">Drone Engineering Program.</span>
          </h1>
          <p className="drone-description">
            Dive into aerodynamics, hardware, and flight systems—build drones that actually fly.
          </p>

          <div className="drone-cta-buttons">
            <button className="drone-outline-btn">Build it</button>
            <button className="drone-outline-btn">Fly it</button>
            <button className="drone-outline-btn">Own it</button>
          </div>

          <button className="drone-start-btn">Start Learning</button>

          <div className="drone-scroll-wrapper">
            <div className="drone-scroll-track">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="drone-scroll-content">
                  {scrollItems.map((item, i) => (
                    <span key={`${index}-${i}`} className="drone-scroll-item">
                      {item} •&nbsp;
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="accredit">
        <div className="drone-accredit-section">
          <p className="drone-accredit-heading">
            We are <em>accredited</em> by
          </p>
          <div className="drone-accredit-list">
            <span>PLUTO BLOCKS</span>
            <span>CYNUS IDE</span>
            <span>PYTHON</span>
          </div>
        </div>
        <div className="drone-info-section">
          <div className="drone-info-left">
            <div className="drone-info-stats">
              {[
                { count: '50,000+', label: 'Mentees trained' },
                { count: '2 Months', label: 'Duration' },
                { count: '10+', label: 'Industry Experts' }
              ].map((item, index) => (
                <div className="drone-stat-card" key={index}>
                  <div className="stat-icon">
                    <span>⚡</span>
                  </div>
                  <h4>{item.count}</h4>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h2 className="drone-info-heading">
              Advanced <span>Growth</span> Strategy
            </h2>

            <p className="drone-info-para">
              Skipper’s Drone Engineering Program helps you master drone design, electronics, aerodynamics,
              and real-time flight control.
            </p>
            <p className="drone-info-para1">
              You’ll gain practical skills in assembling, programming, and launching drones
              preparing you for careers in aerospace, defense, and innovation-driven industries.
            </p>

            <div className="drone-testimonial-box">
              <div className="drone-testimonial-person">
                <Image src={userIcon} alt="Ashish Singhal" />
                <div className="drone-testimonial-name">
                  Ashish Singhal <br />
                  <strong>Deloitte.</strong>
                </div>
              </div>

              <div className="drone-testimonial-quote">
                <p>
                  <em>
                    "The Drone Engineering Program at Skipper exceeded my expectations. It offered a strong balance of theory and practical work. I especially enjoyed assembling my own drone and testing its flight capabilities.
                    <br /><br />
                    This experience has equipped me with valuable skills I can apply in multiple industries."
                  </em>
                </p>
              </div>
            </div>

            <div className="drone-modules">
              <h2>What will you <span className="highlight">learn?</span></h2>
              {modules.map((module, index) => (
                <div className="module-card" key={index}>
                  <div className="module-header" onClick={() => toggleAccordion(index)}>
                    <div>
                      <strong>MODULE {index + 1}</strong>
                      <p>{module.title}</p>
                    </div>
                    <span className={`accordion-icon ${activeIndex === index ? 'open' : ''}`}>
                      ⌄
                    </span>
                  </div>
                  {activeIndex === index && (
                    <div className="module-content">
                      <p>{module.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="drone-info-right">
            <div className="drone-pricing-card">
              <h2>Master Drone Engineering Program</h2>

              <ul className="drone-features-list">
                <li>✅ Hands on Drone building</li>
                <li>✅ Certification included</li>
                <li>✅ Industry relevant skills</li>
                <li>✅ Hands on learning</li>
              </ul>
              <div className="price">Price</div>
              <div className="drone-price-section">
                <div className="drone-original-price">₹24,999</div>
                <div className="drone-current-price">₹20,000</div>
              </div>

              <div className="trust-footer-drone">
                <div className="avatarsdrone">
                  <Image src={harish} alt="avatar" />
                  <Image src={hari} alt="avatar" />
                  <Image src={sakshi} alt="avatar" />
                  <Image src={sai} alt="avatar" />
                  <span className='top'>4000+ members has already completed this Program</span>
                </div>
              </div>

              <button className="drone-pricing-btn">Start Learning</button>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default DroneEngineering;
