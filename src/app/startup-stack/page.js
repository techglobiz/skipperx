'use client';
import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import ClientDynamicPagesMenu from '@/components/ClientDynamicPagesMenu';
import bgImage from '/public/assets/dronebg.png';
import bulbIcon from '/public/assets/holding-bulb.png';
import stackicon from '/public/assets/stackincon.png';
import statckimg from '/public/assets/statckup.png';
import './stack.css'; // Assuming you have a CSS file for styles
import nineeight from "../../assets/nine-eight.png";
import nineseven from "../../assets/nine-seven.png";
import eightseven from "../../assets/eight-seven.png";
import roborreviewlogo from "../../assets/robot-review-logo.png";
import ashish from '../../assets/robot-review.png';
import faqarrow from "../../assets/faqarrow.png";
import sai from '../../assets/sai.jpg';
import hari from '../../assets/harih.jpg';
import sakshi from '../../assets/saksh.png';
import certificateDisplay from "../../assets/dcerti.png";
import harish from '../../assets/harisha.jpg';
import skillIndia from '../../assets/skill-india.png';
import nsdc from '../../assets/nsdc.png';
import startupIndia from '../../assets/startup-india.png';
import googleEd from '../../assets/google-edu.png';
import brochureImage from "../../assets/drone-brochure.png";
// Import all the people images
import ashishImg from '../../assets/ashish.png';
import ahmadImg from '../../assets/ahmad.png';
import ashiImg from '../../assets/ashi.png';
import sanchitImg from '../../assets/sanchit.png';
import shreyanshImg from '../../assets/shreyansh.png';
import anuragImg from '../../assets/anurag.png';
import varunImg from '../../assets/varun.png';
import aashiiImg from '../../assets/aashii.png';
import ishannImg from '../../assets/ishann.png';
import rohittImg from '../../assets/rohitt.png';
import deepakkImg from '../../assets/deepakk.png';

// Import all the company logos
import deloitteImg from '../../assets/Deloitte-.png';
import bidgelyyImg from '../../assets/bidgelyy.png';
import appleImg from '../../assets/apple.png';
import dppImg from '../../assets/dpp.png';
import walImg from '../../assets/wal.png';
import erImg from '../../assets/er.png';
import subexImg from '../../assets/subex.png';
import cgiiImg from '../../assets/cgii.png';
import diceeImg from '../../assets/dicee.png';
import gameImg from '../../assets/game.png';
import css from '/public/assets/css.png';
import node from '/public/assets/node.png';
import ricon from '/public/assets/ricon.png';


const modules = [
  { title: "Introduction to Robotics & Microcontroller Basics", content: "Learn the basics of flight using paper planes and aerodynamics." },
  { title: "Microcontroller Mastery Continued & Electronics Fundamentals", content: "Understand drone parts, types, and functionality." },
  { title: "Bluetooth Communication & Sensor Basics", content: "Step-by-step drone assembly and flight tests." },
  { title: "Robot Assembly & Bluetooth Control", content: "Overview of sensors used in drones." },
  { title: "Advanced Sensing and Data Interpretation", content: "Dive deep into orientation and altitude sensors." },
  { title: "Obstacle Avoidance & Line Following Techniques", content: "Learn the software framework that controls drones." },
  { title: "Mobile App Development for Robot Control", content: "Build and fly your own drone in the final week." },
  { title: "Final Integration and Project Presentations", content: "Build and fly your own drone in the final week." }
];


const partners = [skillIndia, nsdc, startupIndia, googleEd, css, node];




export default function StartupStackPage() {
  
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
    
    
    
    const [showForm, setShowForm] = useState(false);
  
    const handlePricingClick = () => {
      setShowForm(true);
    };
  
  

  return (
    <>
     <div className='stackbody'>
  <div className="stack-section">
    <div className="drone-tag">
      <Image src={bulbIcon} alt="Bulb Icon" className="drone-tag-icon" />
      Super Stack
    </div>

    <h1 className="drone-title">
      Everything You Need to Launch and Grow<br /> Your Business with
      <span className="highlight"> Startup Stack.</span>
    </h1>

    <p className="drone-description">
      7+ Business programs bundled for your startup journey.
    </p>

    <div className="drone-cta-buttons">
      <button className="drone-outline-btn">Build it</button>
      <button className="drone-outline-btn">Fly it</button>
      <button className="drone-outline-btn">Own it</button>
    </div>

    <button className="drone-start-btn">Start Learning</button>
  </div>

  {/* NEW STACK MODULES SECTION */}
        <div className="stack-card-container">
         <Image src={statckimg} alt="Stack Up" className="stack-up-image" />
        </div>   
        <div className="title-section">
            <h2>How this bundle has <span className="highlight"> impacted </span> other Mentees?</h2>
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
          
        
        <div className="drone-info-section">
                  <div className="drone-info-left">
        
        
        
                    <div>
                    <h2 className="drone-info-heading">
                      Unlock the mindset of a  <span> modern entrepreneur</span>
              </h2>
              
                    <p className="drone-info-para">
              Master the essentials of building and growing businesses—from strategic decision-making to understanding human behavior.
              <strong>Develop a growth mindset and resilience to navigate challenges.</strong>
              </p>
              
              <ul className="arvr-features-list">
                <li>Use Artificial Intelligence to drive smarter strategies.</li>
                       <li>Decode the dynamics of finance, stock markets, and business analytics.</li>
                       <li>Explore creative domains like fashion designing to stand out in competitive markets.</li>
                       <li>Learn the foundations of psychology and human resource management to lead effectively.</li>
              </ul>


                    
                  </div>
                
        
                   <div>
                    <h2 className="robot-heading">Meet your <span className="highlight">Mentors</span></h2>
                    
                    <div className="robot-testimonial-box">
                      <div className="robot-testimonial-person">
                        <Image src={ashish} alt="Ashish Singhal" />
                        <div className="robot-testimonial-name">
                          Pratyush Singh <br />
                          <Image src={roborreviewlogo}  className="robot-review-img" alt="RoborReview Logo" />
                        </div>
                      </div>
        
                      <div className="robot-testimonial-person">
                        <Image src={ashish} alt="Ashish Singhal" />
                        <div className="robot-testimonial-name">
                          Pratyush Singh <br />
                          <Image src={roborreviewlogo}  className="robot-review-img" alt="RoborReview Logo" />
                        </div>
                      </div>
                      <div className="robot-testimonial-person">
                        <Image src={ashish} alt="Ashish Singhal" />
                        <div className="robot-testimonial-name">
                          Pratyush Singh <br />
                          <Image src={roborreviewlogo}  className="robot-review-img" alt="RoborReview Logo" />
                        </div>
                      </div>
                      
              </div>
              
              <div className="robot-testimonial-box">
                      <div className="robot-testimonial-person">
                        <Image src={ashish} alt="Ashish Singhal" />
                        <div className="robot-testimonial-name">
                          Pratyush Singh <br />
                          <Image src={roborreviewlogo}  className="robot-review-img" alt="RoborReview Logo" />
                        </div>
                      </div>
        
                      <div className="robot-testimonial-person">
                        <Image src={ashish} alt="Ashish Singhal" />
                        <div className="robot-testimonial-name">
                          Pratyush Singh <br />
                          <Image src={roborreviewlogo}  className="robot-review-img" alt="RoborReview Logo" />
                        </div>
                      </div>
                      <div className="robot-testimonial-person">
                        <Image src={ashish} alt="Ashish Singhal" />
                        <div className="robot-testimonial-name">
                          Pratyush Singh <br />
                          <Image src={roborreviewlogo}  className="robot-review-img" alt="RoborReview Logo" />
                        </div>
                      </div>
                      
                    </div>

              <div className="robot-testimonial-box">
                      <div className="robot-testimonial-person">
                        <Image src={ashish} alt="Ashish Singhal" />
                        <div className="robot-testimonial-name">
                          Pratyush Singh <br />
                          <Image src={roborreviewlogo}  className="robot-review-img" alt="RoborReview Logo" />
                        </div>
                      </div>
        
                      <div className="robot-testimonial-person">
                        <Image src={ashish} alt="Ashish Singhal" />
                        <div className="robot-testimonial-name">
                          Pratyush Singh <br />
                          <Image src={roborreviewlogo}  className="robot-review-img" alt="RoborReview Logo" />
                        </div>
                      </div>
                      <div className="robot-testimonial-person">
                        <Image src={ashish} alt="Ashish Singhal" />
                        <div className="robot-testimonial-name">
                          Pratyush Singh <br />
                          <Image src={roborreviewlogo}  className="robot-review-img" alt="RoborReview Logo" />
                        </div>
                      </div>
                      
                    </div>
                    </div>         
                     </div>    
        
        
        
                  <div className="drone-info-right">
                  {!showForm && (
                    <div className="drone-pricing-card">
                      <h2>Master Startup stack </h2>
        
                      <ul className="drone-features-list">
                        <li><span className="tickmark">&#10004;</span> Innovation for professional growth</li>
                        <li><span className="tickmark">&#10004;</span> Certification included</li>
                        <li><span className="tickmark">&#10004;</span> Hands on learning</li>
                        
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
                          <span className='top'>7000+ members has already completed this Program</span>
                        </div>
                      </div>
        
                      <button className="drone-pricing-btn" onClick={handlePricingClick}>Start Learning</button>
                    </div>
        
                  )}
        
        
        
        
        
                 {showForm && (
                  <div className={`drone-form-wrapper ${showForm ? 'visible' : 'hidden'}`}>
                   <div className="drone-form">
                    <div className="drone-form-card">
                      <h3 className="drone-form-title">Master Robot Engineering Program</h3>
        
                      <form className="drone-form-fields">
                        <input type="text" placeholder="First Name*" required />
                        <input type="email" placeholder="E-mail*" required />
                        <input type="text" placeholder="College name*" required />
                        
                        <select required>
                          <option value="">Interest*</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
        
                        <div className="phone--input">
                          <span className="country--code">+91</span>
                          <input type="tel" placeholder="XXXXXXXXXX" required />
                        </div>
        
                        <button type="submit" className="form-submit-btn">Start Learning</button>
                      </form>
                    </div>
                   </div>
                  </div>
                 )}
        
        
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

            <div className='flex-row justify-center items-center'>
                      <div className="trust-wrapper">
                      <h4 className="accredited-text"> <span className='highlight'>Tools </span> You’ll Master to Launch and Grow Your Business</h4>
                      <p className='pt-0 pb-4'>Master real-world Business essentials.</p>
                        <div className="logo-row"> 
                          {partners.map((logo, idx) => (
                            <Image key={idx} src={logo} alt="logo" className="partner-logo" />
                          ))}
                   </div>   
            
                     <div className="logo-row"> 
                          {partners.map((logo, idx) => (
                            <Image key={idx} src={logo} alt="logo" className="partner-logo" />
                          ))}
                        </div>   
                      </div> 
          
<div className="drone-info-stats-stack">
  <h2 className="stack-head-ing">
    Here’s What You’ll Walk <span> Away </span> With
  </h2>

  <div className="drone-stat-wrapper">
    {[
      { count: 'Build real projects in', label: 'business strategy, analytics, and innovation' },
      { count: 'Learn top tools for finance, ', label: 'stock trading, and AI-powered decisions' },
      { count: 'Explore creative domains like', label: 'fashion and consumer psychology' },
      { count: 'Train for real roles with expert', label: ' mentors, case studies, and hands-on practice' }
    ].map((item, index) => (
      <div className="drone-stat-card" key={index}>
        <div className="stat-icon">
          <Image src={ricon} alt="Stack Icon" className="stat-icon-image" />
          
        </div>
        <h4>{item.count}</h4>
        <p>{item.label}</p>
      </div>
    ))}
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
          




        
            </div>
          </div>
      
                                          
    </>
  );
}