import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddProductModal = ({
  isOpen,
  onClose,
  addProduct,
  updateProduct,
  productToEdit,
}) => {
  const [productData, setProductData] = useState({
    name: "",
    stock: 0,
    description: "",
    category: "",
    author: "",
    image: "",
    rating: 1,
    price: 0,
  });

  useEffect(() => {
    if (productToEdit) {
      setProductData({
        ...productToEdit,
        rating: productToEdit.rating || 1,
        price: productToEdit.price || 0,
      });
    } else {
      setProductData({
        name: "",
        stock: 0,
        description: "",
        category: "",
        author: "",
        image: "",
        rating: 1,
        price: 0,
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToSubmit = {
      ...productData,
      stock: parseInt(productData.stock, 10),
      rating: parseInt(productData.rating, 10),
      price: parseFloat(productData.price),
    };

    if (isEditMode) {
      updateProduct(productToSubmit);
    } else {
      addProduct(productToSubmit);
    }
    onClose();
  };

  const isEditMode = !!productToEdit;

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode ? "Editar Producto" : "Agregar Nuevo Producto"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              min="0"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={productData.author}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              type="url"
              name="image"
              value={productData.image}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating (1-5)</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={productData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="1"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio (ARS)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isEditMode ? "Guardar Cambios" : "Agregar Producto"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
