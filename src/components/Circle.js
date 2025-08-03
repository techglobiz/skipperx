import React from 'react';
import './Circle.css';
import i1 from "../assets/i1.svg";
import i2 from "../assets/i2.svg";
import i3 from "../assets/i3.svg";
import i4 from "../assets/i4.svg";
import Image from 'next/image';

const Circle = () => {
  return (
    <section className='circlebody'>
      <div className="circle-section">
        <h1 className="circle-heading">
            <span className="highlightc">NSDC</span> Certification Benefits
        </h1>
        <div className="circle-content">
            <div className="circle-left">
            <div className="circle-item1">
                <Image src={i1} className="circle-icon1" alt="Icon 1" />
                <p>Improves career advancement potential</p>
            </div>
            <div className="circle-item2">
                <Image src={i2} className="circle-icon2" alt="Icon 2" />
                <p>Enhances job prospects and growth</p>
            </div>
            <div className="circle-item">
                <Image src={i3} className="circle-icon3" alt="Icon 3" />
                <p>Ensures high standards of learning</p>
            </div>
            <div className="circle-item4">
                <Image src={i4} className="circle-icon4" alt="Icon 4" />
                <p>Core benefit of the Program</p>
            </div>
            </div>
            <div className="circle-container">
            <div className="circle-label label-11">Career <br/>Boost</div>
            <div className="circle-label label-22">Employment <br/>Opportunities</div>
            <div className="circle-label label-33">Quality <br/>Education</div>
            <div className="circle-label label-44">NSDC <br/>Certification</div>
            </div>
        </div>
        </div> 
    </section>
  );
};

export default Circle;
