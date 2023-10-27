import React from 'react'
import Cun from "../../assets/Cun.jpg";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function PostsCanal() {
  return (
    <div className='bg-[#E7E7E7] lg:h-full h-full font-montserrat lg:mt-[73px] mt-[122px] '>
      <Header/>
      <div className="relative">
        <div
          className="flex flex-col  justify-center pl-8 pr-8 foto bg-cover w-full shrink-0 h-[200px]"
          style={{ backgroundImage: `url(${Cun})` }}
        >
          <h1 className='mt-12 font-montserrat font-semibold text-3xl text-white text-left '>Kaan-kun</h1>
        </div>
        <h2 className='font-monserrat font-normal text-xl mt-4 ml-8 '>Publicado por: User1</h2>
        <div className="bg-white p-4 mt-4 rounded-lg shadow-lg mx-5">
          <h3 className="font-monserrat font-semibold text-lg">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. </h3>
          
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default PostsCanal