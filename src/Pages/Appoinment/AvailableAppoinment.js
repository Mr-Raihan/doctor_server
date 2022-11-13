import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import BookingModal from './BookingModal';
import Service from './Service';
import Loading from '../Share/Loading';

const AvailableAppoinment = ({date}) => {
    
    const[treatment,setTreatment]=useState(null);
    const formattedDate=format(date,'PP');
    const {data:services,isLoading, refetch }=useQuery(['available',formattedDate],()=>
        fetch(`http://localhost:5000/available?date=${formattedDate}`)
        .then(res=> res.json())
        )
        if(isLoading){
            return <Loading></Loading>
        }
    
    return (
        <div>
            <p className='text-xl text-secondary text-center'>Available Appoinment On {format(date,'PP')}</p>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services.map(service=><Service
                    key={service._id}
                    service={service}
                    setTreatment={setTreatment}
                    ></Service>)
                }
            </div>
            {treatment&& <BookingModal date={date} treatment={treatment} setTreatment={setTreatment} refetch={refetch}></BookingModal>}
        </div>
    );
};

export default AvailableAppoinment;