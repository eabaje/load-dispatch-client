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
import InviteToRegister from "./pages/register/inviteToRegister";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Header />
      <Switch>
        <Route
          exact
          path="/driver/register/:companyId"
          component={InviteToRegister}
        />
        {/* <Route path="/driver/register/:companyId">
          <InviteToRegister />
        </Route> */}
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/carrier" component={Carrier} />
        <Route path="/shipper" component={Shipper} />
        <Route path="/contact" component={Contact} />
        <Route path="/register" component={Register} />
        <Route path="/term" component={Term} />
        {/* <Route path="/driver-register-form" component={InviteToRegister} /> */}
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
