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
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";

const DetallesProducto = () => {
  const { isLoggedIn } = useAuth();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

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
      console.error("Error tratando de recuperar producto:", error.message);
      setLoading(false);
    }
  };

  const handleEditProduct = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleContactarVendedor = () => {
    const numeroVendedor = product ? product[0].tel : "";
    const url = `https://wa.me/${numeroVendedor}`;

    window.open(url, "_blank");
  };

  let decodedToken;
  const userToken = localStorage.getItem("token");
  if (userToken) {
    decodedToken = jwtDecode(userToken);
  }
  const currentUserId = decodedToken ? decodedToken.userId : null;
  const source = decodedToken ? decodedToken.source : null;

  const isProductOwnedByCurrentUser =
    product &&
    product.length > 0 &&
    (source === "Google"
      ? product[0].googleId === currentUserId
      : product[0].userId === currentUserId);

  const MapBoxToken =
    "pk.eyJ1IjoicnZpbGxlZ2FzcyIsImEiOiJjbG9yYmJic3UwbzF5MmtsYTJka2c1eXB3In0.SV9Agi8TCgERUtXpUUNf_A";

  useEffect(() => {
    if (
      product &&
      product[0].latitude &&
      product[0].longitude &&
      !mapInitialized
    ) {
      initializeMap();
      setMapInitialized(true);
    }
  }, [product, mapInitialized]);

  const initializeMap = () => {
    const latitude = parseFloat(product[0].latitude);
    const longitude = parseFloat(product[0].longitude);
  
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 15,
      accessToken: MapBoxToken,
    });
  
    const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
  
    marker.getElement().addEventListener('click', () => {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, "_blank");
    });
  };
  

  return (
    <>
      <Header />
      <div className="lg:mt-[73px] mt-[122px]">
        <div className="bg-[#E7E7E7] h-full overflow-auto no-scrollbar">
          <div className="flex lg:flex-row flex-col lg:justify-between w-full p-10">
            <section className="lg:h-full relative">
              {product &&
                product.map((product) => (
                  <img
                    key={product.id}
                    className="relative lg:w-[700px] lg:h-[570px] object-cover"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                ))}
            </section>
            <section>
              <div className="bg-white lg:h-full lg:w-[520px] p-8">
                {product &&
                  product.map((product) => (
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
                <div className="bg-[#00000063] h-[1px] w-[100%] mt-[30%] lg:mt-[20%]"></div>
                <div>
                  {isLoggedIn && isProductOwnedByCurrentUser && (
                    <>
                      <button
                        className="font-manjari text-lg font-bold mt-2 text-[#43B8E8]"
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
                    {product && product[0].latitude && product[0].longitude ? (
                      <div id="map" style={{ height: "200px" }}></div>
                    ) : (
                      <p>El vendedor eligió no dejar una ubicación</p>
                    )}
                  </div>
                  <button
                    className="font-manjari text-lg font-bold mt-2 text-[#43B8E8]"
                    onClick={handleContactarVendedor}
                  >
                    Contactar al Vendedor
                  </button>
                  <div className="flex space-x-4 items-center mt-4 ">
                    <h3 className="text-center">
                      <p className="font-manjari font-semibold">
                        Compartir producto en:
                      </p>
                    </h3>
                    <FacebookShareButton
                      url={`https://localhost:3000/mercado/${productId}`}
                    >
                      <FacebookIcon size={24} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`https://localhost:3000/mercado/${productId}`}
                    >
                      <TwitterIcon size={24} round />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      url={`https://localhost:3000/mercado/${productId}`}
                    >
                      <WhatsappIcon size={24} round />
                    </WhatsappShareButton>
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
