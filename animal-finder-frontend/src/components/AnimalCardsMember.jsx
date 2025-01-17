import React, { useState, useEffect } from "react";
import AnimalService from "../services/animal.service";
import { Alert, Spinner, Button, Modal } from "react-bootstrap";
import "./AnimalCards.scss";
import { useNavigate } from "react-router-dom";
import AnimalGrid from "./AnimalGrid";
import AnimalDetails from "./AnimalDetails";

const AnimalCardsMember = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  //Fetching animals for specific user
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

  //Showing delete alert
  const handleDelete = () => {
    if (selectedAnimal) {
      setShowAlert(true);
    }
  };

  //Deleting animal
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

  //Formating date
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

      {/* Animal grid */}
      <AnimalGrid animals={animals} handleShow={handleShow} />

      {/* Modal for a users specific animal */}
      {selectedAnimal && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              The {selectedAnimal.type} {selectedAnimal.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AnimalDetails animal={selectedAnimal} formatDate={formatDate} />
          </Modal.Body>
          <Modal.Footer>
            {/* Delete alert */}
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

            {/* Link to update page */}
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
