import React from "react";


export default function AdoptionTable(){


const requests = [

{
pet:"Max",
user:"Farha Chowdhury",
status:"Under Review"
},

{
pet:"Luna",
user:"Sadia Akter",
status:"Approved"
},

{
pet:"Bruno",
user:"Jannat Hasan",
status:"Pending"
}

];


return (

<div className="
bg-white
rounded-3xl
shadow-md
border
border-gray-100
p-6
">


<h2 className="
text-xl
font-bold
mb-5
">
Recent Adoption Requests
</h2>



<div className="space-y-3">


{
requests.map((item,index)=>(


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
{item.pet}
</p>


<p className="
text-sm
text-gray-500
">
{item.user}
</p>


</div>




<span className="
px-3
py-1
rounded-full
text-sm
bg-[#e8f2d8]
text-[#426306]
font-semibold
">

{item.status}

</span>



</div>


))

}


</div>



</div>

);

}