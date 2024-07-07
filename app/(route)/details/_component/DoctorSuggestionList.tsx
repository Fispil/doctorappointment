"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { getDoctorByCategory } from "@/app/_utils/GlobalApi";
import Link from "next/link";
import { DoctorData } from "@/app/_types/DoctorData";
import { GraduationCap } from "lucide-react";

interface DoctorSuggestionListProps {
  suggestion: string;
}

const DoctorSuggestionList: React.FC<DoctorSuggestionListProps> = ({
  suggestion,
}) => {
  const [doctorSuggestionList, setDoctorSuggestionList] = useState<
    DoctorData[]
  >([]);

  const getDoctorSuggestionList = useCallback(async () => {
    // Fetch doctor suggestion list
    const DoctorsSuggestion = await getDoctorByCategory(suggestion);

    setDoctorSuggestionList(DoctorsSuggestion.data);
  }, [suggestion]);

  useEffect(() => {
    getDoctorSuggestionList();
  }, [getDoctorSuggestionList]);

  return (
    <div className="p-4 border-[1px] mt-5 md:ml-5">
      <h2 className="mb-3 font-bold">Suggestions</h2>

      {doctorSuggestionList.length > 0 ? (
        doctorSuggestionList.map((doctor: DoctorData) => (
          <div
            key={doctor.id}
            className=" p-4 rounded-lg hover:scale-110 cursor-pointer border-[1px] hover:border-primary hover:shadow-sm transition-all ease-in-out"
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
                {doctor.attributes.categories.data[0].attributes.Name}
              </h2>
              <h2 className="font-bold">{doctor.attributes?.Name}</h2>
              <h2 className="text-primary text-sm flex gap-2 items-center">
                <GraduationCap /> {doctor.attributes?.Year_of_Experience} of
                experience
              </h2>
            </div>
          </div>
        ))
      ) : (
        <h2>No doctor found</h2>
      )}
    </div>
  );
};

export default DoctorSuggestionList;
