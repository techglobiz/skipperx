'use client';
import React, { useState } from 'react';
import './ARVREngineering.css';
import bgImage from '../../assets/dronebg.png';
import bulbIcon from '../../assets/holding-bulb.png';
import harish from '../../assets/harisha.jpg';
import sai from '../../assets/sai.jpg';
import hari from '../../assets/harih.jpg';
import sakshi from '../../assets/saksh.png';
import asishIcon from '../../assets/droneashish.png';
import Image from 'next/image';
import { validateField, validateForm } from '../../lib/formUtils';

const modules = [
  { title: "Introduction to AR/VR Technology", content: "Understand the fundamentals of Augmented and Virtual Reality technologies." },
  { title: "3D Modeling and Design", content: "Learn to create 3D models and environments for AR/VR applications." },
  { title: "Unity Game Engine Basics", content: "Master Unity for developing immersive AR/VR experiences." },
  { title: "AR Development with ARCore/ARKit", content: "Build augmented reality applications for mobile platforms." },
  { title: "VR Development and Interaction", content: "Create virtual reality experiences with user interactions." },
  { title: "UI/UX for Immersive Experiences", content: "Design intuitive interfaces for AR/VR applications." },
  { title: "Final Project Development", content: "Build and deploy your own AR/VR application in the final week." }
];

const ARVREngineering = () => {
  const scrollItems = [
    "Game Development",
    "3D Modeling",
    "Mobile Apps",
    "Web Development",
    "Animation",
    "Interactive Media",
    "Simulation",
    "Digital Art"
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  
  // Form state management
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    collegeName: '',
    areaOfInterest: '',
    phoneNumber: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  // Replace this with your actual Google Apps Script web app URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Real-time validation
    const error = validateField(name, value);
    if (error) {
      setFormErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    // Validate all fields
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Submit to Google Sheets
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      // Since we can't read the response due to CORS, we'll assume success
      setSubmitMessage('Registration successful! We will contact you within 24 hours.');
      setFormData({
        firstName: '',
        email: '',
        collegeName: '',
        areaOfInterest: '',
        phoneNumber: ''
      });
      setFormErrors({});
      
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitMessage('There was an error submitting your form. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className='arvrbody'>
        <div
          className="arvr-engineering-section"
          style={{
            backgroundImage: `linear-gradient(to right,rgba(35, 33, 33, 0.6),rgba(51, 28, 90, 0.6)), url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="arvr-tag">
            <Image src={bulbIcon} alt="Bulb Icon" className="arvr-tag-icon" />
            For Future Builders
          </div>
          <h1 className="arvr-title">
            Create{' '}
            <span className="highlight">AR/VR experiences</span> that redefine <br/> reality and set new standards.
          </h1>
          <p className="arvr-description">
            Earn to design immersive experiences that blur the line between real and virtual.
          </p>

          <div className="arvr-cta-buttons">
            <button className="arvr-outline-btn">Create</button>
            <button className="arvr-outline-btn">Code</button>
            <button className="arvr-outline-btn">Experience</button>
          </div>

          <button className="arvr-start-btn">Start Learning</button>

          <div className="arvr-scroll-wrapper">
            <div className="arvr-scroll-track">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="arvr-scroll-content">
                  {scrollItems.map((item, i) => (
                    <span key={`${index}-${i}`} className="arvr-scroll-item">
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
        
        <div className="arvr-info-section">
          <div className="arvr-info-left">
            <div className="arvr-info-stats">
              {[
                { count: '42,000+', label: 'Mentees trained' },
                { count: '2 Months', label: 'Duration' },
                { count: '7+', label: 'Industry experts' }
              ].map((item, index) => (
                <div className="arvr-stat-card" key={index}>
                  <div className="stat-icon">
                    <span>⚡</span>
                  </div>
                  <h4>{item.count}</h4>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h2 className="arvr-info-heading">
              Advanced  <span>Growth</span> Strategy
            </h2>

            <p className="arvr-info-para">
              Skipper's AR/VR Engineering Program helps you master immersive technology development, 
              3D modeling, spatial computing, and interactive experience design.
            </p>
            <p className="arvr-info-para1">
              You'll gain hands-on experience in Unity, ARCore, ARKit, and VR frameworks,
              preparing you for careers in gaming, entertainment, education, and enterprise solutions.
            </p>

            <div className="arvr-testimonial-box">
              <div className="arvr-testimonial-person">
                <Image src={asishIcon} alt="Ashish Singhal" />
                <div className="arvr-testimonial-name">
                  Ashish Singhal <br />
                  <strong>Tech Innovator.</strong>
                </div>
              </div>

              <div className="arvr-testimonial-quote">
                <p>
                  <em>
                    "The AR/VR Engineering Program at Skipper was transformative. The hands-on approach to building immersive experiences gave me confidence in emerging technologies.
                    <br /><br />
                    I now work on cutting-edge AR applications and feel well-prepared for the future of technology."
                  </em>
                </p>
              </div>
            </div>

            <div className="arvr-modules">
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

          <div className="arvr-info-right">
            <div className="arvr-pricing-card">
              <h2>Master AR/VR Engineering Program</h2>

              <ul className="arvr-features-list">
                <li>✅ Hands-on AR/VR development</li>
                <li>✅ Industry certification</li>
                <li>✅ Unity & 3D modeling</li>
                <li>✅ Real-world projects</li>
              </ul>
              <div className="price">Price</div>
              <div className="arvr-price-section">
                <div className="arvr-original-price">₹29,999</div>
                <div className="arvr-current-price">₹24,000</div>
              </div>

              <div className="trust-footer-arvr">
                <div className="avatarsarvr">
                  <Image src={harish} alt="avatar" />
                  <Image src={hari} alt="avatar" />
                  <Image src={sakshi} alt="avatar" />
                  <Image src={sai} alt="avatar" />
                  <span className='top'>3500+ members has already completed this Program</span>
                </div>
              </div>

              <button className="arvr-pricing-btn">Start Learning</button>
            </div>
            <div className="arvr-pricingform-card">
              <h2>Master AR/VR Engineering Program</h2>
              {submitMessage && (
                <div className={`arvr-submit-message ${submitMessage.includes('successful') ? 'success' : 'error'}`}>
                  {submitMessage}
                </div>
              )}
              <form className="arvr-join-form" onSubmit={handleSubmit}>
                <div className="arvr-form-group">                  
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className={`arvr-join-input ${formErrors.firstName ? 'error' : ''}`}
                    required
                  />
                  {formErrors.firstName && <span className="arvr-error-message">{formErrors.firstName}</span>}
                </div>
                
                <div className="arvr-form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className={`arvr-join-input ${formErrors.email ? 'error' : ''}`}
                    required
                  />
                  {formErrors.email && <span className="arvr-error-message">{formErrors.email}</span>}
                </div>
                
                <div className="arvr-form-group">
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    placeholder="Enter your college name"
                    className={`arvr-join-input ${formErrors.collegeName ? 'error' : ''}`}
                    required
                  />
                  {formErrors.collegeName && <span className="arvr-error-message">{formErrors.collegeName}</span>}
                </div>
                
                <div className="arvr-form-group">
                  <select 
                    name="areaOfInterest"
                    value={formData.areaOfInterest}
                    onChange={handleInputChange}
                    className={`arvr-join-input arvr-select ${formErrors.areaOfInterest ? 'error' : ''}`}
                    required
                  >
                    <option value="">Select your area of interest</option>
                    <option value="ar-development">AR Development</option>
                    <option value="vr-development">VR Development</option>
                    <option value="3d-modeling">3D Modeling</option>
                    <option value="game-development">Game Development</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="mobile-ar">Mobile AR</option>
                    <option value="enterprise-solutions">Enterprise Solutions</option>
                  </select>
                  {formErrors.areaOfInterest && <span className="arvr-error-message">{formErrors.areaOfInterest}</span>}
                </div>
                
                <div className="arvr-form-group">                  
                  <div className="arvr-phone-group">
                    <span className="arvr-country-code">+91</span>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="XXXXXXXXXX"
                      className={`arvr-join-input arvr-phone-input ${formErrors.phoneNumber ? 'error' : ''}`}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      required
                    />
                  </div>
                  {formErrors.phoneNumber && <span className="arvr-error-message">{formErrors.phoneNumber}</span>}
                </div>
                
                <button 
                  type="submit" 
                  className="arvr-form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Start Learning'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default ARVREngineering;
