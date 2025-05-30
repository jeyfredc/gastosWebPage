import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../stores/UseAppStore';




const Menu = () => {
const {logout, user} = useAppStore();


  return (
<div className="flex flex-row bg-slate-950 text-white w-full">
  <div className="flex items-center px-6 h-16">
    <h1 className="text-xl font-bold">Control de Gastos</h1>
  </div>
  <div className="flex flex-grow items-center justify-start px-4">
  <Link
  to="/dashboard/mantenimientos"
  className="mx-2 px-4 py-2 text-sm text-white hover:bg-gray-700 rounded"
>
  Mantenimientos
</Link>
<Link
  to="/dashboard/transactions"
  className="mx-2 px-4 py-2 text-sm text-white hover:bg-gray-700 rounded"
>
  Movimientos
</Link>
<Link
  to="/dashboard/reportes"
  className="mx-2 px-4 py-2 text-sm text-white hover:bg-gray-700 rounded"
>
  Consultas y Reportes
</Link>
  </div>
  <div className="flex items-center px-6">
    <span className="text-sm mr-4">{(user?.username)?.toLocaleUpperCase()}</span>
    <button
      className="flex items-center text-sm text-red-400 hover:text-red-300"
      onClick={logout}
    >
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      Cerrar sesión
    </button>
  </div>
</div>
  );
};


export default Menu;