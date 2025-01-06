import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AnimalService from "../services/animal.service";

function MemberPageUpdateAnimal() {
  const location = useLocation();
  const navigate = useNavigate();
  //getting animal object
  const { animal } = location.state || {};
  const [type, setType] = useState(animal?.type || "");
  const [name, setName] = useState(animal?.name || "");
  const [description, setDescription] = useState(animal?.description || "");
  const [neighborhood, setNeighborhood] = useState(animal?.neighborhood || "");
  const [dateOfDisappearance, setDateOfDisappearance] = useState(
    animal?.dateOfDisappearance.split("T")[0] || ""
  );
  const [imageUrl, setImageUrl] = useState(animal?.imageUrl || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await AnimalService.updateAnimal(
        animal.animalId,
        type,
        name,
        description,
        neighborhood,
        dateOfDisappearance,
        imageUrl
      );
      navigate("/memberpage");
    } catch (error) {
      console.error("Error updating animal:", error);
    }
  };

  const handleCancel = () => {
    navigate("/memberpage");
  };

  return (
    <div>
      <h1>Update Animal</h1>
      {animal ? (
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3" controlId="formAnimalType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAnimalName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAnimalDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAnimalNeighborhood">
            <Form.Label>Neighborhood</Form.Label>
            <Form.Control
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formAnimalDateOfDisappearance"
          >
            <Form.Label>Date of Disappearance</Form.Label>
            <Form.Control
              type="date"
              value={dateOfDisappearance}
              onChange={(e) => setDateOfDisappearance(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAnimalImageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Form.Group>
          <Button variant="outline-secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="ms-2">
            Update
          </Button>
        </Form>
      ) : (
        <p>No animal data available.</p>
      )}
    </div>
  );
}

export default MemberPageUpdateAnimal;
