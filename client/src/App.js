import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Portfolios } from "./pages/Portfolios";
import { SinglePortFolio } from "./pages/SinglePortfolio";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/:id" component={SinglePortFolio} />
      <Route exact path="/" component={Portfolios} />
    </BrowserRouter>
  );
}

export default App;
