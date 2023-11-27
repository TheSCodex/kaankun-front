import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faCircleUser, faComment, faEllipsis, faHome, faScaleBalanced, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cun from "../../assets/Cun.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth.js";
import { jwtDecode } from "jwt-decode";
import lupa from "../../assets/lupa.png";
import serpen from "../../assets/aaaaa.png";

function PostsCanal() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [isReplyVisible, setReplyVisible] = useState(false);
  const [isCommentVisible, setCommentVisible] = useState(false);
  const [content, setContent] = useState('');
  const [commentId, setCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [replys, setReplys] = useState([]);
  const [post, setPost] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [meGusta, setMeGusta] = useState(false);
  const [channels, setChannels] = useState([]);
  const [showChannels, setShowChannels] = useState(false);



  let decodedToken;
  const userToken = localStorage.getItem("token");
  if (userToken) {
    decodedToken = jwtDecode(userToken);
  }

  const userId = decodedToken ? decodedToken.userId : null;
  const source = decodedToken ? decodedToken.source : null;

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

  const GetPost = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/GetPostByID/${id}`);

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setPost(data[0]);
        }
      } else {
        const errorData = await response.json();
        console.error('Error al obtener el post:', errorData.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  const getCommentsByPost = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/getCommentsByPost/${id}`);

      if (response.ok) {
        const data = await response.json();
        console.log('Datos recibidos:', data);

        const filteredComments = data.filter(
          (comments) =>
            comments.content.toLowerCase().includes(searchText.toLowerCase())
        );
        setComments(filteredComments);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener comentarios:', errorData.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };


  useEffect(() => {
    GetPost();
    getCommentsByPost();
    getReplys();
  }, [id]);

  const getReplys = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/GetReplys/${commentId}`);

      if (response.ok) {
        const data = await response.json();
        setReplys(data);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener las respuestas:', errorData.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  const BotMegusta = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/Megusta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id_User: userId,
          Id_Post: id
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setMeGusta(!meGusta);
      } else {
        console.error('Error al dar like:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  const handleOpenReply = (commentId) => {
    if (isLoggedIn) {
      setCommentId(commentId);
      setCommentVisible(true);
    } else {
      Swal.fire({
        title: 'Debes estar logueado para realizar esta acción',
        icon: 'warning',
        confirmButtonText: 'Login',
        confirmButtonColor: '#1E90FF',
        showCancelButton: true,
        cancelButtonText: 'Regresar',
        cancelButtonColor: '#FF0000',
        preConfirm: () => {
          window.location.href = '/login';
        }
      });
    }
  };



  const handleCloseReply = () => {
    setCommentId(null);
    setCommentVisible(false);
    setContent('');
  };

  let lastSubmissionTime = 0;
  let errorHandled = false;
  const submissionInterval = 3000; // Intervalo en milisegundos (3 segundos en este caso)
  
  const handleSubmitReply = async (e) => {
    e.preventDefault();
  
    const currentTime = new Date().getTime();
  
    if (currentTime - lastSubmissionTime < submissionInterval) {
      // Si el tiempo transcurrido desde la última presentación es menor que el intervalo, no se permite otra presentación
      Swal.fire({
        icon: 'warning',
        title: 'Espera un momento',
        text: 'Por favor, espera unos segundos antes de enviar otro comentario.'
      });
      return;
    }
    try {
      const postData = {
        content,
        Id_Post: id,
        Id_User: userId
      };
  
      let UrlCreate = "http://localhost:8080/api/CreateComment";
  
      if (source === "Google") {
        UrlCreate = "http://localhost:8080/api/CreateCommentG";
      }
  
      const response = await fetch(UrlCreate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Comentario exitoso. ID del comentario:', data.commentId);
        handleCloseReply();
        Swal.fire({
          icon: 'success',
          title: 'Agregado',
          text: 'Se añadió el comentario'
        });
        getCommentsByPost();
      } else {
        const errorData = await response.json();
        console.error('Error al comentar:', errorData.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error en el servidor'
        });
        errorHandled = true;
      }lastSubmissionTime = currentTime; 
    } catch (error) {
      console.error('Error de red:', error);
      if (!errorHandled) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, rellena todos los campos'
        });
      }
    }
  };
  
  const OpenReply = (commentId) => {
    setCommentId(commentId);
    setReplyVisible(true);
  };

  const CloseReply = () => {
    setCommentId(null);
    setReplyVisible(false);
    setContent('');
  };

  const SubmitReply = async (e) => {
    e.preventDefault();
    try {

      const postData = {
        content,
        Id_Comment: commentId,
        Id_User: userId
      };

      const response = await fetch('http://localhost:8080/api/ReplyComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Comentario exitoso. ID del comentario:', data.commentId);
        CloseReply();
        Swal.fire({
          icon: 'success',
          title: 'Agregado',
          text: 'La respuesta fue exitosa'
        });
        getReplys();
      } else {
        const errorData = await response.json();
        console.error('Error al comentar:', errorData.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error'
        });
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

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
            <h1 className="mr-20  font-bold font-montserrat text-2xl">
              Foro: Posts
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
              <img
                src={lupa}
                className="left-3 top-2 h-[18px] absolute"
              />
            </i>
          </div>
          <div className="mt-10">
            <div className="">
              <Link to='/foro' className=" flex cursor-pointer  mb-5 items-center focus:outline-none w-full">
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
          <div className="mt-12">
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
              - No se permiten insultos, ofensas o discriminaciones por motivos.
            </p>

            <h2 className="font-montserrat font-semibold">
              2. Relevancia del Tema:
            </h2>
            <p>
              - Asegúrate de que tus mensajes estén relacionados al tema del canal.
            </p>

            <h2 className="font-montserrat font-semibold">
              3. No Spam ni Publicidad No Solicitada:
            </h2>
            <p>
              - Evita el spam y la publicidad no solicitada.
            </p>

            <h2 className="font-montserrat font-semibold">
              4. Uso Adecuado del Lenguaje:
            </h2>
            <p>
              - Expresa tus ideas de manera clara y evita mayúsculas innecesarias.
            </p>

            <h2 className="font-montserrat font-semibold">
              5. Colaboración y Participación Activa:
            </h2>
            <p>
              - Contribuye positivamente y participa activamente en las discusiones.
            </p>

          </div>
        </div>
      </div>
      <div className="lg:ml-[335px] h-full w-[3/5]">
        <div className="p-6 lg:pl-14">
          {post && (
            <div className=" flex flex-col justify-center rounded-md shadow-lg pl-8 pr-8 foto bg-cover w-full shrink-0 h-[200px] " style={{ backgroundImage: `url(${Cun})` }}>
              <h1 className='mt-12 font-montserrat font-semibold text-3xl text-white text-left '>{post.channelName}</h1>
            </div>
          )}
          {post && (
            <h2 className='font-monserrat font-medium text-xl mt-4 ml-8 '>
              Publicado por: {post.userName ? post.userName : "User Guest"}
            </h2>
          )}
          {post && (
            <div className="Post bg-white p-4 my-4 mx-5 rounded-lg shadow-lg">
              <h3 className="font-monserrat font-semibold text-lg">{post.title}</h3>
              <h3 className="font-monserrat font-medium text-lg">{post.content}</h3>
              <p className='font-monserrat text-md'>{new Date(post.created).toLocaleDateString()}</p>
              <div className='flex items-center mt-4'>
                <div className='mr-8 flex items-center' postId={post.id} onClick={BotMegusta} style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faThumbsUp} className={`text-xl ${meGusta ? 'text-blue-500' : ''}`} />
                  <p className='mx-3 text-md' onClick={BotMegusta}>Me gusta</p>
                </div>
                <div className='comentar mr-8 flex items-center'>
                  <FontAwesomeIcon icon={faComment} className="text-xl" />
                  <p className='mx-3 text-md' onClick={handleOpenReply}>Comentar</p>
                </div>
                <div className='mr-8 flex items-center'>
                  <FontAwesomeIcon icon={faEllipsis} className="text-xl" />
                </div>
              </div>
            </div>
          )}
          {isCommentVisible && commentId === commentId && (
            <div className="Respuesta bg-white rounded-lg shadow-lg p-6 flex flex-col items-start mb-4 mx-5 w-[60%]">
              <textarea
                rows="4"
                placeholder="Postea tu respuesta!1"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full"
                required
              />
              <div className='flex items-center mt-4'>
                <div className='mr-8 flex items-center'>
                  <button
                    className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
                    onClick={handleSubmitReply}
                  >
                    Enviar Respuesta
                  </button>
                </div>
                <div className='mr-8 flex items-center'>
                  <button
                    className="text-blue-500"
                    onClick={handleCloseReply}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="Linea separadora bg-[#43B8E8] h-[3px] mb-4 w-[97%] mx-4"></div>
          {comments.map((comment) => (
            <div key={comment.Id_Comment} className="Respuesta bg-white rounded-lg shadow-lg p-6 flex flex-col items-start mb-4 mx-5 w-[60%]">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCircleUser} className="text-4xl mr-2" />
                <div>
                  <h3 className="font-bold font-montserrat text-xl">
                    {comment.userName ? comment.userName : "User Guest"}
                  </h3>
                  <p className="font-montserrat text-sm">{new Date(comment.created).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="font-medium font-montserrat max-w-full overflow-ellipsis overflow-hidden whitespace-nowrap">{comment.content}</p>
              <div className="flex items-center mt-4">
                <div className="mr-8 flex items-center">
                  <FontAwesomeIcon icon={faThumbsUp} className="text-xl" />
                  <p className="mx-3 text-md">Me gusta</p>
                </div>
                <div className="mr-8 flex items-center">
                  <FontAwesomeIcon icon={faComment} className="text-xl" />
                  <p className="mx-3 text-md" onClick={() => OpenReply(comment.Id_Comment)}>Responder</p>
                </div>
                {getReplys ? (
                  <p className="hover:underline" onClick={() => getReplys(comment.Id_Comment)}>Ver respuestas</p>
                ) : (
                  ('')
                )}
              </div>
              {isReplyVisible && commentId === commentId && (
                <div >
                  <div className="Linea separadora bg-[#43B8E8] h-[3px] mt-4 w-[%] mx-4"></div>
                  <textarea
                    rows="4"
                    placeholder="Postea tu respuesta!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full mt-4"
                  />
                  <div className='flex items-center mt-4'>
                    <div className='mr-8 flex items-center'>
                      <button
                        className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
                        onClick={SubmitReply}
                      >
                        Enviar Respuesta
                      </button>
                    </div>
                    <div className='mr-8 flex items-center'>
                      <button
                        className="text-blue-500"
                        onClick={CloseReply}
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PostsCanal;
