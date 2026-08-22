import React from "react";


export default function QuickActions(){

return (

<div className="
bg-white
rounded-3xl
p-6
shadow-md
border
border-gray-100
">


<h2 className="
text-xl
font-bold
mb-5
">
Quick Actions
</h2>



<div className="space-y-4">


<button className="
w-full
bg-[#426306]
text-white
py-3
rounded-xl
font-semibold
hover:bg-[#344d05]
transition
">
Manage Users
</button>



<button className="
w-full
bg-[#e8f2d8]
text-[#426306]
py-3
rounded-xl
font-semibold
hover:bg-[#d9edbd]
transition
">
Review Applications
</button>




<button className="
w-full
border
border-[#426306]
text-[#426306]
py-3
rounded-xl
font-semibold
hover:bg-gray-50
transition
">
Add Shelter
</button>


</div>


</div>

);

}