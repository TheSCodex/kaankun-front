import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Auth.js";
import { jwtDecode } from "jwt-decode";
import Header from "./Header.js";
import Footer from "./Footer.js";
import EditProductForm from "./EditForm.js";

function DetallesProducto() {
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
        console.log(results);
        setProduct(results);
        setLoading(false);
      } else {
        console.log("Ocurrió un error");
      }
    } catch (error) {
      console.error("Error tratando de recuperar producto:", error);
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

  const isProductOwnedByCurrentUser =
    product.length > 0 && product[0].userId === currentUserId;

  return (
    <>
      <Header />
      <div className="lg:mt-[73px] mt-[122px]">
        <div className="bg-[#E7E7E7] h-full overflow-auto no-scrollbar">
          <div className="flex lg:flex-row flex-col lg:justify-between w-full p-10">
            <section>
              {product.map((product) => (
                <img
                  className="lg:w-[700px] lg:h-[550px]"
                  src={product.imageUrl}
                />
              ))}
            </section>
            <section>
              <div className="bg-white lg:h-full lg:w-[520px] p-8">
                {product.map((product) => (
                  <>
                    <h2 className="text-xl font-bold font-montserrat">
                      {product.name}
                    </h2>
                    <p className="font-montserrat mt-2">
                      {product.description}
                    </p>
                    <p className="font-montserrat font-bold mt-2">
                      ${product.precio}MXN
                    </p>
                  </>
                ))}
                <div className="bg-[#00000063] h-[1px] w-[100%] mt-[30%] lg:mt-[50%]"></div>
                <div>
                  {isLoggedIn && isProductOwnedByCurrentUser ? (
                    <>
                      <button className="font-manjari text-lg font-bold mt-2 text-[#43B8E8]" onClick={handleEditProduct}>Editar</button>
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
                  ) : (
                    <h1 className="text-2xl font-bold">
                      AQUÍ SE INSERTA LA INFO DEL VENDEDOR, MAPS Y REDES
                      SOCIALES
                    </h1>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetallesProducto;
