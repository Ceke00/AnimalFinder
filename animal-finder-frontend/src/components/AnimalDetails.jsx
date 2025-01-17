import React from "react";

//Showing details of a specific animal
const AnimalDetails = ({ animal, formatDate }) => {
  return (
    <>
      <img
        src={`https://localhost:7221${animal.imageUrl}`}
        alt={animal.name}
        style={{ maxWidth: "50%", marginBottom: "1rem" }}
      />
      <p>
        <strong>Date of disappearance: </strong>
        {formatDate(animal.dateOfDisappearance)}
      </p>
      <p>
        <strong>Neighborhood:</strong> {animal.neighborhood}
      </p>
      <p>
        <strong>Description:</strong> {animal.description}
      </p>
    </>
  );
};

export default AnimalDetails;
