import React, { useState } from 'react';
import { useCart } from './CartContext';
import PaymentConfirmation from './PaymentConfirmation';
import { Button, Container, Table } from 'react-bootstrap';

const Cart = () => {
  const { cartItems, totalPrice, clearCart, removeFromCart, updateQuantity } = useCart();
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleProceedToPayment = () => {
    clearCart();
    setPaymentCompleted(true);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return; 
    updateQuantity(id, quantity);
  };

  if (paymentCompleted) {
    return <PaymentConfirmation />;
  }

  return (
    <Container className="mt-4">
      <h2>Your Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          <Table striped bordered hover>
            
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '50px', height: '50px' }} 
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      min="1"
                      style={{ width: '60px' }}
                    />
                  </td>
                  <td className="text-center">
                    <Button variant="danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3>Total: ₹{totalPrice}</h3>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="success" onClick={handleProceedToPayment}>
              Proceed to Payment
            </Button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </Container>
  );
};

export default Cart;
