
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface DoctorListProps {
  doctors: any[];
  title: string;
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors, title }) => {
  return (
    <div className="mb-10 px-10">
      <h2 className="font-bold text-xl">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {doctors.length > 0
          ? doctors.map((doctor) => (
              <Label key={doctor.id} htmlFor="book_appointment_button">
                <div
                  className=" p-4 rounded-lg hover:scale-105 cursor-pointer border-[1px] hover:border-primary hover:shadow-sm transition-all ease-in-out"
                >
                  <Image
                    src={doctor.attributes?.image?.data?.attributes?.url}
                    alt="doctor"
                    className="rounded-lg h-[200px] w-full object-cover"
                    width={500}
                    height={200}
                  />
                  <div className="mt-3 items-baseline flex flex-col gap-1">
                    <h2 className="font-bold text-[10px] bg-blue-100 p1-1 rounded-full px-2 text-primary">
                      {doctor.attributes?.categories?.data[0]?.attributes?.Name}
                    </h2>
                    <h2 className="font-bold">{doctor.attributes?.Name}</h2>
                    <h2 className="text-primary text-sm">
                      {doctor.attributes?.Year_of_Experience}
                    </h2>
                    <h2 className="text-gray-500 text-sm">
                      {doctor.attributes?.Address}
                    </h2>
                    <Link href={"/details/" + doctor?.id} className="w-full" id="book_appointment_button">
                      <h2 className="p-2 border-[1px] border-primary text-primary rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-primary hover:text-white">
                        Book now
                      </h2>
                    </Link>
                  </div>
                </div>
              </Label>
            ))
          : [...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-[220px] bg-slate-100 w-full rounded-lg animate-pulse"
              />
            ))}
      </div>
    </div>
  );
};

export default DoctorList;
