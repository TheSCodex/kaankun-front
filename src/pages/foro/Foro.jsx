import React from 'react';
import Cun from "../../assets/Cun.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faComment, faCommentDots, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Foro() {
  return (
    <div className='bg-[#E7E7E7] lg:h-full h-full font-montserrat lg:mt-[73px] mt-[122px] '>
      <div className="relative">
        <div
          className="flex flex-col items-center justify-center pl-8 pr-8 foto bg-cover w-full shrink-0 h-[200px]"
          style={{ backgroundImage: `url(${Cun})` }}
        >
          <h1 className='mt-12 font-montserrat font-semibold text-3xl text-white text-center'>FOROS DE CANCUN</h1>
          <h2 className='font-montserrat font-medium text-xl text-white text-center'>Te damos la bienvenida a nuestro foro enfocado a Cancún</h2>
        </div>
        <h2 className='font-monserrat font-semibold text-xl mt-4 ml-8 '>Explora algunos de nuestros canales mas populares</h2>
        <div className="grid grid-cols-3 gap-4 p-8">
          <Link to="/canal" className="bg-white shadow-md rounded p-4 lg:p-6 mb-4 lg:mb-0">
            <div className="flex flex-col lg:flex-row justify-between items-start">
              <div className="mb-2 lg:mb-0 lg:mr-4">
                <h3 className="font-bold text-xl lg:text-2xl mb-1">Kaan-Kun</h3>
                <FontAwesomeIcon icon={faCommentDots} className="text-xl lg:text-2xl" />
                <p className="text-sm lg:text-base">Este es nuestro canal oficial</p>
              </div>
              <button className="mt-2 lg:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 lg:px-6 rounded-2xl">
                Seguir
              </button>
            </div>
          </Link>
          <Link to="/canal" className="bg-white shadow-md rounded p-4 lg:p-6 mb-4 lg:mb-0">
            <div className="flex flex-col lg:flex-row justify-between items-start">
              <div className="mb-2 lg:mb-0 lg:mr-4">
                <h3 className="font-bold text-xl lg:text-2xl mb-1">Canal 2</h3>
                <FontAwesomeIcon icon={faCommentDots} className="text-xl lg:text-2xl" />
                <p className="text-sm lg:text-base">Descripción de canal</p>
              </div>
              <button className="mt-2 lg:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 lg:px-6 rounded-2xl">
                Seguir
              </button>
            </div>
          </Link>
          <Link to="/canal" className="bg-white shadow-md rounded p-4 lg:p-6 mb-4 lg:mb-0">
            <div className="flex flex-col lg:flex-row justify-between items-start">
              <div className="mb-2 lg:mb-0 lg:mr-4">
                <h3 className="font-bold text-xl lg:text-2xl mb-1">Canal 3</h3>
                <FontAwesomeIcon icon={faCommentDots} className="text-xl lg:text-2xl" />
                <p className="text-sm lg:text-base">Descripción de canal</p>
              </div>
              <button className="mt-2 lg:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 lg:px-6 rounded-2xl">
                Seguir
              </button>
            </div>
          </Link>
          <Link to="/canal" className="bg-white shadow-md rounded p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start">
              <div className="mb-2 lg:mb-0 lg:mr-4">
                <h3 className="font-bold text-xl lg:text-2xl mb-1">Canal 4</h3>
                <FontAwesomeIcon icon={faCommentDots} className="text-xl lg:text-2xl" />
                <p className="text-sm lg:text-base">Descripción de canal</p>
              </div>
              <button className="mt-2 lg:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 lg:px-6 rounded-2xl">
                Seguir
              </button>
            </div>
          </Link>
          <Link to="/canal" className="bg-white shadow-md rounded p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start">
              <div className="mb-2 lg:mb-0 lg:mr-4">
                <h3 className="font-bold text-xl lg:text-2xl mb-1">Canal 5</h3>
                <FontAwesomeIcon icon={faCommentDots} className="text-xl lg:text-2xl" />
                <p className="text-sm lg:text-base">Descripción de canal</p>
              </div>
              <button className="mt-2 lg:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 lg:px-6 rounded-2xl">
                Seguir
              </button>
            </div>
          </Link>
          <Link to="/canal" className="bg-white shadow-md rounded p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start">
              <div className="mb-2 lg:mb-0 lg:mr-4">
                <h3 className="font-bold text-xl lg:text-2xl mb-1">Canal 6</h3>
                <FontAwesomeIcon icon={faCommentDots} className="text-xl lg:text-2xl" />
                <p className="text-sm lg:text-base">Descripción de canal</p>
              </div>
              <button className="mt-2 lg:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 lg:px-6 rounded-2xl">
                Seguir
              </button>
            </div>
          </Link>
        </div>
        <h2 className='font-monserrat font-semibold text-xl mt-4 ml-8 '>Nuevas publicaciones</h2>
        <div className="grid grid-cols-4 gap-4 p-8">
          <div className="bg-white shadow-md rounded p-6 flex flex-col items-start">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCircleUser} className=" text-4xl mr-2 " />
              <div>
                <h3 className="font-bold font-montserrat text-xl">User</h3>
                <p className='font-montserrat text-sm'>26-oct</p>
              </div>
            </div>
            <p className='font-medium'>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. </p>
            <p className='mb-3 text-xs font-semibold'>Canal2</p>
            <div className='flex justify-between w-full pr-2 '>
              <div className='flex items-center ml-8'>
                <FontAwesomeIcon icon={faThumbsUp} className=" text-xs" />
                <p className='mx-1 text-xs'>Like</p>
              </div>
              <div className='flex items-center mr-8'>
                <FontAwesomeIcon icon={faComment} className=" text-xs" />
                <p className='mx-1 text-xs'>Comment</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Foro
