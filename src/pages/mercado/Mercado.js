import React, { useState, useEffect } from "react";
import { useAuth } from "../../Auth.js";
import { storage } from "../../firebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";

// IMÁGENES
import carrito from "../../assets/carrito.png";
import lupa from "../../assets/lupa.png";
import mercado from "../../assets/mercado.png";
import venta from "../../assets/venta.png";
import ropa from "../../assets/ropa.png";
import artesania from "../../assets/artesania.png";
import gastronomia from "../../assets/gastronomia.png";
import miscelaneo from "../../assets/miscelaneo.png";

function Mercado() {
  const serverUrl = "http://localhost:8080/api/products";
  const { isLoggedIn } = useAuth();
  const [shopping, setShopping] = useState(true);
  const [selling, setSelling] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [image, setImage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [datos, setDatos] = useState([]);
  const [userDatos, setUserDatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  let decodedToken;
  const userToken = localStorage.getItem("token");
  if (userToken) {
    decodedToken = jwtDecode(userToken);
  }
  const userId = decodedToken ? decodedToken.userId : null;
  console.log(userId);

  const getProducts = async () => {
    setLoading(true);
    try {
      const result = await fetch(serverUrl);
      if (!result.ok) {
        console.log("Algo salió mal");
      }

      const products = await result.json();

      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory === "" || product.categoria === selectedCategory)
      );
      
      
      setDatos(filteredProducts);
    } catch (error) {
      console.log("Ha ocurrido un error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [searchTerm, selectedCategory]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category, () => {
      getProducts();
    });
  };

  const getUserProducts = async () => {
    setLoading(true);
    try {
      const result = await fetch(
        `http://localhost:8080/api/products/user/${userId}`
      );
      if (!result.ok) {
        console.log("Algo salió mal");
      }

      const userProducts = await result.json();
      console.log(userProducts);
      setUserDatos(userProducts);
    } catch (error) {
      console.log("Ha ocurrido un error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const createProduct = async (e) => {
    e.preventDefault();
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);
        const productData = {
          userId,
          name,
          description,
          precio,
          categoria,
          imageUrl,
        };

        fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Producto creado exitosamente");
              Swal.fire({
                title: "Producto creado",
                text: "El producto ha sido creado exitosamente",
                icon: "success",
              }).then(() => {
                setName("");
                setDescription("");
                setPrecio("");
                setCategoria("");
                setImage(null);
                getUserProducts();
                getProducts();
              });
            } else {
              console.error("Fallo al crear producto");
              Swal.fire(
                "Error",
                "Ha ocurrido un error al crear el producto",
                "error"
              );
            }
          })
          .catch((error) => {
            console.error("Fallo al crear producto:", error);
            Swal.fire(
              "Error",
              "Ha ocurrido un error al crear el producto",
              "error"
            );
          });
      } catch (error) {
        console.error("Error subiendo imagen o generando URL:", error);
      }
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    const thumbnailContainer = document.getElementById("thumbnail-container");
    if (thumbnailContainer) {
      thumbnailContainer.innerHTML = "";
      const thumbnailImage = document.createElement("img");
      thumbnailImage.className = "max-w-full h-auto mt-2";
      thumbnailImage.style.maxWidth = "85px";
      thumbnailImage.style.maxHeight = "85px";
      thumbnailImage.src = URL.createObjectURL(selectedImage);
      thumbnailContainer.appendChild(thumbnailImage);
    }
  };

  const handleShopping = () => {
    setShopping(true);
    setSelling(false);
    setSidebarOpen(false);
    setSelectedCategory(""); 
  };
  

  const handleSelling = () => {
    setSelling(true);
    setShopping(false);
    setSidebarOpen(false);
  };

  return (
    <>
      <Header />
      <div className="lg:mt-[73px] mt-[122px]">
        <div className="bg-[#E7E7E7] h-screen overflow-y-scroll no-scrollbar">
          <div className="flex w-full">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden absolute top-10 left-10 z-50 ${
                sidebarOpen ? "" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {sidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <div
              className={`lg:fixed bg-white border lg:w-[325px] p-6 lg:h-screen ${
                sidebarOpen ? "" : "hidden"
              } lg:block`}
            >
              <div>
                <div className="flex mb-4">
                  <h1 className="mr-20 font-bold font-montserrat text-2xl">
                    Mercado
                  </h1>
                  <img src={carrito} className="h-[30px]" />
                </div>
                <div className="relative">
                  <input
                    className="bg-[#D9D9D9] h-[35px] w-[245px] p-2 pl-12 font-montserrat rounded-sm"
                    placeholder="Buscar en el mercado"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <i>
                    <img
                      src={lupa}
                      className="left-3 top-2 h-[18px] absolute"
                    />
                  </i>
                </div>
                <div className="mt-10">
                  <button
                    onClick={handleShopping}
                    className="items-center focus:outline-none w-full"
                  >
                    <div className="flex">
                      <img src={mercado} className="h-[30px] mr-6" />
                      <h1 className="font-montserrat font-semibold">
                        Explorar todo
                      </h1>
                    </div>
                    {shopping ? (
                      <div className="bg-[#00000063] h-[1px] w-[85%] mt-4"></div>
                    ) : (
                      ""
                    )}
                  </button>
                </div>
                {isLoggedIn ? (
                  <div className="mt-8">
                    <button
                      onClick={handleSelling}
                      className="items-center focus:outline-none w-full"
                    >
                      <div className="flex">
                        <img src={venta} className="h-[30px] mr-6" />
                        <h1 className="font-montserrat font-semibold">Venta</h1>
                      </div>
                      {selling ? (
                        <div className="bg-[#00000063] h-[1px] w-[85%] mt-4"></div>
                      ) : (
                        ""
                      )}
                    </button>
                  </div>
                ) : (
                  ""
                )}

                <div className="mt-12">
                  <div className="mb-6">
                    <div className="bg-[#000] h-[.8px] w-[100%]"></div>
                    <h1 className="font-montserrat font-semibold text-xl mt-3">
                      Categorías
                    </h1>
                  </div>
                  <button
                    onClick={() => handleCategoryFilter("Ropa y Accesorios")}
                    className="flex items-center mt-8"
                  >
                    <img src={ropa} className="h-[25px] mr-6" />
                    <h2 className="font-montserrat font-semibold">
                      Ropa y Accesorios
                    </h2>
                  </button>

                  <button
                    onClick={() => handleCategoryFilter("Artesanías")}
                    className="flex items-center mt-10"
                  >
                    <img src={artesania} className="h-[25px] mr-6" />
                    <h2 className="font-montserrat font-semibold">
                      Artesanías
                    </h2>
                  </button>
                  <btton
                    onClick={() => handleCategoryFilter("Gastronomía")}
                    className="flex items-center mt-10"
                  >
                    <img src={gastronomia} className="h-[25px] mr-6" />
                    <h2 className="font-montserrat font-semibold">
                      Gastronomía
                    </h2>
                  </btton>
                  <button
                    onClick={() => handleCategoryFilter("Otros")}
                    className="flex items-center mt-10"
                  >
                    <img src={miscelaneo} className="h-[25px] mr-6" />
                    <h2 className="font-montserrat font-semibold">Otros</h2>
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:ml-[335px] h-full w-full">
              <div className="h-screen">
                <div className="p-6 lg:pl-14">
                  {shopping ? (
                    <>
                      <div className="grid lg:grid-cols-4 grid-cols-2 gap-7 lg:gap-4">
                        {loading ? (
                          <div className="flex flex-col items-center justify-center p-4 font-semibold text-center">
                            <p className="mb-4">Cargando...</p>
                            <FontAwesomeIcon
                              icon={faSpinner}
                              className="text-6xl"
                              spin
                              pulse
                            />
                          </div>
                        ) : (
                          datos.map((product) => {
                            return (
                              <div
                                key={product.id}
                                className="lg:h-[325px] h-auto w-[150px] lg:w-[200px]"
                              >
                                <Link to={`/mercado/${product.id}`}>
                                  <img
                                    src={product.imageUrl}
                                    className="rounded-sm h-[180px] w-full"
                                  />
                                </Link>
                                <h2 className="font-montserrat font-bold text-lg">
                                  ${product.precio}MXN
                                </h2>
                                <p className="font-montserrat font-semibold">
                                  {product.name}
                                </p>
                                <p className="font-montserrat text-sm line-clamp-2">
                                  {product.description}
                                </p>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </>
                  ) : (
                    <div>
                      <h2 className="font-manjari text-xl font-bold mb-4">
                        ¿Qué vas a ofertar hoy?
                      </h2>
                      <div>
                        <form onSubmit={createProduct} className="space-y-4">
                          <div className="flex lg:flex-row flex-col">
                            <div className="space-y-2 mr-2 lg:mb-0 mb-2">
                              <input
                                type="text"
                                placeholder="Nombre del producto"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border rounded-md"
                              />
                              <select
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                className="w-full p-2 border rounded-md"
                              >
                                <option value="">
                                  Selecciona una categoría
                                </option>
                                <option value="ropa">Ropa y Accesorios</option>
                                <option value="artesanias">Artesanías</option>
                                <option value="gastronomia">Gastronomía</option>
                                <option value="otros">Otros</option>
                              </select>
                              <input
                                type="text"
                                placeholder="Precio"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                className="w-full p-2 border rounded-md"
                              />
                            </div>
                            <div className="lg:w-2/3 relative lg:mb-0 mb-2">
                              <textarea
                                placeholder="Descripción"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-[98%] h-full p-2 border rounded-md resize-none overflow-y-auto"
                                style={{ verticalAlign: "top" }}
                              />
                            </div>
                            <div className="relative">
                              <div>
                                <label
                                  htmlFor="image-upload"
                                  className="lg:w-full w-[98%] text-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer absolute"
                                >
                                  Elegir Imagen
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
                              <div
                                id="thumbnail-container"
                                className="lg:ml-12 ml-32"
                              ></div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="lg:w-full w-[98%] bg-blue-500 text-white p-2 rounded-md hover-bg-blue-600"
                          >
                            Agregar Producto!
                          </button>
                        </form>
                      </div>
                      <div className="mt-6">
                        {userDatos.length > 0 ? (
                          <>
                            <h1 className="font-manjari text-xl font-bold mb-1 mt-6">
                              Tus productos:
                            </h1>
                            <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                              {userDatos.map((product) => (
                                <div
                                  key={product.id}
                                  className="flex flex-col justify-center p-4"
                                >
                                  <Link to={`/mercado/${product.id}`}>
                                    <img
                                      src={product.imageUrl}
                                      alt={product.name}
                                    />
                                  </Link>
                                  <p className="font-montserrat font-bold text-xl mt-2">
                                    ${product.precio}MXN
                                  </p>
                                  <h2 className="font-montserrat font-semibold">
                                    {product.name}
                                  </h2>
                                  <p className="line-clamp-2">
                                    {product.description}
                                  </p>
                                </div>
                              ))}
                            </section>
                          </>
                        ) : (
                          <h1>No se encontraron productos.</h1>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Mercado;
