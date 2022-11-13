import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../Firebase.init";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-purple-500">
          Welcome To Your Dashboard
        </h1>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-48 bg-base-100 text-base-content">
          <li>
            <Link to="/dashboard">My Appointments</Link>
          </li>
          <li>
            <Link to="/dashboard/myreview">My Reviews</Link>
          </li>
          <li>
            <Link to="/dashboard/myhistory">My History</Link>
          </li>

          {
            admin && <li>
            <Link to="/dashboard/users">All User</Link>
          </li>
          }
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
