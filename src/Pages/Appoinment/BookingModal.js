import React from "react";
import { format } from 'date-fns';
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase.init";
import { toast} from 'react-toastify';

const BookingModal = ({date,treatment,setTreatment,refetch}) => {
  const {_id,name,slots}=treatment;
  const formatedDate=format(date, 'PP');
  const handleBooking= event =>{
    event.preventDefault();
    const slot=event.target.slot.value;
    const bookings={
        treatmentId: _id,
        treatment: name,
        date:formatedDate,
        slot,
        patient:user.email,
        patientName:user.displayName,
        phone:event.target.phone.value,
    }
    fetch('http://localhost:5000/bookings',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(bookings)
    })
      .then(res=>res.json())
      .then(data=>{
        //close the modal
        console.log(data);
        if(data.success){
           toast(`Appointment Date Is ${formatedDate} at ${slot}`);
        }

        else{
           toast.error(`Already You Have Appointment is ${data.booking?.date} at ${data.booking?.slot} `);
        }
        
        setTreatment(null);
        refetch();
      })

    
  }
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
        <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="font-bold text-lg">
            Booking For : {name}
          </h3>
          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-3 justify-items-center mt-3">
          <input type="text" disabled value={format(date,'PP')} className="input input-bordered w-full max-w-xs" />
          <select name="slot" className="select select-bordered w-full max-w-xs">
            {
              slots.map((slot,index)=><option key={index}  value={slot}>{slot}</option>)
            }
          </select>
          <input type="text" name="name"  disabled  value={user?.displayName} className="input input-bordered w-full max-w-xs" />
          <input type="email" name="email" disabled value={user?.email} className="input input-bordered w-full max-w-xs" />
          <input type="phone" name="phone" placeholder="Your Phone" className="input input-bordered w-full max-w-xs" />
          <input type="submit" className="btn btn-secondary w-full max-w-xs"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
