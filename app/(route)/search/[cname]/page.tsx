"use client";
import DoctorList from "@/app/_components/DoctorList";
import { getDoctorByCategory, getDoctors } from "@/app/_utils/GlobalApi";
import React, { useCallback, useEffect, useState } from "react";

const SearchPage = ({ params }: { params: any }) => {
  const [doctorsList, setDoctorsList] = useState<any[]>([]);

  const getDoctorsList = useCallback(async () => {
    if (params.cname === 'All') {
      const doctors = await getDoctors();

      setDoctorsList(doctors.data);
      return;
    }

    const doctors = await getDoctorByCategory(params.cname);
    setDoctorsList(doctors.data);
  }, [params.cname]);
  
  useEffect(() => {
    getDoctorsList();
  }, [params.cname, getDoctorsList]);

  return (
    <div className="mt-6">
      <DoctorList doctors={doctorsList} title="All doctors by your choise" />
    </div>
  );
};

export default SearchPage;
