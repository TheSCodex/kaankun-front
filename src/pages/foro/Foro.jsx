import React, { useState, useEffect } from 'react';
import Cun from "../../assets/pexels-asad-photo-maldives-9656551.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faComment, faCommentDots, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Foro() {
  const [channels, setChannels] = useState([]);
  const [posts, setPosts] = useState([]);
  // const [count, setCount] = useState([]);

  // const CountPost = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/CountPosts/${id}`);

  //     if (response.ok) {
  //       const data = await response.json();
  //       setCount(data);
  //     } else {
  //       console.error('Error al obtener la cantidad de posts:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error de red:', error);
  //   }
  // };

  // useEffect(() => {
  //   CountPost()
  // },[])


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



  return (
    <div className='bg-[#E7E7E7] lg:h-full h-full font-montserrat lg:mt-[73px] mt-[122px] '>
      <Header />
      <div className="relative">
        <div
          className="flex flex-col items-center justify-center pl-8 pr-8 foto bg-cover w-full shrink-0 h-[250px]"
          style={{ backgroundImage: `url(${Cun})` }}
        >
          <h1 className='mt-12 font-montserrat font-semibold text-4xl text-white text-center'>FOROS DE CANCÚN</h1>
          <h2 className='font-montserrat font-medium text-xl text-white text-center'>Te damos la bienvenida a nuestros canales enfocados en Cancún</h2>
        </div>
        <h2 className='font-monserrat font-semibold text-xl mt-4 ml-8 '>Explora algunos de nuestros canales más populares</h2>
        <div className="canales grid grid-cols-3 gap-4 p-8">
          {channels.map((channel) => (
            <Link to={`/canal/${channel.Id}`} className="bg-white shadow-md rounded p-4 lg:p-6 mb-4 lg:mb-0" key={channel.Id}>
              <div className="flex flex-col lg:flex-row justify-between items-start">
                <div className="mb-2 lg:mb-0 lg:mr-4">
                  <h3 className="font-bold text-xl lg:text-2xl mb-1">{channel.nameC}</h3>
                  <FontAwesomeIcon icon={faCommentDots} className="text-xl lg:text-2xl" />
                  <p className="text-sm lg:text-base">{channel.descriptionC}</p>
                </div>
                <button className="mt-2 lg:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 lg:px-6 rounded-2xl">
                  Visitar
                </button>
              </div>
            </Link>
          ))}
        </div>
        <h2 className='font-monserrat font-semibold text-xl mt-4 ml-8 '>Nuevas publicaciones</h2>
        <div className="posts grid grid-cols-4 gap-4 p-8">
          {posts.map((post) => (
            <Link to={`/post/${post.Id}`} key={post.Id}>
              <div className="bg-white shadow-md rounded p-6 flex flex-col items-start">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCircleUser} className="text-4xl mr-2" />
                  <div>
                    <h3 className="font-bold font-montserrat text-xl">
                      {post.userName ? post.userName : "User Guest"}
                    </h3>
                    <p className="font-montserrat text-sm">{new Date(post.created).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="font-medium">{post.title}</p>
                <p className="mb-3 text-sm font-semibold max-w-full overflow-ellipsis overflow-hidden whitespace-nowrap">{post.content}</p>
                <p className="mb-3 text-xs font-semibold">
                  {post.channelName ? post.channelName : "Noooooooo" }
                  </p>
                <div className="flex justify-between w-full pr-2">
                  <div className="flex items-center ml-4">
                    <FontAwesomeIcon icon={faThumbsUp} className="text-md" />
                    <p className="mx-1 text-md">Like</p>
                  </div>
                  <div className="flex items-center ml-4">
                    <FontAwesomeIcon icon={faComment} className="text-md" />
                    <p className="mx-1 text-md">Comment</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Foro;