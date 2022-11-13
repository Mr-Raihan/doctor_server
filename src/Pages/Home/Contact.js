import React from 'react';
import PrimaryButton from '../Share/PrimaryButton';
import bgContact from '../../assets/images/appointment.png'

const Contact = () => {
    return (
      <section>
        <div style={{  background:`url(${bgContact})` }} className='text-center py-16'>
          <div className='my-6'>
            <h1 className="text-primary font-bold">Contact Us</h1>
            <h3 className="text-3xl">Stay Conntected With Us</h3>
          </div>
          <div>
            <input
              type="text"
              placeholder="Email Address"
              className="input input-bordered input-md w-full max-w-xs my-4"
            />
            <br />
            <input
              type="text"
              placeholder="Subject"
              className="input input-bordered input-md w-full max-w-xs "
            />
            <br />
            <textarea className="textarea w-80 h-24 my-4" placeholder="Your Message "></textarea>
            <br />
          </div>
          <PrimaryButton>Submit</PrimaryButton>
        </div>
      </section>
    );
};

export default Contact;    