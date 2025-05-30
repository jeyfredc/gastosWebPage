import React, { useState } from 'react';

// Tipos de datos
interface ExpenseType {
  id: string;
  code: string;
  name: string;
  description: string;
}

interface MonetaryFund {
  id: string;
  name: string;
  type: 'bank' | 'cash';
  balance: number;
  accountNumber?: string;
}

const Maintenance = () => {
  const [activeTab, setActiveTab] = useState('expenseTypes');
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);
  const [monetaryFunds, setMonetaryFunds] = useState<MonetaryFund[]>([]);
  const [newExpenseType, setNewExpenseType] = useState<Omit<ExpenseType, 'id'>>({ 
    code: '', 
    name: '', 
    description: '' 
  });
  const [newMonetaryFund, setNewMonetaryFund] = useState<Omit<MonetaryFund, 'id' | 'balance'>>({ 
    name: '', 
    type: 'bank', 
    accountNumber: '' 
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Generar código automático para tipos de gasto
  const generateNextCode = () => {
    if (expenseTypes.length === 0) return 'GAS-001';
    const lastCode = expenseTypes[expenseTypes.length - 1].code.split('-')[1];
    const nextNum = parseInt(lastCode) + 1;
    return `GAS-${String(nextNum).padStart(3, '0')}`;
  };

  // Manejar CRUD para tipos de gasto
  const handleAddExpenseType = () => {
    const code = generateNextCode();
    setExpenseTypes([...expenseTypes, { ...newExpenseType, id: Date.now().toString(), code }]);
    setNewExpenseType({ code: '', name: '', description: '' });
  };

  const handleUpdateExpenseType = () => {
    if (!editingId) return;
    setExpenseTypes(expenseTypes.map(et => 
      et.id === editingId ? { ...et, ...newExpenseType } : et
    ));
    setEditingId(null);
    setNewExpenseType({ code: '', name: '', description: '' });
  };

  const handleEditExpenseType = (expenseType: ExpenseType) => {
    setNewExpenseType(expenseType);
    setEditingId(expenseType.id);
  };

  const handleDeleteExpenseType = (id: string) => {
    setExpenseTypes(expenseTypes.filter(et => et.id !== id));
  };

  // Manejar CRUD para fondos monetarios
  const handleAddMonetaryFund = () => {
    setMonetaryFunds([...monetaryFunds, { 
      ...newMonetaryFund, 
      id: Date.now().toString(), 
      balance: 0 
    }]);
    setNewMonetaryFund({ name: '', type: 'bank', accountNumber: '' });
  };

  const handleDeleteMonetaryFund = (id: string) => {
    setMonetaryFunds(monetaryFunds.filter(mf => mf.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mantenimientos</h1>
      
      {/* Pestañas */}
      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('expenseTypes')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'expenseTypes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tipos de Gasto
          </button>
          <button
            onClick={() => setActiveTab('monetaryFunds')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'monetaryFunds'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Fondo Monetario
          </button>
        </nav>
      </div>

      {/* Contenido de Tipos de Gasto */}
      {activeTab === 'expenseTypes' && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Tipos de Gasto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
              <input
                type="text"
                value={editingId ? newExpenseType.code : generateNextCode()}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Código automático"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={newExpenseType.name}
                onChange={(e) => setNewExpenseType({...newExpenseType, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Alimentación"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newExpenseType.description}
                  onChange={(e) => setNewExpenseType({...newExpenseType, description: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Descripción del tipo de gasto"
                />
                {editingId ? (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setNewExpenseType({ code: '', name: '', description: '' });
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleUpdateExpenseType}
                      className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Actualizar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleAddExpenseType}
                    disabled={!newExpenseType.name}
                    className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    Agregar
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenseTypes.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      No hay tipos de gasto registrados
                    </td>
                  </tr>
                ) : (
                  expenseTypes.map((expenseType) => (
                    <tr key={expenseType.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {expenseType.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {expenseType.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {expenseType.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditExpenseType(expenseType)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteExpenseType(expenseType.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contenido de Fondos Monetarios */}
      {activeTab === 'monetaryFunds' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Fondos Monetarios</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={newMonetaryFund.name}
                onChange={(e) => setNewMonetaryFund({...newMonetaryFund, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Cuenta de Ahorros"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select
                value={newMonetaryFund.type}
                onChange={(e) => setNewMonetaryFund({...newMonetaryFund, type: e.target.value as 'bank' | 'cash'})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="bank">Cuenta Bancaria</option>
                <option value="cash">Efectivo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {newMonetaryFund.type === 'bank' ? 'Número de Cuenta' : 'Descripción'}
              </label>
              <input
                type="text"
                value={newMonetaryFund.accountNumber || ''}
                onChange={(e) => setNewMonetaryFund({...newMonetaryFund, accountNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={newMonetaryFund.type === 'bank' ? '123-456-789' : 'Descripción del fondo'}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAddMonetaryFund}
                disabled={!newMonetaryFund.name}
                className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                Agregar Fondo
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {newMonetaryFund.type === 'bank' ? 'Número de Cuenta' : 'Descripción'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Saldo
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {monetaryFunds.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No hay fondos monetarios registrados
                    </td>
                  </tr>
                ) : (
                  monetaryFunds.map((fund) => (
                    <tr key={fund.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {fund.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {fund.type === 'bank' ? 'Cuenta Bancaria' : 'Efectivo'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {fund.accountNumber || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${fund.balance.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteMonetaryFund(fund.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;