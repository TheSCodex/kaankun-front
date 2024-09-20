import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faComment, faEllipsis, faHome, faScaleBalanced, faThumbsUp, } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Auth.js";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import lupa from "../../assets/lupa.png";
import publs from "../../assets/envelopes-bulk-solid.svg";
import serpen from "../../assets/aaaaa.png";
import imagen1 from "../../assets/image1.jpg"
import imagen2 from "../../assets/image2.jpg"
import imagen3 from "../../assets/image3.jpg"
import imagen4 from "../../assets/image4.jpg"
import imagen5 from "../../assets/image5.jpg"
import imagen6 from "../../assets/image6.jpg"

function Canal() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [channel, setChannel] = useState({});
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [channels, setChannels] = useState([]);
  const [showChannels, setShowChannels] = useState(false);


  let decodedToken;
  const userToken = localStorage.getItem("token");
  if (userToken) {
    decodedToken = jwtDecode(userToken);
  }

  const userId = decodedToken ? decodedToken.userId : null;
  const source = decodedToken ? decodedToken.source : null;
  const username = decodedToken ? decodedToken.userName : null;


  let channelImage;
  switch (parseInt(id, 10)) {
    case 1:
      channelImage = imagen1;
      break;
    case 2:
      channelImage = imagen2;
      break;
    case 3:
      channelImage = imagen3;
      break;
    case 4:
      channelImage = imagen4;
      break;
    case 5:
      channelImage = imagen5;
      break;
    case 6:
      channelImage = imagen6;
      break;
    default:
      channelImage = imagen2; 
      break;
  }

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

  }, []);

  const handleToggleChannels = () => {
    setShowChannels(!showChannels);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
    console.log(userId);
    console.log(username);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTitle("");
    setContent("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        Id_User: userId,
        title,
        content,
        Id_Channel: id,
        userName: username
      };

      let UrlCreate = "http://localhost:8080/api/createPost";

      if (source === "Google") {
        UrlCreate = "http://localhost:8080/api/createPostG";
      }

      const response = await fetch(UrlCreate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        const data = await response.json();
        console.log(
          "Publicación creada con éxito. ID de la publicación:",
          data.postId
        );
        // Cierra el modal
        handleCloseModal();
        Swal.fire({
          icon: "success",
          title: "Agregado",
          text: "La publicación fue exitosa",
        });
        loadPosts();
      } else {
        const errorData = await response.json();
        console.error("Error al crear la publicación:", errorData.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Parece que faltaron datos",
        });
      }
    } catch (error) {
      console.error("Error de red:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal",
      });
    }
  };


  const loadPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/GetPostByChannel/${id}`
      );

      if (response.ok) {
        const data = await response.json();
        // Filtra los posts según el texto de búsqueda
        const filteredPosts = data.filter(
          (post) =>
            post.title.toLowerCase().includes(searchText.toLowerCase()) ||
            post.content.toLowerCase().includes(searchText.toLowerCase())
        );
        setPosts(filteredPosts);
        setNoResults(filteredPosts.length === 0); // Establece noResults en true si no hay coincidencias
      } else {
        console.error("Error al obtener los posts:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [id, searchText]);

  const loadChannel = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/ChannelsByID/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const firstChannel = data[0]; // Accede al primer elemento del arreglo
          setChannel(firstChannel);
        }
      } else {
        console.error(
          "Error al obtener los datos del canal",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    loadPosts();
    loadChannel();
  }, [id]);

  return (
    <div className="bg-[#E7E7E7] lg:h-full h-full font-montserrat lg:mt-[73px] mt-[122px]">
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
              Foro: Canales
            </h1>
            <img src={serpen} className="h-[60px]" />
          </div>
          <div className="relative">
            <input
              className="bg-[#D9D9D9] h-[35px] w-[245px] p-2 pl-12 font-montserrat rounded-sm"
              placeholder="Buscar en el canal"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <i>
              <img src={lupa} className="left-3 top-2 h-[18px] absolute" />
            </i>
          </div>
          <div className="mt-10">
            <div className="">
              <Link to='/foro' className=" flex cursor-pointer mb-5 items-center focus:outline-none w-full">
                <FontAwesomeIcon icon={faHome} className=' h-[30px] mr-6' />
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
          {isLoggedIn ? (
            <div className="mt-4">
              <button
                onClick={handleOpenModal}
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
          )}
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
        >
          <div className="p-6 lg:pl-14">
              <div
                key={channel.Id}
                className="flex flex-col text-white justify-center rounded-md shadow-lg pl-8 pr-8 foto bg-cover w-full shrink-0 h-[200px]"
                style={{ backgroundImage: `url(${channelImage})` }}
              >
                <h1 className="font-semibold text-left text-5xl mt-5 ml-4">
                  {channel.nameC}
                </h1>
                <h2 className="font-semibold text-left text-xl mt-2 ml-4">
                  {channel.descriptionC}
                </h2>
              </div>
            {isLoggedIn ? (
              <button
                onClick={handleOpenModal}
                className="my-4 ml-4 w-3/5 bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
              >
                Crea tu publicación
              </button>) : (
              <h1 className=" ml-4 font-montserrat text-blue-500 font-semibold text-xl">Para publicar inicia sesion</h1>
            )}
            {posts.map((post) => (
              <div
                key={post.Id}
                className="Post bg-white p-4 mx-3 mb-4 rounded-lg shadow-lg overflow-y-auto"
              >
                <Link to={`/post/${post.Id}`} className="mb-4">
                  <h2 className="font-monserrat font-semibold text-xl">
                    {post.userName || post.name
                      ? post.userName || post.name
                      : "User Guest"}
                  </h2>
                  <h2 className="font-monserrat font-semibold text-2xl">
                    {post.title}
                  </h2>
                  <h3 className="font-monserrat font-medium text-xl max-w-full overflow-ellipsis overflow-hidden whitespace-nowrap">
                    {post.content}
                  </h3>
                  <p className="text-md">
                    {new Date(post.created).toLocaleDateString()}
                  </p>
                  
                </Link>
              </div>
            ))}
            {noResults && (
              <p className="text-black ml-80  text-3xl  mt-4">
                No se encontraron coincidencias.
              </p>
            )}
          </div>
        </div>
        <div className="buscador ml-auto">
          <div className="foroCanal lg:justify-center items-center flex lg:flex-row flex-row lg:mb-[30px] mb-[300px] lg:mt-[340px] mt-[760px] h-[300px] border w-full">
            <div className="fotoCanal h-full">
            </div>
          </div>
        </div>
      </div>
      {
        isModalVisible && (
          <div className="fixed top-0 left-0 w-full h-full lg:mt-[73px] mt-[122px] flex items-center justify-center bg-gray-900 bg-opacity-80">
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
                <button
                  type="submit"
                  className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
                >
                  Crear Publicación
                </button>
              </form>
              <button onClick={handleCloseModal} className="text-blue-500 mt-4">
                Cancelar
              </button>
            </div>
          </div>
        )
      }
      <Footer />
    </div >
  );
}

export default Canal;
