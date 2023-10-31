import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import calavera from "../../assets/calavera.jpg";
import {
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Recover() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/restablish",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setError(null);
        Swal.fire({
          title: "Nueva contraseña establecida",
          html: "Redireccionando",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          navigate("/login");
        });
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Error interno. Por favor, inténtalo de nuevo más tarde.");
    }
  };
  return (
    <div className="bg-gradient-to-r from-white via-[#FFC8E6] to-[#FB99C0] w-screen h-screen flex items-center justify-center">
      <div className="bg-white w-[1000px] lg:h-[500px] flex-shrink-0 flex lg:rounded-md">
        <img
          className="lg: rounded-l-md h-full lg:w-[430px] object-cover "
          src={calavera}
        />
        <div className="px-20 w-[570px]">
          <form
            onSubmit={handlePasswordReset}
            className="w-full py-16 font-manjari font-semibold"
          >
            <h1 className="font-manjari font-bold text-xl mb-8">Establece tu nueva contraseña</h1>
            <label>Contraseña</label>
            <section className="flex relative items-center mb-6">
              <FontAwesomeIcon icon={faLock} className="absolute left-3" />
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                Reestablecer
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Recover;
