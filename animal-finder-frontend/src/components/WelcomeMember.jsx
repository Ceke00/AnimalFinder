import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

function WelcomeMember() {
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
   <>
      <h1>
        Welcome {firstName} {lastName}
      </h1>
      <div className="line-length">
        <p>
          Here you can see your ads with missing animals at the moment. You can
          add more missing animals and update or delete existing ads.
        </p>
        <p>
          If you go to the Comment section you can see if you have comments on
          your ad.
        </p>
        <p>Good look finding your missing darlings!</p>
      </div>
   </>
  );
}

export default WelcomeMember;
