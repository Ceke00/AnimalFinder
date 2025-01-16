import React, { forwardRef } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const NewCommentForm = forwardRef(
  ({ newComment, setNewComment, handlePostComment, errorMessage }, ref) => {
    return (
      <Form className="mb-4" onSubmit={handlePostComment}>
        <Form.Group className="mb-2" controlId="formComment">
          <Form.Label className="h5">Comment</Form.Label>
          <p>Please, use a respectful tone!</p>
          <Form.Control
            as="textarea"
            ref={ref}
            className="form-control"
            rows={2}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            aria-describedby="newCommentError"
          />
        </Form.Group>
        {errorMessage && (
          <Alert variant="danger" role="alert" aria-live="assertive">
            {errorMessage}
          </Alert>
        )}
        <Button variant="primary" type="submit">
          Submit comment
        </Button>
      </Form>
    );
  }
);

export default NewCommentForm;
