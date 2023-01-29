import React from 'react';
import {Row, Col} from 'react-bootstrap';

const Store = () => {
  return (
    <React.Fragment>
    <h1>Welcome to the store!</h1>
    <Row xs={1} md={3} className="g-4">
      <Col align="center">
        <h1>Product</h1>
      </Col>
    </Row>
    </React.Fragment>
  )
  }
  
  export default Store;