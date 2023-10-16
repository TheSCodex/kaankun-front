import { useRoutes, BrowserRouter as Router } from 'react-router-dom';

//Páginas
import Mercado from "./pages/mercado/Mercado";
import Inicio from "./pages/inicio/Inicio";
import Foro from "./pages/foro/Foro";
import Login from "./pages/login/Login";
import Registro from "./pages/login/Registro";
import Nosotros from "./pages/nosotros/Nosotros";
import Contacto from "./pages/contacto/Contacto";

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
