import React, { useState } from "react";
import { getUser } from "../lib/sql";

export default function User (user) {
  //const parsedUser = JSON.parse(users);
  console.log(user)
  //const username = user.recordset.id.trim();
      return (
         <div>
            <div>
               <h3>Username: {user.user.username}</h3>
               <h3>First Name: {user.user.firstName}</h3>
               <h3>Last Name: {user.user.lastName}</h3>
               <h3>Password: *******</h3>
               <h3>Email: {user.user.email}</h3>
               <h3>Phone: {user.user.phone}</h3>
             </div>
            <p></p>
         </div>
      );
};

export async function getServerSideProps( context ) {
  const res = await getUser(1);
  //const data = await JSON.stringify(res);
  //console.log(res)

  return {
    props: {
      //user:JSON.parse(JSON.stringify(res)),
      user:res
    },
  };
}