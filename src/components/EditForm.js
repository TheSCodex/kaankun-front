import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditProductForm({
  product,
  onSave,
  onCancel,
  fetchProduct,
  setIsEditing,
}) {
  const [editedProduct, setEditedProduct] = useState(product);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
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
          fetchProduct();
          setIsEditing(false);
          navigate("/mercado");
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

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });
  
      if (response.ok) {
        await Swal.fire("Guardado", "El producto ha sido actualizado con éxito", "success");
        fetchProduct();
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        Swal.fire("Error", errorData.message, "error");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      Swal.fire("Error", "Ha ocurrido un error al actualizar el producto", "error");
    }
  };

  return (
    <div className="edit-product-form max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre:
        </label>
        <input
          type="text"
          name="name"
          value={editedProduct.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Descripción:
        </label>
        <textarea
          name="description"
          value={editedProduct.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md resize-none"
          rows="4"
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          htmlFor="precio"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Precio:
        </label>
        <input
          type="text"
          name="precio"
          value={editedProduct.precio}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="flex lg:flex-row flex-col lg:justify-between justify-center">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded-md lg:mb-0 mb-2 hover:bg-blue-600"
        >
          Guardar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded-md lg:mb-0 mb-2 hover:bg-red-600"
        >
          Eliminar
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default EditProductForm;
