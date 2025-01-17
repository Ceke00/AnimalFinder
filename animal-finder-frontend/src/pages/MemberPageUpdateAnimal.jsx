import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AnimalService from "../services/animal.service";

//Page for updating animal ad
function MemberPageUpdateAnimal() {
  const location = useLocation();
  const navigate = useNavigate();

  //handling of animal data
  const { animal } = location.state || {};

  //Setting animal data
  const [type, setType] = useState(animal?.type || "");
  const [name, setName] = useState(animal?.name || "");
  const [description, setDescription] = useState(animal?.description || "");
  const [neighborhood, setNeighborhood] = useState(animal?.neighborhood || "");
  const [dateOfDisappearance, setDateOfDisappearance] = useState(
    animal?.dateOfDisappearance.split("T")[0] || ""
  );
  const [imageFile, setImageFile] = useState(null);

  const [showImageUpload, setShowImageUpload] = useState(false);

  //setting errors
  const [errors, setErrors] = useState({});

  //Creating refs in form
  const typeRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const neighborhoodRef = useRef(null);
  const dateOfDisappearanceRef = useRef(null);
  const imageFileRef = useRef(null);

  //Sets focus on field with error both visually and for keyboard
  const setFocusOnError = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      const input = ref.current.querySelector("input");
      if (input) {
        input.focus();
      }
    }
  };

  //Sets focus on first field with error when error occurs
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setTimeout(() => {
        if (errors.Type) {
          setFocusOnError(typeRef);
        } else if (errors.Name) {
          setFocusOnError(nameRef);
        } else if (errors.Description) {
          setFocusOnError(descriptionRef);
        } else if (errors.Neighborhood) {
          setFocusOnError(neighborhoodRef);
        } else if (errors.DateOfDisappearance) {
          setFocusOnError(dateOfDisappearanceRef);
        } else if (errors.ImageFile) {
          setFocusOnError(imageFileRef);
        }
      }, 100);
    }
  }, [errors]);

  //Handle update of animal ad. Validation of all fields.
  const handleUpdate = async (e) => {
    e.preventDefault();

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

    //Adding data to FormData
    const formData = new FormData();
    formData.append("Type", type);
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Neighborhood", neighborhood);
    formData.append("DateOfDisappearance", dateOfDisappearance);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    } else {
      formData.append("ImageUrl", animal.imageUrl);
    }

    //Trying to update formData
    try {
      await AnimalService.updateAnimal(animal.animalId, formData);
      navigate("/memberpage");
      //error-handling from backend
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
        <Form onSubmit={handleUpdate} noValidate>
          <Form.Group className="mb-3" controlId="formAnimalType" ref={typeRef}>
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              aria-describedby="typeError"
              aria-invalid={errors.Type ? "true" : "false"}
            />
            {errors.Type && (
              <p id="typeError" className="text-danger" role="alert">
                {errors.Type}
              </p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAnimalName" ref={nameRef}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-describedby="nameError"
              aria-invalid={errors.Name ? "true" : "false"}
            />
            {errors.Name && (
              <p id="nameError" className="text-danger" role="alert">
                {errors.Name}
              </p>
            )}
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formAnimalDescription"
            ref={descriptionRef}
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              aria-describedby="descriptionError"
              aria-invalid={errors.Description ? "true" : "false"}
            />
            {errors.Description && (
              <p id="descriptionError" className="text-danger" role="alert">
                {errors.Description}
              </p>
            )}
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formAnimalNeighborhood"
            ref={neighborhoodRef}
          >
            <Form.Label>Neighborhood</Form.Label>
            <Form.Control
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              required
              aria-describedby="neighborhoodError"
              aria-invalid={errors.Neighborhood ? "true" : "false"}
            />
            {errors.Neighborhood && (
              <p id="neighborhoodError" className="text-danger" role="alert">
                {errors.Neighborhood}
              </p>
            )}
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formAnimalDateOfDisappearance"
            ref={dateOfDisappearanceRef}
          >
            <Form.Label>Date of Disappearance</Form.Label>
            <Form.Control
              type="date"
              value={dateOfDisappearance}
              onChange={(e) => setDateOfDisappearance(e.target.value)}
              required
              aria-describedby="dateOfDisappearanceError"
              aria-invalid={errors.DateOfDisappearance ? "true" : "false"}
            />
            {errors.DateOfDisappearance && (
              <p
                id="dateOfDisappearanceError"
                className="text-danger"
                role="alert"
              >
                {errors.DateOfDisappearance}
              </p>
            )}
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formAnimalImageUrl"
            ref={imageFileRef}
          >
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
              className="my-2 me-2"
            >
              Change Image
            </Button>
            {showImageUpload && (
              <>
                <Form.Label>New Image (jpeg/jpg/webp/png - max 1MB)</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  aria-describedby="imageFileError"
                  aria-invalid={errors.imageFile ? "true" : "false"}
                />
                {errors.imageFile && (
                  <p id="imageFileError" className="text-danger" role="alert">
                    {errors.imageFile}
                  </p>
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
          {errors.general && (
            <p className="text-danger" role="alert">
              {errors.general}
            </p>
          )}
        </Form>
      ) : (
        <p>No animal data available.</p>
      )}
    </div>
  );
}

export default MemberPageUpdateAnimal;
