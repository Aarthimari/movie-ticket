import { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import Movies from './components/Movielist';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import home from './components/images/home.svg';
import shopping from './components/images/shopping.svg';
import logout from './components/images/logout.svg';
import Movie1 from './components/Movie';
import Cart from './components/Cart';
import SignIn from './components/SignIn';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (movie) => {
    setCartItems((prevItems) => [...prevItems, movie]);
  };
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify({ loggedIn: true }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <CartProvider>
      <Router>
        <div>
        {!isLoggedIn ? (
            <Routes>
              <Route path="/login" element={<SignIn onLogin={handleLogin} />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </Routes>
          ) : (

            <>
              {/* Navbar */}
              <Navbar bg="dark" variant="dark" expand="lg">
                <div className="container">
                  <Navbar.Brand as={Link} to="/">Movie Booking</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                      <Nav.Link as={Link} to="/"><img src={home} alt="home" /></Nav.Link>
                      <Nav.Link as={Link} to="/cart"><img src={shopping} alt="shopping" /></Nav.Link>
                      <Nav.Link as={Link} to="/" onClick={handleLogout}><img src={logout} alt="logout" /></Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </div>
              </Navbar>

              {/* Routes */}
              <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/movie/:id" element={<Movie1 />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </>
          )}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
