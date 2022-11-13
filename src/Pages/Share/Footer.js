import React from 'react';
import bgFooter from '../../assets/images/footer.png';

const Footer = () => {
    return (
      <footer
        style={{
          background: `url(${bgFooter})`,
          backgroundsize: "cover",
        }}
        className=" p-10 pt-32"
      >
        <div className="footer justify-between">
          <div>
            <span className="footer-title">Services</span>
            <a className="link link-hover">Emerngency Checkup</a>
            <a className="link link-hover">Monthly Checkup</a>
            <a className="link link-hover">Weekly Checkup</a>
            <a className="link link-hover">Deep Checkup</a>
          </div>
          <div>
            <span className="footer-title">Our Heath</span>
            <a className="link link-hover">Floride Treatment</a>
            <a className="link link-hover">Cavity Felling</a>
            <a className="link link-hover">Treeth Whitenning</a>
          </div>
          <div>
            <span className="footer-title">Our Address</span>
            <a className="link link-hover">NewYouk -1010-USA</a>
          </div>
        </div>
        
          <div className='text-center mt-16'>
            <p>Copyright ©2022 - All right reserved by ACME Industries Ltd</p>
          </div>
        
      </footer>
    );
};

export default Footer;