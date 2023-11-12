import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth";
import { GoogleLoginButton } from "./GoogleLogin";
import Swal from "sweetalert2";
import catrin from "../../assets/catrin.jpg";
import {
  faEnvelope,
  faLock,
  faPerson,
  faUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useAuth();
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [register, setRegister] = useState(false);
  const [recover, setRecover] = useState(false);
  const [recoveryEmailSent, setRecoveryEmailSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSentMessage, setEmailSentMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        console.log("Inicio de Sesión exitoso");
        login();
        Swal.fire({
          title: "Inicio de Sesión exitoso",
          html: "Redireccionando",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          navigate("/");
        });
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

  const handleGoogleResponse = async (response) => {
    console.log(response);
    if (response.error) {
      console.error("Google Sign-In Error:", response.error);
    } else {
      const googleToken = response.credential;
      console.log("Google Token:", googleToken);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googleToken, rememberMe }),
      };
      console.log("Request options:", requestOptions);
      try {
        const res = await fetch(
          "http://localhost:8080/api/users/login-g",
          requestOptions
        );
        if (res.ok) {
          const data = await res.json();
          const token = data.token;
          localStorage.setItem("token", token);
          console.log("Inicio de Sesión exitoso");
          login();
          Swal.fire({
            title: "Inicio de Sesión exitoso",
            html: "Redireccionando",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          }).then(() => {
            navigate("/");
          });
        } else {
          console.error("Server error:", res.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password, name, lastName }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Registro Exitoso",
          html: "Redirigiendo a inicio de sesión",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          setRegister(false);
        });
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

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    try {
      setIsSendingEmail(true);
      setEmailSentMessage("Enviando correo...");
      setCountdown(30);

      const response = await fetch("http://localhost:8080/api/users/recover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: email }),
      });

      if (response.ok) {
        setEmailSentMessage("Correo enviado. Puedes enviar otro después de:");
      } else {
        const text = await response.text();

        if (text) {
          const data = JSON.parse(text);
          setError(data.message);
        } else {
          setError(
            "Error al solicitar la recuperación de contraseña. Por favor, inténtalo de nuevo."
          );
        }
      }
    } catch (error) {
      console.error(error);
      setError("Error interno. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const resendEmail = (e) => {
    setIsSendingEmail(true);
    setEmailSentMessage("Enviando correo...");
    if (emailSentMessage) {
      setCountdown(30);
    }

    handleRecoverPassword(e);
  };

  useEffect(() => {
    if (countdown > 0 && isSendingEmail) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [countdown, isSendingEmail]);

  const handleValidateCode = async (e) => {
    e.preventDefault();
    try {
      const recoveryCodeInt = recoveryCode.map((code) => parseInt(code));
      const response = await fetch("http://localhost:8080/api/users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, recoveryCode: recoveryCodeInt }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Código Confirmado",
          html: "Redirigiendo",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          navigate(`/recovery/${email}`);
        });
      } else {
        setError(
          "Código de recuperación incorrecto. Verifica el código y tu correo electrónico."
        );
      }
    } catch (error) {
      console.error(error);
      setError("Error interno. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const [recoveryCode, setRecoveryCode] = useState(["", "", "", ""]);

  const handleCodeChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newCode = [...recoveryCode];
      newCode[index] = value;
      setRecoveryCode(newCode);

      // Verificar si el elemento existe antes de enfocarlo
      const nextInputElement = document.getElementById(
        `recoveryCode${index + 1}`
      );
      if (value.length === 1 && index < 3 && nextInputElement) {
        nextInputElement.focus();
      }
    }
  };
  return (
    <div className="bg-gradient-to-r from-white via-[#bedaf3] to-[#d7e1ed] w-screen h-screen flex items-center justify-center">
      <div className="bg-white lg:w-[1000px] w-[350px] lg:h-[500px] flex flex-col lg:flex-row lg:rounded-md">
        <img
          className="lg:rounded-l-md lg:h-full lg:w-[430px] lg:object-cover lg:block hidden"
          src={catrin}
        />
        <div className="lg:px-20 lg:w-[570px]">
          {register ? (
            <form
              onSubmit={handleRegister}
              className="w-full lg:py-10 p-6 font-manjari font-semibold"
            >
              <label>Nombre</label>
              <section className="flex relative items-center mb-3">
                <FontAwesomeIcon icon={faPerson} className="absolute left-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="bg-[#ECECEC] rounded-lg pt-1 h-[30px] w-full pl-8"
                />
              </section>
              <label>Apellido</label>
              <section className="flex relative items-center mb-3">
                <FontAwesomeIcon icon={faPerson} className="absolute left-3" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="lastname"
                  className="bg-[#ECECEC] rounded-lg pt-1 h-[30px] w-full pl-8"
                />
              </section>
              <label>Nombre de Usuario</label>
              <section className="flex relative items-center mb-3">
                <FontAwesomeIcon icon={faUser} className="absolute left-3" />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  autoComplete="username"
                  className="bg-[#ECECEC] rounded-lg pt-1 h-[30px] w-full pl-8"
                />
              </section>
              <label>Email</label>
              <section className="flex relative items-center mb-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3"
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  className="bg-[#ECECEC] rounded-lg pt-1 h-[30px] w-full pl-8"
                />
              </section>
              <label>Contraseña</label>
              <section className="flex relative items-center mb-3">
                <FontAwesomeIcon icon={faLock} className="absolute left-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="password"
                  className="bg-[#ECECEC] rounded-lg pt-1 h-[30px] w-full pl-8"
                />
                <span
                  className="absolute h-[.8rem] left-[23.8rem] cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="h-[1rem] text-gray-400"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="h-[1rem] text-gray-400"
                    />
                  )}
                </span>
              </section>
              <label>Confirmar Contraseña</label>
              <section className="flex relative items-center">
                <FontAwesomeIcon icon={faLock} className="absolute left-3" />
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  autoComplete="password"
                  className="bg-[#ECECEC] rounded-lg pt-1 h-[30px] w-full pl-8"
                />
                <span
                  className="absolute h-[.8rem] left-[23.8rem] cursor-pointer"
                  onClick={togglePasswordVisibilityConfirm}
                >
                  {showPasswordConfirm ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="h-[1rem] text-gray-400"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="h-[1rem] text-gray-400"
                    />
                  )}
                </span>
              </section>
              <section className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="rounded-sm bg-[#43B8E8] font-manjari text-sm text-white w-[150px] h-[30px] p-2"
                >
                  Registrate
                </button>
              </section>
            </form>
          ) : recover ? (
            <form
              onSubmit={handleValidateCode}
              className="w-full font-manjari font-semibold lg:py-16 p-6 text-center"
            >
              <label>Escribe el correo que utilizas para iniciar sesión</label>
              <section className="flex relative items-center mb-12">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3"
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  className="bg-[#ECECEC] rounded-lg pt-1 h-[30px] w-full pl-8"
                />
              </section>
              <div className="flex justify-center items-center">
                {isSendingEmail ? (
                  <p className="text-blue-600 font-manjari flex flex-col items-center">
                    {emailSentMessage} {countdown} segundos.
                    {countdown === 0 && (
                      <a
                        onClick={resendEmail}
                        className="text-[#24ACF2] hover:cursor-pointer"
                      >
                        Reenviar
                      </a>
                    )}
                  </p>
                ) : (
                  <a
                    onClick={handleRecoverPassword}
                    className="w-fit text-sm text-[#24ACF2] font-manjari hover:text-blue-600 hover:cursor-pointer"
                  >
                    Enviar Correo de Recuperación
                  </a>
                )}
              </div>
              <div className="flex justify-center mt-[5rem]">
                <div className="font-manjari">
                  <input
                    type="text"
                    className="w-[4rem] h-[3rem] pb-[0.5rem] outline-none border-b-2 focus:border-b-blue-400 mb-[3rem]"
                    value={recoveryCode[0]}
                    onChange={(e) => handleCodeChange(0, e.target.value)}
                    maxLength="1"
                  />
                </div>
                <div className="font-manjari">
                  <input
                    type="text"
                    className="w-[4rem] h-[3rem] pb-[0.5rem] outline-none border-b-2 focus:border-b-blue-400 ml-[1rem] mb-[3rem]"
                    value={recoveryCode[1]}
                    onChange={(e) => handleCodeChange(1, e.target.value)}
                    maxLength="1"
                  />
                </div>
                <div className="font-manjari">
                  <input
                    type="text"
                    className="w-[4rem] h-[3rem] pb-[0.5rem] outline-none border-b-2 focus:border-b-blue-400 ml-[1rem] mb-[3rem]"
                    value={recoveryCode[2]}
                    onChange={(e) => handleCodeChange(2, e.target.value)}
                    maxLength="1"
                  />
                </div>
                <div className="font-manjari">
                  <input
                    type="text"
                    className="w-[4rem] h-[3rem] pb-[0.5rem] outline-none border-b-2 focus:border-b-blue-400 ml-[1rem]"
                    value={recoveryCode[3]}
                    onChange={(e) => handleCodeChange(3, e.target.value)}
                    maxLength="1"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="p-2 bg-[#24ACF2] w-fit rounded-md text-white font-manjari hover:bg-blue-600 shadow-md shadow-blue-600"
              >
                Validar
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleLogin}
              className="w-full font-manjari font-semibold p-6 lg:py-16"
            >
              <label>Email</label>
              <section className="flex relative items-center mb-12">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3"
                />
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="password"
                  className="bg-[#ECECEC] rounded-lg pt-1 h-[30px] w-full pl-8"
                />
                <span
                  className="absolute h-[.8rem] left-[23.8rem] cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="h-[1rem] text-gray-400"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="h-[1rem] text-gray-400"
                    />
                  )}
                </span>
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
                  <label className="font-manjari font-semibold">
                    Recuérdame
                  </label>
                </div>
                <button>
                  <a
                    onClick={setRecover}
                    className="font-manjari text-[#24ACF2] hover:cursor-pointer"
                  >
                    Olvidé mi contraseña
                  </a>
                </button>
              </section>
              {error && (
                <>
                <p className="font-manjari text-center text-sm text-red-500 mt-2">{error}</p>
                </>
              )}
              <section className="mt-10 flex justify-between">
                <GoogleLoginButton
                  clientId="677314278003-2ri0qhn89skjpfbq400n1n9ptl0n04gh.apps.googleusercontent.com"
                  onSuccess={handleGoogleResponse}
                  onFailure={handleGoogleResponse}
                  className="w-[180px] h-[40px] shadow-md p-2"
                />
                <button
                  type="submit"
                  className="rounded-sm bg-[#43B8E8] font-manjari text-sm text-white w-[150px] h-[40px] p-2"
                >
                  Login
                </button>
              </section>
              <section className="mt-12 font-manjari flex justify-center">
                <h2 className="mr-1">No tienes una cuenta?</h2>
                <a
                  onClick={setRegister}
                  className="text-[#24ACF2] hover:cursor-pointer"
                >
                  Registrate
                </a>
              </section>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
