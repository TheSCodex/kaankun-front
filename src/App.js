import { useRoutes, BrowserRouter as Router } from 'react-router-dom';

//Páginas
import Mercado from "./pages/mercado";
import Inicio from "./pages/inicio";
import Foro from "./pages/foro";
import Login from "./pages/login";
import Registro from "./pages/login";
import Nosotros from "./pages/nosotros";
import Contacto from "./pages/contacto";

//Componentes
import Header from "./components/Header";
import Footer from "./components/Footer";

const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Inicio />},
    {path: '/mercado', element: <Mercado />},
    {path: '/foro', element: <Foro />},
    {path: '/nosotros', element: <Nosotros />},
    {path: '/login', element: <Login />},
    {path: '/registro', element: <Registro />},
    {path: '/contacto', element: <Contacto />}
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
