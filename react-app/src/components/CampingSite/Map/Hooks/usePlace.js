import { useDispatch, useSelector } from 'react-redux';
import { addItemCart } from '../../../../store/cart-actions';
import { cartActions } from '../../../../store/cart-slice';

function usePlace(placeObj) {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  let isExistCart = false;
  for (let item of items) {
    if (item.slip === placeObj.slip) {
      isExistCart = true;
    }
  }

  const handleAddItem = (item) => {
    dispatch(addItemCart(item.id, item.slip));
    dispatch(cartActions.showCart(true));
  };
  return { handleAddItem, isExistCart };
}
export default usePlace;
