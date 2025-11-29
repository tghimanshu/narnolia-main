import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Portfolios } from "./pages/Portfolios";
import { SinglePortFolio } from "./pages/SinglePortfolio";

/**
 * Main application component.
 * Sets up the routing for the application using React Router.
 *
 * @component
 * @returns {JSX.Element} The rendered component with routing configuration.
 */
function App() {
  return (
    <BrowserRouter>
      <Route exact path="/:id" component={SinglePortFolio} />
      <Route exact path="/" component={Portfolios} />
    </BrowserRouter>
  );
}

export default App;
