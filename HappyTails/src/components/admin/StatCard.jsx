import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="
      bg-white
      rounded-2xl
      p-5
      shadow-md
      border
      border-gray-100
    ">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="
        text-3xl
        font-extrabold
        text-[#426306]
        mt-2
      ">
        {value}
      </h2>

    </div>
  );
}