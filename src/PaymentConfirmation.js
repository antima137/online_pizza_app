import React from 'react';
import { FaThumbsUp } from 'react-icons/fa'; 
import { Container } from 'react-bootstrap';

const PaymentConfirmation = () => {
  return (
    <Container className="mt-4 text-center">
      <FaThumbsUp size={50} color="green" />
      <h2>Your payment has been completed successfully!</h2>
      <p>Thank you for your order! We appreciate your business.</p>
      <p>Your delicious pizza will be on its way shortly.</p>
    </Container>
  );
};

export default PaymentConfirmation;
