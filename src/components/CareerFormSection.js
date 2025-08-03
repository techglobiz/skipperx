import React from "react";
import "./CareerFormSection.css"; // Assuming you have a CSS file for styling

const CareerFormSection = () => {
  return (
    <section className="career-form-section">
      <div className="title-wrapper">
        <div className="lef" />
        <h2><span className="bold">Still Confused? We’ve Got You</span></h2>
        <div className="righ" />
      </div>
      <p className="subtitle">
        Insights from those who’ve walked the path you're about to take.
      </p>

      <form className="career-form">
        <div className="input-row">
          <input type="text" placeholder="First Name*" className="input-row" />
          <select required defaultValue="">
            <option value="" disabled hidden>Interest*</option>
            <option value="drone">Drone Engineering</option>
            <option value="robot">Robot Engineering</option>
            <option value="arvr">AR/VR</option>
          </select>
        </div>

        <div className="input-row">
          <div className="phone-input">
            <span>+91</span>
            <input type="tel" placeholder="XXXXXXXXXX" />
          </div>
          <input type="email" placeholder="E-mail*" required />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <p className="disclaimer">Our experts revert back usually within 24 hours</p>
    </section>
  );
};

export default CareerFormSection;
