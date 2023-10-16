import React from 'react';
import Fondo from './fondo_nosotros.jpg';

function Nosotros() {
  return (
    <div className="relative h-screen bg-gray-200">
      <div className="h-48 md:h-64 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${Fondo})` }}>
      </div>
      <div className="absolute top-[15%] left-[25%] items-center md:w-1/2 rounded-lg bg-white p-4">
          <div className="md:w-50 md:mx-auto">
            <div className="md:flex md:justify-between">
              <div className="md:w-1/2 md:px-6">
                <h2 className="md:px-6 text-lg font-semibold text-left">¿QUIENES SOMOS?</h2>
              </div>
              <div className="md:w-1/2 md:px-4">
                <p className="text-justify">
                  ¿Qué es Lorem Ipsum?
                  Lorem Ipsum es simplemente un texto de relleno de la industria de la impresión y la tipografía.
                  Lorem Ipsum ha sido el texto de relleno estándar de la industria desde el siglo XVI, cuando un impresor
                  desconocido tomó una galería de tipos y los mezcló para hacer un libro de muestras tipográficas.
                </p>
              </div>
            </div>
          </div>
        </div>
      <div className="flex   flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 p-4 md:pt-24">
        <div className="bg-white rounded-lg p-2 md:p-4 w-full md:w-1/3">
          <h2 className="text-lg font-semibold text-center">MISION</h2>
          <p>
            ¿Qué es Lorem Ipsum?
            Lorem Ipsum es simplemente un texto de relleno de la industria de la impresión y la tipografía.
            Lorem Ipsum ha sido el texto de relleno estándar de la industria desde el siglo XVI, cuando un impresor
            desconocido tomó una galería de tipos y los mezcló para hacer un libro de muestras tipográficas.
          </p>
        </div>
        <div className="bg-white rounded-lg p-2 md:p-4 w-full md:w-1/3">
          <h2 className="text-lg font-semibold text-center">VISION</h2>
          <p>
            ¿Qué es Lorem Ipsum?
            Lorem Ipsum es simplemente un texto de relleno de la industria de la impresión y la tipografía.
            Lorem Ipsum ha sido el texto de relleno estándar de la industria desde el siglo XVI, cuando un impresor
            desconocido tomó una galería de tipos y los mezcló para hacer un libro de muestras tipográficas.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
