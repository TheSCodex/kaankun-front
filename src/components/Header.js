import React, { useState } from "react";
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
    <header>
      <div className="flex justify-end bg-black text-white py-1 px-8">
        <div>
          <FontAwesomeIcon icon={faFacebook} className="mr-4"/>
          <FontAwesomeIcon icon={faTwitter} className="mr-4"/>
          <FontAwesomeIcon icon={faWhatsapp} />
        </div>
      </div>
      <div className="bg-white font-manjari text-black py-3 px-8 border-b-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="" className="h-12 w-12" />
          </div>
          <div className="flex items-center">
            <nav className="text-xl flex items-center mr-[20px]">
              <Link to='/'>
              <h1 className="hover:text-gray-300 hover:cursor-pointer mr-16">
                <strong>INICIO</strong>
              </h1>
              </Link>
              <Link to="/foro">
              <h1 className="hover:text-gray-300 hover:cursor-pointer mr-16">
                <strong>FORO</strong>
              </h1>
              </Link>
              <Link to="/mercado">
              <h1 className="hover:text-gray-300 hover:cursor-pointer mr-8">
                <strong>TIENDA</strong>
              </h1>
              </Link>
            </nav>
            <div className="w-[1px] h-[40px] mr-[40px] border bg-[rgba(0, 0, 0, 0.17)]"></div>
            <div className="flex items-center">
              <Link to="/login">
              <img src={usuario} className="h-8 w-8" />
              </Link>
            </div>
          </div>
          <nav className="md:hidden mr-">
            <a href="#" className="hover:text-gray-300">
              Inicio
            </a>
            <span>|</span>
            <a href="#" className="hover:text-gray-300">
              Foro
            </a>
            <span>|</span>
            <a href="#" className="hover:text-gray-300">
              Tienda
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
