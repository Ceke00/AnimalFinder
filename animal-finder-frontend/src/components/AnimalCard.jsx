
// import React from "react";
// import Card from "react-bootstrap/Card";
// import placeholderImage from "../images/placeholder.jpg"; 

// const AnimalCard = ({ animal, handleShow }) => {
//   return (
//     <Card style={{ width: "18rem", margin:"1rem" }} onClick={() => handleShow(animal)}>
//       <Card.Img
//         variant="top"
//         src={placeholderImage}
//         alt={animal.name}
//       />
//       <Card.Body>
//         <Card.Title>{animal.name}</Card.Title>
//         <Card.Text>
//           {animal.type} - {animal.neighborhood}
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// };

// export default AnimalCard;

import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import placeholderImage from "../images/placeholder.jpg"; 
import "./AnimalCard.scss"

const AnimalCard = ({ animal, handleShow }) => {
  return (
    <Button
      className="p-0 border-0 bg-transparent button-focus"
      onClick={() => handleShow(animal)}
    >
      <Card className="h-100 cursor-pointer video-card rounded-4 shadow-sm">
        <Card.Img variant="top" src={placeholderImage} alt= {animal.name} />
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