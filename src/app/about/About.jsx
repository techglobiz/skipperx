import React from 'react';
import './About.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <h1>About Us</h1>

        <h2>What Drives Us</h2>
        <p>At SkipperX, We Don’t Just Follow The Future — We Build It.</p>
        <p>
          We Believe Traditional Learning Models Can’t Keep Pace With A Rapidly Evolving World. So, We Set Out To Create Something Different — A Platform Where Innovation Meets Education, And Learners Become Pioneers.
        </p>
        <p>SkipperX Is Your Launchpad Into The Future Of Tech.</p>
        <p>
          We Design Industry-Relevant Programs In Collaboration With Top Experts And Engineers, Focusing On Today’s Most Dynamic Fields — From AR/VR And Drone Technology To Robotics And Future Mobility.
        </p>
        <p>Our Learning Experiences Are Not Bound By Textbooks.</p>
        <p>
          They Are Immersive, Project-Based, And Built Around Skills That Companies Are Actively Hiring For. Whether You’re A Curious Learner, A Passionate Builder, Or Someone Ready To Shift Careers, SkipperX Is Built For You.
        </p>
        <p>
          We Equip You With Real-World Tools And Thinking Frameworks That Empower You To Create, Explore, And Lead — Not Just Participate.
        </p>

        <h2>Why SkipperX?</h2>
        <ul>
          <li>✓ Trending Tech Programs</li>
          <li>✓ Hands-On Projects & Kits (Like Drone Kits, Robotics Models)</li>
          <li>✓ Mentorship From Industry Leaders</li>
          <li>✓ Future-Forward Curriculum</li>
          <li>✓ Active Peer Community</li>
        </ul>

        <p className="mission-lead">
          Our Mission Is Bold But Clear:  
          <br />
          <span className="highlight">
            To Spark Curiosity, Unlock Potential, And Shape Tomorrow’s Innovators.
          </span>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
