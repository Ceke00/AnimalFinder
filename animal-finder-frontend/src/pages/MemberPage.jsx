import React from "react";
import { Container } from "react-bootstrap";
import AnimalCardsMember from "../components/AnimalCardsMember";
import WelcomeMember from "../components/WelcomeMember";


function MemberPage() {
  return (
    <Container>
      <WelcomeMember />
    
      <AnimalCardsMember />
    </Container>
  );
}

export default MemberPage;
