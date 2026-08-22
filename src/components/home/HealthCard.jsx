import { HeartPulse } from "lucide-react";


export default function HealthCard({ onNavigate }) {

  return (

    <section className="
      w-full
      max-w-4xl
      px-6
      my-10
    ">

      <div className="
        bg-[#e8f2d8]
        rounded-3xl
        p-8
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-6
        shadow-md
        hover:shadow-lg
        transition
      ">


        {/* Text */}

        <div>

          <div className="
            flex
            items-center
            gap-3
            mb-3
          ">

            <HeartPulse
              className="text-[#426306] w-8 h-8"
            />

            <h2 className="
              text-2xl
              font-extrabold
              text-[#161d1f]
            ">
              Pet Health Center
            </h2>

          </div>


          <p className="
            text-gray-600
            max-w-md
          ">
            Keep track of vaccinations, health records,
            and reminders for your furry friends.
          </p>


        </div>



        {/* Button */}

        <button

          onClick={() => onNavigate('vaccination')}

          className="
            bg-[#426306]
            text-white
            px-7
            py-3
            rounded-xl
            font-bold
            hover:bg-[#344d05]
            transition
            active:scale-95
          "

        >

          View Health Records

        </button>


      </div>

    </section>

  );

}