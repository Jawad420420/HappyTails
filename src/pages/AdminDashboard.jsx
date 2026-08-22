import React from "react";

import StatCard from "../components/admin/StatCard";
import RecentActivity from "../components/admin/RecentActivity";
import QuickActions from "../components/admin/QuickActions";
import AdoptionTable from "../components/admin/AdoptionTable";


export default function AdminDashboard(){

return (

<div className="
max-w-6xl
mx-auto
mt-10
space-y-8
pb-10
">


{/* Title */}

<div>

<h1 className="
text-3xl
font-extrabold
text-[#161d1f]
">
Dashboard Overview
</h1>


<p className="
text-gray-500
mt-2
">
Manage users, pets, shelters and adoption activities.
</p>

</div>





{/* Statistics */}

<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-5
">


<StatCard 
title="Users"
value="1,240"
/>


<StatCard 
title="Pets Listed"
value="356"
/>


<StatCard 
title="Adopted"
value="189"
/>


<StatCard 
title="Shelters"
value="42"
/>


</div>





{/* Middle Section */}

<div className="
grid
grid-cols-1
lg:grid-cols-3
gap-6
">


<div className="lg:col-span-2">

<RecentActivity />

</div>



<QuickActions />


</div>





{/* Table */}

<AdoptionTable />



</div>

);

}