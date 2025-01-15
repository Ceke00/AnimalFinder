import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AnimalService from "../services/animal.service";

function MemberPageAddAnimal() {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [dateOfDisappearance, setDateOfDisappearance] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleAddAnimal = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!imageFile) {
      setErrors({ ImageFile: "Please select an image file" });
      return;
    }

    const formData = new FormData();
    formData.append("Type", type);
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Neighborhood", neighborhood);
    formData.append("DateOfDisappearance", dateOfDisappearance);
    formData.append("imageFile", imageFile);

    // debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      await AnimalService.postAnimal(formData);
      navigate("/memberpage");
    } catch (error) {
      console.log("Full error response:", error.response);
      if (error.response?.data) {
        const errorMessages = error.response.data.errors;
        const newErrors = {};
        for (const key in errorMessages) {
          if (key !== "$id") {
            newErrors[key] = errorMessages[key].join(" ");
          }
        }
        console.log("New errors:", newErrors);
        setErrors(newErrors);
      } else {
        setErrors({
          general: Array.isArray(error.response.data)
            ? error.response.data.join(" ")
            : error.response.data.title || "Failed to add animal.",
        });
      }
    }
  };

  const handleCancel = () => {
    navigate("/memberpage");
  };

  return (
    <div>
      <h1>Add New Animal</h1>
      <p>
        Fill in the form to create a missing animal ad! You can update the
        information whenever you want.
      </p>
      <Form onSubmit={handleAddAnimal}>
        <Form.Group className="mb-3" controlId="formAnimalType">
          <Form.Label>Type of animal</Form.Label>
          <Form.Control
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
          {errors.Type && <p className="text-danger">{errors.Type}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAnimalName">
          <Form.Label>Name of animal</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.Name && <p className="text-danger">{errors.Name}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAnimalDescription">
          <Form.Label>Description of animal (max 1000 char)</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.Description && (
            <p className="text-danger">{errors.Description}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAnimalNeighborhood">
          <Form.Label>Neighborhood in Lund</Form.Label>
          <Form.Control
            type="text"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            required
          />
          {errors.Neighborhood && (
            <p className="text-danger">{errors.Neighborhood}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAnimalDateOfDisappearance">
          <Form.Label>Date of disappearance</Form.Label>
          <Form.Control
            type="date"
            value={dateOfDisappearance}
            onChange={(e) => setDateOfDisappearance(e.target.value)}
            required
          />
        </Form.Group>
        {errors.DateOfDisappearance && (
          <p className="text-danger">{errors.DateOfDisappearance}</p>
        )}
        <Form.Group className="mb-3" controlId="formAnimalImageUrl">
          <Form.Label>Image of animal (jpeg/jpg/webp/png - max 1MB)</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
          {errors.imageFile && (
            <p className="text-danger">{errors.imageFile}</p>
          )}
        </Form.Group>
        <Button
          variant="outline-secondary"
          onClick={handleCancel}
          className="me-2"
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Add Animal
        </Button>

        {errors.general && <p className="text-danger">{errors.general}</p>}
      </Form>
    </div>
  );
}

export default MemberPageAddAnimal;
