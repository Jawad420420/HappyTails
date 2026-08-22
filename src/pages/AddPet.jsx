import PetForm from "../components/addpet/PetForm";

export default function AddPet(){

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">

            <button 
            className="mb-6 text-[#426306] font-bold hover:underline">
                ← Back
            </button>


            <PetForm />

        </div>
    );
}