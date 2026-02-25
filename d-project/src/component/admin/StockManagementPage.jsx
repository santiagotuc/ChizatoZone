import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as productService from "../../services/productService";
import styles from "./AdminPage.module.css";
import EditProductModal from "./EditProductModal";
import AdminMenu from "./AdminMenu";
import MessageModal from "../MessageModal";

const StockManagementPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [messageModal, setMessageModal] = useState({
    show: false,
    type: "info",
    title: "",
    message: "",
    onConfirm: null,
    onModalCloseRedirect: null,
  });

  const showMessage = (
    type,
    title,
    message,
    onConfirm = null,
    onModalCloseRedirect = null
  ) => {
    setMessageModal({
      show: true,
      type,
      title,
      message,
      onConfirm,
      onModalCloseRedirect,
    });
  };

  const handleCloseMessageModal = () => {
    if (messageModal.onModalCloseRedirect) {
      messageModal.onModalCloseRedirect();
    }
    setMessageModal({ ...messageModal, show: false });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.isAdmin) {
      navigate("/404");
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error al obtener los productos:", err);
      showMessage(
        "error",
        "Error de Carga",
        "No se pudieron cargar los productos. Asegúrate de que tu backend esté funcionando y que tengas permisos de administrador."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setProductToEdit(null);
    fetchProducts();
  };

  const handleUpdateProduct = async (productId, updatedProductData) => {
    try {
      await productService.updateProduct(productId, updatedProductData);
      showMessage(
        "success",
        "Producto Actualizado",
        "Producto actualizado con éxito!"
      );
      fetchProducts();
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
      showMessage(
        "error",
        "Error al Actualizar Producto",
        `Error al actualizar el producto: ${
          err.response?.data?.message || err.message || "Error desconocido"
        }. Revisa la consola.`
      );
    }
  };

  const handleDeleteProduct = async (productId, productName) => {
    showMessage(
      "warning",
      "Confirmar Eliminación",
      `¿Estás seguro de que quieres eliminar el producto "${productName}"? Esta acción es irreversible.`,
      async () => {
        try {
          await productService.deleteProduct(productId);
          showMessage(
            "success",
            "Producto Eliminado",
            "Producto eliminado con éxito!"
          );
          fetchProducts();
        } catch (err) {
          console.error("Error al eliminar el producto:", err);
          showMessage(
            "error",
            "Error al Eliminar Producto",
            `Error al eliminar el producto: ${
              err.response?.data?.message || err.message || "Error desconocido"
            }. Revisa la consola.`
          );
        }
      }
    );
  };

  const formatControlDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Fecha Inválida";
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const filteredProducts = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.author.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [products, searchTerm]);

  if (loading) {
    return (
      <div className="text-white text-center mt-5">Cargando productos...</div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Administrar Stock de la Librería</h1>

      <div className="d-flex justify-content-center mb-4">
        <AdminMenu />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre, autor, categoría, descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 && !searchTerm ? (
        <p className="text-white">No hay productos registrados.</p>
      ) : filteredProducts.length === 0 && searchTerm ? (
        <p className="text-white">
          No hay productos que coincidan con la búsqueda.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Autor</th>
                <th>Último Control</th>
                <th>Rating</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "50px", height: "auto" }}
                      className="img-fluid rounded"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                  <td>
                    <p className={styles.descriptionCell}>
                      {product.description}
                    </p>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.author}</td>
                  <td>{formatControlDate(product.lastStockControlDate)}</td>
                  <td>{product.rating}/5</td>
                  <td>${product.price?.toLocaleString("es-ES") || "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditClick(product)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDeleteProduct(product._id, product.name)
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        productToEdit={productToEdit}
        onUpdateProduct={handleUpdateProduct}
      />
      <MessageModal
        show={messageModal.show}
        handleClose={handleCloseMessageModal}
        type={messageModal.type}
        title={messageModal.title}
        message={messageModal.message}
        onConfirm={messageModal.onConfirm}
        onModalCloseRedirect={messageModal.onModalCloseRedirect}
      />
    </div>
  );
};

export default StockManagementPage;
