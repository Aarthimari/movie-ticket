import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://backend-crud-one.vercel.app/product') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className="container-fluid">
      <h1 className="text-center my-5">Movie Ticket Booking</h1>

      {/* Carousel Section Start */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            style={{ height: '300px' }}
            src="https://i.pinimg.com/564x/4a/fa/12/4afa126b5d2aca0d6d3c50fc2cd63bc7.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            style={{ height: '300px' }}
            src="https://i.pinimg.com/564x/40/27/0c/40270c05328df443928491a3969921a2.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            style={{ height: '300px' }}
            src="https://i.pinimg.com/736x/1e/a5/6d/1ea56d3114c08d9962c6186b58a07d6f.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
      {/* Carousel Section End */}

      {/* Movie Section Start */}
      <div className="row mx-5 mt-5">
        {movies.map((movie) => (
          <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card mx-auto" style={{ height: '350px', width: '100%' }}>
              {movie.image && (
                <img
                  className="card-img-top img-fluid"
                  src={movie.image}
                  alt={movie.name}
                  style={{ height: '100%' }}
                />
              )}
              <div className="card-body">
                <h6 className="fw-bold">{movie.name}</h6>
                <p className="card-text">Release: {movie.releasedate}</p>
                <h6 className="fw-bold">Ticket: {movie.ticketprice}</h6>

                {/* Link to individual movie page */}
                <Link to={`/movie/${movie.id}`} className="btn btn-danger">
                  View More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Movie Section End */}
    </div>
  );
};

export default Movies;
