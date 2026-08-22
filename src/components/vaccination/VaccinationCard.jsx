import React from "react";
import { Bell, CheckCircle } from "lucide-react";


export default function VaccinationCard(){


return(

<div className="
bg-white
rounded-3xl
shadow-xl
p-6
md:p-8
border
border-gray-100
">


<h1 className="
text-3xl
font-extrabold
text-[#161d1f]
mb-6
">
Pet Health & Vaccination
</h1>



<div className="
flex
gap-5
items-center
bg-gray-50
rounded-2xl
p-4
">


<img

src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80"

className="
w-28
h-28
rounded-2xl
object-cover
"

/>


<div>

<h2 className="
text-2xl
font-bold
">
Max
</h2>


<p className="text-gray-500">
Dog • 2 Years • Male
</p>


</div>


</div>





<div className="
mt-6
bg-[#e8f2d8]
rounded-2xl
p-5
">


<h3 className="
font-bold
text-[#426306]
">
Next Vaccination
</h3>


<p className="
text-xl
font-bold
mt-2
">
20 September 2026
</p>


<span className="
inline-block
mt-3
bg-white
px-4
py-2
rounded-full
text-sm
text-[#426306]
">
30 days remaining
</span>



<button className="
mt-4
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
">

<Bell className="w-5 h-5"/>

Set Reminder

</button>


</div>





<h2 className="
text-xl
font-bold
mt-8
mb-4
">
Vaccination History
</h2>



<div className="space-y-3">


{
[
["Rabies","20 Jan 2026","Completed"],
["DHPP","10 Feb 2026","Completed"],
["Next Dose","20 Sep 2026","Upcoming"]

].map((item,index)=>(


<div
key={index}
className="
flex
justify-between
items-center
bg-gray-50
rounded-xl
p-4
">


<div>

<p className="font-semibold">
{item[0]}
</p>

<p className="text-sm text-gray-500">
{item[1]}
</p>

</div>



<div className="
flex
items-center
gap-2
text-[#426306]
font-semibold
">


<CheckCircle className="w-5 h-5"/>

{item[2]}

</div>


</div>


))

}


</div>


</div>


)


}
