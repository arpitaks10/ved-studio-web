import React from "react";
import { Link } from 'react-router-dom';
import "../../Style/Footer.css";

const Footer = () => {
  const contactInfo = [
    "email",
    "phone number",
    "address"
  ]
  return (
    <div className = "footer">
      <div className = "footer-text">Ved.studio</div>
      <div className = "footer-contact">
        <div className = "footer-contact-head"> CONTACT US </div>
        <div className = "footer-contact-info">
          {
            contactInfo.map ((item) => {
            return <p>{item}</p>
            })
          }
          <Link to='/faq' style={{ color:'var(--mainWhite)', textDecoration:'none' }}>FAQ</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer;