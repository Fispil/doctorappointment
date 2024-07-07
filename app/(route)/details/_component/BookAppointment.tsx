"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, ClockIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { postAppointment, sendEmail } from "@/app/_utils/GlobalApi";
import { toast } from "sonner";
import { DoctorData } from "@/app/_types/DoctorData";

interface BookAppointmentProps {
  doctor: DoctorData;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({ doctor }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeList, setTimeList] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const { user } = useKindeBrowserClient();

  const getTimeList = () => {
    const timeList = [];

    for (let i = 0; i <= 12; i++) {
      timeList.push(`${i}:00 AM`);
      timeList.push(`${i}:30 AM`);
    }

    for (let i = 1; i <= 6; i++) {
      timeList.push(`${i}:00 PM`);
      timeList.push(`${i}:30 PM`);
    }

    setTimeList(timeList);
  };

  const saveAppointment = async () => {
    const data = {
      data: {
        UserName: user?.given_name + " " + user?.family_name,
        Email: user?.email,
        Date: date,
        Time: selectedTime,
        comment: comment,
        doctor: doctor.id,
        Note: comment,
      },
    };

    try {
      const book = await postAppointment(data);

      if (book) {
        sendEmail({
          email: user?.email as string,
          subject: "Booking confirmation",
          message: "Your booking has been confirmed.",
        });
        toast("Booking confirmation will be sent to your email.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isPastDay = (day: Date) => day < new Date();

  useEffect(() => {
    console.log(doctor);
    getTimeList();
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3 rounded-full">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col items-baseline gap-4">
                <h2 className="flex gap-4 items-center">
                  <CalendarDays className="text-primary h-5 w-5" /> Select Date
                </h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={isPastDay}
                  className="rounded-md border"
                />
              </div>

              <div className="mt-4 md:mt-0">
                <h2 className="text-primary flex gap-2 items-center mb-4">
                  <ClockIcon className="text-primary w-5 h-5" />
                  Select Time
                </h2>
                <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                  {timeList?.map((time, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 border rounded-full text-center hover:bg-primary hover:text-white cursor-pointer ${
                        time === selectedTime && "bg-primary text-white"
                      }`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid w-full gap-1.5 mt-4">
              <Label htmlFor="comment">Your comment</Label>
              <Textarea
                placeholder="Type your message here."
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Your message will be copied to the support team.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <div className="flex gap-2">
              <Button
                type="button"
                className="text-red-500 border-red-500"
                variant="outline"
              >
                Close
              </Button>
              <Button
                type="button"
                disabled={!(date && selectedTime)}
                onClick={saveAppointment}
              >
                Book
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;