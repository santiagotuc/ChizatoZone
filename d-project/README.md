# 🛍️ Sistema Integral de Gestión de Stock (Chisato Zone)

Este proyecto es un sistema web completo diseñado para la gestión y control de stock de productos, así como la administración de usuarios y órdenes de compra en un entorno de comercio electrónico. Se ha desarrollado con un enfoque en la modularidad, la escalabilidad y una experiencia de usuario intuitiva, utilizando tecnologías modernas para el frontend y el backend.

## 🎯 Objetivo del Proyecto

El objetivo principal es proporcionar una plataforma robusta y eficiente que permita a los administradores de un comercio electrónico:

1.  **Controlar el inventario** de productos de venta de manera exhaustiva.
2.  **Administrar los productos** (creación, lectura, actualización y eliminación).
3.  **Gestionar los usuarios** registrados en el sistema.
4.  **Monitorear y procesar las órdenes** de compra.

Simultáneamente, ofrece a los usuarios finales una experiencia fluida para la navegación de productos, el proceso de compra y el seguimiento de sus pedidos.

## ✨ Funcionalidades Principales

El sistema se divide en dos roles principales: Administrador y Usuario, cada uno con funcionalidades específicas.

### Para el Administrador:

- **Gestión Completa de Productos (CRUD)**:
  - **Crear**: Añadir nuevos productos con detalles (nombre, stock, descripción, fecha de último control).
  - **Leer**: Visualizar todos los productos, con opciones de filtrado por categoría. Vista detallada de cada producto.
  - **Actualizar**: Modificar la información de productos existentes (stock, precio, descripción).
  - **Eliminar**: Dar de baja productos del inventario.
  - _Nota_: Todas las operaciones CRUD están protegidas y requieren autenticación y autorización de administrador.
- **Administración de Usuarios**:
  - Visualizar y listar todos los usuarios registrados.
  - Capacidad de eliminar o suspender cuentas de usuario.
  - Funcionalidad para otorgar o revocar roles de administrador a usuarios existentes.

### Para el Usuario Final:

- **Registro y Autenticación**: Proceso seguro de creación de cuentas y inicio de sesión.
- **Exploración de Productos**: Navegación intuitiva por el catálogo de productos con filtros por categorías.
- **Proceso de Compra**:
  - Gestión del carrito de compras (selección de productos).
  - Proceso de checkout y confirmación de compra.
- **Historial de Compras**: Acceso a un listado detallado de todas las órdenes realizadas, incluyendo productos, cantidades, precios unitarios y el estado de cada pedido.

### Secciones Adicionales:

- **Quiénes Somos**: Información sobre el negocio.
- **Contacto**: Canales de comunicación para soporte o consultas.

## ⚙️ Especificaciones Técnicas y Arquitectura

El proyecto está diseñado con una arquitectura cliente-servidor (frontend y backend desacoplados), lo que permite un desarrollo independiente, mayor escalabilidad y facilidad de mantenimiento.

### 🌐 Frontend (Cliente)

- **Tecnologías**:
  - **React.js**: Librería principal para la construcción de interfaces de usuario interactivas y dinámicas.
  - **React Router DOM**: Para la gestión de la navegación y las rutas de la aplicación de una sola página (SPA).
  - **Bootstrap**: Framework CSS para el diseño responsivo y el estilizado rápido de componentes UI.
  - **CSS Personalizado**: Archivos `.css` adicionales para estilos específicos y branding.
  - **Axios**: Cliente HTTP basado en promesas para realizar peticiones al backend.
- **Estructura de Carpetas (`src/`)**:
  - `assets/`: Imágenes y otros recursos estáticos.
  - `component/`: Componentes reutilizables de React (ej., `MyPurchases.jsx`, `PurchaseSuccessModal.jsx`, `Register.jsx`).
  - `css/`: Archivos CSS personalizados.
  - `services/`: Módulos que encapsulan la lógica de las llamadas a la API (ej., `orderService.js`, `api.js`).
  - `App.js`: Componente principal que define las rutas y la estructura general de la aplicación.
- **Flujo de Datos (Componentes ↔ Servicios ↔ Backend)**:
  - Los componentes manejan el estado local (`useState`) y los efectos secundarios (`useEffect`).
  - Las interacciones del usuario o el ciclo de vida del componente disparan llamadas a funciones en los archivos de `services`.
  - Los servicios usan `Axios` para realizar peticiones HTTP (GET, POST, PUT, DELETE) al backend, incluyendo tokens JWT en los headers para rutas protegidas.
  - La respuesta del backend actualiza el estado del componente, lo que re-renderiza la interfaz de usuario.

### 💻 Backend (Servidor)

- **Tecnologías**:
  - **Node.js**: Entorno de ejecución para JavaScript en el servidor.
  - **Express.js**: Framework web minimalista y flexible para construir APIs RESTful.
  - **MongoDB**: Base de datos NoSQL orientada a documentos para el almacenamiento de datos.
  - **Mongoose**: Librería de modelado de objetos para MongoDB en Node.js, facilitando la interacción con la base de datos.
  - **JSON Web Tokens (JWT)**: Para la autenticación y gestión de sesiones seguras y sin estado.
  - **Bcrypt**: Para el hashing seguro de contraseñas de usuario.
- **Arquitectura (inspirada en MVC)**:
  - **`models/`**: Define los esquemas de datos y la lógica de interacción con MongoDB (ej., `UserModel.js`, `ProductModel.js`, `OrderModel.js`).
  - **`controllers/`**: Contiene la lógica de negocio que procesa las solicitudes y coordina con los modelos (ej., `userController.js`, `productController.js`, `orderController.js`).
  - **`routes/`**: Define los endpoints de la API y asocia las URL con las funciones de los controladores (ej., `userRoutes.js`, `productRoutes.js`, `orderRoutes.js`).
  - **`middleware/`**: Funciones que se ejecutan antes de que las solicitudes lleguen a los controladores (ej., `authMiddleware.js` para autenticación y autorización, manejo de errores).
  - `server.js` (o `app.js`): Archivo principal que configura el servidor Express, la conexión a la base de datos y registra las rutas y middlewares.
- **Flujo de Datos (Petición HTTP ↔ Rutas ↔ Middleware ↔ Controladores ↔ Modelos ↔ Base de Datos)**:
  - Una petición HTTP llega al servidor.
  - Es interceptada por el **middleware** (ej., para autenticación JWT, parsing del cuerpo).
  - Las **rutas** dirigen la petición al **controlador** apropiado.
  - El **controlador** ejecuta la lógica de negocio, interactuando con uno o varios **modelos**.
  - Los **modelos** se comunican con **MongoDB** para realizar operaciones CRUD.
  - El controlador construye una respuesta HTTP (con el código de estado y los datos pertinentes) y la envía de vuelta al cliente.

## 🤝 Gestión del Proyecto y Prácticas Profesionales

Este proyecto ha sido desarrollado siguiendo buenas prácticas de la industria:

- **Control de Versiones**: Gestionado con **Git** y alojado en **GitHub** (con repositorios separados para frontend y backend).
- **Metodología Ágil**: Se ha utilizado un panel en **Trello** para la gestión de tareas, el seguimiento del progreso y la definición de requisitos (incluyendo mockups).
- **Documentación**: Creación de un documento PDF con la documentación técnica del proyecto.
- **Diseño Responsivo**: La interfaz de usuario está completamente optimizada para dispositivos móviles, tabletas y escritorios, asegurando una experiencia consistente.
- **Validaciones Robustas**: Implementación de validaciones de entrada de datos tanto en el frontend como en el backend para garantizar la integridad de la información y mejorar la experiencia de usuario con feedback en tiempo real.
- **Manejo de Errores**: Gestión centralizada de errores en el backend (ej., errores 404, 500) con mensajes significativos, y consumo adecuado de estos errores en el frontend para informar al usuario de manera clara.
- **Códigos de Estado HTTP**: Utilización coherente y semántica de los códigos de estado HTTP para comunicar el resultado de las operaciones de la API.

## 🚀 Cómo Ejecutar el Proyecto

### Requisitos Previos:

- Node.js (versión 14 o superior)
- npm (Node Package Manager) o Yarn
- MongoDB (instancia local o remota, como MongoDB Atlas)

### Configuración del Backend:

1.  Clona el repositorio del backend:
    ```bash
    git clone https://github.com/santiagotuc/ChizatoZone.git
    cd chizatoBack
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    # o yarn install
    ```
3.  Crea un archivo `.env` en la raíz del proyecto y configura tus variables de entorno:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/nombreDeTuBaseDeDatos
    JWT_SECRET=tu_secreto_jwt_muy_seguro
    ```
4.  Inicia el servidor:
    ```bash
    npm start
    # o node server.js
    ```
    El backend estará corriendo en https://chizatozone-backend.onrender.com

### Configuración del Frontend:

1.  Clona el repositorio del frontend:
    ```bash
    git clone https://github.com/santiagotuc/ChizatoZone.git
    cd d-project/
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    # o yarn install
    ```
3.  Crea un archivo `.env` en la raíz del proyecto y configura la URL de tu backend:
    ```env
    REACT_APP_BACKEND_URL=https://chizatozone-backend.onrender.com
    ```
4.  Inicia la aplicación React:
    ```bash
    npm start
    # o yarn start
    ```
    La aplicación React se abrirá en tu navegador en `http://localhost:5173`

Puedes encontrar el trabajo final en https://chizato-zone.vercel.app/

## 📞 Contacto

Para cualquier consulta o colaboración, no dudes en contactarme.

---
