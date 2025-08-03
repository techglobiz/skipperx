'use client';

import React from "react";
import "./SuperStack.css";
import Image from "next/image";

// ✅ Import image objects
import img1 from "../assets/1sttt.png";
import img2 from "../assets/2nd.png";
import img3 from "../assets/3rdd.png";
import arrowIcon from "../assets/arrows.png";
import Link from "next/link";

const stackData = [
  {
    title: "Startup Stack",
    subtitle: "7+ Diverse Program",
    successRate: "93% land biz roles or launch ventures",
    tag: "Business",
    footer: "Business Analytics · Human Resource · Finance · Fashion Design",
    bgImage: img1, // imported object
  },
  {
    title: "Core Tech",
    subtitle: "6+ Diverse Program",
    successRate: "90% land tech roles or launch products",
    tag: "Tech",
    footer: "Cybersecurity · Data Science · UI/UX Design · Web Development",
    bgImage: img2,
  },
  {
    title: "Creators hub",
    subtitle: "7+ Diverse Program",
    successRate: "88% grow brands or start freelancing.",
    tag: "Creative",
    footer: "Graphic Design · Photography · Content creation · UIUX · Digital media",
    bgImage: img3,
  },
];

const SuperStack = () => {
  return (
    <section className="stack-wrapper">
      <h2 className="stack-heading">
        Super <span className="highlight-text">Stack</span>
      </h2>
      <div className="stack-card-container">
        {stackData.map((item, index) => (
          <div
            className="stack-box"
            key={index}
            style={{
              backgroundImage: `url(${item.bgImage.src})`, // ✅ .src fixes [object Object]
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay">
              <div className="stack-tag">{item.tag}</div>
              <h3 className="stack-title">{item.title}</h3>
              <p className="stack-subn">{item.subtitle}</p>
              <p className="stack-rate">
                <strong>
                  <span className="success">Success rate:</span>
                </strong>
                <br className="next" />
                {item.successRate}
              </p>

               <Link
              href={`/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="stack-learn"
              >
                <Image
                  src={arrowIcon}
                  alt="arrow"
                  className="arrow-icon"
                  width={30}
                  height={30}
                />

            </Link>
              {/* <button className="stack-learn">
                <Image
                  src={arrowIcon}
                  alt="arrow"
                  className="arrow-icon"
                  width={30}
                  height={30}
                />
              </button> */}
            </div>
            <div className="stack-footer-scroll">
              <div className="scroll-content">{item.footer} · {item.footer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuperStack;
