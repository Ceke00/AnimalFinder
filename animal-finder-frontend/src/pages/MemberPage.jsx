import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import AnimalCardsMember from "../components/AnimalCardsMember";
import WelcomeMember from "../components/WelcomeMember";
import UpdateAvatar from "../components/UpdateAvatar";
import AuthService from "../services/auth.service";

function MemberPage() {
  const [avatarUrl, setAvatarUrl] = useState("FaRegSmile");

  useEffect(() => {
    AuthService.getProfile().then((response) => {
      const user = response.data;
      setAvatarUrl(user.avatarUrl || "FaRegSmile");
    });
  }, []);

  const handleAvatarUpdate = (newAvatarUrl) => {
    setAvatarUrl(newAvatarUrl);
  };
  return (
    <Container>
      <WelcomeMember avatarUrl={avatarUrl} />
      <AnimalCardsMember />
      <UpdateAvatar
        currentAvatar={avatarUrl}
        onAvatarUpdate={handleAvatarUpdate}
      />
    </Container>
  );
}

export default MemberPage;
