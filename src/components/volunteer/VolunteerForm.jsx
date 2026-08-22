import React from "react";
import { Heart, PawPrint } from "lucide-react";
import volunteerImage from "../../assets/volun5.jpg";


export default function VolunteerForm() {

  const inputBox = `
  w-full
  px-4
  py-3
  bg-gray-50
  border
  border-gray-200
  rounded-xl
  outline-none
  focus:bg-white
  focus:ring-2
  focus:ring-[#426306]
  transition
  `;


  return (

    <div className="
      bg-white
      rounded-3xl
      shadow-xl
      p-6
      md:p-8
      border
      border-gray-100
    ">


      {/* Header */}

      <div className="flex items-center gap-3 mb-6">

        <h1 className="
          text-3xl
          font-extrabold
          text-[#161d1f]
        ">
          Become a Volunteer
        </h1>


        <PawPrint
          className="
          w-8
          h-8
          text-[#426306]
          "
          fill="currentColor"
        />

      </div>



      <p className="text-gray-500 mb-6">
        Help animals find care, love and a forever home.
        Join our volunteer community today.
      </p>




      {/* Image Area */}

      <div className="
        mb-6
        rounded-2xl
        overflow-hidden
        bg-gray-100
      ">

        <img

          src={volunteerImage}

          className="
          w-full
          h-56
          object-cover
          "

        />

      </div>




      {/* Form Fields */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
      ">


        <input
          placeholder="Full Name"
          className={inputBox}
        />


        <input
          placeholder="Email Address"
          className={inputBox}
        />


        <input
          placeholder="Phone Number"
          className={inputBox}
        />


        <input
          placeholder="Location"
          className={inputBox}
        />


      </div>




      <textarea

        placeholder="Why do you want to volunteer?"

        className={`${inputBox} mt-5 h-32 resize-none`}

      />





      {/* Button */}

      <button

        className="
        mt-8
        w-full
        bg-[#426306]
        text-white
        py-3
        rounded-xl
        font-bold
        flex
        justify-center
        items-center
        gap-2
        hover:bg-[#344d05]
        transition
        active:scale-95
        "

      >

        Join Volunteer Team

        <Heart
          className="w-5 h-5"
          fill="currentColor"
        />

      </button>


    </div>

  );
}