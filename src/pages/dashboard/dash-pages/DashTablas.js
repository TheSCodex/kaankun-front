import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../../Auth";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../sidebar/Sidebar";
import DashUser from "../dash-forms/DashUser";
import DashProduct from "../dash-forms/DashProduct";
import DashPost from "../dash-forms/DashPost";

function DashTablas() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [editingProduct, setEditingProduct] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const [addingProduct, setAddingProduct] = useState(false);
  const [addingPost, setAddingPost] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [channels, setChannels] = useState([]);

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
      const uniqueChannels = await posts.map(post => ({
        Id_Channel: post.Id_Channel,
        channelName: post.channelName
      }));
      
      const uniqueChannelsSet = new Set(uniqueChannels.map(channel => JSON.stringify(channel)));
      const uniqueChannelsArray = Array.from(uniqueChannelsSet).map(channel => JSON.parse(channel));

      setChannels(uniqueChannelsArray);

      console.log(posts);
      setPosts(posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
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
        const url = `http://localhost:8080/turuta/quenoexiste/${userId}`;
        const response = await fetch(url, {
          method: "DELETE",
        });

        if (response.status === 500) {
          console.log("Ha ocurrido un error");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se ha podido eliminar el post correctamente.",
          });
        } else if (response.status === 200) {
          console.log("Perfil eliminado exitosamente");
          Swal.fire({
            icon: "success",
            title: "Eliminación exitosa",
            text: "Post eliminado correctamente.",
          });
          getPosts();
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

  const toggleShowAllUsers = () => {
    setShowAllUsers(!showAllUsers);
  };

  const toggleShowAllProducts = () => {
    setShowAllProducts(!showAllProducts);
  };

  const toggleShowAllPosts = () => {
    setShowAllPosts(!showAllPosts);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-[250px] mt-[43px] w-full bg-slate-200 h-screen">
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
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        <a
                          onClick={() => {
                            setAddingUser(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        >
                          Agregar
                        </a>
                      </th>
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
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        <a
                          onClick={() => {
                            setAddingProduct(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        >
                          Agregar
                        </a>
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
                              {(product.userName === null ||
                                product.userName === "") &&
                              (product.g_user === null || product.g_user === "")
                                ? "Agregado por administrador"
                                : product.userName || product.g_user}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <a
                              onClick={() => {
                                setEditingProduct(true);
                                setProductToEdit(product);
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
              {products.length > 3 && (
                <button
                  className="text-indigo-600 hover:text-indigo-900 underline"
                  onClick={toggleShowAllProducts}
                >
                  {showAllProducts ? "Ver menos" : "Ver más"}
                </button>
              )}
              <h2 className="font-manjari mt-4 text-lg">Publicaciones</h2>
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow-md">
                <table className="min-w-full">
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
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        <a
                          onClick={() => {
                            setAddingPost(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        >
                          Agregar
                        </a>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {posts
                      .sort((a, b) => new Date(b.created) - new Date(a.created))
                      .slice(0, showAllPosts ? posts.length : 3)
                      .map((post) => (
                        <tr key={post.Id}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {post.title}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="ml-4">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {post.channelName}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900 line-clamp-1">
                              {post.content}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              {(post.userName === null ||
                                post.userName === "") &&
                              (post.g_user === null || post.g_user === "")
                                ? "Agregado por administrador"
                                : post.userName || post.g_user}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <a
                              onClick={() => {
                                handleDelete(post.Id);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            >
                              Eliminar
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {posts.length > 3 && (
                <button
                  className="text-indigo-600 hover:text-indigo-900 underline"
                  onClick={toggleShowAllPosts}
                >
                  {showAllPosts ? "Ver menos" : "Ver más"}
                </button>
              )}
            </div>
          </div>
        </div>
        {editingUser && (
          <DashUser
            getUsers={getUsers}
            setEditingUser={setEditingUser}
            user={userToEdit}
          />
        )}
        {editingProduct && (
          <DashProduct
            getProducts={getProducts}
            setEditingProduct={setEditingProduct}
            product={productToEdit}
          />
        )}
        {addingUser && (
          <DashUser getUsers={getUsers} setAddingUser={setAddingUser} />
        )}
        {addingProduct && (
          <DashProduct
            getProducts={getProducts}
            setAddingProduct={setAddingProduct}
          />
        )}
        {addingPost && (
          <DashPost getPosts={getPosts} setAddingPost={setAddingPost} availableChannels={channels}/>
        )}
      </div>
    </div>
  );
}

export default DashTablas;
