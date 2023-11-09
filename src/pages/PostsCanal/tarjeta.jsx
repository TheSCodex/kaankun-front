import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import faro from "../../assets/faro.jpg";


function Tarjeta() {
    return (
        <div className="bg-[#E7E7E7] lg:h-full h-full font-montserrat lg:mt-[73px] mt-[122px] ">
            <Header />
            <div className="relative">
                <div>
                    <div className="foroCanal lg:justify-center items-center flex lg:flex-row flex-col lg:mb-[30px] mb-[300px] lg:mt-[340px] mt-[760px] h-[300px] border w-full">
                        <div className="fotoCanal h-full">
                            <img
                                src={faro}
                                className="h-[300px] w-[350px] lg:rounded-l-md object-cover"
                            />
                        </div>
                        <div className='bg-black h-10 p-6'>
                            <h1>Hola</h1>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Tarjeta
