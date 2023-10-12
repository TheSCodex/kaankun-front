import React from "react";
import tortilla from "../../assets/tortilla.jpg";

function Inicio() {
  return (
    <>
      <div className="">
        <div className="bg-[#E7E7E7]">
          <div className="relative">
            <div
              div
              className="flex pl-8 pr-8 items-center justify-between foto bg-cover h-[500px]"
              style={{ backgroundImage: `url(${tortilla})` }}
            >
              <section className="Left flex items-center">
                <svg
                  width="32"
                  height="34"
                  viewBox="0 0 32 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 14.6641L29.2266 0.445312L31.1406 6.85156L8.79688 17.0859L31.1406 27.2422L29.2266 33.6094L0.75 19.2344V14.6641Z"
                    fill="white"
                  />
                </svg>
                <section className="ml-[63px] mb-[25px] text-white">
                  <h1 className="font-manjari font-extrabold text-8xl">
                    Kaan
                    <br />
                    Kun
                  </h1>
                  <p className="font-montserrat text-lg">
                    Foro de tradiciones en
                    <br />
                    Cancún
                  </p>
                </section>
              </section>
              <svg
                width="31"
                height="34"
                viewBox="0 0 31 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.75 14.6641L2.27344 0.445312L0.359375 6.85156L22.7031 17.0859L0.359375 27.2422L2.27344 33.6094L30.75 19.2344V14.6641Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="font-montserrat overflow-hidden pl-8 pr-8 absolute w-full top-[400px]">
              <div className="relative flex justify-evenly">
                <div className="boton1 rounded-md p-8 border bg-white w-[470px] h-[375px]">
                  <h1 className="text-4xl mb-4 font-semibold">
                    Visita el
                    <br />
                    Mercado
                  </h1>
                  <p className="mb-[104px]">
                    Un lugar ideal para comprar y <br />
                    vender productos hechos 100% por <br />
                    locales
                  </p>
                  <button className="border text-sm rounded-md font-bold text-white bg-[#43B8E8] w-[115px] h-[35px]">
                    Ir ahora!
                  </button>
                </div>
                <div className="boton1 rounded-md p-8 border bg-white w-[470px] h-[375px]">
                  <h1 className="text-4xl mb-4 font-semibold">
                    ¿Quiénes
                    <br />
                    Somos?
                  </h1>
                  <p className="mb-8">
                    En Kaan Kun nuestro propósito es crear un
                    <br />
                    espacio seguro para que productores y<br />
                    artesanos locales puedan compartir
                    <br />
                    información sobre las tradiciones
                    <br />
                    de nuestra región y exponer los productos que
                    <br />
                    realizan a través de sus nobles artes
                  </p>
                  <button className="border text-sm rounded-md font-bold text-white bg-[#43B8E8] w-[115px] h-[35px]">
                    Conoce más
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="foroCanal flex mt-[400px] border w-full">
            <p>Canal oficial del foro</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inicio;
