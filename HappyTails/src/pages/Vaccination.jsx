import React from "react";
import BackButton from "../components/BackButton";
import VaccinationCard from "../components/vaccination/VaccinationCard";

export default function Vaccination() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6">
        <BackButton to="/" label="Back to Home" />
      </div>

      <VaccinationCard />
    </div>
  );
}