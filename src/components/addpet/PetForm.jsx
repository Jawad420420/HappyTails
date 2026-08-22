import React from "react";
import { Upload, Heart, PawPrint } from "lucide-react";


export default function PetForm(){

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


            {/* Header */}

          <div className="flex items-center gap-3">

    <h1 className="
    text-3xl 
    font-extrabold 
    text-[#161d1f]
    ">
        Add New Pet
    </h1>

    <PawPrint 
        className="w-8 h-8 text-[#426306]"
        fill="currentColor"
    />

</div>




            {/* Image Upload */}

            <div className="mb-6">

                <label className="
                text-sm 
                font-semibold 
                text-gray-700
                ">
                    Pet Photo
                </label>


                <div className="
                mt-2
                border-2
                border-dashed
                border-gray-300
                rounded-2xl
                p-8
                text-center
                hover:border-[#426306]
                transition
                cursor-pointer
                ">

                    <Upload 
                    className="
                    mx-auto 
                    text-gray-400 
                    mb-3
                    "
                    />


                    <p className="text-gray-500">
                        Click to upload pet image
                    </p>

                </div>

            </div>






            {/* Form Fields */}


            <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
            ">


                <input
                placeholder="Pet Name"
                className={inputBox}
                />



                <select className={inputBox}>

                    <option>
                        Animal Type
                    </option>

                    <option>
                        Dog
                    </option>

                    <option>
                        Cat
                    </option>

                </select>





                <input
                placeholder="Breed"
                className={inputBox}
                />





                <input
                placeholder="Age"
                className={inputBox}
                />





                <select className={inputBox}>

                    <option>
                        Gender
                    </option>

                    <option>
                        Male
                    </option>

                    <option>
                        Female
                    </option>

                </select>






                <input
                placeholder="Location"
                className={inputBox}
                />



            </div>







            {/* Description */}


            <textarea

            placeholder="Write something about the pet..."

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

                Add Pet

                <Heart className="w-5 h-5"/>

            </button>



        </div>

    );

}