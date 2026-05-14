import React, { useState, useEffect } from 'react';
import { Package, Search, Filter, AlertCircle, TrendingDown, ArrowRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch(`${API_URL}/inventory`);
      const result = await response.json();
      if (result.status === 'success') {
        setInventory(result.data);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const lowStockCount = inventory.filter(item => parseFloat(item.stock_kg) < parseFloat(item.min_stock_level_kg)).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track raw materials, finished goods, and stock alerts.</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Total SKUs</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Package className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{loading ? '...' : inventory.length}</div>
          <p className="text-sm text-gray-500 mt-1">Across all warehouses</p>
        </div>
        <div className="glass-card border-orange-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Low Stock Alerts</h3>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><TrendingDown className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-orange-600">{loading ? '...' : lowStockCount}</div>
          <p className="text-sm text-orange-500 mt-1 flex items-center">
            Requires immediate reorder <ArrowRight className="w-4 h-4 ml-1" />
          </p>
        </div>
        <div className="glass-card border-red-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Expiring Soon</h3>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertCircle className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-red-600">0</div>
          <p className="text-sm text-red-500 mt-1 flex items-center">
            Items expiring in &lt; 30 days
          </p>
        </div>
        <div className="glass-card bg-agility-dark text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-300">Total Value</h3>
            <div className="p-2 bg-gray-800 text-agility-green rounded-lg">₹</div>
          </div>
          <div className="text-3xl font-bold text-white">₹4.2L</div>
          <p className="text-sm text-gray-400 mt-1">Estimated current stock value</p>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="glass-card !p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-semibold text-gray-900 text-lg">Raw Material Inventory</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="table-header">Material Name</th>
                <th className="table-header">Current Stock</th>
                <th className="table-header">Min Threshold</th>
                <th className="table-header">Supplier</th>
                <th className="table-header">Status</th>
                <th className="table-header">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventory.map((item, index) => {
                const isLow = parseFloat(item.stock_kg) < parseFloat(item.min_stock_level_kg);
                return (
                  <tr key={index} className="hover:bg-gray-50 transition-colors text-sm">
                    <td className="table-cell font-medium text-gray-900">{item.name}</td>
                    <td className="table-cell font-semibold">{item.stock_kg} kg</td>
                    <td className="table-cell text-gray-500">{item.min_stock_level_kg} kg</td>
                    <td className="table-cell text-gray-500">{item.supplier}</td>
                    <td className="table-cell">
                      <span className={`status-badge ${
                        !isLow ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {!isLow ? 'Healthy' : 'Low Stock'}
                      </span>
                    </td>
                    <td className="table-cell text-gray-500">{item.location}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
