import React, { use, useEffect } from "react";
import Image from "next/image";
import { Book, GraduationCap, MapPin } from "lucide-react";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedInIcon,
} from "./Icons";
import BookAppointment from "./BookAppointment";
import { DoctorData } from "@/app/_types/DoctorData";

interface DoctorDetailProps {
  doctor: DoctorData;
}

const DoctorSocialsList = [
  {
    id: 1,
    name: "Facebook",
    icon: <FacebookIcon />,
  },
  {
    id: 2,
    name: "Twitter",
    icon: <TwitterIcon />,
  },
  {
    id: 3,
    name: "Instagram",
    icon: <InstagramIcon />,
  },
  {
    id: 4,
    name: "LinkedIn",
    icon: <LinkedInIcon />,
  },
];

const DoctorDetail: React.FC<DoctorDetailProps> = ({ doctor }) => {
  const { Name, Year_of_Experience, Address, About, categories, image } = doctor.attributes;

    
  return (
    <>
      <div className="col-span-3 grid grid-cols-1  md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg">
        <div className="col-span-1">
          <Image
            src={image.data.attributes.url}
            alt={Name}
            width={200}
            height={200}
            className="rounded-lg h-[350px] w-full object-cover"
          />
        </div>

        <div className="col-span-2 mt-5 md:px-10 flex flex-col gap-4 items-baseline">
          <h2 className="font-bold text-2xl mt-6">
            {Name}
          </h2>
          <h2 className="flex gap-2 text-gray-500 text-md">
            <GraduationCap />{" "}
            <span>{Year_of_Experience} of expirience</span>
          </h2>
          <h2 className="flex gap-2 text-gray-500 text-md">
            <MapPin /> <span>{Address}</span>
          </h2>
          <h2 className="text-[10px] bg-blue-100 p-1 px-2 text-primary rounded-full">
            {categories?.data[0].attributes.Name}
          </h2>
          <div className="flex gap-4 flex-wrap">
            {DoctorSocialsList.map((social) => (
              <div
                key={social.id}
                className="flex items-center gap-2 bg-gray-100 p-2 rounded-full"
              >
                {social.icon}
                <span>{social.name}</span>
              </div>
            ))}
          </div>

          
          <BookAppointment doctor={doctor} />
        </div>
      </div>
      <div className="p-3 border-[1px] rounded-lg mt-6">
        <h2 className="font-bold text-[20px] mt-6">About me</h2>
        <p className="text-gray-500 mt-3 tracking-wider">
          {doctor.attributes?.About}
        </p>
      </div>
    </>
  );
};

export default DoctorDetail;
