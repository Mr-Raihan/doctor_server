import React, { useState } from "react";
import chair from "../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const AppoinmentBanner = ({ date, setDate }) => {
  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={chair} className="max-w-sm rounded-lg shadow-2xl" alt="chair" />
          <div>
            <DayPicker mode="single" selected={date} onSelect={setDate} />
            <p>You Have Selected Day {format(date, "PP")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppoinmentBanner;
