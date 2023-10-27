import { useRoutes, BrowserRouter as Router } from 'react-router-dom';

//Páginas
import Mercado from "./pages/mercado/Mercado.js";
import Inicio from "./pages/inicio/Inicio.js";
import Foro from "./pages/foro/Foro.jsx";
import Login from "./pages/login/Login.js";
import Registro from "./pages/login/Registro.js";
import Nosotros from "./pages/nosotros/Nosotros.js";
import Contacto from "./pages/contacto/Contacto.js";
import Canal from './pages/Canal/canal.jsx';
import Posts from './pages/PostsCanal/PostsCanal.jsx'

//Componentes
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";


const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Inicio />},
    {path: '/mercado', element: <Mercado />},
    {path: '/foro', element: <Foro />},
    {path: '/nosotros', element: <Nosotros />},
    {path: '/login', element: <Login />},
    {path: '/registro', element: <Registro />},
    {path: '/contacto', element: <Contacto />},
    {path: '/canal', element: <Canal/>},
    {path: '/post', element: <Posts/>}
  ]);

  return routes;
}

function AppContent(){
  return(
    <>
      <Header />
        <AppRoutes />
      <Footer /> 
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
