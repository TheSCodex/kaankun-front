import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import faro from "../../assets/faro.jpg";

function Inicio() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageAuthor, setCurrentImageAuthor] = useState("");

  useEffect(() => {
    const apiKey = "d9yrUdtArLQ05DlzcdVJN3CiKTzlzAehEfRf2OnDsq5mhuGc20tkTcDZ";

    fetch(
      `https://api.pexels.com/v1/search?query=Cancun&per_page=15&orientation=landscape&size=large`,
      {
        method: "GET",
        headers: {
          Authorization: apiKey,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchedImages = data.photos.map((photo) => photo.src.large);
        const fetchedAuthors = data.photos.map((photo) => photo.photographer);
        setImages(fetchedImages);
        setCurrentImageAuthor(fetchedAuthors[currentImageIndex]);
      })
      .catch((error) => console.error(error));
  }, [currentImageIndex]);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  nextArrow: <></>,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

  return (
    <>
      <div className="mt-[73px]">
        <div className="bg-[#E7E7E7] overflow-auto">
          <div className="relative">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className="carrousel flex items-center object-cover h-[400px]"
                  style={{ margin: "0", padding: "0" }}
                >
                  <img
                    src={image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      margin: "0",
                      padding: "0",
                    }}
                  />
                </div>
              ))}
            </Slider>
            <section className="flex absolute lg:top-10 top-10 lg:left-20 justify-start items-center">
              <section className="ml-12 mb-[25px] text-white">
                <h1 className="font-manjari font-extrabold text-6xl lg:text-8xl">
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
          </div>
          <div className="font-montserrat overflow-hidden pl-8 pr-8 absolute w-full top-[500px] lg:top-[400px]">
            <div className="relative flex lg:flex-row flex-col lg:justify-evenly items-center">
              <div className="boton1 lg:mb-0 mb-4 rounded-md p-8 border bg-white lg:w-[470px] w-[350px] h-[375px]">
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
              <div className="boton1 rounded-md p-8 border bg-white lg:w-[470px] w-[350px] h-[375px]">
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
          <div className="foroCanal lg:justify-center items-center flex lg:flex-row flex-col lg:mb-[30px] mb-[300px] lg:mt-[340px] mt-[760px] h-[300px] border w-full">
            <div className="fotoCanal h-full">
              <img
                src={faro}
                className="h-[300px] w-[350px] lg:rounded-l-md object-cover"
              />
            </div>
            <div className="infoCanal p-6 pl-8 font-montserrat lg:rounded-r-md text-white bg-[#2C2828] h-[300px] w-[350px] lg:w-[715px]">
              <div className="flex mb-4 justify-between">
                <section>
                  <h1 className="text-4xl font-semibold mb-4">El foro</h1>
                  <button className="bg-[#43B8E8] mb-5 text-white px-6 py-1 rounded-md hover:bg-blue-600">
                    Seguir
                  </button>
                </section>
                <p className="text-xs text-center">
                  150
                  <br />
                  Miembros
                </p>
              </div>
              <div>
                <div className="bg-[#43B8E8] h-[1px] mb-4 w-[100%]"></div>
                <h2 className=" text-2xl">
                  Visita el canal oficial de Kaan
                  <br />
                  Kun!
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inicio;
