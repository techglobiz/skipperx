'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import './FrontendNavbar.css';
import Image from 'next/image';
import logo from '../assets/toplogo.png'; // Adjust the path as necessary

export default function FrontendNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!mounted) {
    return null; // Return null during hydration to prevent mismatch
  }

  return (
    <nav key="frontend-navbar" className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="left-section">
        <Image src={logo} alt="Skipper Logo" className="logo-img" />

        <div className={`nav-linkss ${isMobileMenuOpen ? 'show' : ''}`}>
          {/* Learn with Dropdown */}
          <div className="nav-item dropdown">
            Learn <span className="arrow">▾</span>
            <div className="dropdown-menu">
              <div className="dropdown-item">Courses</div>
              <div className="dropdown-item">Projects</div>
              <div className="dropdown-item">Live Classes</div>
            </div>
          </div>

          {/* Become a Member with Dropdown */}
          <div className="nav-item dropdown">
            Become a <span className="highlight">member</span> <span className="arrow">▾</span>
            <div className="dropdown-menu">
              <div className="dropdown-item">Membership Plans</div>
              <div className="dropdown-item">Benefits</div>
              <div className="dropdown-item">FAQs</div>
            </div>
          </div>

          <Link href="/about" className="nav-item">About</Link>
        </div>
      </div>

      <div className={`nav-buttons ${isMobileMenuOpen ? 'show' : ''}`}>
        <Link href="/login" className="btn black">Login</Link>
        <Link href="/contact" className="btn white">Contact Us</Link>
      </div>

      <button className="hamburger" onClick={toggleMobileMenu}>☰</button>
      
      {/* Mobile Menu */}
      {/* <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}>
        <Link href="/" className="mobile-menu-item">
          Home
        </Link>
        <Link href="/services" className="mobile-menu-item">
          Services
        </Link>
        <Link href="/about" className="mobile-menu-item">
          About
        </Link>
        <Link href="/testimonials" className="mobile-menu-item">
          Testimonials
        </Link>
        <Link href="/contact" className="mobile-menu-item">
          Contact
        </Link>
        <Link href="/login" className="mobile-menu-item">
          Login
        </Link>
      </div> */}
    </nav>
  );
}
