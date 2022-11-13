import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../assets/icons/clock.svg'
import marker from '../../assets/icons/marker.svg'
import phone from '../../assets/icons/phone.svg'

const Info = () => {
    return (
        <div className=' grid grid-cols-1 lg:grid-cols-3 gap-3'>
            <InfoCard bgClass='bg-gradient-to-r from-primary to-secondary ...' cardTile="Openning Hours" img={clock}></InfoCard>
            <InfoCard bgClass='bg-neutral' cardTile="Visit Our Location" img={marker}></InfoCard>
            <InfoCard bgClass='bg-gradient-to-r from-primary to-secondary ...' cardTile="Contact Us Now" img={phone}></InfoCard>
        </div>
    );
};

export default Info;