import React, { useState, useEffect } from "react";
import AnimalService from "../services/animal.service";
import AnimalCard from "./AnimalCard";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Row, Col } from "react-bootstrap";
import "./AnimalCards.scss";
import { useNavigate, Link } from "react-router-dom";

const AnimalCardsHome = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      try {
        const response = await AnimalService.getPublicAnimals();
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
      <h2>Missing animals in Lund</h2>
      <p>
        Click on an ad for more information! <Link to="/login">Login</Link> to
        create an ad or to comment.
      </p>
      {animals.length === 0 ? (
        <p>No animals found.</p>
      ) : (
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
              src={`https://localhost:7221${selectedAnimal.imageUrl}`}
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
            <p>
              <strong>Description:</strong> {selectedAnimal.description}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => navigate("/comment")}>
         
              Contact Owner
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AnimalCardsHome;
