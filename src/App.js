import { useEffect, useState } from 'react';
import './App.css';
import {getMovieList, searchMovie} from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  // const imgUrl = process.env.REACT_APP_BASEIMGURL;

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  },[]);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div key={i} className="col-md-4 p-4 d-flex align-items-stretch">
          <div className="card bg-success text-light p-4">
            <div className="card-title">{movie.title}</div>
            <img className="img-fluid" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt={movie.title} />
            <div className='card-footer pt-2'>
              <h5 className='body text-start'>Release Date : {movie.release_date}</h5>
              <h5 className='body text-start'>Rating : {movie.vote_average}</h5>
            </div>
          </div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length >3 ) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
      console.log({query: query});
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='container p-5 col-xs-4'>
          <h1>LATIHAN PROJECT MOVIE</h1>
          <input className="form-control" placeholder="Cari Film" onChange={({ target }) => search(target.value)} ></input>
        </div>
        <div className="container">
          <div className="col">
            <div className="row m-4">
                <PopularMovieList/>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
