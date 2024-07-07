import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin } from 'lucide-react';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { deleteBooking } from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import CancelAppointment from './CancelAppointmentButton';

interface BookingListProps {
  bookingList: any[];
  expired?: boolean;
  updateRecord: () => void;
}

const BookingList: React.FC<BookingListProps> = ({ bookingList, expired, updateRecord }) => {

  const cancelBooking = async (id: number) => {
    const deleted = await deleteBooking(id);
    
    if (deleted) {
      toast('Booking cancelled successfully');
      updateRecord();
    }
  };

  return (
    <div>
      { bookingList && bookingList.map((item) => (
        <div key={item.id} className='flex gap-4 items-center border p-3 m-3 rounded-lg'>
          <Image src={item.attributes.doctor?.data?.attributes?.image?.data?.attributes?.url} alt="doctor-image" width={70} height={70} className='rounded-full object-cover' />
            <div className='flex flex-col gap-2 w-full'>
              <h2 className='font-bold text-[18px] flex justify-between items-center'>{item.attributes.doctor.data.attributes.Name} {!expired && <CancelAppointment onClickAccepted={() => cancelBooking(item.id)} />}</h2>
              <h2 className='flex gap-2 text-gray-500'><MapPin className='text-primary'/>{item.attributes.doctor.data.attributes.Address}</h2>
              <h2 className='flex gap-2'><Calendar className='text-primary'/>Appointment on :{moment(item.attributes.Date).format('DD-MMM-YYYY')}</h2>
              <h2 className='flex gap-2'><Clock className='text-primary'/>{expired? 'Expired': 'Will be'} At time : {item.attributes.Time}</h2>
            </div>
         </div> 
      ))}
    </div>
  )
}

export default BookingList;