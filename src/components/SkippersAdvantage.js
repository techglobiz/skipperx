import React from "react";
import "./SkippersAdvantage.css"; // Assuming you have a CSS file for styling
import Image from "next/image";

import group1 from "../assets/GROUP1.png";
import group4 from "../assets/GROUP2.png";
import group2 from "../assets/GROUP3.png";  
import group3 from "../assets/GROUP4.png";

const cards = [
  {
    label: "Live Classes",
    title: "Learn Skills That Actually Matter",
    desc: "Live sessions. No fluff.",
    image: group1,
    className: "card-1",
  },
  {
    label: "Community",
    title: "Built-In Hype Squad",
    desc: "Learn with your people.",
    image: group4,
    className: "card-2",
  },
  {
    label: "Certification",
    title: "Flex Real Cred",
    desc: "Not lame. Just legit.",
    image: group2,
    className: "card-3",
  },
  {
    label: "Portfolio",
    title: "Projects That Show You’re Not Just Talk",
    desc: "Stuff you can actually show off.",
    image: group3,
    className: "card-4",
  },
];

const SkippersAdvantage = () => {
  return (
    <section className="skippers-section">
      <div className="header-line">
        <div className="le" />
        <h2>Get the <span className="highlight">Skippers</span> Advantage</h2>
        <div className="rig" />
      </div>
      <p className="subtitle">
        Unlock real-world learning, mentor guidance, and a career-ready portfolio.
      </p>

      <div className="grid">
        {cards.map((card, idx) => (
          <div className={`advantage-card ${card.className}`} key={idx}>
            <Image src={card.image} alt={card.title} className="card-bg" />
            <div className="overlayy" />
            <div className="badge">{card.label}</div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkippersAdvantage;
