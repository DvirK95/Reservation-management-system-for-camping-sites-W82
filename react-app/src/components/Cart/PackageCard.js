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
    <Row style={{ marginBottom: '1rem' }}>
      <Col>
        <h6 className="item-title">{packageObj.name}</h6>
      </Col>
      <Col>
        <span>₪{packageObj.rate.total}</span>
      </Col>
      <Col>
        <button
          className={
            packageObj.opt === 'out' ? 'third-button' : 'fourth-button'
          }
          onClick={() => {
            handleChangePacakge(packageObj.key, packageObj.opt);
          }}
        >
          {packageObj.opt === 'out' ? 'הוסף' : 'הסר'}
        </button>
      </Col>
    </Row>
  );
}
export default PackageCard;
