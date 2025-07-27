'use client';
import Link from 'next/link';
import './termsandconditions.css';
import PageMetadata from '@/components/PageMetadata';

export default function TermsAndConditions() {
  return (
    <>
      <PageMetadata
        title="Terms and Conditions"
        description="Read our terms and conditions to understand the rules and regulations governing your use of our website and services."
        keywords="terms and conditions, user agreement, website terms, service terms"
        path="/termsandconditions"
      /> 

      <div className="terms-container">
        <h1>Skipperx Empowering Tomorrow Leaders – Terms And Conditions</h1>
        <p className="intro">
          Welcome To SkipperX! These Terms And Conditions Outline The Rules And Regulations For Using Our Website, Located At <a href="https://skipperx.io/" target="_blank" rel="noopener noreferrer">https://skipperx.io/</a>. By Accessing Or Using Our Website, You Agree To Be Bound By These Terms And Conditions.
        </p>

        <h2>1. Acceptance</h2>
        <p>These Terms And Conditions Govern Your Use Of skipperx.io. If You Disagree With Any Part, You May Not Use The Website.</p>

        <h2>2. Intellectual Property</h2>
        <p>All Content Belongs To SkipperX Or Its Licensors. This Includes Courses, Logos, Designs, etc. You May Only Use It Under These Terms.</p>

        <h2>3. Restrictions On Use</h2>
        <p>You Are Prohibited From:</p>
        <ul>
          <li>Reproducing Content For Commercial Use</li>
          <li>Distributing Content Without Written Permission</li>
          <li>Using Bots Or Scrapers</li>
          <li>Disrupting Website Functionality</li>
        </ul>

        <h2>4. User Accounts</h2>
        <p>You’re Responsible For Keeping Your Login Details Confidential And All Activities That Occur Under Your Account.</p>

        <h2>5. User Content</h2>
        <p>By Submitting Content (Reviews, Posts), You Agree Not To Submit Anything Illegal Or Offensive.</p>

        <h2>6. Disclaimer</h2>
        <p>We Do Not Guarantee Accuracy Or Reliability Of Information On Our Website. Use It At Your Own Risk.</p>

        <h2>7. Limitation Of Liability</h2>
        <p>We Are Not Liable For Any Damages Arising From Your Use Of This Website.</p>

        <h2>8. Termination</h2>
        <p>We May Terminate Or Suspend Access To Our Website Without Prior Notice If Terms Are Violated.</p>

        <h2>9. Changes To Terms And Conditions</h2>
        <p>We May Update These Terms At Any Time. Check Back Often.</p>

        <h2>10. Governing Law</h2>
        <p>These Terms Are Governed By Indian Law.</p>

        <h2>11. Contact Us</h2>
        <p>If You Have Any Questions, Contact Us At [Email Protected]</p>
      </div>
    </>
  );
}
    

