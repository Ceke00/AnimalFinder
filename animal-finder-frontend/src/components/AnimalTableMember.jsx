import React, { useState, useEffect } from "react";
import AnimalService from "../services/animal.service";
// import AnimalCard from "./AnimalCard";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// import placeholderImage from "../images/placeholder.jpg";
// import { Row, Col } from "react-bootstrap";
import { Table } from "react-bootstrap";
import "./AnimalCards.scss";
//import { useNavigate } from "react-router-dom";
import placeholderImage from "../images/placeholder.jpg"

function AnimalTableMember() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
//   const [show, setShow] = useState(false);
//   const [selectedAnimal, setSelectedAnimal] = useState(null);
//   const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await AnimalService.getUserAnimals();
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
      <div>
        <h2>My missing animals</h2>
        {animals.length === 0 ? (
          <p>No animals found.</p>
        ) : (
          <Table responsive="md">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Neighborhood</th>
                <th>Description</th>
                <th>Date missing</th>
              </tr>
            </thead>
            <tbody>
               {animals.map((animal) => (
              <tr>
                <td>
                  {" "}
                  <img
                    variant="top"
                    src={placeholderImage}
                    alt={animal.name}
                    className="thumbnail"
                  />
                </td>
                <td>{animal.name}</td>
                <td>{animal.type}</td>
                <td>{animal.neighborhood}</td>
                <td>{animal.description}</td>
                <td>{formatDate(animal.dateOfDisappearance)}</td>
              </tr>))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default AnimalTableMember;
