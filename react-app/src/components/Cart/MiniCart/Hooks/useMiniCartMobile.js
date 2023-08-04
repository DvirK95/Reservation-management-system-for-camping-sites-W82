import { useDispatch } from 'react-redux';
import { cartActions } from '../../../../store/cart-slice';
import {
  removeItemFromCart,
  fetchCartData,
} from '../../../../store/cart-actions';
import { useEffect } from 'react';

function useMiniCartMobile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  const handleMouseLeave = () => {
    dispatch(cartActions.showCart(false));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };
  return { handleMouseLeave, handleRemoveItem };
}
export default useMiniCartMobile;
