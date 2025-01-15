import React, { useState, useEffect, useRef } from "react";
import AnimalService from "../services/animal.service";
import CommentService from "../services/comment.service";
import {
  Modal,
  Button,
  Spinner,
  Row,
  Col,
  Container
} from "react-bootstrap";
import "./AnimalCards.scss";
import { IconContext } from "react-icons";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AnimalGrid from "./AnimalGrid";
import CommentHeader from "./CommentHeader";
import NewCommentForm from "./NewCommentForm";
import DeleteCommentAlert from "./DeleteCommentAlert";
import UpdateCommentForm from "./UpdateCommentForm";
import AnimalDetails from "./AnimalDetails";

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
      <p>
        Have you seen any of these {animals.length} animals? Click on an ad to
        comment!
      </p>

      {/* Display animal cards */}
      <AnimalGrid animals={animals} handleShow={handleShow} />

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
              <AnimalDetails
                animal={selectedAnimal}
                formatDate={formatDate}
              />
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
                    <NewCommentForm
                      newComment={newComment}
                      setNewComment={setNewComment}
                      handlePostComment={handlePostComment}
                      errorMessage={errorMessage}
                    />

                    {/* Comments list */}
                    <hr />
                    <h5>Previous comments ({comments.length} comments)</h5>
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
                            <CommentHeader
                              comment={comment}
                              animalUserId={selectedAnimal.userId}
                            />
                            {/* Comment content */}
                            <div className="">
                              <p>{comment.content}</p>
                            </div>
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
                                <DeleteCommentAlert
                                  selectedAnimal={selectedAnimal}
                                  confirmDelete={confirmDelete}
                                  setShowAlertDelete={setShowAlertDelete}
                                />
                              )}

                            {/* Update comment form */}
                            {selectedComment?.commentId === comment.commentId &&
                              showAlertUpdate && (
                                <UpdateCommentForm
                                  selectedAnimal={selectedAnimal}
                                  confirmUpdate={confirmUpdate}
                                  updateComment={updateComment}
                                  setUpdateComment={setUpdateComment}
                                  errorMessage={errorMessage}
                                  setShowAlertUpdate={setShowAlertUpdate}
                                />
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
