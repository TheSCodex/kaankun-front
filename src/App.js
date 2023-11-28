import { useContext } from "react";
import {
  useRoutes,
  BrowserRouter as Router,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";

//Páginas
import Mercado from "./pages/mercado/Mercado.js";
import Inicio from "./pages/inicio/Inicio.js";
import Foro from "./pages/foro/Foro.jsx";
import Login from "./pages/login/Login.js";
import Nosotros from "./pages/nosotros/Nosotros.js";
import Contacto from "./pages/contacto/Contacto.js";
import { AuthProvider, useAuth } from "./Auth"; 
import Recover from "./pages/login/Recover.js";
import DetallesProducto from "./components/DetallesProducto.js";
import Canal from "./pages/Canal/canal.jsx";
import Posts from "./pages/PostsCanal/PostsCanal.jsx";
import Tarjeta from "./pages/PostsCanal/tarjeta";
import DashHome from "./pages/dashboard/dash-pages/DashHome.js";
import DashTablas from "./pages/dashboard/dash-pages/DashTablas.js";

const PrivateRoute = ({ element, allowedUserTypes }) => {
  const { isLoggedIn, userTypeId, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  const isUserAuthorized = isLoggedIn && allowedUserTypes.includes(userTypeId);

  return isUserAuthorized ? element : <Navigate to="/login" />;
};


const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Inicio /> },
    { path: "/mercado", element: <Mercado /> },
    { path: "/foro", element: <Foro /> },
    { path: "/nosotros", element: <Nosotros /> },
    { path: "/login", element: <Login /> },
    { path: "/contacto", element: <Contacto /> },
    { path: "/canal/:id", element: <Canal /> },
    { path: "/post/:id", element: <Posts /> },
    { path: "/tarjeta", element: <Tarjeta /> },
    { path: "/recovery/:email", element: <Recover /> },
    { path: "/mercado/:productId", element: <DetallesProducto /> },
    //Rutas protegidas
    {path: "/dashboard", element: <PrivateRoute element={<DashHome />} allowedUserTypes={[2]} />,},
    {path: "/dashboard/tablas",element: <PrivateRoute element={<DashTablas />} allowedUserTypes={[2]} />,},
  ]);

  return routes;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes className="overflow-y-scroll no-scrollbar" />
      </AuthProvider>
    </Router>
  );
}

export default App;
