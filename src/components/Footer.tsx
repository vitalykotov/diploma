import React from "react";

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-cols">
        <div>
          <h4>COMPANY</h4>
          <ul>
            <li><a href="#">About Last.fm</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Jobs</a></li>
          </ul>
        </div>
        <div>
          <h4>HELP</h4>
          <ul>
            <li><a href="#">Track My Music</a></li>
            <li><a href="#">Community Support</a></li>
            <li><a href="#">Community Guidelines</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
        <div>
          <h4>GOODIES</h4>
          <ul>
            <li><a href="#">Download Scrobbler</a></li>
            <li><a href="#">Developer API</a></li>
            <li><a href="#">Free Music Downloads</a></li>
            <li><a href="#">Merchandise</a></li>
          </ul>
        </div>
        <div>
          <h4>ACCOUNT</h4>
          <ul>
            <li><a href="#">Inbox</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Last.fm Pro</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </div>
        <div>
          <h4>FOLLOW US</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-langs">
          English Deutsch Español Français Italiano Polski Português Русский ...
        </div>
        <div className="footer-time">
          Time zone: Europe/Moscow
        </div>
      </div>
      <div className="footer-copy">
        © 2025 Last.fm
      </div>
    </div>
  </footer>
);

export default Footer;
