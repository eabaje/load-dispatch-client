import Home from "./pages/home/home";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Carrier from "./pages/carrier/carrier";
import About from "./pages/about/about";
import Shipper from "./pages/shipper/shipper";
import Contact from "./pages/contact/contact";
import Register from "./pages/register/register";
import Term from "./pages/contact/term";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/carrier" component={Carrier} />
        <Route exact path="/shipper" component={Shipper} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/term" component={Term} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
