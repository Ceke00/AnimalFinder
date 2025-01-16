import React, { useState, useRef, useEffect } from "react";
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

  const typeRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const neighborhoodRef = useRef(null);
  const dateOfDisappearanceRef = useRef(null);
  const imageFileRef = useRef(null);

  // Function to handle both visual and keyboard focus
  const setFocusOnError = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      // Set focus on the input element
      const input = ref.current.querySelector("input");
      if (input) {
        input.focus();
      }
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      // Short timeout to ensure DOM has updated
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

  const handleAddAnimal = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate all required fields
    if (
      !type ||
      !name ||
      !description ||
      !neighborhood ||
      !dateOfDisappearance ||
      !imageFile
    ) {
      setErrors({
        Type: !type ? "Type is required" : "",
        Name: !name ? "Name is required" : "",
        Description: !description ? "Description is required" : "",
        Neighborhood: !neighborhood ? "Neighborhood is required" : "",
        DateOfDisappearance: !dateOfDisappearance
          ? "Date of Disappearance is required"
          : "",
        ImageFile: !imageFile ? "Please select an image file" : "",
      });
      return;
    }

    const formData = new FormData();
    formData.append("Type", type);
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Neighborhood", neighborhood);
    formData.append("DateOfDisappearance", dateOfDisappearance);
    formData.append("imageFile", imageFile);

    try {
      await AnimalService.postAnimal(formData);
      navigate("/memberpage");
    } catch (error) {
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
      <Form onSubmit={handleAddAnimal} noValidate>
        <Form.Group className="mb-3" controlId="formAnimalType" ref={typeRef}>
          <Form.Label>Type of animal</Form.Label>
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
          <Form.Label>Name of animal</Form.Label>
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
          <Form.Label>Description of animal (max 1000 char)</Form.Label>
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
          <Form.Label>Neighborhood in Lund</Form.Label>
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
          <Form.Label>Date of disappearance</Form.Label>
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
          <Form.Label>Image of animal (jpeg/jpg/webp/png - max 1MB)</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
            aria-describedby="imageFileError"
            aria-invalid={errors.ImageFile ? "true" : "false"}
          />
          {errors.imageFile && (
            <p id="imageFileError" className="text-danger" role="alert">
              {errors.imageFile}
            </p>
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

        {errors.general && (
          <p className="text-danger" role="alert">
            {errors.general}
          </p>
        )}
      </Form>
    </div>
  );
}

export default MemberPageAddAnimal;