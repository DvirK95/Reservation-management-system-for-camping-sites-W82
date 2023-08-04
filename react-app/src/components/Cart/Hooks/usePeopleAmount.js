import { useDispatch } from 'react-redux';
import { changePeopleAmount } from '../../../store/cart-actions';

function usePeopleAmount() {
  const dispatch = useDispatch();

  const handleChangePeople = (obj) => {
    dispatch(changePeopleAmount(obj));
  };

  return { handleChangePeople };
}

export default usePeopleAmount;
