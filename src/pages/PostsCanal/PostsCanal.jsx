import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faComment, faEllipsis, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function PostsCanal() {
  const [isReplyVisible, setReplyVisible] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [commentId, setCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState(null); // Agregado postId al estado

  const getCommentsByPost = async (postId) => {
    try {
      const response = await fetch(`/api/getCommentsByPost/${postId}`);

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
    if (isReplyVisible) {
      // Obtener comentarios si la sección de respuesta está visible
      getCommentsByPost(postId); // Asegúrate de tener postId definido
    }
  }, [isReplyVisible, postId]);

  const handleOpenReply = (commentId) => {
    setCommentId(commentId); // Usar setCommentId en lugar de setCommentIdToReply
    setReplyVisible(true);
  };

  const handleCloseReply = () => {
    setCommentId(null);
    setReplyVisible(false);
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/commentOnPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: replyText, postId: commentId }), // Enviar el ID del comentario
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Comentario exitoso. ID del comentario:', data.commentId);
        // Cierra el formulario de respuesta
        handleCloseReply();
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
        <div className="flex flex-col justify-center pl-8 pr-8 foto bg-cover w-full shrink-0 h-[200px] bg-black">
          <h1 className='mt-12 font-montserrat font-semibold text-3xl text-white text-left '>Kaan-kun</h1>
        </div>
        <h2 className='font-monserrat font-normal text-xl mt-4 ml-8 '>Publicado por: User1</h2>
        <div className="Post bg-white p-4 my-4 mx-5 rounded-lg shadow-lg">
          <h3 className="font-monserrat font-semibold text-lg">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. </h3>
          <p className=' text-md'>Fecha</p>
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
        {isReplyVisible && commentId === commentId && (
          <div className="Respuesta bg-white rounded-lg shadow-lg p-6 flex flex-col items-start mb-4 mx-5 w-[60%]">
            <textarea
              rows="4"
              placeholder="Postea tu respuesta!"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
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
          <div key={comment.commentId} className="Respuesta bg-white rounded-lg shadow-lg p-6 flex flex-col items-start mb-4 mx-5 w-[60%]">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCircleUser} className="text-4xl mr-2" />
              <div>
                <h3 className="font-bold font-montserrat text-xl">User</h3>
                <p className="font-montserrat text-sm">Fecha</p>
              </div>
            </div>
            <p className="font-medium">{comment.content}</p>
            <div className="flex items-center mt-4">
              <div className="mr-8 flex items-center">
                <FontAwesomeIcon icon={faThumbsUp} className="text-xl" />
                <p className="mx-3 text-md">Me gusta</p>
              </div>
              <div className="mr-8 flex items-center">
                <FontAwesomeIcon icon={faComment} className="text-xl" />
                <p className="mx-3 text-md" onClick={() => handleOpenReply(comment.commentId)}>Responder</p>
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
