import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function DashUser({ user, setEditingUser, getUsers }) {
  const [image, setImage] = useState(null);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      !editedUser.userName.trim() ||
      !editedUser.bio.trim() ||
      !editedUser.name.trim() ||
      !editedUser.lastName.trim()
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }

    if (
      editedUser.userName[0] === " " ||
      editedUser.bio[0] === " " ||
      editedUser.name[0] === " " ||
      editedUser.lastName[0] === " "
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Los campos no deben empezar con espacios.",
      });
      return;
    }

    if (image) {
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      const extension = image.name.slice(
        ((image.name.lastIndexOf(".") - 1) >>> 0) + 2
      );
      if (!allowedExtensions.includes(extension.toLowerCase())) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "La imagen debe ser en formato .jpg, .jpeg o .png.",
        });
        return;
      }
    }

    const data = {
      bio: editedUser.bio,
    };

    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, image);
        const profileImage = await getDownloadURL(snapshot.ref);
        data.profileImage = profileImage;
      } catch (error) {
        console.error("Error subiendo imagen:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al subir la imagen.",
        });
        return;
      }
    }

    if (editedUser.userName !== user.userName) {
      data.userName = editedUser.userName;
    }

    if (editedUser.name !== user.name) {
      data.name = editedUser.name;
    }

    if (editedUser.lastName !== user.lastName) {
      data.lastName = editedUser.lastName;
    }

    try {
      const userId = parseInt(user.id, 10);
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        console.log("Perfil actualizado exitosamente");
        Swal.fire({
          icon: "success",
          title: "Actualización finalizada",
          text: "Perfil actualizado correctamente.",
        });
        getUsers();
        setEditingUser(false);
      } else if (response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El nombre de usuario ya está en uso. Por favor, elige otro.",
        });
      } else {
        console.log("Fallo al actualizar perfil");
      }
    } catch (error) {
      console.error("Error enviando solicitud:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al enviar la solicitud.",
      });
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    const thumbnailContainer = document.getElementById("thumbnail-container");
    if (thumbnailContainer) {
      thumbnailContainer.innerHTML = "";
      const thumbnailImage = document.createElement("img");
      thumbnailImage.className = "max-w-full h-auto mt-2 rounded-full";
      thumbnailImage.style.maxWidth = "150px";
      thumbnailImage.style.maxHeight = "150px";
      thumbnailImage.src = URL.createObjectURL(selectedImage);
      thumbnailContainer.appendChild(thumbnailImage);
    }
  };

  return (
    <div className="absolute -top-[-2rem] left-[35rem] w-[40%] h-auto bg-white rounded-lg shadow-xl p-5">
      <form onSubmit={handleSave} className="relative">
        <a
          onClick={() => {
            setEditingUser(false);
          }}
          className="text-sm font-manjari hover:cursor-pointer font-bold absolute right-3"
        >
          X
        </a>
        <h2 className="text-xl font-semibold mt-3">Nombre de Usuario</h2>
        <input
          type="text"
          className="w-full bg-gray-100 rounded-lg p-2"
          value={editedUser.userName}
          onChange={(e) =>
            setEditedUser({ ...editedUser, userName: e.target.value })
          }
        />
        <h2 className="text-xl font-semibold mt-3">Nombre</h2>
        <input
          type="text"
          className="w-full bg-gray-100 rounded-lg p-2"
          value={editedUser.name}
          onChange={(e) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
        />
        <h2 className="text-xl font-semibold mt-3">Apellido</h2>
        <input
          type="text"
          className="w-full bg-gray-100 rounded-lg p-2"
          value={editedUser.lastName}
          onChange={(e) =>
            setEditedUser({ ...editedUser, lastName: e.target.value })
          }
        />
        <h2 className="text-xl font-semibold mt-3">Bio</h2>
        <textarea
          type="text"
          className="w-full h-[100px] bg-gray-100 rounded-lg p-2 mt-1"
          value={editedUser.bio}
          onChange={(e) =>
            setEditedUser({ ...editedUser, bio: e.target.value })
          }
        />
        <div className="relative mt-6">
          <div>
            <label
              htmlFor="image-upload"
              className="lg:w-full w-[98%] text-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer absolute"
            >
              Elegir Imagen de perfil
            </label>
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              onChange={handleImageChange}
              className="lg:w-full w-[98%] opacity-0 p-2 border rounded-md"
              style={{ cursor: "pointer" }}
            />
          </div>
          <div id="thumbnail-container" className="lg:ml-[35%]"></div>
        </div>
        <button
          className="bg-blue-500 text-white rounded-lg p-2 mt-4"
          type="submit"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default DashUser;
