import React from "react";
import Link from "next/link";
import Image from 'next/image';
import "./EngineeringPrograms.css";
import arrowIcon from "../assets/arrows.png";
import avatar1 from "../assets/A1.png";
import avatar2 from "../assets/A2.png";
import avatar3 from "../assets/A3.png";
import bg1 from "../assets/dro1.png";
import bg2 from "../assets/robo1.png";
import bg3 from "../assets/ar1.png";

const programs = [
  {
    title: "Drone Engineering",
    tag: "⭐Exclusive Program",
    quote: "“The free drone kit and hands-on projects made learning super fun”",
    avatar: avatar1,
    success: "90% land tech roles or launch products",
    bg: bg1,
  },
  {
    title: "Robot Engineering",
    tag: "⚡Trending",
    quote: "“Learning to build and code robots made everything feel exciting!”",
    avatar: avatar2,
    success: "89% build robots or step into core tech roles.",
    bg: bg2,
  },
  {
    title: "AR VR",
    tag: "⚡Bestseller",
    quote: "“Creating AR VR projects helped me learn by doing—felt futuristic and fun!”",
    avatar: avatar3,
    success: "92% land AR/VR roles or launch their own apps.",
    bg: bg3,
  },
];

const EngineeringPrograms = () => {
  return (
    <section className="eng-section">
      <div className="best-heading-section">
        <hr className="l" />
        <h1>
          For <span className="proo">Innovators</span>
        </h1>
        <hr className="r" />
      </div>
      <p className="best-subheading">Real journeys, Real breakthroughs, Real impact</p>
      <div className="eng-container">
        {programs.map((item, index) => (
          <div
            key={index}
            className="eng-card"
            style={{ backgroundImage: `url(${item.bg.src})` }}
          >
            {item.tag && <div className="eng-badge">{item.tag}</div>}
            <h3 className="eng-title">{item.title}</h3>

            <div className="eng-testimonial">
              <Image src={item.avatar} alt="student" className="eng-avatar" />
              <p className="eng-quote">{item.quote}</p>
            </div>

            <div className="eng-success">
              <p className="eng-success-label">Success rate:</p>
              <p className="eng-success-value">{item.success}</p>
            </div>

            {/* ✅ Arrow link to dynamic route */}
            <Link
              href={`/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="eng-arrow-btn"
            >
              <Image src={arrowIcon} alt="arrow" className="eng-arrow-img" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EngineeringPrograms;
