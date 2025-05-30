import { use, useEffect, useState } from 'react';
import Logo from '../../../public/assets/icon.svg.png'; // Adjust the path as necessary
import { useAppStore } from '../../stores/UseAppStore';
import { useNavigate } from 'react-router-dom';

const Login = ( ) => {
    const initialState = {
        username: '',
        password: '',
    }

const navigate = useNavigate();

  const {login, isAuthenticated} = useAppStore();

  const [formUser, setFormUser] = useState(initialState);
  const [error, setError] = useState('');


  useEffect(() => {
    if (isAuthenticated) {
        navigate('/dashboard/mantenimientos');
    }
  }
  , [isAuthenticated]);

const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormUser(
        (prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
    );
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formUser.username === '' || formUser.password === '') {
        setError('Por favor, complete todos los campos.');
        return;
    }
    // Aquí podrías agregar la lógica para autenticar al usuario
    if (formUser.username !== 'admin' || formUser.password !== 'admin') {
        setError('Usuario o contraseña incorrectos.');
        return;
    }
    login(formUser)
}


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src={ Logo} alt="Logo" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Control de Gastos
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ingrese sus credenciales para acceder al sistema
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formUser.username}
                  onChange={(e) => handleChange(e)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Ingrese su usuario"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formUser.password}
                  onChange={(e) => handleChange(e)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Ingrese su contraseña"
                />
              </div>
            </div>



            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Iniciar sesión
              </button>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
};

export default Login;
