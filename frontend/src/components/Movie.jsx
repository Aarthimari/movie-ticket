import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../App';
const Movie1 = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    fetch('https://backend-crud-one.vercel.app/product') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const selectedMovie = data.find((movie) => movie.id === Number(id)); 
        setMovie(selectedMovie);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (movie && movie.id) { 
      addToCart(movie); 
    } else {
      alert('Movie data is not available'); 
    }
  };
  return (
    <div className="container">
        <>
          <h3 className='text-center mt-3'>{movie.name}</h3>
          <div className="row">
            <div className="col-md-6 mt-1">
              <img style={{ height: '350px', width: '400px' }} src={movie.image} alt={movie.name} className="img-fluid mt-3" />
            </div>
            <div className="col-md-6 mt-3">
              <p><strong>Release Date :</strong> {movie.releasedate}</p>
              <p><strong>Ticket Price :</strong> {movie.ticketprice}</p>
              <p><strong>Director :</strong> {movie.director}</p>
              <p style={{ fontSize: '13px' }}>
                <strong style={{ fontSize: '16px' }}>Description :</strong> {movie.description}
              </p>
              <button className='btn btn-danger mt-3' onClick={handleAddToCart}>Add to Cart</button>
              <button className='btn btn-success mt-3 mx-5'>Book Now</button>
            </div>
          </div>
        </>
    </div>
  );
};

export default Movie1;
