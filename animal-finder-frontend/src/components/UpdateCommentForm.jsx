import React from "react";
import { Form, Button, Alert } from "react-bootstrap";

const UpdateCommentForm = ({
  selectedAnimal,
  confirmUpdate,
  updateComment,
  setUpdateComment,
  errorMessage,
  setShowAlertUpdate,
}) => {
  return (
    <Alert
      className="mt-3"
      variant="warning"
      onClose={() => setShowAlertUpdate(false)}
      dismissible
    >
      <Alert.Heading>
        Update your comment on {selectedAnimal.name}?
      </Alert.Heading>
      <Form className="mb-4" onSubmit={confirmUpdate}>
        <Form.Group className="mb-2" controlId="formUpdateComment">
          <Form.Label className="h5">Your comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={updateComment}
            onChange={(e) => setUpdateComment(e.target.value)}
          />
        </Form.Group>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => setShowAlertUpdate(false)}
            variant="outline-secondary"
            className="me-2"
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit updated comment
          </Button>
        </div>
      </Form>
    </Alert>
  );
};

export default UpdateCommentForm;
