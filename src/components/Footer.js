import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faHome,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="bg-[#27272a] p-8 relative text-white sm:flex-col">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 px-4 mb-6">
            <h2 className="text-lg font-semibold mb-3 relative">
              <span className="border-l-4 border-[#43B8E8] h-6 mr-3" />
              Acerca de Nosotros
            </h2>
            <ul className="list-none">
              <li>
                <p className="text-gray-300 hover:text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  dapibus, lectus quis commodo elementum, elit orci semper
                  ipsum, non efficitur nisi ligula quis quam. Vivamus
                  pellentesque nisl libero, vel fringilla sem tristique vel.
                  Vestibulum egestas erat eget diam bibendum ullamcorper.
                </p>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 px-4 mb-6">
            <h2 className="text-lg font-semibold mb-4 relative">
              <span className="border-l-4 border-[#43B8E8] h-6 ml-3 mr-7"></span>
              Dirección
            </h2>
            <ul className="list-none">
              <li className="mb-2 flex items-center">
                <FontAwesomeIcon
                  icon={faHome}
                  className="text-[#43B8E8] text-2xl mr-4"
                />
                <a href="#" className="text-gray-300 hover:text-white">
                  Calz. de Tlalpan #2191
                  <br />
                  Col. Ciudad Jardín, Coyoacán, 04370 CDMX.
                </a>
              </li>

              <li className="flex items-center">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="text-[#43B8E8] text-2xl mr-6"
                />
                <a href="#" className="text-gray-300 hover:text-white">
                  Lunes a sábado 10:00 am a 7:00 pm. Domingo 11:00 am a 7:00 pm
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 px-4 mb-6">
            <h2 className="text-lg font-semibold mb-4 ml relative">
              <span className="border-l-4 border-[#43B8E8] h-6 ml-3 mr-5"></span>
              Contacto
            </h2>
            <div className="text-gray-300 mb-4 flex items-center">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-[#43B8E8] text-2xl mr-2"
              />
              <div className="flex flex-col ml-2 justify-center">
                <p>Teléfono:</p>
                <p>120-201-2322</p>
                <p>226-523-326</p>
              </div>
            </div>
            <li className="list-none flex items-center">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-[#43B8E8] text-2xl mr-4"
              />
              <div className="flex flex-col">
                <h2 className="text-gray-300 hover:text-white">Email:</h2>
                <p>kaankun@gmail.com</p>
              </div>
            </li>
          </div>
        </div>
      </div>
      <div className="bg-[#43B8E8] h-[1.5px] w-[100%]"></div>{" "}
      <br />
      <div className="flex">
        <h6 className="mr-4">
          KAANKUN © 2023 - Todos los derechos reservados.
        </h6>
        <a href="#" className="text-gray-300 hover:text-white mr-4">
          Términos y Condiciones
        </a>
        <a href="#" className="text-gray-300 hover:text-white mr-4">
          Aviso de privacidad
        </a>
        <a href="#" className="text-gray-300 hover:text-white">
          Política
        </a>
      </div>
    </footer>
  );
}

export default Footer;
