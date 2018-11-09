import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="copyright">
        Copyright &copy; {new Date().getFullYear()} Harpnet
      </h3>
    </footer>
  )
}

export default Footer;
