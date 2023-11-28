import React, { useState, useEffect } from 'react';
import Cun from "../../assets/pexels-asad-photo-maldives-9656551.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faCircleUser, faComment, faCommentDots, faEllipsis, faHome, faScaleBalanced, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import lupa from "../../assets/lupa.png";
import serpen from "../../assets/aaaaa.png";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imagen1 from "../../assets/image1.jpg"
import imagen2 from "../../assets/image2.jpg"
import imagen3 from "../../assets/image3.jpg"
import imagen4 from "../../assets/image4.jpg"
import imagen5 from "../../assets/image5.jpg"
import imagen6 from "../../assets/image6.jpg"


function Foro() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [channels, setChannels] = useState([]);
  const [showChannels, setShowChannels] = useState(false);
  const [meGusta, setMeGusta] = useState(
    localStorage.getItem(`like_${id}`) === 'true' ? true : false
  );
  const [botonDesactivado, setBotonDesactivado] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [postId, setPostId] = useState(null);



  const images = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: channels.length >= 4 ? 4 : channels.length,
    slidesToScroll: channels.length >= 4 ? 4 : channels.length,
    autoplay: true, // Activa el autoplay
    autoplaySpeed: 5000,
  };

  useEffect(() => {
    getLikes();
  }, [id]);

  const getLikes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/GetMegustas/${id}`);
      if (response.ok) {
        const likesData = await response.json();
        setLikesCount(likesData.length);
        const userLike = likesData.some((like) => like.Id_User === userId);
        setMeGusta(userLike);
      } else {
        console.error('Error al obtener los likes:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener los likes:', error);
    }
  };

  const BotMegusta = async () => {
    try {
      setBotonDesactivado(true);

      const response = await fetch('http://localhost:8080/api/Megusta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id_User: userId,
          Id_Post: id,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Verificar el estado actual y actualizar en consecuencia
        const newMeGusta = !meGusta;
        setMeGusta(newMeGusta);

        // Actualizar el estado en el almacenamiento local
        localStorage.setItem(`like_${id}`, newMeGusta.toString());
        getLikes();
      } else {
        console.error('Error al dar like:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error al dar like:', error);
    } finally {
      setBotonDesactivado(false);
    }
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/channels')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los canales');
        }
        return response.json();
      })
      .then((data) => {
        setChannels(data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch('http://localhost:8080/api/GetPost')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las publicaciones');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const handleToggleChannels = () => {
    setShowChannels(!showChannels);
  };

  return (
    <div className='bg-[#E7E7E7] lg:h-full h-full font-montserrat lg:mt-[73px] mt-[122px] '>
      <Header />
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`lg:hidden absolute top-10 left-10 z-50 ${sidebarOpen ? "" : ""
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {sidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      <div
        className={`lg:fixed bg-white border lg:w-[325px] p-6 lg:h-screen overflow-y-auto ${sidebarOpen ? "" : "hidden"
          } lg:block`}
        style={{ scrollbarWidth: "thin" }}
      >
        <div>
          <div className="flex mb-4">
            <h1 className="mr-20 font-bold font-montserrat text-2xl">
              Foro Principal
            </h1>
            <img src={serpen} className="h-[60px]" />
          </div>
          <div className="relative">
            <input
              className="bg-[#D9D9D9] h-[35px] w-[245px] p-2 pl-12 font-montserrat rounded-sm"
              placeholder="Busqueda"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <i>
              <img src={lupa} className="left-3 top-2 h-[18px] absolute" />
            </i>
          </div>
          <div className="mt-10">
            <div className="">
              <Link to='/foro' className=" flex cursor-pointer  mb-5 items-center focus:outline-none w-full">
                <FontAwesomeIcon icon={faHome} className='text-gray-600 h-[30px] mr-6' />
                <h1 className="font-montserrat font-semibold">Principal</h1>
              </Link>
              <div onClick={handleToggleChannels} className=" flex cursor-pointer items-center focus:outline-none w-full">
                <FontAwesomeIcon icon={faBlog} className='h-[30px] mr-6' />
                <h1 className="font-montserrat font-semibold">Canales</h1>
              </div>
            </div>
            {showChannels && (
              <div className="ml-6 mt-4">
                {channels.map((channel) => (
                  <Link to={`/canal/${channel.Id}`} className="flex items-center " key={channel.Id}>
                    <span className="mr-2">&#8226;</span>
                    <p className='font-montserrat hover:underline'>{channel.nameC}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* {isLoggedIn ? (
            <div className="mt-8">
              <button
                onClick={"handleOpenModal"}
                className="items-center focus:outline-none w-full"
              >
                <div className="flex">
                  <img src={publs} className="h-[30px] mr-6" />
                  <h1 className="font-montserrat font-semibold">Publicar</h1>
                </div>
              </button>
            </div>
          ) : (
            ""
          )} */}
          <div className="mt-10">
            <div className="bg-[#000] h-[.8px] w-[100%]"></div>
            <div className="mb-6 flex items-center">
              <FontAwesomeIcon icon={faScaleBalanced} className='h-[25px] mr-6' />
              <h1 className="font-montserrat font-semibold text-xl mt-3">
                Reglas de los canales:
              </h1>
            </div>
            <h2 className="font-montserrat font-semibold">
              1. Respeto y Cortesía:
            </h2>
            <p>
              - No se permiten insultos, ofensas o discriminaciones por motivos
            </p>

            <h2 className="font-montserrat font-semibold">
              2. Relevancia del Tema:
            </h2>
            <p>
              - Asegúrate de que tus mensajes estén relacionados al tema del
              canal.
            </p>
          </div>
        </div>
      </div>
      <div className="lg:ml-[335px] h-full w-[3/5] relative">
        <div
          className="flex flex-col items-center justify-center rounded-lg pl-8 pr-8 foto bg-cover w-[98%] shrink-0 h-[240px]"
          style={{ backgroundImage: `url(${Cun})` }}
        >
          <h1 className='mt-12 font-montserrat font-semibold text-4xl text-white text-center'>FOROS DE CANCÚN</h1>
          <h2 className='font-montserrat font-medium text-xl text-white text-center'>Te damos la bienvenida a nuestro foro enfocado en Cancún</h2>
        </div>
        <h2 className='font-monserrat font-semibold text-xl mt-4 ml-8 '>Explora algunos de nuestros canales</h2>
        <Slider {...settings} className="ml-5 w-[95%]" >
          {channels.map((channel, index) => (
            <div key={channel.Id} className="w-full">
              <Link
                to={`/canal/${channel.Id}`}
                className="slider-link mr-2 mt-2 rounded-xl"
                style={{
                  backgroundImage: `url(${images[index]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="shadow-md rounded p-2 lg:p-4 mb-4 lg:mb-0 relative h-48">
                  <div className="flex flex-col lg:flex-row justify-between items-start">
                    <div className="mb-1 lg:mb-0 lg:mr-4 w-full lg:w-auto">
                      <h3 className="font-bold text-lg text-white lg:text-xl mb-1">{channel.nameC}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
        <h2 className='font-monserrat font-semibold text-xl my-4 ml-8 '>Nuevas publicaciones</h2>
        {posts.map((post) => (
          <div
            key={post.Id}
            className="Post bg-white p-4 mx-3 mb-4 rounded-lg shadow-lg overflow-y-auto"
          >
            <Link to={`/post/${post.Id}`} className="mb-4">
              <div className=" ml-4 flex items-center">
                <FontAwesomeIcon icon={faCircleUser} className="text-4xl mr-2" />
                <div>
                  <p className="font-semibold  font-montserrat text-md">
                    {`${post.userName || post.name ? post.userName || post.name : "Administrador"} ${new Date(post.created).toLocaleDateString()}`}
                  </p>
                </div>
              </div>
              <p className="font-monserrat text-3xl ml-4 my-2 font-semibold">{post.title}</p>
              <p className="mb-3 text-sm ml-4 font-semibold">
                Publicado en: {post.channelName ? post.channelName : "Noooooooo"}
              </p>
              <div className=" ml-4 flex items-center mt-3">
                <div className='mr-8 flex items-center' postId={post.Id} onClick={BotMegusta} style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faThumbsUp} className={`text-xl ${meGusta ? 'text-blue-500' : ''}`} />
                  <span className='font-monserrat font-semibold ml-2 text-lg'>{likesCount}</span>
                </div>
                <div className="mr-8 flex items-center">
                  <FontAwesomeIcon icon={faComment} className="text-xl" />
                  <p className="mx-3 text-md">Comentarios</p>
                </div>
                {/* <div className="mr-8 flex items-center">
                      <FontAwesomeIcon icon={faShare} className="text-xl" />
                      <p className="mx-3 text-md">Compartir</p>
                    </div> */}
                <div className="mr-8 flex items-center">
                  <FontAwesomeIcon icon={faEllipsis} className="text-xl" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div >
  );
}

export default Foro;