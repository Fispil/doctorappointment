"use client";
import { getDoctorById } from "@/app/_utils/GlobalApi";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import DoctorDetail from "../_component/DoctorDetail";
import DoctorSuggestionList from "../_component/DoctorSuggestionList";
import { DoctorData } from "@/app/_types/DoctorData";

interface DetailsProps {
  params: {
    recordId: number;
  };
}

const Details: React.FC<DetailsProps> = ({ params }) => {
  const [doctor, setDoctor] = useState<DoctorData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDoctorInfo = useCallback(async () => {
    try {
      setIsLoading(true);
  
      const doctor = await getDoctorById(params.recordId);
  
      setDoctor(doctor.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [params.recordId]);
  
  useEffect(() => {
    getDoctorInfo();
  }, [getDoctorInfo]);

  return (
    <div className="p-6 md:p-20">
      <h2 className="font-bold text-[22px]">Details</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        <div className="grid-cols-1 lg:col-span-3">
        {doctor && <DoctorDetail doctor={doctor} />}
        </div>

        <div className="col-span-1">
          {doctor && (
            <DoctorSuggestionList
              suggestion={
                doctor.attributes?.categories?.data[0].attributes.Name
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
