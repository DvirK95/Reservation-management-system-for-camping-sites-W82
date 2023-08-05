import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getBookingDetails } from '../../utils/useBookingApi';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart-slice';
import { useDispatch } from 'react-redux';

function useConfirm() {
  const dispatch = useDispatch();
  const [isFirst, setIsFirst] = useState(true);
  let { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState({});
  const navigate = useNavigate();

  const getDetails = useCallback(async () => {
    const dataDetails = await getBookingDetails(bookingId);
    if (dataDetails) {
      setBookingDetails(dataDetails);
    } else {
      navigate('/cart');
    }
  }, [bookingId, navigate]);

  useEffect(() => {
    if (isFirst) {
      getDetails();
      dispatch(cartActions.resetCart());
      setIsFirst(false);
    }
  }, [getDetails, isFirst, dispatch]);

  return { isFirst, bookingDetails };
}
export default useConfirm;
