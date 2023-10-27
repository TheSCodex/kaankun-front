import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import catrin from "../../assets/catrin.jpg";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [register, setRegister] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        if (rememberMe) {
          localStorage.setItem("token", token);
        }
        console.log("Inicio de Sesión exitoso");
        navigate("/");
      } else if (response.status === 401) {
        setError("Credenciales inválidas. Verifica tu email y contraseña.");
        console.log(error);
      } else {
        const text = await response.text();
        if (text) {
          const data = JSON.parse(text);
          setError(data.message);
        } else {
          setError("Error de inicio de sesión. Por favor, inténtalo de nuevo.");
        }
      }
    } catch (error) {
      console.error(error);
      setError("Error interno. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, email, password, name, lastName }),
        }
      );

      if (response.ok) {
        setRegister(false);
      } else {
        const text = await response.text();

        if (text) {
          const data = JSON.parse(text);
          setError(data.message);
        } else {
          setError("Error de registro. Por favor, inténtalo de nuevo.");
        }
      }
    } catch (error) {
      console.error(error);
      setError("Error interno. Por favor, inténtalo de nuevo más tarde.");
    }
  };
  return (
    <div className="bg-gradient-to-r from-white via-[#bedaf3] to-[#d7e1ed] w-screen h-screen flex items-center justify-center">
      <div className="bg-white w-[1000px] lg:h-[500px] flex-shrink-0 flex lg:rounded-md">
        <img
          className="lg: rounded-l-md h-full lg:w-[430px] object-cover "
          src={catrin}
        />
        <div className="px-20 py-16 w-[570px]">
          <form onSubmit={handleLogin} className="w-full font-manjari font-semibold">
            <label>Email</label>
            <section className="flex relative items-center mb-12">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                className="bg-[#ECECEC] rounded-lg pt-1 h-[30px] w-full pl-8"
              />
            </section>
            <label>Contraseña</label>
            <section className="flex relative items-center">
              <FontAwesomeIcon icon={faLock} className="absolute left-3" />
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="password"
                className="bg-[#ECECEC] rounded-lg pt-1 h-[30px] w-full pl-8"
              />
            </section>
            <section className="flex justify-between items-center mt-12">
              <div>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-3"
                />
                <label className="font-manjari font-semibold">Recuérdame</label>
              </div>
              <button>
                <h2 className="font-manjari text-[#24ACF2]">
                  Olvidé mi contraseña
                </h2>
              </button>
            </section>
            <section className="mt-10 flex justify-between">
              <button className="border rounded-sm bg-white font-manjari text-sm w-[150px] h-[30px] shadow-md p-2">
                Login with Google
              </button>
              <button type="submit" className="rounded-sm bg-[#43B8E8] font-manjari text-sm text-white w-[150px] h-[30px] p-2">
                Login
              </button>
            </section>
            <section className="mt-12 font-manjari flex justify-center">
              <h2 className="mr-1">No tienes una cuenta?</h2>
              <button className="text-[#24ACF2]">Registrate</button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
