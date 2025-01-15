import React from "react";
import { Form, Button, Alert } from "react-bootstrap";

const NewCommentForm = ({
  newComment,
  setNewComment,
  handlePostComment,
  errorMessage,
}) => {
  return (
    <Form className="mb-4" onSubmit={handlePostComment} id="formComment">
      <Form.Group className="mb-2" controlId="formComment">
        <Form.Label className="h5">Comment</Form.Label>
        <p>Please, use a respectful tone!</p>
        <Form.Control
          as="textarea"
          rows={2}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </Form.Group>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Button variant="primary" type="submit">
        Submit comment
      </Button>
    </Form>
  );
};

export default NewCommentForm;
