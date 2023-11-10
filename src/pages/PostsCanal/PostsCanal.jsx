import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faComment, faEllipsis, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cun from "../../assets/Cun.jpg";



function PostsCanal() {
  const { id } = useParams();
  const [isReplyVisible, setReplyVisible] = useState(false);
  const [content, setContent] = useState('');
  const [commentId, setCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState('');

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
        setComments(data);
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
  }, [id]);

  const handleOpenReply = (commentId) => {
    setCommentId(commentId); 
    setReplyVisible(true);
  };

  const handleCloseReply = () => {
    setCommentId(null);
    setReplyVisible(false);
    setContent('');
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    try {

      const postData = {
        content,
        Id_Post: id,
      };

      const response = await fetch('http://localhost:8080/api/CreateComment', {
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
          text: 'La publicación fue exitosa'
        });
        getCommentsByPost();
      } else {
        const errorData = await response.json();
        console.error('Error al comentar:', errorData.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="bg-[#E7E7E7] lg:h-full h-full font-montserrat lg:mt-[73px] mt-[122px]">
      <Header />
      <div className="relative">
        {post && (
          <div className=" flex flex-col justify-center pl-8 pr-8 foto bg-cover w-full shrink-0 h-[200px] " style={{ backgroundImage: `url(${Cun})` }}>
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
              <div className='mr-8 flex items-center'>
                <FontAwesomeIcon icon={faThumbsUp} className="text-xl" />
                <p className='mx-3 text-md'>Me gusta</p>
              </div>
              <div className='comentar mr-8 flex items-center'>
                <FontAwesomeIcon icon={faComment} className="text-xl" />
                <p className='mx-3 text-md' onClick={handleOpenReply}>Comentar</p>
              </div>
              <div className='mr-8 flex items-center'>
                <FontAwesomeIcon icon={faShare} className="text-xl" />
                <p className='mx-3 text-md'>Compartir</p>
              </div>
              <div className='mr-8 flex items-center'>
                <FontAwesomeIcon icon={faEllipsis} className="text-xl" />
              </div>
            </div>
          </div>
        )}
        {isReplyVisible && commentId === commentId && (
          <div className="Respuesta bg-white rounded-lg shadow-lg p-6 flex flex-col items-start mb-4 mx-5 w-[60%]">
            <textarea
              rows="4"
              placeholder="Postea tu respuesta!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
                  Cancelar
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
                <p className="mx-3 text-md" onClick={() => handleOpenReply(comment.Id_Comment)}>Responder</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default PostsCanal;
