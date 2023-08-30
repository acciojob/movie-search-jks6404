import React, {useState} from "react";
import "./../styles/App.css";
import axios from "axios";
 const App = () => {
  const [searchTerm, setsearchTerm] = useState("");
   const [movies,setMovies]=useState(undefined)
   function handleSearchMovie(event) {
    event.preventDefault();
    axios
      .get("https://www.omdbapi.com/", {
        params: {
          apikey: "b3f19237",
          s: searchTerm,
        },
      })
      .then((response) => {
        setMovies(response.data.Search);
        setsearchTerm("");
      })
      .catch((err) => setError("Invalid movie name. Please try again."));
  }
  return (
    <div>
      <h2>Search Movie</h2>
      <form>
        <input
          type="text"
          placeholder="Enter Movie Name"
          onChange={(e) => setsearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button type="submit" onClick={handleSearchMovie}>
          Search
        </button>
      </form>

      <ul>
        {movies != undefined ? (
          movies.map((movie) => (
            <div>
              <li>
                <h1>
                  {movie.Title}
                  {movie.Year}
                </h1>
                <img src={movie.Poster} alt="{movie.Title}" />
              </li>
            </div>
          ))
        ) : (
          <p className="error">Invalid movie name. Please try again.</p>
        )}
      </ul>

      <div></div>
    </div>
  );
};

export default App;