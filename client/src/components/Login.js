import React from "react";
import { NavLink } from "react-router-dom";

function Login({ setIsLogged }) {
  const [error, setError] = React.useState(false);

  const logIn = () => {
    setIsLogged(true);
    localStorage.setItem("isLogged", true);
  };

  return (
    <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light ">Login to your account</span>
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-2 bg-blue-400 rounded-t-md"></div>
          <div className="px-8 py-6 ">
            <label className="block font-semibold"> Nom </label>
            <input
              type="text"
              placeholder="Nom"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
            ></input>
            <label className="block mt-3 font-semibold"> Mot de passe </label>
            <input
              type="password"
              placeholder="Mot de Passe"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
            ></input>
            <div className="flex justify-between items-baseline">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4"
                  onClick={() => setError(true)}
                >
                  Login
                </button>
              <NavLink to="/">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md mt-4"
                  onClick={() => logIn()}
                >
                  Anonyme
                </button>
              </NavLink>
            </div>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
                role="alert"
              >
                <strong className="font-bold">Erreur!</strong>
                <span className="block sm:inline">
                  {" "}
                  Mot de passe ou nom incorrect
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
