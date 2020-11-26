import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className = "navbar">
      <div className = "navbar-icon navbar-boldlink">
        Ved.studio
      </div>
      <div className = "navbar-links">
        <Link to = "/" className = "navbar-link">how it works</Link>
        <Link to = "/" className = "navbar-link">why us?</Link>
        <Link to = "/login" className = "navbar-boldlink">login</Link>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Navbar;