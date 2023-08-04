import { useDispatch } from 'react-redux';
import {
  changePackageOption,
  changePackageOptionOld,
  changePackageAmount,
} from '../../../store/cart-actions';

function usePackageCard() {
  const dispatch = useDispatch();

  const handleChangeAmount = (obj) => {
    if (obj.guest === 0 || obj.opt === 'optout') {
      dispatch(changePackageOption(obj.key, 'optout'));
    } else if (obj.guest > 0 || obj.opt === 'optin') {
      dispatch(changePackageAmount(obj));
    }
  };

  const handleChangePacakge = (key, opt) => {
    if (opt === 'out') {
      dispatch(changePackageOptionOld(key, 'optin'));
    } else {
      dispatch(changePackageOptionOld(key, 'optout'));
    }
  };

  return { handleChangeAmount, handleChangePacakge };
}
export default usePackageCard;
