'use client';
import React, { useState, useEffect } from 'react';
import './page.css';
import bgImage from '../../assets/dronebg.png';
import bulbIcon from '../../assets/holding-bulb.png';
import harish from '../../assets/harisha.jpg';
import sai from '../../assets/sai.jpg';
import hari from '../../assets/harih.jpg';
import sakshi from '../../assets/saksh.png';
import asishIcon from '../../assets/droneashish.png';
import certificateDisplay from "../../assets/dcerti.png";
import brochureImage from "../../assets/drone-brochure.png";
import soumya from "../../assets/soumya.png";
import suresh from "../../assets/suresh.png";
import nineeight from "../../assets/nine-eight.png";
import nineseven from "../../assets/nine-seven.png";
import eightseven from "../../assets/eight-seven.png";

import vishal from "../../assets/vishal.png";
import faqarrow from "../../assets/faqarrow.png";

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




  const getNextDeadline = () => {
    const savedDeadline = localStorage.getItem('droneOfferDeadline');
    const now = new Date().getTime();
  
    if (savedDeadline && Number(savedDeadline) > now) {
      return Number(savedDeadline);
    } else {
      const next = now + 48 * 60 * 60 * 1000; // 48 hours in ms
      localStorage.setItem('droneOfferDeadline', next);
      return next;
    }
    };
  
    const calculateTimeLeft = (deadline) => {
      const now = new Date().getTime();
      const difference = deadline - now;
  
      if (difference <= 0) {
        const next = now + 48 * 60 * 60 * 1000;
        localStorage.setItem('droneOfferDeadline', next);
        return calculateTimeLeft(next);
      }
  
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
  
      return {
        Days: String(days).padStart(2, '0'),
        Hours: String(hours).padStart(2, '0'),
        Minutes: String(minutes).padStart(2, '0'),
        Seconds: String(seconds).padStart(2, '0'),
      };
    };
  
    const [timer, setTimer] = useState({
      Days: '00',
      Hours: '00',
      Minutes: '00',
      Seconds: '00',
    });
  
    useEffect(() => {
      let deadline = getNextDeadline();
  
      const interval = setInterval(() => {
        const timeLeft = calculateTimeLeft(deadline);
        setTimer(timeLeft);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div className='arvrbody'>
        <div
          className="arvr-engineering-section"
          style={{
            backgroundImage: `linear-gradient(to right, 
            rgba(41, 37, 50, 1), rgba(116, 20, 99, 0.5)), url(${bgImage.src})`,
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

        <div className="drone-accredit-section">   
        </div>
        <div className="drone-stat-section">
                    <div className="stat-card">
                      <h2>98<span>%</span></h2>
                      <p>Completion rate <br />for our 1:1 Program.</p>
                      <Image src={nineeight} className="nineseven" alt="Ninety-Eight Percent" />
                    </div>
                    <div className="stat-card">
                      <h2>97<span>%</span></h2>
                      <p>Of participants report<br /> high engagement</p>
                      <Image src={nineseven} className="nineone" alt="Ninety-Seven Percent" />
                    </div>
                    <div className="stat-card">
                      <h2>87<span>%</span></h2>
                      <p>Of participants stay <br />with their company.</p>
                      <Image src={eightseven} className="eight" alt="Eighty-Seven Percent" />
                    </div>
        </div>
        

        
        <div className="arvr-info-section">
          <div className="arvr-info-left mt-3">
            {/* <div className="arvr-info-stats">
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
            </div> */}

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

            <div className="robot-built-section">
              <h2>This is <span className="highlight">built</span> for</h2>
              <div className="robot-built-carousel">
                <div className="robot-built-track">
                  {[
                    { tag: 'Manufacturing', title: 'Industrial robots', desc: 'Streamlining production and assembly lines.' },
                    { tag: 'Healthcare', title: 'Medical robotics', desc: 'Assisting surgeries and patient care.' },
                    { tag: 'Agriculture', title: 'Agri-robots  ', desc: 'Automating planting, harvesting, and monitoring crops.' },
                    { tag: 'Logistics  ', title: 'Autonomous robots ', desc: 'Optimizing storage and delivery operations.' },
                    { tag: 'Defense', title: 'Tactical robots  ', desc: 'Supporting surveillance and hazardous missions.' },
                    { tag: 'Electronics', title: 'Personal robots', desc: 'Enhancing everyday tasks and smart living.' },
                    { tag: 'Education', title: 'Learning platforms', desc: 'Teaching robotics concepts and innovation.' }
                  ].map((item, i) => (
                    <div className="robot-built-card" key={i}>
                      <span className="robot-built-tag">{item.tag}</span>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
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

            <div className="review-carousel-section">
                          <h2 className="drone-review-title">Reviews</h2>
                          <div className="review-carousel-wrapper">
                            <div className="review-carousel-track">
                              {[
                                {
                                  heading:"BOE at EMP Monitor",
                                  name: "Parthiv Kumar",
                                  role: "Cybersecurity",
                                  review:
                                    "I gained valuable knowledge and hands-on experience in various aspects of cybersecurity. One of the highlights of my internship was working on a minor project with a machine to identify vulnerabilities.",
                                  avatar: sai,
                                },
                                {
                                  heading:"BOE at EMP Monitor",
                                  name: "Harish",
                                  role: "Blockchain",
                                  review:
                                    "The course provided deep insights and practical exposure. The module on real-world drone integration was especially eye-opening.",
                                  avatar: harish,
                                },
                                {
                                  heading:"BOE aP Monitor",
                                  name: "Sakshi",
                                  role: "AI Research",
                                  review:
                                    "Exceptional mentorship and hands-on sessions! I now understand drone dynamics and automation better.",
                                  avatar: sakshi,
                                },
                                {
                                  heading:"BOE at EMP Monitor",
                                  name: "Hari Krishna",
                                  role: "IoT & Robotics",
                                  review:
                                    "Fantastic journey. Loved the combination of theory and lab work. My project now flies!",
                                  avatar: hari,
                                },
                                {
                                  heading:"BOE at EMP Monitor",
                                  name: "Aditi Rao",
                                  role: "Embedded Systems",
                                  review:
                                    "Comprehensive curriculum and well-guided support made the learning smooth and impactful.",
                                  avatar: sakshi,
                                },
                              ].map((review, i) => (
                                <div className="review-slide" key={i}>
                                  <h4>{review.heading}</h4>
                                  <p><em>{review.review}</em></p>
                                  <div className="review-footer">
                                    <Image src={review.avatar} alt={review.name} />
                                    <div>
                                      <strong className="review-name">{review.name}</strong><br />
                                      <span className="review-namep">{review.role}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
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


      <div className="drone-offer-section">
          <h2 className="offer-heading">Biggest Price Drop Yet</h2>
          
          <div className="offer-price-box">
            <span className="offer-icon">⚡</span>
            <span className="offer-old-price">₹24,999/-</span>
            <span className="offer-new-price">₹20,000/-</span>
          </div>

          <p className="offer-subtext">The Clock’s Ticking — Ends In</p>

          <div className="offer-timer">
            {Object.entries(timer).map(([label, value], i) => (
              <div className="timer-unit" key={i}>
                <div className="digit-pair">
                  {value.split('').map((digit, j) => (
                    <div className="timer-box" key={j}>{digit}</div>
                  ))}
                </div>
                <p>{label}</p>
              </div>
            ))}
          </div>

          <button className="offer-btn">Apply Now</button>
      </div>
      
       <div className="cert-drone">
               <div className="certificate-display-section">
                  <div className="certificate-image-wrapper">
                <Image
                  src={certificateDisplay}
                  alt="Skipper Certificate"
                  className="certificate-background-img"
                  
                />
                <div className="certificate-overlay">
                  <h2 className="certificate-title">
                    Seal the Skill with a <span className="highlight">Skipperx</span> Certificate
                  </h2>
                  <p className="certificate-subtext">
                    Yes! You will be certified for this program.
                  </p>
                </div>
              </div>
              </div>
              </div>
      
      
      
      
      
      
      
            <div className="drone-brochure">
              <div
                className="brochure-banner"
                style={{ backgroundImage: `url(${brochureImage.src})` }}
              >
                <div className="brochure-overlay">
                  <h3>
                    Want the Deep Dive? Grab the <span>Brochure</span>
                  </h3>
                  <p>
                    From what you’ll learn to where it can take you — it’s all inside.
                  </p>
                  <button className="download-brochure-btn">Download Brochure</button>
                </div>
              </div>
             </div>
      
      
      
      
      
      
      
      
              <div className="skippers-section">
                <div className="faq-header">
                  <hr className="faq-leftt"/>
                  <h2><span className="dronehighlight">Skippers</span> of the Month</h2>
                  <hr className="faq-rightt"/>
                </div>
                <p className="faq-subtext">Insights from those who’ve walked the path you're about to take.</p>
      
              <div className="skippers-podium-wrapper">
                
                <div className="podium-bg" />
      
                
                <div className="skipper-box silver">
                  <Image src={soumya} alt="Soumya Verma" className="skipper-img" />
                  <h4>Soumya Verma</h4>
                  <p>Silver Medalist</p>
                  <div className="coins-earned1">
                    <span className="coin-icon">⚡</span>
                    <span className="coin-text">20345 Coins earned</span>
                  </div>
                </div>
      
                
                <div className="skipper-box gold">
                  <Image src={suresh} alt="Suresh Sharma" className="skipper-img" />
                  <h4>Suresh Sharma</h4>
                  <p>Gold Medalist</p>
                  <div className="coins-earned2">
                    <span className="coin-icon">⚡</span>
                    <span className="coin-text">20345 Coins earned</span>
                  </div>
                </div>
      
                
                <div className="skipper-box bronze">
                  <Image src={vishal} alt="Vishal Pal" className="skipper-img" />
                  <h4>Vishal Pal</h4>
                  <p>Bronze Medalist</p>
                  <div className="coins-earned3">
                    <span className="coin-icon">⚡</span>
                    <span className="coin-text">20345 Coins earned</span>
                  </div>
                </div>
              </div>
            </div>
      
      
      
      
      
             <div className="faq-section">
                <div className="faq-header">
                  <hr className="faq-leftt"/>
                  <h2>Frequently Asked Question</h2>
                  <hr className="faq-rightt"/>
                </div>
                <p className="faq-subtext"></p>
                
                <div className="faq-list">
                  {[
                    {
                      question: "Is technical support available if I encounter issues with the online platform?",
                      answer: "Our dedicated support team is just a call or an email away. Reach out to us at 8792243559 / 8147081557 or support@corizo.in from Monday to Saturday, 11 AM to 8 PM, for any assistance you need!"
                    },
                    {
                      question: "Are there discussion forums or community platforms for students?",
                      answer: "Join the vibrant community on WhatsApp! Engage, discuss, and grow with fellow learners and mentors by your side."
                    },
                    {
                      question: "Is there a pre-registration option available?",
                      answer: "Get ahead of the curve with a nominal pre-registration fee of ₹1000. Secure your spot and start transforming your career trajectory!"
                    },
                     {
                      question: "What is the refund policy?",
                      answer: "Our courses are crafted with care and commitment, and as such, we do not offer refunds. We believe in the value and quality of our educational services!"
                    },
                    {
                      question: "How much time do I need to dedicate to the course each week?",
                      answer: "Whether you’re sprinting or pacing yourself, choose what works for you! We offer both self-paced and mentor-led formats to match your learning style."
                    },
                    {
                      question: "What are the timings of the classes ?",
                      answer: "Classes are tailored for convenience, kicking off after 6 PM to suit your busy schedules and commitments. Dive in when you're ready to learn!"
                    }
                  ].map((item, index) => (
                    <div className="faq-card" key={index}>
                      <div className="faq-question" onClick={() => toggleAccordion(index + 100)}>
                        <h4>{item.question}</h4>
                        <span className={`accordion-icon ${activeIndex === index + 100 ? 'open' : ''}`}><Image src={faqarrow} alt="dropdown" className="faqarrow" /></span>
                      </div>
                      {activeIndex === index + 100 && (
                        <div className="faq-answer">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
      
          
      {/* <Footer /> */}
    </>
  );
};

export default ARVREngineering;
