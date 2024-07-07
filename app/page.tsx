"use client";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import { useEffect, useState } from "react";
import { getDoctors } from "./_utils/GlobalApi";
import CustomerReviews from "./_components/CustomersReviews";

const Home = () => {
  const [doctors, setDoctors] = useState<any[]>([]);

  const getDoctorList = async () => {
    const doctors = await getDoctors();

    setDoctors(doctors.data);
  };

  useEffect(() => {
    getDoctorList();
  }, []);

  return (
    <div>
      <Hero />

      <CategorySearch />

      <DoctorList doctors={doctors} title="Popular Doctors" />
      
      <CustomerReviews />
    </div>
  );
};

export default Home;
