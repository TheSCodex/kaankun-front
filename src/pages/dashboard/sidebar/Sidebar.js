import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../../Auth";import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

function Sidebar() {
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  let decodedToken;
  const userToken = localStorage.getItem("token");
  if (userToken) {
    decodedToken = jwtDecode(userToken);
  }

  const userId = decodedToken ? decodedToken.userId : null;
  const source = decodedToken ? decodedToken.source : null;

  useEffect(() => {
    if (userId != null) {
      getLoggedUser();
    }
  }, []);

  const getLoggedUser = async () => {
    try {
      setLoading(true);
      let user;
      if (decodedToken.source === "Google") {
        user = decodedToken;
      } else {
        const results = await fetch(
          `http://localhost:8080/api/users/${userId}`
        );
        if (!results.ok) {
          console.log(results);
          alert("Algo salió mal");
        }
        user = await results.json();
      }
      console.log(user);
      setUser(user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="ml-[250px] bg-white w-[1146px] fixed shadow-md">
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
          <section className="font-manjari text-xl font-semibold">
            {user.userName || user.name}
          </section>
          <section>
            <img
              src={user.profileImage || user.picture}
              className="h-12 w-12 rounded-full"
            />
          </section>
        </div>
      </div>
      <div className="bg-[#111827] h-screen fixed w-[250px]">
        <section className="flex items-center mt-4 p-6">
          <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <img src={logo} className="h-6" />
          </div>
          <h2 className="text-white font-manjari font-semibold text-xl">
            Dashboard
          </h2>
        </section>
        <Link to={'/dashboard'} class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            ></path>
          </svg>

          <span class="mx-3">Inicio</span>
        </Link>
        <Link to={'/dashboard/tablas'} class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>

          <span class="mx-3">Tablas</span>
        </Link>
        <Link to={'/'} class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
        <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
          <span class="mx-3">Ir a la aplicación</span>
        </Link>
      </div>
    </>
  );
}

export default Sidebar;
