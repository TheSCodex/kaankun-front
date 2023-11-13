import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Auth.js";
import { jwtDecode } from "jwt-decode";
import Header from "./Header.js";
import Footer from "./Footer.js";
import EditProductForm from "./EditForm.js";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const DetallesProducto = () => {
  const { isLoggedIn } = useAuth();
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`
      );

      if (response.ok) {
        const results = await response.json();
        setProduct(results);
        setLoading(false);
      } else {
        console.log("Ocurrió un error al obtener el producto");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error tratando de recuperar producto:", error);
      setLoading(false);
    }
  };

  const handleEditProduct = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const token = localStorage.getItem("token");

  let decodedToken;
  const userToken = localStorage.getItem("token");
  if (userToken) {
    decodedToken = jwtDecode(userToken);
  }
  const currentUserId = decodedToken ? decodedToken.userId : null;

  return (
    <>
      <Header />
      <div className="lg:mt-[73px] mt-[122px]">
        <div className="bg-[#E7E7E7] h-full overflow-auto no-scrollbar">
          <div className="flex lg:flex-row flex-col lg:justify-between w-full p-10">
            <section>
              {product.map((product) => (
                <img
                  key={product.id}
                  className="lg:w-[700px] lg:h-[550px]"
                  src={product.imageUrl}
                  alt={product.name}
                />
              ))}
            </section>
            <section>
              <div className="bg-white lg:h-full lg:w-[520px] p-8">
                {product.map((product) => (
                  <React.Fragment key={product.id}>
                    <h2 className="text-xl font-bold font-montserrat">
                      {product.name}
                    </h2>
                    <p className="font-montserrat mt-2">
                      {product.description}
                    </p>
                    <p className="font-montserrat font-bold mt-2">
                      ${product.precio}MXN
                    </p>
                  </React.Fragment>
                ))}
                <div className="bg-[#00000063] h-[1px] w-[100%] mt-[30%] lg:mt-[50%]"></div>
                <div>
                  {isLoggedIn && currentUserId && (
                    <>
                      <button
                        className="font-manjari text-lg font-bold mt-2 text-[#43B8E8] bg-transparent hover:bg-blue-500  hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={handleEditProduct}
                      >
                        Editar
                      </button>
                      {isEditing && (
                        <div className="modal">
                          <div className="modal-content">
                            <EditProductForm
                              product={product[0]}
                              onCancel={handleCancelEdit}
                              fetchProduct={fetchProduct}
                              setIsEditing={setIsEditing}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div>
                    <h3 className="text-center">
                      <strong>Ubicacion del Vendedor</strong>
                    </h3>

                    <LoadScript googleMapsApiKey="AIzaSyDXq0aYxIepKo7GzPwJuX2d9tXfWHYsxdo">
                      <GoogleMap
                        mapContainerStyle={{ height: "300px", width: "100%" }}
                        zoom={15}
                        center={{
                          lat: 21.0814137,
                          lng: -86.8312242,
                        }}
                      >
                        <Marker
                          position={{
                            lat: 21.0814137,
                            lng: -86.8312242,
                          }}
                          title="Ubicación del Vendedor"
                        />
                      </GoogleMap>
                    </LoadScript>
                  </div>

                  <div className="flex space-x-4 mt-4 ">
                    <h3 className="text-center">
                      <strong>Compartir producto en:</strong>
                    </h3>
                    <FacebookShareButton
                      url={`https://localhost:3000/mercado/${productId}`}
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`https://localhost:3000/mercado/${productId}`}
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      url={`https://localhost:3000/mercado/${productId}`}
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <TelegramShareButton
                      url={`https://localhost:3000/mercado/${productId}`}
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetallesProducto;
