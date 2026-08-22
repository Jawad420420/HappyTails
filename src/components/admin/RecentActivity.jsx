import React from "react";

export default function RecentActivity() {

  const activities = [
    {
      user: "Farha Chowdhury",
      action: "Applied for Max",
      time: "10 min ago"
    },
    {
      user: "Happy Paws Shelter",
      action: "Added Luna",
      time: "25 min ago"
    },
    {
      user: "Sadia Akter",
      action: "Registered",
      time: "1 hour ago"
    }
  ];


  return (
    <div className="
      bg-white
      rounded-2xl
      shadow-md
      border
      border-gray-100
      p-6
    ">

      <h2 className="
        text-xl
        font-bold
        mb-5
        text-[#161d1f]
      ">
        Recent Activity
      </h2>


      <div className="space-y-4">

        {
          activities.map((item,index)=>(
            <div
              key={index}
              className="
                flex
                justify-between
                items-center
                bg-gray-50
                rounded-xl
                p-4
              "
            >

              <div>
                <p className="font-semibold">
                  {item.user}
                </p>

                <p className="text-sm text-gray-500">
                  {item.action}
                </p>
              </div>


              <span className="text-sm text-gray-400">
                {item.time}
              </span>

            </div>
          ))
        }

      </div>

    </div>
  );
}