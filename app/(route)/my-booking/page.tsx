"use client";
import React, { use, useCallback, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserBookingList } from "@/app/_utils/GlobalApi";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import BookingList from "./_components/BookingList";

const MyBooking = () => {
  const [bookingList, setBookingList] = useState([]);

  const { user } = useKindeBrowserClient();

  const getBokingList = useCallback(async () => {
    const bookingListFromServer = await getUserBookingList(
      user?.email as string
    );

    setBookingList(bookingListFromServer.data);
    console.log(bookingList);
  }, [user]);

  const getFilteredBookingList = (status: string) =>
    status === "upcoming"
      ? bookingList.filter(
          (booking: any) => new Date(booking.attributes.Date) >= new Date()
        )
      : bookingList.filter(
          (booking: any) => new Date(booking.attributes.Date) < new Date()
        );

  useEffect(() => {
    getBokingList();
  }, [getBokingList]);

  return (
    <div className="px-4 sm:px-10 mt-10">
      <h2 className="font-bold text-2xl">My Booking</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList
            bookingList={getFilteredBookingList("upcoming")}
            expired={false}
            updateRecord={() => getBokingList()}
          />
        </TabsContent>
        <TabsContent value="expired">
          <BookingList
            bookingList={getFilteredBookingList("expired")}
            expired={true}
            updateRecord={() => getBokingList()}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBooking;
