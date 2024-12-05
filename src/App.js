import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './PizzeriaLogo.png';
import ingredientsImage from './f.jpg'; 
import chefsImage from './s.webp'; 
import deliveryImage from './t.webp'; 
import OrderPizza from './OrderPizza'; 
import BuildPizza from './BuildPizza';
import { CartProvider } from './CartContext'; 
import Cart from './Cart';
import { useCart } from './CartContext';
function App() {
  return (
    <CartProvider>
    <Router>
      <div className="navbar-container">
        <Navbar expand="lg" className="navbar">
          <Container fluid>
            <Navbar.Brand href="http://localhost:3000/">
              Pizzeria
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <Nav.Link as={Link} to="http://localhost:3000/">
                  <img src={logo} alt="Pizzeria Logo" style={{ height: '40px' }} />
                </Nav.Link>
                <Nav.Link as={Link} to="/order-pizza">Order Pizza</Nav.Link>
                <Nav.Link as={Link} to="/build-pizza">Build Ur Pizza</Nav.Link>
              </Nav>
              <ShoppingCartButton />
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order-pizza" element={<OrderPizza />} />
          <Route path="/build-pizza" element={<BuildPizza />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <footer className="footer">
          <p>&copy; 2024 Pizzeria. All rights reserved.</p>
        </footer>
      </div>
    </Router>
    </CartProvider>
  );
}
function ShoppingCartButton() {
  const { totalQuantity } = useCart();
  
  return (
    <Button className="shopping-cart-button" as={Link} to="/cart">
      <i className="fas fa-shopping-cart" style={{ marginRight: '5px' }}></i>
      Shopping Cart {totalQuantity > 0 && `(${totalQuantity})`}
    </Button>
  );
}
function Home() {
  return (
    <>
      <div className="story-container">
        <h2 className="story-heading">Our Story</h2>
        <p>We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans 
          were given situations when they had to come up with wacky and fun excuses. The person with the best 
          excuse won the best excuse badge and won pizzeria's vouchers. Their enthusiastic response proved that 
          Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!
        </p>
        <p>Ever since we launched the Tastiest Pan Pizza, people have not been able to resist the softiest,
          cheesiest, crunchiest, butteriest Domino's Fresh Pan Pizza. They have been leaving the stage in the middle
          of a performance and even finding excuses to be disqualified in a football match.
        </p>
        <p>We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations 
          when they had to come up with wacky and fun excuses. The person with the best excuse won the Best excuse 
          badge and won Domino's vouchers. Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the 
          Tastiest Pan Pizza. Ever!
        </p>
      </div>
      <div className="ingredients-container">
        <img src={ingredientsImage} alt="Ingredients" className="ingredients-image" />
        <div className="ingredients-content">
          <h2 className="ingredients-heading">Ingredients</h2>
          <p>We're ruthless about goodness. We have no qualms about tearing up a day-old lettuce leaf
            (straight from the farm), or steaming a baby carrot. Cut. Cut. Chop. Chop. Steam. Steam.
            Stir. Stir. While they're still young and fresh—that's our motto. It makes the kitchen a 
            better place.
          </p>
        </div>
      </div>
      <div className="chefs-container">
        <div className="chefs-content">
          <h2 className="chefs-heading">Our Chefs</h2>
          <p>They make sauces sing and salads dance. They create magic with skill, knowledge, passion, and stirring
            spoons (among other things). They make goodness so good, it doesn't know what to do with itself. We
            do though. We send it to you.
          </p>
        </div>
        <img src={chefsImage} alt="Our Chefs" className="chefs-image" />
      </div>
      <div className="delivery-container">
        <img src={deliveryImage} alt="Delivery" className="delivery-image" />
        <div className="delivery-content">
          <h2 className="delivery-heading">45 Min Delivery</h2>
        </div>
      </div>
    </>
  );
}

export default App;
