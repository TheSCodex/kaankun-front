import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import usuario from "../assets/usuario.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

function Header() {
  return (
    <header className="fixed top-0 bottom-0 w-full z-50 max-h-[73px] ">
      <div className="flex lg:justify-end justify-center bg-black text-white px-8">
        <div>
          <FontAwesomeIcon icon={faFacebook} className="mr-4" />
          <FontAwesomeIcon icon={faTwitter} className="mr-4" />
          <FontAwesomeIcon icon={faWhatsapp} />
        </div>
      </div>
      <div className="bg-white font-manjari text-black py-1 px-8 border-b-2">
        <div className="container mx-auto flex lg:flex-row flex-col items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="" className="h-10 w-10" />
          </div>
          <div className="flex lg:mt-0 mt-4">
            <div className="flex items-center">
              <nav className="lg:text-lg text-lg flex items-center mr-4 lg:mr-[20px]">
                <Link to="/">
                  <h1 className="hover:text-gray-300 hover:cursor-pointer mr-6 lg:mr-16">
                    <strong>INICIO</strong>
                  </h1>
                </Link>
                <Link to="/foro">
                  <h1 className="hover:text-gray-300 hover:cursor-pointer mr-6 lg:mr-16">
                    <strong>FORO</strong>
                  </h1>
                </Link>
                <Link to="/mercado">
                  <h1 className="hover:text-gray-300 hover:cursor-pointer mr-6 lg:mr-8">
                    <strong>TIENDA</strong>
                  </h1>
                </Link>
              </nav>
              <div className="lg:w-[1px] lg:h-[40px] h-[20px] mr-[40px] border bg-[rgba(0, 0, 0, 0.17)]"></div>
              <div>
                <Link to="/login">
                  <img src={usuario} className="lg:h-6 lg:w-6 h-6 w-6 mb-2"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
