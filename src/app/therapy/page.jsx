import BookingForm from "@/components/section/BookingForm";
import getMyBookings from "@/lib/actions/getMyBookings";


export default async function BookingPage() {
   const response = await getMyBookings();

  return (
    <div className=" px-28 py-4">
      <BookingForm bookings={response.data || []} />
    </div>
  )
}

