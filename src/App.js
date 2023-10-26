import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import "./index.css";

//Páginas
import Mercado from "./pages/mercado/Mercado.js";
import Inicio from "./pages/inicio/Inicio.js";
import Foro from "./pages/foro/Foro.js";
import Login from "./pages/login/Login.js";
import Nosotros from "./pages/nosotros/Nosotros.js";
import Contacto from "./pages/contacto/Contacto.js";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Inicio /> },
    { path: "/mercado", element: <Mercado /> },
    { path: "/foro", element: <Foro /> },
    { path: "/nosotros", element: <Nosotros /> },
    { path: "/login", element: <Login /> },
    { path: "/contacto", element: <Contacto /> },
  ]);

  return routes;
};

function App() {
  return (
    <Router>
        <AppRoutes  className="overflow-y-scroll no-scrollbar" />
    </Router>
  );
}

export default App;
