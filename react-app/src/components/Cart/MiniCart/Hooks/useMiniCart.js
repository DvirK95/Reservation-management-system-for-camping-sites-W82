import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../../../store/cart-slice';
import {
  removeItemFromCart,
  fetchCartData,
} from '../../../../store/cart-actions';
import { useEffect } from 'react';

function useMiniCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // boxes handler
  const handleMouseEnter = () => {
    dispatch(cartActions.showCart(true));
  };

  const handleMouseLeave = () => {
    dispatch(cartActions.showCart(false));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  // buttons handler
  const isDisable = cart.items.length < 1;
  const handleClickToCheckout = () => {
    if (!isDisable) {
      navigate('/checkout');
    }
  };
  const handleClickToCart = () => {
    if (!isDisable) {
      navigate('/cart');
    }
  };
  return {
    cart,
    handleClickToCart,
    handleClickToCheckout,
    handleRemoveItem,
    handleMouseEnter,
    handleMouseLeave,
    isDisable,
  };
}
export default useMiniCart;
