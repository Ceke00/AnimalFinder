import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AnimalService from "../services/animal.service";


function MemberPageUpdateAnimal() {
  const location = useLocation();
  const navigate = useNavigate();

  //using state for animal data
  const { animal } = location.state || {};
  const [type, setType] = useState(animal?.type || "");
  const [name, setName] = useState(animal?.name || "");
  const [description, setDescription] = useState(animal?.description || "");
  const [neighborhood, setNeighborhood] = useState(animal?.neighborhood || "");
  const [dateOfDisappearance, setDateOfDisappearance] = useState(
    animal?.dateOfDisappearance.split("T")[0] || ""
  );

  const [imageFile, setImageFile] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [errors, setErrors] = useState({});


  const handleUpdate = async (e) => {
    e.preventDefault();
     
    setErrors(null);
    setErrors({});

    if (
      !type ||
      !name ||
      !description ||
      !neighborhood ||
      !dateOfDisappearance
    ) {
      setErrors({
        Type: !type ? "Type is required" : "",
        Name: !name ? "Name is required" : "",
        Description: !description ? "Description is required" : "",
        Neighborhood: !neighborhood ? "Neighborhood is required" : "",
        DateOfDisappearance: !dateOfDisappearance
          ? "Date of Disappearance is required"
          : "",
      });
     
      return;
    }

    //Appending formdata
    const formData = new FormData();
    formData.append("Type", type);
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Neighborhood", neighborhood);
    formData.append("DateOfDisappearance", dateOfDisappearance);
    //handling case if new image is uploaded or not
    if (imageFile) {
      formData.append("imageFile", imageFile);
    } else {
      formData.append("ImageUrl", animal.imageUrl);
    }

    try {
      await AnimalService.updateAnimal(animal.animalId, formData);
      navigate("/memberpage");
    } catch (error) {
      console.error("Error updating animal:", error);
      if (error.response?.data) {
        const errorMessages = error.response.data.errors;
        const newErrors = {};
        for (const key in errorMessages) {
          if (key !== "$id") {
            newErrors[key] = errorMessages[key].join(" ");
          }
        }
        setErrors(newErrors);
      } else {
        setErrors({
          general: Array.isArray(error.response.data)
            ? error.response.data.join(" ")
            : error.response.data.title || "Failed to update animal.",
        });
      }
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
              required
            />
            {errors.Type && <p className="text-danger">{errors.Type}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAnimalName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.Name && <p className="text-danger">{errors.Name}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAnimalDescription">
            <Form.Label>Description</Form.Label>
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
            <Form.Label>Neighborhood</Form.Label>
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
          <Form.Group
            className="mb-3"
            controlId="formAnimalDateOfDisappearance"
          >
            <Form.Label>Date of Disappearance</Form.Label>
            <Form.Control
              type="date"
              value={dateOfDisappearance}
              onChange={(e) => setDateOfDisappearance(e.target.value)}
              required
            />
            {errors.DateOfDisappearance && (
              <p className="text-danger">{errors.DateOfDisappearance}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAnimalImageUrl">
            <Form.Label>Current Image</Form.Label>
            {animal.imageUrl && (
              <div>
                <img
                  src={`https://localhost:7221${animal.imageUrl}`}
                  alt="Current Animal"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
            )}
            <Button
              variant="outline-secondary"
              onClick={() => setShowImageUpload(!showImageUpload)}
              className="mt-2"
            >
              Change Image
            </Button>
            {showImageUpload && (
              <>
                <Form.Label>New Image (jpeg/jpg/webp/png - max 1MB)</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                {errors.imageFile && (
                  <p className="text-danger">{errors.imageFile}</p>
                )}
              </>
            )}
          </Form.Group>
          <Button variant="outline-secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="ms-2">
            Update
          </Button>
          {errors.general && <p className="text-danger">{errors.general}</p>}
        </Form>
      ) : (
        <p>No animal data available.</p>
      )}
    </div>
  );
}

export default MemberPageUpdateAnimal;
