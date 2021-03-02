// adding css to jsx is that easy
import "./App.css"; // This pattern is preferred where css for this component has a matching .css filename
import { Route, Switch } from "react-router-dom";
// A component import
import HomePage from "./components/home/HomePage";
import MovieDetail from "./components/home/MovieDetail";

// Defining our <App /> component the function name matches the file name
function App() {
  // All functional components need to return jsx with one parent element
  return (
    <div className="App">
      <Switch>
        <HomePage />
        <Route exact path="/movie/:movieId" component={MovieDetail} />
      </Switch>
    </div>
  );
}

// Makes our Component available for import
export default App;

//display login only until user is logged in/registered...then on validation display home page

//Login/Register component
//Home component
//Favorite component

//<Login onSubmit = <Home/></Login>
