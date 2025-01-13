import React, { useState, useEffect, useRef } from "react";
import AnimalService from "../services/animal.service";
import CommentService from "../services/comment.service";
import AnimalCard from "./AnimalCard";
import {
  Modal,
  Button,
  Spinner,
  Row,
  Col,
  Container,
  Form,
  Alert,
} from "react-bootstrap";
import "./AnimalCards.scss";
import { CiFaceSmile } from "react-icons/ci";
import { IconContext } from "react-icons";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AnimalCardsComment = () => {
  // Managing animals
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Managing modal visibility and selected animal
  const [show, setShow] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showComment, setShowComment] = useState(false);

  // Managing comments
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [updateComment, setUpdateComment] = useState("");

  // Managing alerts and user feedback
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const [showAlertUpdate, setShowAlertUpdate] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  //State if scroll or not
  const [shouldScroll, setShouldScroll] = useState(false);
  // Ref for scrolling to last comment
  const lastCommentRef = useRef(null);
  // Ref for scrolling back to form
  const commentFormRef = useRef(null);

  // Fetching animals and user data
  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      try {
        const response = await AnimalService.getAnimals();
        setAnimals(response.data.$values);
      } catch (error) {
        console.error("Error fetching animals:", error);
      } finally {
        setLoading(false);
      }
    };

    // Get user data from localStorage
    const initializeUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUserId(user.userId);
      }
    };

    fetchAnimals();
    initializeUser();
  }, []);

  // Scrolling to last comment when comments array changes
  useEffect(() => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [shouldScroll]);

  //scrolling back to form
  const scrollToForm = () => {
    commentFormRef.current.scrollIntoView({ behavior: "smooth" });
  };

  //Closing modal and resetting states
  const handleClose = () => {
    setShow(false);
    setShowAlertDelete(false);
    setShowAlertUpdate(false);
    setShowComment(false);
    setErrorMessage("");
  };

  // Showing animal details and fetching comments
  const handleShow = async (animal) => {
    setSelectedAnimal(animal);
    setShow(true);
    setLoading(true);
    try {
      const response = await CommentService.getCommentsForAnimal(
        animal.animalId
      );
      console.log("Animal data:", selectedAnimal);
      console.log("Comments data:", response.data.$values);
      setComments(response.data.$values);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Posting new comments
  const handlePostComment = async (event) => {
    event.preventDefault();
    setShouldScroll(false);
    if (!newComment.trim()) {
      setErrorMessage("Comment cannot be empty.");
      return;
    }
    try {
      await CommentService.postComment(selectedAnimal.animalId, newComment);
      // Fetch fresh comments
      const response = await CommentService.getCommentsForAnimal(
        selectedAnimal.animalId
      );

      setShouldScroll(true);
      setComments(response.data.$values);
      setNewComment("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Show alert for comment update
  const handleUpdateComment = (comment) => {
    setSelectedComment(comment);
    setUpdateComment(comment.content);
    setShowAlertDelete(false);
    setShowAlertUpdate(true);
  };

  // Confirming comment update
  const confirmUpdate = async (event) => {
    event.preventDefault();
    if (!updateComment.trim()) {
      setErrorMessage("Comment cannot be empty.");
      return;
    }
    try {
      await CommentService.updateComment(
        selectedAnimal.animalId,
        selectedComment.commentId,
        updateComment
      );

      // Fetch fresh comments
      const response = await CommentService.getCommentsForAnimal(
        selectedAnimal.animalId
      );
      setComments(response.data.$values);
      setShowAlertUpdate(false);
      setSelectedComment(null);
      setUpdateComment("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  // Show comment delete alert
  const handleDeleteComment = (comment) => {
    setSelectedComment(comment);
    setShowAlertUpdate(false);
    setShowAlertDelete(true);
  };

  // Confirming comment deletion
  const confirmDelete = async () => {
    try {
      await CommentService.deleteComment(
        selectedAnimal.animalId,
        selectedComment.commentId
      );
      setComments(
        comments.filter(
          (comment) => comment.commentId !== selectedComment.commentId
        )
      );
      setShowAlertDelete(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Formatting dates
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  //Formatting date + time
  const formatDateTime = (dateString) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Loading spinner
  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div>
      <h1>Comment on missing animals in Lund</h1>
      <p>Have you seen any of these animals? Click on an ad to comment!</p>

      {/* Display animal cards */}
      {animals.length === 0 ? (
        <p>No animals found.</p>
      ) : (
        <Row xs={2} sm={2} md={3} lg={4} className="g-3 mt-2">
          {animals.map((animal) => (
            <Col key={animal.animalId}>
              <AnimalCard animal={animal} handleShow={handleShow} />
            </Col>
          ))}
        </Row>
      )}

      {/* Modal for displaying animal details and comments */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            The {selectedAnimal?.type} {selectedAnimal?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAnimal && (
            <>
              {/* Animal details section */}
              <img
                src={`https://localhost:7221${selectedAnimal.imageUrl}`}
                alt={selectedAnimal.name}
                style={{ maxWidth: "50%", marginBottom: "1rem" }}
              />
              <p>
                <strong>Date of disapperance: </strong>
                {formatDate(selectedAnimal.dateOfDisappearance)}
              </p>
              <p>
                <strong>Neighborhood:</strong> {selectedAnimal.neighborhood}
              </p>
              <p>
                <strong>Description:</strong> {selectedAnimal.description}
              </p>
              <hr />
              <p>
                <strong>Have you seen {selectedAnimal.name}? </strong>Please
                contact the owner{" "}
                <span className="fst-italic">
                  {selectedAnimal.ownerFirstName} {selectedAnimal.ownerLastName}{" "}
                </span>{" "}
                with a comment below!
              </p>

              {/* Comments section toggle button */}
              <Button
                variant="primary"
                onClick={() => setShowComment(!showComment)}
              >
                {showComment ? "Hide comments" : "Comment on ad"}
              </Button>

              {/* Comments section */}
              {showComment && (
                <IconContext.Provider value={{ className: "react-icons" }}>
                  <hr />
                  <div ref={commentFormRef} className="comment-form">
                    {/* New comment form */}
                    <Form
                      className="mb-4"
                      onSubmit={handlePostComment}
                      id="formComment"
                    >
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
                      {errorMessage && (
                        <Alert variant="danger">{errorMessage}</Alert>
                      )}
                      <Button variant="primary" type="submit">
                        Submit comment
                      </Button>
                    </Form>

                    {/* Comments list */}
                    <hr />
                    <h5>Previous comments</h5>
                    {comments.length === 0 ? (
                      <p>No comments yet.</p>
                    ) : (
                      <div>
                        {comments.map((comment, index) => (
                          <Container
                            key={comment.commentId}
                            className="bg-primary-subtle p-3 rounded-4 comment-box my-3"
                            ref={
                              index === comments.length - 1
                                ? lastCommentRef
                                : null
                            }
                          >
                            {/* Comment header with user info */}
                            <Row className="align-items-center">
                              <Col xs={1}>
                                <CiFaceSmile className="smile" />
                              </Col>
                              <Col xs={10}>
                                <p className="mb-0">
                                  <strong>
                                    {comment.firstName} {comment.lastName}
                                    {comment.userId ===
                                      selectedAnimal.userId && (
                                      <span> (owner)</span>
                                    )}
                                  </strong>
                                </p>
                              </Col>
                            </Row>

                            {/* Comment content */}
                            <Row className="mt-2">
                              <Col>
                                <p>{comment.content}</p>
                              </Col>
                            </Row>
                            <hr />

                            {/* Comment actions (edit/delete for specific user) */}
                            <Row>
                              <Col xs={6}>
                                <p className="mb-0">
                                  {formatDateTime(comment.dateCreated)}
                                </p>
                              </Col>
                              {comment.userId === currentUserId && (
                                <>
                                  <Col xs={3}>
                                    <div
                                      onClick={() =>
                                        handleUpdateComment(comment)
                                      }
                                      className="cursor-pointer"
                                    >
                                      <FaRegEdit /> Edit
                                    </div>
                                  </Col>
                                  <Col xs={3}>
                                    <div
                                      onClick={() =>
                                        handleDeleteComment(comment)
                                      }
                                      className="cursor-pointer"
                                    >
                                      <MdDelete /> Delete
                                    </div>
                                  </Col>
                                </>
                              )}
                            </Row>

                            {/* Delete confirmation alert */}
                            {selectedComment?.commentId === comment.commentId &&
                              showAlertDelete && (
                                <Alert
                                  className="mt-3"
                                  variant="danger"
                                  onClose={() => setShowAlertDelete(false)}
                                  dismissible
                                >
                                  <Alert.Heading>
                                    Are you sure you want to delete this comment
                                    on {selectedAnimal.name}?
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
                                    <Button
                                      onClick={confirmDelete}
                                      variant="danger"
                                    >
                                      Delete comment
                                    </Button>
                                  </div>
                                </Alert>
                              )}

                            {/* Update comment form */}
                            {selectedComment?.commentId === comment.commentId &&
                              showAlertUpdate && (
                                <Alert
                                  className="mt-3"
                                  variant="warning"
                                  onClose={() => setShowAlertUpdate(false)}
                                  dismissible
                                >
                                  <Alert.Heading>
                                    Update your comment on {selectedAnimal.name}
                                    ?
                                  </Alert.Heading>
                                  <Form
                                    className="mb-4"
                                    onSubmit={confirmUpdate}
                                  >
                                    <Form.Group
                                      className="mb-2"
                                      controlId="formUpdateComment"
                                    >
                                      <Form.Label className="h5">
                                        Your comment
                                      </Form.Label>
                                      <Form.Control
                                        as="textarea"
                                        rows={2}
                                        value={updateComment}
                                        onChange={(e) =>
                                          setUpdateComment(e.target.value)
                                        }
                                      />
                                    </Form.Group>
                                    {errorMessage && (
                                      <Alert variant="danger">
                                        {errorMessage}
                                      </Alert>
                                    )}
                                    <div className="d-flex justify-content-end">
                                      <Button
                                        onClick={() =>
                                          setShowAlertUpdate(false)
                                        }
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
                              )}
                          </Container>
                        ))}
                      </div>
                    )}
                    <div className="box-btn-up">
                      <button
                        className="btn btn-outline-primary"
                        onClick={scrollToForm}
                      >
                        Back to form ⮝
                      </button>
                    </div>
                  </div>
                </IconContext.Provider>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AnimalCardsComment;
