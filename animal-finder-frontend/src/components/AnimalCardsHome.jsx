import React, { useState, useEffect } from "react";
import AnimalService from "../services/animal.service";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "./AnimalCards.scss";
import { useNavigate, Link } from "react-router-dom";
import AnimalGrid from "./AnimalGrid";
import AnimalDetails from "./AnimalDetails";

const AnimalCardsHome = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest"); // State for sort order
  const navigate = useNavigate();

  //fetching animals from public endpoint
  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      try {
        const response = await AnimalService.getPublicAnimals();
        const data = response.data.$values;

        // Sort animals by date of disappearance
        const sortedAnimals = data.sort(
          (a, b) =>
            new Date(b.dateOfDisappearance) - new Date(a.dateOfDisappearance)
        );
        setAnimals(sortedAnimals);
      
      } catch (error) {
        console.error("Error fetching animals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  // Handle sorting
  const handleSort = () => {
    const sortedAnimals = [...animals].sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(a.dateOfDisappearance) - new Date(b.dateOfDisappearance)
        );
      } else {
        return (
          new Date(b.dateOfDisappearance) - new Date(a.dateOfDisappearance)
        );
      }
    });
    setAnimals(sortedAnimals);
    setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
  };

  const handleClose = () => setShow(false);
  const handleShow = (animal) => {
    setSelectedAnimal(animal);
    setShow(true);
  };

  //formatting dates
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
      <h2>{animals.length} missing animals in Lund</h2>
      <p>
        Click on an ad for more information! <Link to="/login">Login</Link> to
        create an ad or to comment.
      </p>

      {/* Sort button */}
      <Button variant="secondary" onClick={handleSort}>
        Sort by {sortOrder === "newest" ? "oldest" : "newest"}
      </Button>

      {/* Animal grid */}
      <AnimalGrid animals={animals} handleShow={handleShow} />

      {/* showing animalmodal */}
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
