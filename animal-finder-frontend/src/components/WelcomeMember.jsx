import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
          Add a new missing animal ad on the{" "}
          <Link to="/addanimal">Add New Animal page</Link>.
        </p>
        <p>
          Below you can see your current ads. Click on the ad to update or
          delete it!
        </p>
        <h2>Comments</h2>
        <p>
          If you go to the <Link to="/comment"> All animals</Link> section you can
          comment on other ads and see if you have comments on your ad.
        </p>
        <p>Good luck finding your missing darlings!</p>
      </div>
    </>
  );
}

export default WelcomeMember;
