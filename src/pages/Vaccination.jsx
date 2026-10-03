import React from "react";
import BackButton from "../components/BackButton";
import VaccinationCard from "../components/vaccination/VaccinationCard";
import Footer from "../components/Footer";

export default function Vaccination() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="max-w-3xl mx-auto py-10 px-4 w-full flex-1">
        <div className="mb-6">
          <BackButton to="/" label="Back to Home" />
        </div>

        <VaccinationCard />
      </div>
      <Footer />
    </div>
  );
}