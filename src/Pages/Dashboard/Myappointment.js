import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase.init";

const Myappointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/bookings?patient=${user.email}`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then((res) => {
          console.log('res',res);
          if(res.status===401 || res.status===403){

          }
          return res.json()
        })
        .then((data) => {
          setAppointments(data)
        });
    }
  }, [user]);
  return (
    <div>
      <h1>My Appointment : {appointments.length}</h1>

      <div class="overflow-x-auto">
  <table class="table w-full">
    {/* <!-- head --> */}
    <thead>
      <tr>
        <th>SL.</th>
        <th>Name</th>
        <th>Date</th>
        <th>Slot</th>
        <th>Treatment</th>
      </tr>
    </thead>
    <tbody>
      
      {
        appointments.map((a,index)=><tr>
            <td>{index+1}</td>
            <td>{a.patientName}</td>
            <td>{a.date}</td>
            <td>{a.slot}</td>
            <td>{a.treatment}</td>
          </tr>)
      }
      
     
    </tbody>
  </table>
</div>
    </div>
  );
};

export default Myappointment;
