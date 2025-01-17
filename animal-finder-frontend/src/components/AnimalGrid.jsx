import React from "react";
import { Row, Col } from "react-bootstrap";
import AnimalCard from "./AnimalCard";

//Grid of animal cards
const AnimalGrid = ({ animals, handleShow }) => {
  if (animals.length === 0) {
    return <p>No animals found.</p>;
  }

  return (
    <Row xs={2} sm={2} md={3} lg={4} className="g-3 mt-2">
      {animals.map((animal) => (
        <Col key={animal.animalId}>
          <AnimalCard animal={animal} handleShow={handleShow} />
        </Col>
      ))}
    </Row>
  );
};

export default AnimalGrid;
