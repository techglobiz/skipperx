'use client';
import Image from "next/image";
import Link from 'next/link';
import ClientDynamicPagesMenu from '@/components/ClientDynamicPagesMenu';
import bgImage from '/public/assets/dronebg.png';
import bulbIcon from '/public/assets/holding-bulb.png';
import './stack.css'; // Assuming you have a CSS file for styles



export default function StartupStackPage() {
  

  return (
    <>
     <div className='stackbody'>
             <div
               className="stack-section"
               style={{
                 background: `
                   linear-gradient(135deg, 
                     #667eea 0%, 
                     #764ba2 25%, 
                     #f093fb 50%, 
                     #f5576c 75%, 
                     #4facfe 100%
                   ),
                   linear-gradient(45deg, 
                     rgba(0, 0, 0, 0.8) 0%, 
                     rgba(0, 0, 0, 0.4) 50%, 
                     rgba(0, 0, 0, 0.8) 100%
                   ),
                  )
                 `,
                 backgroundSize: 'cover, cover, cover',
                 backgroundPosition: 'center, center, center',
                 backgroundRepeat: 'no-repeat',
                 backgroundBlendMode: 'overlay, normal, normal',
               }}
             >
               <div className="drone-tag">
                 <Image src={bulbIcon} alt="Bulb Icon" className="drone-tag-icon" />
                 Super Stack
               </div>
               <h1 className="drone-title">
                 Everything You Need to Launch and Grow<br/> Your Business with 
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
           </div>
      
    </>
  );
}