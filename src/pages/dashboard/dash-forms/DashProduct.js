import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig.js";
import Swal from "sweetalert2";

function DashProduct({
  product,
  getProducts,
  setEditingProduct,
  setAddingProduct,
}) {
  const [editedProduct, setEditedProduct] = useState(
    product || {
      name: "",
      description: "",
      precio: "",
      tel: "",
      categoria: "",
    }
  );
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // If the input is 'tel', convert the value to a string
    const processedValue = name === 'tel' ? String(value) : value;
  
    setEditedProduct({ ...editedProduct, [name]: processedValue });
  };
  
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Seguro que quieres eliminar este producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${product.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          await Swal.fire(
            "Eliminado",
            "El producto ha sido eliminado con éxito",
            "success"
          );
          getProducts();
          setEditingProduct(false);
        } else {
          const errorData = await response.json();
          Swal.fire("Error", errorData.message, "error");
        }
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        Swal.fire(
          "Error",
          "Ha ocurrido un error al eliminar el producto",
          "error"
        );
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const telValue = typeof editedProduct.tel === 'string'
    ? editedProduct.tel.trim()
    : String(editedProduct.tel).trim();

  if (
    !editedProduct.name.trim() ||
    !editedProduct.description.trim() ||
    !telValue ||
    !editedProduct.precio.trim()
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }

    if (
      editedProduct.name[0] === " " ||
      editedProduct.precio[0] === " " ||
      editedProduct.tel[0] === " " ||
      editedProduct.description[0] === " "
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Los campos no deben empezar con espacios.",
      });
      return;
    }

    if (image) {
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      const extension = image.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(`.${extension}`)) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "La imagen debe ser en formato .jpg, .jpeg o .png.",
        });
        return;
      }
    }

    const data = {
      description: editedProduct.description,
    };

    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);
        data.imageUrl = imageUrl;
      } catch (error) {
        console.error("Error subiendo imagen:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al subir la imagen.",
        });
        return;
      }
    }

    if (editedProduct.name !== product?.name) {
      data.name = editedProduct.name;
    }

    if (editedProduct.precio !== product?.precio) {
      data.precio = editedProduct.precio;
    }
    if (editedProduct.tel !== product?.tel) {
      data.tel = editedProduct.tel;
    }
    if (editedProduct.categoria !== product?.categoria) {
      data.categoria = editedProduct.categoria;
    }

    try {
      const response = await fetch(
        product
          ? `http://localhost:8080/api/products/${product.id}`
          : "http://localhost:8080/api/products",
        {
          method: product ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        await Swal.fire(
          "Guardado",
          `El producto ha sido ${
            product ? "actualizado" : "agregado"
          } con éxito`,
          "success"
        );
        getProducts();
        product ? setEditingProduct(false) : setAddingProduct(false);
      } else {
        const errorData = await response.json();
        Swal.fire("Error", errorData.message, "error");
      }
    } catch (error) {
      console.error(
        `Error al ${product ? "actualizar" : "agregar"} el producto:`,
        error
      );
      Swal.fire(
        "Error",
        `Ha ocurrido un error al ${
          product ? "actualizar" : "agregar"
        } el producto`,
        "error"
      );
    }
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

  return (
    <div className="absolute -top-[-2rem] left-[35rem] w-[40%] h-auto bg-white rounded-lg shadow-xl p-5">
      <form onSubmit={handleSave} className="relative">
        <a
          onClick={() => {
            setEditingProduct(false);
          }}
          className="text-sm font-manjari hover:cursor-pointer font-bold absolute right-3"
        >
          X
        </a>
        <h2 className="text-xl font-semibold mt-3">Nombre del Producto</h2>
        <input
          type="text"
          name="name"
          className="w-full bg-gray-100 rounded-lg p-2"
          value={editedProduct.name}
          onChange={handleInputChange}
        />
        <h2 className="text-xl font-semibold mt-3">Descripción</h2>
        <textarea
          type="text"
          className="w-full h-[100px] bg-gray-100 rounded-lg p-2 mt-1"
          value={editedProduct.description}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, description: e.target.value })
          }
        />
        <h2 className="text-xl font-semibold mt-3">Precio</h2>
        <input
          type="number"
          name="precio"
          className="w-full bg-gray-100 rounded-lg p-2"
          value={editedProduct.precio}
          onChange={handleInputChange}
        />
        <h2 className="text-xl font-semibold mt-3">Teléfono</h2>
        <input
          type="number"
          name="tel"
          className="w-full bg-gray-100 rounded-lg p-2"
          value={editedProduct.tel}
          onChange={handleInputChange}
        />
        <h2 className="text-xl font-semibold mt-3">Categoría</h2>
        <select
          name="categoria"
          value={editedProduct.categoria}
          onChange={handleInputChange}
          className="w-full bg-gray-100 rounded-lg p-2"
        >
          <option value="">Selecciona una categoría</option>
          <option value="ropa">Ropa y Accesorios</option>
          <option value="artesanias">Artesanías</option>
          <option value="gastronomia">Gastronomía</option>
          <option value="otros">Otros</option>
        </select>
        <div className="relative mt-6">
          <div>
            <label
              htmlFor="image-upload"
              className="lg:w-full w-[98%] text-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer absolute"
            >
              Imagen del producto
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
          type="submit"
        >
          {product ? "Guardar" : "Agregar"}
        </button>
        {product && (
          <button
            className="bg-red-500 text-white rounded-lg p-2 mt-4 ml-2"
            type="button"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        )}
      </form>
    </div>
  );
}

export default DashProduct;
