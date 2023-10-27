import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Canal() {
  return (
    <div className='bg-[#E7E7E7] lg:h-full h-full font-montserrat lg:mt-[73px] mt-[122px]'>
      <Header/>
      <div className="relative">
        <div className="flex flex-col justify-center pl-8 pr-8 w-4/6 shrink-0 h-[200px]">
          <h1 className='font-semibold text-left text-5xl mt-5 ml-4'>Kaan-Kun</h1>
          <button className="mt-2 ml-4 w-3/5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
            Crea tu publicacion
          </button>
        </div>
        <Link to={'/post'} className='bg-white shadow-md rounded p-4 lg:p-6 mb-4 lg:mb-0'>
          <div className="flex flex-col lg:flex-row justify-between items-start">
          <div className="mb-2 lg:mb-0 lg:mr-4">
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
        </Link>
      </div>
      <Footer/>
    </div>
  );
}

export default Canal;
