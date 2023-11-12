import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEllipsis,
  faShare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import faro from "../../assets/faro.jpg";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../Auth.js";
import lupa from "../../assets/lupa.png";

function Canal() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [channel, setChannel] = useState({});
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  let decodedToken;
  const userToken = localStorage.getItem("token");
  if (userToken) {
    decodedToken = jwtDecode(userToken);
  }

  const userId = decodedToken ? decodedToken.userId : null;

  const handleOpenModal = () => {
    setModalVisible(true);
    console.log(userId);
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
      };

      const response = await fetch("http://localhost:8080/api/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

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
      <div className="relative grid grid-cols-2">
        <div>
          <div className="">
            <div className=" flex flex-col justify-center  w-4/6 shrink-0 h-[200px]">
              <h1 className="font-semibold text-left text-5xl mt-5 ml-4">
                {" "}
                {channel && channel.nameC}
              </h1>
              {isLoggedIn ? (
                <button
                  onClick={handleOpenModal}
                  className="mt-4 ml-4 w-3/5 bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
                >
                  Crea tu publicación
                </button>
              ) : (
                ""
              )}
            </div>
            {posts.map((post) => (
              <div
                key={post.Id}
                className="Post  bg-white p-4 mx-3 mb-4 rounded-lg shadow-lg"
              >
                <Link to={`/post/${post.Id}`}>
                  <h2 className="font-monserrat font-semibold text-xl">
                    {post.userName || post.name ? post.userName || post.name : "User Guest"}
                  </h2>
                  <h2 className="font-monserrat font-semibold text-lg">
                    {post.title}
                  </h2>
                  <h3 className="font-monserrat font-medium text-lg max-w-full overflow-ellipsis overflow-hidden whitespace-nowrap">
                    {post.content}
                  </h3>
                  <p className="text-md">
                    {new Date(post.created).toLocaleDateString()}
                  </p>
                  <div className="flex items-center my-4">
                    <div className="mr-8 flex items-center">
                      <FontAwesomeIcon icon={faThumbsUp} className="text-xl" />
                      <p className="mx-3 text-md">Me gusta</p>
                    </div>
                    <div className="mr-8 flex items-center">
                      <FontAwesomeIcon icon={faComment} className="text-xl" />
                      <p className="mx-3 text-md">Comentar</p>
                    </div>
                    <div className="mr-8 flex items-center">
                      <FontAwesomeIcon icon={faShare} className="text-xl" />
                      <p className="mx-3 text-md">Compartir</p>
                    </div>
                    <div className="mr-8 flex items-center">
                      <FontAwesomeIcon icon={faEllipsis} className="text-xl" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="buscador ml-auto">
          <div className="relative mt-9 ml-9 w-4/5">
            <div className="relative flex items-center">
              <img src={lupa} className="left-3 top-2 h-[18px] absolute" />
              <input
                type="text"
                className="pl-10 w-full border rounded-md p-2"
                placeholder="Buscar publicaciones"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <div className="foroCanal lg:justify-center items-center flex lg:flex-row flex-row lg:mb-[30px] mb-[300px] lg:mt-[340px] mt-[760px] h-[300px] border w-full">
            {/* <div className="fotoCanal h-full">
              <img
                src={faro}
                className="h-[300px] w-[350px] lg:rounded-l-md object-cover"
              />
            </div>
            {/* <div className="info bg-black h-[300px] w-[350px] lg:rounded-l-md object-cover flex flex-col">
              * Contenido del div de info *
            </div> */}
          </div>
        </div>
      </div>
      {isModalVisible && (
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
      )}
      <Footer />
    </div>
  );
}

export default Canal;
