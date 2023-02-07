import {useEffect, useState} from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';


//984065a8
const API_URL = 'http://www.omdbapi.com?apikey=984065a8';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovies = async (title) =>{
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    //console.log(data);
  }
  useEffect(() =>{
    searchMovies(searchTerm);
  },[searchTerm]);


  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className='search'>
        <input placeholder='Search for movies' value ={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}></input>
      <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)}/>
      </div>


      {
        movies?.length > 0 ?
        (
          <div className='container'>
            {
            movies.map( (movie) => (
              <MovieCard movie= {movie} />
            )
            )
            }
        </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )

      }

    </div>
  );
}

export default App;
