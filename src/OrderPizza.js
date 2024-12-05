import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import './OrderPizza.css';
import { useCart } from './CartContext';

const OrderPizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); 
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/import-pizza');
        setPizzas(response.data);
      } catch (error) {
        console.error('Error fetching pizza data:', error);
        setError('Failed to load pizzas. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const handleAddToCart = (pizza) => {
    addToCart(pizza);
    setAddedToCart((prev) => ({ ...prev, [pizza.id]: true })); 
  };

  return (
    <Container className="mt-4">
      {error ? (
        <h3 className="error-message">{error}</h3>
      ) : loading ? (
        <h3 className="loading-message">Loading pizzas...</h3>
      ) : (
        <Row className="g-0">

          {pizzas.length > 0 ? (
            pizzas.map((pizza) => (
              <Col md={6} key={pizza.id} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <Row>
                      <Col md={3}> 
                        <Card.Title>{pizza.name}</Card.Title>
                        <span
                          className={`pizza-type ${pizza.type}`}
                          style={{
                            marginTop: '5px',
                            display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            backgroundColor: pizza.type === 'veg' ? 'green' : 'red',
                          }}
                        />
                        <Card.Text>
                          <strong>Price: ₹{pizza.price}</strong>
                        </Card.Text>
                      </Col>
                      <Col md={5}> 
                        <Card.Text>{pizza.description}</Card.Text>
                        <Card.Text>
                          <strong>Ingredients:</strong> {Array.isArray(pizza.ingredients) && pizza.ingredients.length > 0 ? pizza.ingredients.join(', ') : 'No ingredients available'}
                        </Card.Text>
                        <Card.Text>
                          <strong>Toppings:</strong> {Array.isArray(pizza.topping) && pizza.topping.length > 0 ? pizza.topping.join(', ') : 'No toppings available'}
                        </Card.Text>
                      </Col>
                      <Col md={4}> 
                        <Card.Img variant="top" src={pizza.image} alt={pizza.name} />
                        <Button className="add-to-cart-btn mt-2" onClick={() => handleAddToCart(pizza)}>
                          {addedToCart[pizza.id] ? 'Added' : 'Add to Cart'}
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p>No pizzas available</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default OrderPizza;
