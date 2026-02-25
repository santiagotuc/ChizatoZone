import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <Link
        to="/admin/users"
        className="btn btn-info d-block mb-2 mb-lg-0 me-lg-2"
      >
        Administrar Usuarios
      </Link>
      <Link
        to="/admin/orders"
        className="btn btn-secondary d-block mb-2 mb-lg-0 me-lg-2"
      >
        Historial de Órdenes
      </Link>
      <Link
        to="/admin/stock"
        className="btn btn-warning d-block mb-2 mb-lg-0"
      >
        Administrar Stock
      </Link>
    </>
  );
};

export default AdminMenu;
