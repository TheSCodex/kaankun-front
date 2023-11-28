import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function DashUser({ user, setEditingUser, getUsers, setAddingUser }) {
  const [image, setImage] = useState(null);
  const [editedUser, setEditedUser] = useState({
    userName: "",
    name: "",
    email: "",
    lastName: "",
    bio: "",
    password: "",
  });

  const validatePassword = (password) => {
    const passwordWithoutSpaces = password.trim();
    return (
      passwordWithoutSpaces.length >= 6 && passwordWithoutSpaces.length <= 12
    );
  };

  useEffect(() => {
    if (user) {
      setEditedUser({
        userName: user.userName,
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        bio: user.bio,
        password: user.password,
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();

    const { password, ...userWithoutPassword } = editedUser;

    if (
      !editedUser.userName.trim() ||
      !editedUser.bio.trim() ||
      !editedUser.name.trim() ||
      !editedUser.lastName.trim() &&
      !validatePassword(editedUser.password) ||
      !userWithoutPassword.userName.trim() ||
      !userWithoutPassword.bio.trim() ||
      !userWithoutPassword.name.trim() ||
      !userWithoutPassword.email.trim() ||
      !userWithoutPassword.lastName.trim()
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }

    if (
      userWithoutPassword.userName[0] === " " ||
      userWithoutPassword.bio[0] === " " ||
      userWithoutPassword.name[0] === " " ||
      userWithoutPassword.email[0] === " " ||
      editedUser.password[0] === " " ||
      userWithoutPassword.lastName[0] === " "
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
      const extension = image.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(`.${extension}`)) {
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
      ...(editedUser.password && { password: editedUser.password }),
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

    if (editedUser.userName !== user?.userName) {
      data.userName = editedUser.userName;
    }

    if (editedUser.name !== user?.name) {
      data.name = editedUser.name;
    }

    if (editedUser.lastName !== user?.lastName) {
      data.lastName = editedUser.lastName;
    }
    if (editedUser.email !== user?.email) {
      data.email = editedUser.email;
    }

    try {
      const url = user
        ? `http://localhost:8080/api/users/${user.id}`
        : "http://localhost:8080/api/users";
      const method = user ? "PATCH" : "POST";
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200 || response.status === 201) {
        const successMessage = user
          ? "Perfil actualizado correctamente."
          : "Usuario agregado correctamente.";
        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: successMessage,
        });
        getUsers();
        user ? setEditingUser(false) : setAddingUser(false);
      } else if (response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El nombre de usuario ya está en uso. Por favor, elige otro.",
        });
      } else {
        console.log("Fallo al procesar la operación");
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

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const url = `http://localhost:8080/api/users/${user.id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });

        if (response.status === 500) {
          console.log("Ha ocurrido un error");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se ha podido eliminar el perfil correctamente.",
          });
        } else if (response.status === 200) {
          console.log("Perfil eliminado exitosamente");
          Swal.fire({
            icon: "success",
            title: "Eliminación exitosa",
            text: "Perfil eliminado correctamente.",
          });
          getUsers();
          setEditingUser(false);
        } else if (response.status === 409) {
          console.log("Fallo al eliminar perfil");
          Swal.fire({
            icon: "info",
            title: "No puedes hacer esto",
            text: "Este usuario tiene productos y/o publicaciones asociadas. Debes eliminarlos primero",
          });
        }
      }
    } catch (error) {
      console.error("Error enviando solicitud:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al enviar la solicitud de eliminación.",
      });
    }
  };

  return (
    <div className="absolute -top-[-1rem] left-[35rem] w-[40%] h-auto bg-white rounded-lg shadow-xl p-5">
      <form onSubmit={handleSave} className="relative">
        <a
          onClick={() => {
            user ? setEditingUser(false) : setAddingUser(false);
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
        <h2 className="text-xl font-semibold mt-3">Email</h2>
        <input
          type="text"
          className="w-full bg-gray-100 rounded-lg p-2"
          value={editedUser.email}
          onChange={(e) =>
            setEditedUser({ ...editedUser, email: e.target.value })
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
        {user ? (
          ""
        ) : (
          <>
            <h2 className="text-xl font-semibold mt-3">Contraseña</h2>
            <input
              type="text"
              className="w-full bg-gray-100 rounded-lg p-2"
              value={editedUser.password}
              onChange={(e) =>
                setEditedUser({ ...editedUser, password: e.target.value })
              }
            />
          </>
        )}
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
          className="bg-blue-500 text-white rounded-lg p-2 mt-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          type="submit"
        >
          {user ? "Actualizar" : "Guardar"}
        </button>
        {user && (
          <button
            className="bg-red-500 text-white rounded-lg p-2 mt-4 ml-2"
            type="button"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        )}
      </form>
    </div>
  );
}

export default DashUser;
