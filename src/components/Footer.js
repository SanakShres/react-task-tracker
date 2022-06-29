import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <div className="copyright">
      <div className="row">
        <div className="col-md-6">
          <span>Copyright &copy; 2022, All Right Reserved</span>
        </div>
        <div className="col-md-6">
          <div className="copyright-menu">
            <ul>
              <li>
                {location.pathname !== "/about" && (
                  <Link to="/about">About</Link>
                )}
              </li>
              <li>
                <Link to="/random">Random</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
