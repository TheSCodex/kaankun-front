import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEllipsis, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import faro from "../../assets/faro.jpg";


function Canal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Publicación creada con éxito. ID de la publicación:', data.postId);
        // Cierra el modal
        handleCloseModal();
      } else {
        const errorData = await response.json();
        console.error('Error al crear la publicación:', errorData.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className='bg-[#E7E7E7] lg:h-full h-full font-montserrat lg:mt-[73px] mt-[122px]'>
      <Header />
      <div className="relative grid grid-cols-2">
        <div>
          <div className="">
            <div className=" flex flex-col justify-center  w-4/6 shrink-0 h-[200px]">
              <h1 className='font-semibold text-left text-5xl mt-5 ml-4'>Kaan-Kun</h1>
              <button onClick={handleOpenModal} className="mt-4 ml-4 w-3/5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                Crea tu publicacion
              </button>
            </div>
            <div className="Post bg-white p-4 mx-5 mb-4 rounded-lg shadow-lg">
              <Link to='/post'>
                <h3 className="font-monserrat font-semibold text-lg">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. </h3>
                <p className=' text-md'>Fecha</p>
                <div className='flex items-center mt-4'>
                  <div className='mr-8 flex items-center'>
                    <FontAwesomeIcon icon={faThumbsUp} className="text-xl" />
                    <p className='mx-3 text-md'>Me gusta</p>
                  </div>
                  <div className='mr-8 flex items-center'>
                    <FontAwesomeIcon icon={faComment} className="text-xl" />
                    <p className='mx-3 text-md'>Comentar</p>
                  </div>
                  <div className='mr-8 flex items-center'>
                    <FontAwesomeIcon icon={faShare} className="text-xl" />
                    <p className='mx-3 text-md'>Compartir</p>
                  </div>
                  <div className='mr-8 flex items-center'>
                    <FontAwesomeIcon icon={faEllipsis} className="text-xl" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="foroCanal lg:justify-center items-center flex lg:flex-row flex-col lg:mb-[30px] mb-[300px] lg:mt-[340px] mt-[760px] h-[300px] border w-full">
            <div className="fotoCanal h-full">
              <img
                src={faro}
                className="h-[300px] w-[350px] lg:rounded-l-md object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-80">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Crea tu publicación</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content">Contenido</label>
                <textarea
                  id="content"
                  name="content"
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                Crear Publicación
              </button>
            </form>
            <button onClick={handleCloseModal} className="text-blue-500 mt-4">Cancelar</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Canal;
