import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Auth";
import { storage } from "../firebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Profile({ user, setViewingProfile, getLoggedUser, source }) {
  const { logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleCloseProfile = () => {
    setViewingProfile(false);
  };

  const handleLogout = () => {
    setViewingProfile(false);
    logout();
  };

  const handleCloseForm = () => {
    getLoggedUser();
    setEditing(false);
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

  const editProfile = async (e) => {
    e.preventDefault();
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, image);
        const profileImage = await getDownloadURL(snapshot.ref);

        const data = {
          bio: editedUser.bio,
          profileImage,
        };

        if (editedUser.userName !== user.userName) {
          data.userName = editedUser.userName;
        }
        console.log(data);
        try {
          const userId = parseInt(user.id, 10);
          console.log(userId);
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
            console.log("Profile update successful");
            getLoggedUser();
            setEditing(false);
          } else {
            console.log("Profile update failed");
          }
        } catch (error) {
          console.error("Error sending request:", error);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="relative lg:max-w-lg w-[70%] ml-[15%] lg:ml-[62%] my-2 bg-white rounded-lg shadow-md p-5">
      {editing ? (
        <>
          <form className="relative">
            <a
              onClick={handleCloseForm}
              className="text-sm font-manjari hover:cursor-pointer font-bold absolute right-3"
            >
              X
            </a>
            <h2 className="text-xl font-semibold mt-3">Username</h2>
            <input
              type="text"
              className="w-full bg-gray-100 rounded-lg p-2"
              value={editedUser.userName}
              onChange={(e) =>
                setEditedUser({ ...editedUser, userName: e.target.value })
              }
            />
            <h2 className="text-xl font-semibold mt-8">Bio</h2>
            <textarea
              type="text"
              className="w-full bg-gray-100 rounded-lg p-2 mt-2"
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
              onClick={editProfile}
            >
              Guardar
            </button>
          </form>
        </>
      ) : (
        <>
          <a
            onClick={handleCloseProfile}
            className="text-sm font-manjari hover:cursor-pointer font-bold absolute right-3"
          >
            X
          </a>
          <img
            className="w-32 h-32 rounded-full mx-auto"
            src={user.profileImage || user.picture}
            alt="Profile picture"
          />
          <h2 className="text-center text-2xl font-semibold mt-3">
            {user.userName || user.name}
          </h2>
          <section className="flex justify-center mt-1">
            <p className="text-center text-gray-600 mr-2">{user.name}</p>
            <p className="text-center text-gray-600">{user.lastName}</p>
          </section>
          <div className="flex flex-col items-center mt-3">
            {source === "Google" ? (
              ""
            ) : (
              <button
                onClick={() => {
                  setEditing(true);
                }}
              >
                <FontAwesomeIcon className="text-xs" icon={faPen} />
              </button>
            )}

            <a
              onClick={handleLogout}
              className="text-blue-500 hover:text-blue-700 mt-2 mx-3 hover:cursor-pointer"
            >
              Cerrar Sesión
            </a>
          </div>
          <div className="mt-5">
            {source === "Google" ? (
              ""
            ) : (
              <>
                <h3 className="text-xl font-semibold">Bio</h3>
                <p className="text-gray-600 mt-2">{user.bio}</p>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
