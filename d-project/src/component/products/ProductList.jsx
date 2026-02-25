// src/component/products/ProductList.jsx
import React, { useState, useEffect } from "react";
import * as productService from "../../services/productService";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
        setError(
          "No se pudieron cargar los libros. Por favor, asegúrate de que el backend esté funcionando y tengas productos." // Mensaje actualizado
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center mt-5">Cargando libros...</div> // Mensaje actualizado
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">Error: {error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-white text-center mt-5">
        No hay libros disponibles en este momento. {/* Mensaje actualizado */}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-white mb-4 text-center">
        Nuestra Colección de Libros {/* Título actualizado */}
      </h2>
      <div className="row justify-content-center">
        {products.map((product) => (
          // ¡Ahora usamos ProductCard para cada producto!
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
