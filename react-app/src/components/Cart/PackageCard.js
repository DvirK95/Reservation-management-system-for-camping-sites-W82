import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changePackageOption } from '../../store/cart-actions';

function PackageCard({ packageObj }) {
  const dispatch = useDispatch();

  const handleChangePacakge = (key, opt) => {
    if (opt === 'out') {
      dispatch(changePackageOption(key, 'optin'));
    } else {
      dispatch(changePackageOption(key, 'optout'));
    }
  };

  return (
    <Row>
      <Col>
        <span>{packageObj.name}</span>
      </Col>
      <Col>
        <span>₪{packageObj.rate.total}</span>
      </Col>
      <Col>
        <button
          onClick={() => {
            handleChangePacakge(packageObj.key, packageObj.opt);
          }}
        >
          {packageObj.opt === 'out' ? '+' : '-'}
        </button>
      </Col>
    </Row>
  );
}
export default PackageCard;
