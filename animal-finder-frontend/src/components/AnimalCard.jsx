import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./AnimalCard.scss"

const AnimalCard = ({ animal, handleShow }) => {
  const imageUrl = `https://localhost:7221${animal.imageUrl}`;
  return (
    <Button
      className="p-0 border-0 bg-transparent button-focus"
      onClick={() => handleShow(animal)}
    >
      <Card className="h-100 cursor-pointer video-card rounded-4 shadow-sm">
        <Card.Img variant="top" src={imageUrl} alt={animal.name} />
        <Card.Body>
          <Card.Title>
            The {animal.type} {animal.name}
          </Card.Title>
          <Card.Text>From {animal.neighborhood}</Card.Text>
        </Card.Body>
      </Card>
    </Button>
  );
};

export default AnimalCard;