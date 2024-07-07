"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const ReviewsFromServerToBeFetched = [
  {
    id: 1,
    rating: 5,
    review:
      "No, Rose, they are not breathing. And they have no arms or legs … Where are they? You know what? If we come across somebody with no arms or legs, do we bother resuscitating them? I mean, what quality of life do we have there?",
    revierName: "Michael Scott",
    revierAvatar: "",
  },
  {
    id: 2,
    rating: 4,
    review:
      "No, Rose, they are not breathing. And they have no arms or legs … Where are they? You know what? If we come across somebody with no arms or legs, do we bother resuscitating them? I mean, what quality of life do we have there?",
    revierName: "Lisa Silverspoon",
    revierAvatar: "",
  },
  {
    id: 3,
    rating: 5,
    review:
      "No, Rose, they are not breathing. And they have no arms or legs … Where are they? You know what? If we come across somebody with no arms or legs, do we bother resuscitating them? I mean, what quality of life do we have there?",
    revierName: "Jake Peralta",
    revierAvatar: "",
  },
  {
    id: 4,
    rating: 3,
    review:
      "No, Rose, they are not breathing. And they have no arms or legs … Where are they? You know what? If we come across somebody with no arms or legs, do we bother resuscitating them? I mean, what quality of life do we have there?",
    revierName: "Amy Santiago",
    revierAvatar: "",
  },
  {
    id: 5,
    rating: 5,
    review:
      "No, Rose, they are not breathing. And they have no arms or legs … Where are they? You know what? If we come across somebody with no arms or legs, do we bother resuscitating them? I mean, what quality of life do we have there?",
    revierName: "Terry Jeffords",
    revierAvatar: "",
  },
  {
    id: 6,
    rating: 5,
    review:
      "No, Rose, they are not breathing. And they have no arms or legs … Where are they? You know what? If we come across somebody with no arms or legs, do we bother resuscitating them? I mean, what quality of life do we have there?",
    revierName: "Alexa Johnson",
    revierAvatar: "",
  },
  {
    id: 7,
    rating: 4,
    review:
      "No, Rose, they are not breathing. And they have no arms or legs … Where are they? You know what? If we come across somebody with no arms or legs, do we bother resuscitating them? I mean, what quality of life do we have there?",
    revierName: "John Doe",
    revierAvatar: "",
  },
];

const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    // fetch reviews from server | TODO

    setReviews(ReviewsFromServerToBeFetched);
  }, []);

  return (
    <section className="my-20 px-4">
      <h2 className="max-w-xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Read trusted reviews from our customers
      </h2>

      <div className="px-16">
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full "
        >
          <CarouselContent>
            {reviews.map((item, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
              >
                <div className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-0.5 text-green-500">
                        {[...Array(item.rating)].map((_, index) => (
                          <Image
                            src="/ratingstar.svg"
                            alt="star"
                            width={15}
                            height={15}
                            key={index}
                          />
                        ))}
                      </div>
                      <div>
                        {item.revierAvatar ? (
                          <Image
                            src="/avatar.svg"
                            alt="avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-14 h-14 bg-gray-500 rounded-full text-red-500 text-4xl flex justify-center items-center">{item.revierName.split('')[0]}</div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-2xl font-bold text-rose-600 sm:text-3xl">
                        Service Review
                      </p>

                      <p className="mt-4 leading-relaxed text-gray-700">
                        {item.review}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                    &mdash; {item.revierName}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious color="bg-red-500" />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default CustomerReviews;
