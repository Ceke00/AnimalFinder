import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { avatars } from "../avatars";

const UpdateAvatar = ({ currentAvatar, onAvatarUpdate }) => {
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar);
  const [showAlert, setShowAlert] = useState(false);
  const [submittedAvatar, setSubmittedAvatar] = useState(currentAvatar);

  useEffect(() => {
    setAvatarUrl(currentAvatar);
    setSubmittedAvatar(currentAvatar);
  }, [currentAvatar]);

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    try {
      await AuthService.updateAvatar(avatarUrl);
      onAvatarUpdate(avatarUrl);
      setSubmittedAvatar(avatarUrl);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
  };

  const currentAvatarObj = avatars.find(
    (avatar) => avatar.url === submittedAvatar
  );

  return (
    <>
      <h2 className="mt-4">Update your Avatar</h2>

      <p>
        Your avatar is shown beside your name when you comment on an ad. Current
        avatar:{" "}
      </p>
      <div className="me-3">
        <span
          role="img"
          aria-label={`Current avatar is ${currentAvatarObj.label}`}
        >
          {currentAvatarObj.icon(70)}
        </span>
      </div>
      <div className="d-flex align-items-center mb-3">
        <Form onSubmit={handleUpdateAvatar}>
          <Form.Group className="mb-3" controlId="formAvatar">
            <Form.Label>Change your Avatar</Form.Label>
            <div>
              {avatars.map((avatar) => (
                <Form.Check
                  inline
                  key={avatar.url}
                  type="radio"
                  name="avatar"
                  value={avatar.url}
                  checked={avatarUrl === avatar.url}
                  onChange={() => setAvatarUrl(avatar.url)}
                  required
                  className="m-4 align-middle"
                  aria-label={avatar.label}
                  label={<span aria-hidden="true">{avatar.icon(30)}</span>}
                />
              ))}
            </div>
          </Form.Group>

          {showAlert && (
            <Alert variant="success">
              Avatar updated successfully to{" "}
              {avatars.find((avatar) => avatar.url === avatarUrl).label}!
            </Alert>
          )}
          <Button variant="primary" type="submit">
            Update Avatar
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateAvatar;
