import React from "react";
import Fondo from "./fondo_nosotros.jpg";

function Nosotros() {
  return (
    <>
      <div className="lg:mt-[73px] mt-[122px] bg-gray-200 overflow-auto">
        <div className="relative w-full">
          <div
            className="h-48 lg:h-[325px] bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${Fondo})` }}
          ></div>
          <div className="Nosotros absolute top-40 left-1/2 transform -translate-x-1/2 w-[95%] lg:w-[1000px] lg:h-[370px] h-[400px] rounded-lg bg-white p-8">
            <div className="flex lg:flex-row lg:justify-between flex-col">
              <div>
                <h2 className="lg:mt-[80px] lg:ml-[80px] lg:text-2xl text-xl font-semibold font-montserrat text-center">
                  ¿QUIENES SOMOS?
                </h2>
              </div>
              <div className="md:w-1/2">
                <p className="text-justify lg:text-lg font-montserrat">
                  Somos un proyecto dedicado a la creación de un espacio seguro
                  que busca empoderar a productores y artesanos locales. Nuestra
                  pasión radica en compartir su arte y la inmensa cultura de
                  nuestra región. En Kaan Kun, encontrarás información detallada
                  sobre las tradiciones locales y una exposición de productos
                  realizados con un gran talento y amor. Nuestro propósito es
                  conectar a nuestra comunidad con sus raíces culturales y
                  fomentar un aprecio por el mercado local.
                </p>
              </div>
            </div>
          </div>
          <div className="Preguntas flex lg:flex-row lg:justify-center items-center flex-col lg:mt-[240px] mt-[390px] mb-16">
            <div className="bg-white rounded-lg lg:mr-4 mb-4 p-4 lg:w-[400px] lg:h-[380px] w-[95%]">
              <h2 className="text-lg font-semibold text-center">MISION</h2>
              <p>
                Nuestra misión en Kaan Kun es crear un espacio seguro y acogedor
                que empodere a productores y artesanos locales al compartir su
                arte y la rica cultura de nuestra región. Estamos comprometidos
                en preservar y promover las tradiciones locales, así como en
                exhibir productos hechos con talento y amor. Buscamos conectar a
                nuestra comunidad con sus raíces culturales y fomentar un
                aprecio por la artesanía local, apoyando así la prosperidad de
                nuestros productores.
              </p>
            </div>
            <div className="bg-white rounded-lg lg:ml-4 mb-4 p-4 lg:w-[400px] h-[380px] w-[95%]">
              <h2 className="text-lg font-semibold text-center">VISION</h2>
              <p>
                En Kaan Kun, visualizamos un mundo en el que los productores y
                artesanos locales sean reconocidos y valorados por su
                creatividad y habilidades únicas. Queremos convertirnos en un
                referente en la promoción de la cultura regional, sirviendo como
                un puente entre las tradiciones ancestrales y un público global.
                Nuestra visión es contribuir al crecimiento económico y la
                preservación de la herencia cultural local, al tiempo que
                ofrecemos a los visitantes una experiencia enriquecedora y
                auténtica. Esperamos inspirar un mayor aprecio por la diversidad
                cultural y el talento local en cada rincón de nuestra región y
                más allá.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nosotros;
