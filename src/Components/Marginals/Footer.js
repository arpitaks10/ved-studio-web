import React from "react";
import "./Footer.css"

const Footer = () => {
  const contactInfo = [
    "email",
    "phone number",
    "address",
    "other" 
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
        </div>
      </div>
    </div>
  )
}

export default Footer;