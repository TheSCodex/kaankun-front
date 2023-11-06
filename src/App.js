import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import "./index.css";

//Páginas
import Mercado from "./pages/mercado/Mercado.js";
import Inicio from "./pages/inicio/Inicio.js";
import Foro from "./pages/foro/Foro.js";
import Login from "./pages/login/Login.js";
import Nosotros from "./pages/nosotros/Nosotros.js";
import Contacto from "./pages/contacto/Contacto.js";
import { AuthProvider } from "./Auth";
import Recover from "./pages/login/Recover.js";
import DetallesProducto from "./components/DetallesProducto.js";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Inicio /> },
    { path: "/mercado", element: <Mercado /> },
    { path: "/foro", element: <Foro /> },
    { path: "/nosotros", element: <Nosotros /> },
    { path: "/login", element: <Login /> },
    { path: "/contacto", element: <Contacto /> },
    { path: "/recovery/:email", element: <Recover /> },
    { path: "/mercado/:productId", element: <DetallesProducto /> }
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
