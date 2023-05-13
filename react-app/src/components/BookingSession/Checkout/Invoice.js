import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { updateBooking } from '../../../utils/useBookingApi';
function Invoice() {
  const [isFirst, setIsFirst] = useState(true);
  let { bookingId } = useParams();

  const execudePaid = useCallback(async () => {
    await updateBooking(bookingId, 'PAID');
  }, [bookingId]);

  useEffect(() => {
    if (isFirst) {
      execudePaid();
      setIsFirst(false);
    }
  }, [execudePaid, isFirst]);

  console.log('print it');

  return (
    <div>
      <h1>{bookingId}</h1>
    </div>
  );
}
export default Invoice;
