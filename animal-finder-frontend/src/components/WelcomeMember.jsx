

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import { avatars } from "../avatars";


function WelcomeMember({ avatarUrl }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
 

  useEffect(() => {
    AuthService.getProfile().then((response) => {
      const user = response.data;
      setFirstName(user.firstName);
      setLastName(user.lastName);
    
    });
  }, []);

    const currentAvatar = avatars.find((avatar) => avatar.url === avatarUrl);

  return (
    <>
      <h1 className="d-flex align-items-center line-length">
        Welcome {firstName} {lastName}{" "}
        <span className="ms-2" aria-hidden="true">
          {currentAvatar.icon(40)}
        </span>
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
          If you go to the <Link to="/comment"> All animals</Link> section you
          can comment on other ads and see if you have comments on your ad.
        </p>

        <p>Good luck finding your missing darlings!</p>
      </div>
    </>
  );
}

export default WelcomeMember;
