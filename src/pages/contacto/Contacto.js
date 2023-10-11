import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const Contacto = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_09lqzbg',
      'template_wclyidd',
      form.current,
      '7QlKXMCsvXzFOcJFw'
    )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
          return Swal.fire({
            title: 'Envio Exitoso',
            icon: 'success',
            text: "Gracias por contactarnos",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
          })
        },
        (error) => {
          console.log(error.text);
          form.current.reset();
          return Swal.fire({
            title: 'Envio Fallido',
            icon: 'error',
            text: "A ocurrido un error inesperado",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
          })
        }
      );
  };
  return (
    <>
      <div>
        <div className='Foto relative'>
          
        </div>
        <div className="bg-white top-40 shadow-md rounded-md p-6 w-full md:max-w-6xl mx-auto flex">
          <div className="w-1/2 mr-4 relative">
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Contactanos</h2>
            </div>
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/2 px-4 mb-6">
              <h2 className="text-lg font-semibold mb-2 relative">
              </h2>
              <ul className="list-none">
                <li className="mb-4 flex items-center">
                  <FontAwesomeIcon
                    icon={faHome}
                    style={{ color: "#43B8E8", fontSize: "2rem" }}
                    className="mr-2"
                  />
                  <p className="text-sm leading-6">
                    Calz. de Tlalpan #2191
                    <br />
                    Col. Ciudad Jardín, Coyoacán, 04370 CDMX.
                  </p>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/2 px-4 mb-6">
              <h2 className="text-lg font-semibold mb-2 relative">
              </h2>
              <div className="mb-4 flex items-center">
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ color: "#43B8E8", fontSize: "2rem" }}
                  className="mr-2"
                />
                <div className="flex flex-col">
                  <p className="text-sm leading-6">
                    120-201-2322
                  </p>
                  <p className="text-sm leading-6">
                    226-523-326
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-6">
              <h2 className="text-lg font-semibold mb-2 relative">
              </h2>
              <div className="mb-4 flex items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ color: "#43B8E8", fontSize: "2rem" }}
                  className="mr-2"
                />
                <div className="flex flex-col">
                  <p className="text-sm leading-6">
                    kankuun.contacto@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-4 flex items-center justify-center space-x-4">
              <div className="w-14 h-14 bg-[#00B341] rounded-full flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  style={{ color: "#ffffff", fontSize: "2.5rem" }}
                />
              </div>
              <div className="w-14 h-14 bg-[#ffffff] rounded-full flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faFacebook}
                  style={{ color: "#1737D3", fontSize: "3.7rem" }}
                />
              </div>
              <div className="w-14 h-14 bg-[#E7E7E7] rounded-full flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ color: "#24ACF2", fontSize: "2.4rem" }}
                />
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="text-lg font-semibold mb-4">
              Mandanos un correo!
            </h2>
            <form ref={form} onSubmit={sendEmail}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  name='user_name'
                  className="bg-[#ECECEC] p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Correo"
                  name='user_email'
                  className="bg-[#ECECEC] p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Redacta tu mensaje"
                  name='message'
                  className="bg-[#ECECEC]  p-2 rounded-md w-full h-32 resize-none"
                ></textarea>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-[#43B8E8] text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  );
}

export default Contacto;