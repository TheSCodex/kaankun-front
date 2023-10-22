import React, { useState } from "react";
import { storage } from "../../firebaseConfig.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

//IMÁGENES
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
  const [shopping, setShopping] = useState(true);
  const [selling, setSelling] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [image, setImage] = useState(null);

  const createProduct = async (e) => {
    e.preventDefault();
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);
        const productData = {
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
            } else {
              console.error("Fallo al crear producto");
            }
          })
          .catch((error) => {
            console.error("Fallo al crear producto:", error);
          });
      } catch (error) {
        console.error("Error error subiendo imagen o generando URL:", error);
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
  };

  const handleSelling = () => {
    setSelling(true);
    setShopping(false);
  };

  return (
    <>
      <div className="mt-[73px] bg-[#E7E7E7] z-40">
        <div className="overflow-hidden flex w-full">
          <div className="fixed bg-white border w-[325px] p-6 h-screen overflow-y-auto">
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
                />
                <i>
                  <img src={lupa} className="left-3 top-2 h-[18px] absolute" />
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
              <div className="mt-12">
                <div className="mb-6">
                  <div className="bg-[#000] h-[.8px] w-[100%]"></div>
                  <h1 className="font-montserrat font-semibold text-xl mt-3">
                    Categorías
                  </h1>
                </div>
                <button className="flex items-center mt-8">
                  <img src={ropa} className="h-[25px] mr-6" />
                  <h2 className="font-montserrat font-semibold">
                    Ropa y Accesorios
                  </h2>
                </button>
                <button className="flex items-center mt-10">
                  <img src={artesania} className="h-[25px] mr-6" />
                  <h2 className="font-montserrat font-semibold">Artesanías</h2>
                </button>
                <button className="flex items-center mt-10">
                  <img src={gastronomia} className="h-[25px] mr-6" />
                  <h2 className="font-montserrat font-semibold">Gastronomía</h2>
                </button>
                <button className="flex items-center mt-10">
                  <img src={miscelaneo} className="h-[25px] mr-6" />
                  <h2 className="font-montserrat font-semibold">Otros</h2>
                </button>
              </div>
            </div>
          </div>
          <div className="ml-[335px] w-full">
            <div className="h-screen">
              <div className="h-auto p-6">
                {shopping ? (
                  <>
                    <h2>PRODUCTOS</h2>
                  </>
                ) : (
                  <div>
                    <h2>¿Qué vas a ofertar hoy?</h2>
                    <div>
                      <form onSubmit={createProduct} className="space-y-4">
                        <div className="flex">
                          <div className="space-y-2 mr-2">
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
                              <option value="">Selecciona una categoría</option>
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
                          <div className="w-2/3">
                            <input
                              type="text"
                              placeholder="Descripción"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="w-[95%] h-full p-2 border rounded-md"
                            />
                          </div>
                          <div className="relative">
                            <div>
                              <label
                                htmlFor="image-upload"
                                className="w-[100%] text-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer absolute"
                              >
                                Elegir Imagen
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                id="image-upload"
                                onChange={handleImageChange}
                                className="w-full opacity-0 p-2 border rounded-md"
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            <div
                              id="thumbnail-container"
                              className="ml-12"
                            ></div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                          Agregar Producto!
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mercado;
