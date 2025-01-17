import React from "react";
import { Alert, Button } from "react-bootstrap";

//Delete alert
const DeleteCommentAlert = ({
  selectedAnimal,
  confirmDelete,
  setShowAlertDelete,
}) => {
  return (
    <Alert
      className="mt-3"
      variant="danger"
      onClose={() => setShowAlertDelete(false)}
      dismissible
    >
      <Alert.Heading>
        Are you sure you want to delete this comment on {selectedAnimal.name}?
      </Alert.Heading>
      <p>This action cannot be undone.</p>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => setShowAlertDelete(false)}
          variant="outline-secondary"
          className="me-2"
        >
          Cancel
        </Button>
        <Button onClick={confirmDelete} variant="danger">
          Delete comment
        </Button>
      </div>
    </Alert>
  );
};

export default DeleteCommentAlert;
