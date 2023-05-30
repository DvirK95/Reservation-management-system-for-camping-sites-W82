import React, { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import './Cart.css';
import { Spinner } from 'react-bootstrap';
import CartCard from './CartCard';
import CartSum from './CartSum';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from '../../store/cart-actions';
import PackageCard from './PackageCard';

let isInitial = true;

function Cart() {
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const packages = useSelector((state) => state.cart.packages);
  const items = useSelector((state) => state.cart.items);
  const isLoading = useSelector((state) => state.isDataLoad);

  useEffect(() => {
    dispatch(fetchCartData());
    isInitial = false;
  }, [dispatch]);

  if (!items && isLoading) {
    isInitial = false;
    return (
      <Container className="cart-wrapper">
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      </Container>
    );
  }

  if (items.length < 1 && !isInitial) {
    return (
      <Container className="cart-wrapper">
        <h1>הסל ריק</h1>
      </Container>
    );
  }
  return (
    <Container className="cart-wrapper">
      {isLoading && (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      )}
      <Row>
        <Col md={9}>
          <h3>עכשיו בסל שלך</h3>
          {items.length > 0 &&
            items.map((placeObj) => (
              <div className="card-item" key={placeObj.key}>
                <CartCard placeObj={placeObj} />
                <Row className="justify-content-md-center">
                  <div
                    style={{
                      borderBottom: '1px solid',
                      width: '90%',
                      textAlign: 'center',
                    }}
                  />
                </Row>
                <Row>
                  <Col>
                    <h6 className="table-titles">{'חבילה'}</h6>
                  </Col>
                  <Col className="table-titles">{'מחיר'}</Col>
                  <Col></Col>
                </Row>
                {packages &&
                  packages.map(
                    (packageObj) =>
                      Math.floor(Number(packageObj.key)) ===
                        Number(placeObj.key) && (
                        <PackageCard
                          key={packageObj.key}
                          packageObj={packageObj}
                        />
                      )
                  )}
              </div>
            ))}
        </Col>
        <Col md={3}>
          <CartSum totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;