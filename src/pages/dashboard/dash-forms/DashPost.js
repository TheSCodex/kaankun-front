import React, { useState } from "react";
import Swal from "sweetalert2";

function DashPost({ setAddingPost, getPosts, availableChannels }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Selected Channel ID:", selectedChannel);
    try {
      const postData = {
        title,
        content,
        Id_Channel: selectedChannel,
      };

      let UrlCreate = "http://localhost:8080/api/createPost";

      const response = await fetch(UrlCreate, {
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
        setAddingPost(false);
        Swal.fire({
          icon: "success",
          title: "Agregado",
          text: "La publicación fue exitosa",
        });
        getPosts();
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

  return (
    <div className="absolute top-[20rem] left-[35rem] w-[40%] h-auto bg-white rounded-lg shadow-xl p-5">
      <form onSubmit={handleSubmit} className="relative">
        <a
          onClick={() => setAddingPost(false)}
          className="text-sm font-manjari hover:cursor-pointer font-bold absolute right-3"
        >
          X
        </a>
        <h2 className="text-xl font-semibold mt-3">Título</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-100 rounded-lg p-2"
          required
        />

        <h2 className="text-xl font-semibold mt-3">Contenido</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
          className="w-full h-[100px] bg-gray-100 rounded-lg p-2 mt-1"
          required
        />

        <h2 className="text-xl font-semibold mt-3">Canal</h2>
        <select
          value={selectedChannel}
          onChange={(e) => setSelectedChannel(e.target.value)}
          className="w-full bg-gray-100 rounded-lg p-2"
          required
        >
          <option value="" disabled>
            Selecciona un canal
          </option>
          {availableChannels.map((channel) => (
            <option key={channel.Id_Channel} value={channel.Id_Channel}>
              {channel.channelName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg p-2 mt-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}

export default DashPost;
