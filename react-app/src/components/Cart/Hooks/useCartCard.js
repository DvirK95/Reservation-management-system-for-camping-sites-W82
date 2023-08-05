import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '../../../store/cart-actions';

function useCartCard() {
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return { setModalShow, modalShow, handleRemoveItem };
}

export default useCartCard;
