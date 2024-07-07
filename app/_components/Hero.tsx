import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="mt-16">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <Image
              alt=""
              src="/doctors-photo.jpg"
              className="absolute inset-0 h-full w-full object-cover rounded-3xl z--1"
              width={800}
              height={800}
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Find and book <span className="text-primary"> Appointment</span>{" "}
              with your favorites <span className="text-primary"> Doctors</span>
            </h2>

            <p className="mt-4 text-gray-600">
              Booking an appointment with your favorite and best doctors has
              never been easier. Whether you&apos;re seeking routine check-ups,
              specialized care, or second opinions, our platform connects you
              with top-rated healthcare professionals in your area. With just a
              few clicks, you can browse through detailed profiles, read patient
              reviews, and select the perfect doctor who meets your unique
              needs. Say goodbye to long waiting times and complex scheduling.
              Experience the convenience and peace of mind that comes with
              knowing you&apos;re in the best hands. Take charge of your health today
              and secure your appointment with a trusted expert who is dedicated
              to your well-being.
            </p>

            <Button className="mt-10" onClick={() => router.push('/search/All')}>Explore More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
