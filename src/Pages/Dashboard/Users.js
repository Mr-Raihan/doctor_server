import React from "react";
import { useQuery } from "react-query";
import Loading from "../Share/Loading";
import Row from "./Row";

const Users = () => {
  const { data: users, isLoading,refetch } = useQuery("users", () =>
    fetch("http://localhost:5000/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  

  
  return (
    <div>
      <h2 className="text-2xl">All Users:{users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>SL.</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Remove User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,index) => (
              <Row key={user._id} user={user} index={index} refetch={refetch}></Row>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
