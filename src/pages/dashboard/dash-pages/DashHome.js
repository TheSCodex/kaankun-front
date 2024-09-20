import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Auth";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../sidebar/Sidebar";

function DashHome() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);

  let decodedToken;
  const userToken = localStorage.getItem("token");
  if (userToken) {
    decodedToken = jwtDecode(userToken);
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      let users;

      const results = await fetch(`http://localhost:8080/api/users`);
      if (!results.ok) {
        console.log(results);
        alert("Algo salió mal");
      }
      users = await results.json();

      console.log(users);
      setUsers(users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      let products;
      const results = await fetch(`http://localhost:8080/api/products-u`);
      if (!results.ok) {
        console.log(results);
        alert("Algo salió mal");
      }
      products = await results.json();

      console.log(products);
      setProducts(products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getPosts = async () => {
    try {
      setLoading(true);
      let posts;
      const results = await fetch(`http:localhost:8080/api/Getpost`);
      if (!results.ok) {
        console.log(results);
        alert("Algo salió mal");
      }
      posts = await results.json();

      console.log(posts);
      setPosts(posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-[250px] mt-[83px] w-full bg-slate-200">
        <div className="p-6 overflow-auto">
          <div class="mt-4">
            <div class="flex flex-wrap -mx-6">
              <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
                <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-md">
                  <div class="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                    <svg
                      class="w-8 h-8 text-white"
                      viewBox="0 0 28 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>

                  <div class="mx-5">
                    <h4 class="text-2xl font-semibold text-gray-700">
                      {users.length}
                    </h4>
                    <div class="text-gray-500">Usuarios</div>
                  </div>
                </div>
              </div>

              <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-md">
                  <div class="p-3 bg-orange-600 bg-opacity-75 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 200"
                      width="30"
                      height="30"
                    >
                      <rect
                        x="-20"
                        y="30"
                        width="150"
                        height="150"
                        fill="#ffffff"
                      />
                      <line x1="10" y1="70" x2="100" y2="70" stroke="#000000" />
                      <line x1="10" y1="90" x2="100" y2="90" stroke="#000000" />
                      <line
                        x1="10"
                        y1="110"
                        x2="100"
                        y2="110"
                        stroke="#000000"
                      />
                    </svg>
                  </div>

                  <div class="mx-5">
                    <h4 class="text-2xl font-semibold text-gray-700">
                      {posts.length}
                    </h4>
                    <div class="text-gray-500">Posts</div>
                  </div>
                </div>
              </div>

              <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-md">
                  <div class="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                    <svg
                      class="w-8 h-8 text-white"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                  </div>

                  <div class="mx-5">
                    <h4 class="text-2xl font-semibold text-gray-700">
                      {products.length}
                    </h4>
                    <div class="text-gray-500">Productos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col mt-8">
            <div class="py-2 -my-2 -mx-6 px-6">
              <h2 className="font-manjari text-lg">
                Usuarios registrados recientemente
              </h2>
              <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow-md">
                <table class="min-w-full">
                  <thead>
                    <tr>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Foto de perfil
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Nombre de Usuario
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Nombre
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Apellido
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Rol
                      </th>
                    </tr>
                  </thead>

                  <tbody class="bg-white">
                    {users
                      .sort((a, b) => new Date(b.created) - new Date(a.created))
                      .slice(0, 3)
                      .map((user) => (
                        <tr key={user.id}>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 w-10 h-10">
                                <img
                                  class="w-10 h-10 rounded-full"
                                  src={user.profileImage}
                                  alt="No imagen"
                                />
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="ml-4">
                              <div class="text-sm font-medium leading-5 text-gray-900">
                                {user.userName}
                              </div>
                              <div class="text-sm leading-5 text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900">
                              {user.name}
                            </div>
                          </td>

                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900">
                              {user.lastName}
                            </div>
                          </td>

                          <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            {user.userTypeId === 1 ? "Cliente" : "Admin"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <h2 className="font-manjari mt-4 text-lg">Productos Recientes</h2>
              <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow-md">
                <table class="min-w-full">
                  <thead>
                    <tr>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Foto
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Producto
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Descripción
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Precio
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Usuario
                      </th>
                    </tr>
                  </thead>

                  <tbody class="bg-white">
                    {products
                      .sort((a, b) => new Date(b.created) - new Date(a.created))
                      .slice(0, 3)
                      .map((product) => (
                        <tr key={product.id}>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 w-10 h-10">
                                <img
                                  class="w-10 h-10 rounded-full"
                                  src={product.imageUrl}
                                  alt="No imagen"
                                />
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="ml-4">
                              <div class="text-sm font-medium leading-5 text-gray-900">
                                {product.name}
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900 line-clamp-1">
                              {product.description}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900">
                              {product.precio}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900">
                              {product.userName === null
                                ? product.g_user
                                : product.userName}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <h2 className="font-manjari mt-4 font-lg">Posts recientes</h2>
              <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow-md">
                <table class="min-w-full">
                  <thead>
                    <tr>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Titulo
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Canal
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Contenido
                      </th>
                      <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                       Usuario 
                      </th>
                    </tr>
                  </thead>

                  <tbody class="bg-white">
                    {posts
                      .sort((a, b) => new Date(b.created) - new Date(a.created))
                      .slice(0, 3)
                      .map((post) => (
                        <tr key={post.id}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div class="text-sm font-medium leading-5 text-gray-900">
                                {post.title}
                              </div>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900">
                              {post.channelName}
                            </div>
                          </td>

                          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900">
                              {post.content}
                            </div>
                          </td>

                          <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            {post.userName}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashHome;
