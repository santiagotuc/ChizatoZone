import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as productService from "../../services/productService.js";
import * as cartService from "../../services/cartService";
import MessageModal from "../MessageModal";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [quantityInCart, setQuantityInCart] = useState(0);

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
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        const errorMessage =
          err.response?.data?.message ||
          "No se pudo cargar el detalle del libro. Puede que no exista.";
        showMessage("error", "Error de Carga", errorMessage, null, () =>
          navigate("/products")
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, navigate]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await cartService.getMyCart();
        const item = cart.items.find((item) => item.product._id === id);
        if (item) {
          setQuantityInCart(item.quantity);
        } else {
          setQuantityInCart(0);
        }
      } catch (err) {
        console.warn(
          "No se pudo obtener el carrito (posiblemente no logueado):",
          err.message
        );
      }
    };

    fetchCart();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || product.stock <= 0 || adding) return;

    setAdding(true);
    try {
      await cartService.addOrUpdateItemInCart(product._id, quantityInCart + 1);
      setTimeout(() => {
        setQuantityInCart((prev) => prev + 1);
        setAdding(false);
        showMessage(
          "success",
          "Producto Añadido",
          `"${product.name}" ha sido añadido al carrito.`
        );
      }, 500);
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Ocurrió un error al añadir el producto al carrito.";

      if (error.response && error.response.status === 401) {
        showMessage(
          "warning",
          "Inicia Sesión para Comprar",
          "Debes iniciar sesión para poder añadir productos al carrito.",
          null,
          () => navigate("/login")
        );
      } else {
        showMessage("error", "Error al Añadir", errorMessage);
      }
      setAdding(false);
    }
  };

  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product?.price || 0);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-black">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">
            Cargando detalles del libro...
          </span>
        </div>
        <p className="ms-2">Cargando detalles del libro...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-5 text-black">
        Libro no encontrado o datos no disponibles.
      </div>
    );
  }

  return (
    <div className="container mt-5 text-light">
      <div className="row">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-3">{product.name}</h2>
          <p className="lead">
            <strong>Autor:</strong> {product.author}
          </p>
          <p>
            <strong>Categoría:</strong> {product.category}
          </p>
          <p>
            <strong>Descripción:</strong> {product.description}
          </p>
          <p>
            <strong>Stock Disponible:</strong> {product.stock}
          </p>

          <h3 className="text-primary mt-3">
            <strong>Precio: {formattedPrice}</strong>
          </h3>

          <div className="mt-4">
            {product.stock > 0 ? (
              <button
                className="btn btn-success btn-lg w-100 d-flex justify-content-center align-items-center"
                onClick={handleAddToCart}
                disabled={adding}
              >
                {adding ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                    style={{ width: "1.2rem", height: "1.2rem" }}
                  />
                ) : quantityInCart > 0 ? (
                  <>Añadido ({quantityInCart})</>
                ) : (
                  "Añadir al Carrito"
                )}
              </button>
            ) : (
              <button className="btn btn-secondary btn-lg w-100" disabled>
                Sin Stock
              </button>
            )}
          </div>
        </div>
      </div>
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

export default ProductDetail;
