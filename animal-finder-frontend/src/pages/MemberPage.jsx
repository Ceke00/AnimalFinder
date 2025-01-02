import React, { useState, useEffect } from "react";

function MemberPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      console.log("Raw stored user data:", storedUser);

      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log("Parsed user object:", user);

        if (user) {
          setFirstName(user.firstName);
          setLastName(user.lastName);

          //Console
          console.log("Set username to:", user.username);
          console.log("Set lastname to: " + user.lastName);
          console.log("Set firstname to: " + user.firstName);
        } else {
          console.warn("No username found in user object");
        }
      } else {
        console.warn("No user data found in localStorage");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  }, []);

  return (
    <div>
      <h1>
        Welcome to your page {firstName} {lastName}
      </h1>
    </div>
  );
}

export default MemberPage;
