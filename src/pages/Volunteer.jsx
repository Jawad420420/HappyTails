import React from "react";
import BackButton from "../components/BackButton";
import VolunteerForm from "../components/volunteer/VolunteerForm";

export default function Volunteer() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6">
        <BackButton to="/" label="Back to Home" />
      </div>

      <VolunteerForm />
    </div>
  );
}