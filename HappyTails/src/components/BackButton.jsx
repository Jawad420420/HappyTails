import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

export default function BackButton({ to, label = "Back" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1); // Goes back 1 page in browser history if no 'to' path is passed
    }
  };

  return (
    <button className="pill-shadow-btn" onClick={handleClick} type="button">
      <span className="paw-icon">🐾</span>
      <span className="btn-text">{label}</span>
    </button>
  );
}