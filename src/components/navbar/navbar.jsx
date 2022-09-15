import React from "react";
import { useContext, useState } from "react";
//import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";

//import { AuthContext } from "../context/authContext/AuthContext";
//import { logout } from "../context/authContext/AuthActions";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  //  const { dispatch } = useContext(AuthContext);

  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  };
  return (
    <header id="sp-header">
      <div class="container">
        <div class="row">
          <div id="sp-menu" class="col-sm-12 col-md-12">
            <div class="sp-column ">
              <div class="sp-megamenu-wrapper">
                <a id="offcanvas-toggler" href="#">
                  <i class="fa fa-bars"></i>
                </a>
                <ul class="sp-megamenu-parent menu-fade-up hidden-xs">
                  <li
                    className={
                      splitLocation[1] === ""
                        ? "sp-menu-item active"
                        : "sp-menu-item "
                    }
                  >
                    <Link to="/" onClick={refreshPage}>
                      Home
                    </Link>
                  </li>
                  <li
                    className={
                      splitLocation[1] === "about"
                        ? "sp-menu-item active"
                        : "sp-menu-item "
                    }
                  >
                    <Link to="/about">About us</Link>
                  </li>
                  <li
                    className={
                      splitLocation[1] === "shipper"
                        ? "sp-menu-item active"
                        : "sp-menu-item "
                    }
                  >
                    <Link to="/shipper">Shippers</Link>

                    {/* <div class="sp-dropdown sp-dropdown-main sp-menu-right">
                      <div class="sp-dropdown-inner">
                        <ul class="sp-dropdown-items">
                          <li class="sp-menu-item">
                          <Link to="/shipper" >
                            Shippers
                            </Link>
                          </li>
                          <li class="sp-menu-item">
                            <a href="blog-left-sidebar.html">
                              Blog With Left Sidebar
                            </a>
                          </li>
                          <li class="sp-menu-item">
                            <a href="blog-right-sidebar.html">
                              Blog With Right Sidebar
                            </a>
                          </li>
                          <li class="sp-menu-item">
                            <a href="single-blog.html">Single Blog v1</a>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                  </li>
                  <li
                    className={
                      splitLocation[1] === "carrier"
                        ? "sp-menu-item active"
                        : "sp-menu-item "
                    }
                  >
                    <Link to="/carrier">carriers</Link>
                  </li>

                  <li
                    className={
                      splitLocation[1] === "contact"
                        ? "sp-menu-item active"
                        : "sp-menu-item "
                    }
                  >
                    <Link to="/contact">Contact</Link>
                  </li>

                  <li
                    className={
                      splitLocation[1] === "driver-register-form"
                        ? "sp-menu-item active"
                        : "sp-menu-item "
                    }
                  >
                    <Link to="/driver/register/2">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
