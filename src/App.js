import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import "./index.css";

//Páginas
import Mercado from "./pages/mercado/Mercado.js";
import Inicio from "./pages/inicio/Inicio.js";
import Foro from "./pages/foro/Foro.jsx";
import Login from "./pages/login/Login.js";
import Nosotros from "./pages/nosotros/Nosotros.js";
import Contacto from "./pages/contacto/Contacto.js";
import Canal from './pages/Canal/canal.jsx';
import Posts from './pages/PostsCanal/PostsCanal.jsx'
import Tarjeta from "./pages/PostsCanal/tarjeta";


const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Inicio /> },
    { path: "/mercado", element: <Mercado /> },
    { path: "/foro", element: <Foro /> },
    { path: "/nosotros", element: <Nosotros /> },
    { path: "/login", element: <Login /> },
    { path: "/contacto", element: <Contacto /> },,
    {path: '/canal', element: <Canal/>},
    {path: '/post', element: <Posts/>},
    {path: '/tarjeta', element:<Tarjeta/>}
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
