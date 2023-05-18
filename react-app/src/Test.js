import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItemCart,
  fetchCartData,
  removeItemFromCart,
} from './store/cart-actions';
import { Spinner } from 'react-bootstrap';

function Test() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleAddItem = (item) => {
    dispatch(addItemCart(item.id, item.slip));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p>Cart Items</p>

      {cart.isDataLoad && (
        <div>
          <Spinner animation="border" />
        </div>
      )}
      {cart.items.map((item) => (
        <div key={item.item_id}>
          <p>{item.name}</p>
          <button onClick={() => handleRemoveItem(item.item_id)}>Remove</button>
        </div>
      ))}
      <p>price: שח{cart.totalPrice}</p>
      <button
        onClick={() =>
          handleAddItem({
            id: '50',
            slip: '50.20230615X1-adult.1-child.0-toddler.0',
          })
        }
      >
        add
      </button>
    </div>
  );
}

export default Test;
