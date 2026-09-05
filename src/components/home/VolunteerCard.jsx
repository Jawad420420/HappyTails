import React from "react";
import { Link } from "react-router-dom";
import { Heart, PawPrint } from "lucide-react";

export default function VolunteerCard() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 my-10">
      <div className="bg-[#e8f2d8] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md hover:shadow-lg transition-all duration-300">
        
        {/* Text Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <PawPrint
              className="w-6 h-6 text-[#426306]"
              fill="currentColor"
            />
            <h2 className="text-2xl font-extrabold text-[#161d1f]">
              Be Their Hero
            </h2>
          </div>

          <p className="text-gray-600 max-w-md">
            Not ready to adopt? You can still change a pet's life.
            Join our volunteer community and help animals in need.
          </p>
        </div>

        {/* Action Link */}
        <Link
          to="/volunteer"
          className="shrink-0 bg-[#426306] text-white px-7 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#344d05] transition active:scale-95"
        >
          Become a Volunteer
          <Heart className="w-5 h-5" fill="currentColor" />
        </Link>

      </div>
    </section>
  );
}