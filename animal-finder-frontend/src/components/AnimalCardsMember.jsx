import React, { useState, useEffect } from "react";
import AnimalService from "../services/animal.service";
import AnimalCard from "./AnimalCard";
import { Alert, Spinner, Button, Modal, Row, Col } from "react-bootstrap";
import "./AnimalCards.scss";
import { useNavigate } from "react-router-dom";

const AnimalCardsMember = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.token) {
          const response = await AnimalService.getUserAnimals();
          const data = response.data.$values;
          setAnimals(data);
        } else {
          setAnimals([]);
        }
      } catch (error) {
        console.error("Error fetching animals:", error);
        setAnimals([]);
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

  const handleDelete = () => {
    if (selectedAnimal) {
      setShowAlert(true);
    }
  };

  const confirmDelete = async () => {
    try {
      await AnimalService.deleteAnimal(selectedAnimal.animalId);
      setAnimals(
        animals.filter((animal) => animal.animalId !== selectedAnimal.animalId)
      );
      setShowAlert(false);
      setShow(false);
    } catch (error) {
      console.error("Error deleting animal:", error);
    }
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
      <h2>Your missing animals</h2>
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
            {showAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Are you sure you want to delete {selectedAnimal.name}?
                </Alert.Heading>
                <p>
                  This action cannot be undone. Please confirm if you want to
                  proceed.
                </p>
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={() => setShowAlert(false)}
                    variant="outline-secondary"
                    className="me-2"
                  >
                    Cancel
                  </Button>
                  <Button onClick={confirmDelete} variant="danger">
                    Delete {selectedAnimal.name}
                  </Button>
                </div>
              </Alert>
            )}

            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                navigate("/updateanimal", {
                  state: { animal: selectedAnimal },
                })
              }
            >
              Update Animal Ad
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AnimalCardsMember;
