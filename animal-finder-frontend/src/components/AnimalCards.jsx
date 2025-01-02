import React, { useState, useEffect } from "react";
import AnimalService from "../services/animal.service";
import AnimalCard from "./AnimalCard";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import placeholderImage from "../images/placeholder.jpg";
import { Row, Col } from "react-bootstrap";
import "./AnimalCards.scss";
import { useNavigate } from "react-router-dom";

const AnimalCards = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await AnimalService.getAnimals();
        const data = response.data.$values;
        setAnimals(data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (animal) => {
    setSelectedAnimal(animal);
    setShow(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div>
      <h1>Missing animals in Skåne</h1>
      {animals.length === 0 ? (
        <p>No animals found.</p>
      ) : (
        // <div className="d-flex flex-wrap">
        //   {animals.map((animal) => (
        //     <AnimalCard
        //       key={animal.animalId}
        //       animal={animal}
        //       handleShow={handleShow}
        //     />
        //   ))}
        // </div>
        //xs={1} md={2} lg={3}
        <Row xs={2} sm={2} md={3} lg={4} className="g-3 mt-2">
          {animals.map((animal) => (
            <Col key={animal.animalId}>
              <AnimalCard animal={animal} handleShow={handleShow} />
            </Col>
          ))}
        </Row>
      )}

      {selectedAnimal && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              The {selectedAnimal.type} {selectedAnimal.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={placeholderImage}
              alt={selectedAnimal.name}
              style={{ maxWidth: "50%", marginBottom: "1rem" }}
            />
            <p>
              <strong>Date of disapperance: </strong>{" "}
              {formatDate(selectedAnimal.dateOfDisappearance)}
            </p>
            <p>
              <strong>Neighborhood:</strong> {selectedAnimal.neighborhood}
            </p>
            <p>{selectedAnimal.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate("/memberpage/comment")}
            >
              Contact Owner
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AnimalCards;
