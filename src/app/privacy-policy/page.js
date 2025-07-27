import { generatePageMetadata, pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import './PrivacyPolicy.css'; 

// Generate metadata for this page
export async function generateMetadata() {
  return generatePageMetadata(pageMetadata['privacy-policy']);
}

export default function PrivacyPolicy() {

  return (
    <>
      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <p className="intro">
          At Skipperx, accessible from <a href="https://skipperx.io/" target="_blank" rel="noopener noreferrer">https://skipperx.io/</a>, one of our main priorities is the privacy of our visitors. 
          This Privacy Policy document contains the types of information that is collected and recorded by Skipperx and how we use it.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly when you use our website, such as:</p>
        <ul>
          <li><strong>Registration information:</strong> name, email, phone number, company name (if applicable).</li>
          <li><strong>Content submissions:</strong> reviews, forums, interactive features.</li>
          <li><strong>Contact information:</strong> message content and attachments.</li>
        </ul>
        <p>We may also collect:</p>
        <ul>
          <li><strong>Log files:</strong> browser type, IP, referring pages, timestamps.</li>
          <li><strong>Cookies:</strong> preferences and activity (customizable in browser settings).</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Operate and maintain our website</li>
          <li>Improve and personalize content/services</li>
          <li>Develop new features and analyze usage</li>
          <li>Communicate regarding enrollment, updates, promotions (with consent)</li>
          <li>Send administrative emails</li>
          <li>Prevent fraud</li>
        </ul>

        <h2>3. Sharing Your Information</h2>
        <p>We do not share your personal info except when:</p>
        <ul>
          <li><strong>Service Providers:</strong> trusted services needed to operate our platform</li>
          <li><strong>Legal Requirements:</strong> required by law or to protect others</li>
        </ul>

        <h2>4. Data Retention</h2>
        <p>
          We retain your info as long as needed for the purposes in this policy, unless longer retention is required by law.
        </p>

        <h2>5. Your Rights</h2>
        <p>You may request:</p>
        <ul>
          <li>Access to or correction of your data</li>
          <li>Deletion of your data</li>
          <li>Restrictions on processing</li>
          <li>To object to processing</li>
          <li>Data portability</li>
        </ul>

        <h2>6. Children’s Information</h2>
        <p>
          We do not knowingly collect info from children under 13. If your child has submitted info, please contact us to remove it.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at [email protected]
        </p>

        <h2>8. Changes To This Policy</h2>
        <p>We may update this policy occasionally. Any changes will be posted on this page.</p>
      </div>
    </>
  );
}















