import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Auth";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../sidebar/Sidebar";
import DashUser from "../dash-forms/DashUser";

function DashTablas() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [editingProduct, setEditingProduct] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

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

  const toggleShowAllUsers = () => {
    setShowAllUsers(!showAllUsers);
  };

  const toggleShowAllProducts = () => {
    setShowAllProducts(!showAllProducts);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-[250px] mt-[83px] w-full bg-slate-200 h-screen">
        <div className="p-6 overflow-auto bg-slate-200">
          <div className="flex flex-col mt-8">
            <div className="py-2 -my-2 -mx-6 px-6">
              <h2 className="font-manjari text-lg">Usuarios registrados</h2>
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow-md">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Foto de perfil
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Nombre de Usuario
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Apellido
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Rol
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"></th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {users
                      .sort((a, b) => new Date(b.created) - new Date(a.created))
                      .slice(0, showAllUsers ? users.length : 3)
                      .map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-10 h-10 rounded-full"
                                  src={user.profileImage}
                                  alt="No imagen"
                                />
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="ml-4">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {user.userName}
                              </div>
                              <div className="text-sm leading-5 text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              {user.name}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              {user.lastName}
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            {user.userTypeId === 1 ? "Cliente" : "Admin"}
                          </td>
                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <a
                              onClick={() => {
                                setEditingUser(true);
                                setUserToEdit(user);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            >
                              Editar
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {users.length > 3 && (
                  <button
                    className="text-indigo-600 hover:text-indigo-900 underline"
                    onClick={toggleShowAllUsers}
                  >
                    {showAllUsers ? "Ver menos" : "Ver más"}
                  </button>
                )}
              <h2 className="font-manjari mt-4 text-lg">Productos</h2>
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow-md">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Foto
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Producto
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Descripción
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Precio
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Usuario
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {products
                      .sort((a, b) => new Date(b.created) - new Date(a.created))
                      .slice(0, showAllProducts ? products.length : 3)
                      .map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-10 h-10 rounded-full"
                                  src={product.imageUrl}
                                  alt="No imagen"
                                />
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="ml-4">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {product.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900 line-clamp-1">
                              {product.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              {product.precio}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
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
              {products.length > 3 && (
                <button
                  className="text-indigo-600 hover:text-indigo-900 underline"
                  onClick={toggleShowAllProducts}
                >
                  {showAllProducts ? "Ver menos" : "Ver más"}
                </button>
              )}
            </div>
          </div>
        </div>
        {editingUser && <DashUser getUsers={getUsers} setEditingUser={setEditingUser} user={userToEdit} />}
      </div>
    </div>
  );
}

export default DashTablas;
