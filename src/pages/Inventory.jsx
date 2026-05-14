import React from 'react';
import { Package, Search, Filter, AlertCircle, TrendingDown, ArrowRight } from 'lucide-react';

const inventoryData = [
  { id: 'RM-001', name: 'Premium Wheat Flour', stock: '2,500 kg', min: '1,000 kg', supplier: 'AgriCorp Inc', expiry: '2026-12-01', status: 'Healthy', location: 'Warehouse A' },
  { id: 'RM-002', name: 'Citric Acid', stock: '45 kg', min: '50 kg', supplier: 'ChemSupply', expiry: '2027-05-15', status: 'Low Stock', location: 'Warehouse B' },
  { id: 'RM-003', name: 'Refined Sugar', stock: '1,200 kg', min: '800 kg', supplier: 'Sweeteners Ltd', expiry: '2026-08-20', status: 'Healthy', location: 'Warehouse A' },
  { id: 'RM-004', name: 'Potato Flakes', stock: '300 kg', min: '400 kg', supplier: 'AgriCorp Inc', expiry: '2026-06-10', status: 'Low Stock', location: 'Warehouse C' },
  { id: 'RM-005', name: 'Cheese Powder', stock: '850 kg', min: '500 kg', supplier: 'DairyBlend', expiry: '2026-05-20', status: 'Expiring Soon', location: 'Cold Storage 1' },
];

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track raw materials, finished goods, and stock alerts.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button className="btn-primary shadow-sm shadow-agility-green/30">
            Add New Item
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Total Items</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Package className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">1,248</div>
          <p className="text-sm text-gray-500 mt-1">Across 4 warehouses</p>
        </div>
        <div className="glass-card border-orange-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Low Stock Alerts</h3>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><TrendingDown className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-orange-600">12</div>
          <p className="text-sm text-orange-500 mt-1 flex items-center">
            Requires immediate reorder <ArrowRight className="w-4 h-4 ml-1" />
          </p>
        </div>
        <div className="glass-card border-red-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Expiring Soon</h3>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertCircle className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-red-600">5</div>
          <p className="text-sm text-red-500 mt-1 flex items-center">
            Items expiring in &lt; 30 days <ArrowRight className="w-4 h-4 ml-1" />
          </p>
        </div>
        <div className="glass-card bg-agility-dark text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-300">Total Value</h3>
            <div className="p-2 bg-gray-800 text-agility-green rounded-lg">$</div>
          </div>
          <div className="text-3xl font-bold text-white">$4.2M</div>
          <p className="text-sm text-gray-400 mt-1">Estimated current stock value</p>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="glass-card !p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-semibold text-gray-900 text-lg">Raw Material Inventory</h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search materials..." 
                className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-agility-green focus:border-transparent"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-2 text-sm font-medium">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="table-header">Material ID</th>
                <th className="table-header">Name</th>
                <th className="table-header">Current Stock</th>
                <th className="table-header">Min Threshold</th>
                <th className="table-header">Status</th>
                <th className="table-header">Expiry Date</th>
                <th className="table-header">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventoryData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell font-medium text-gray-900">{item.id}</td>
                  <td className="table-cell">{item.name}</td>
                  <td className="table-cell font-semibold">{item.stock}</td>
                  <td className="table-cell text-gray-500">{item.min}</td>
                  <td className="table-cell">
                    <span className={`status-badge ${
                      item.status === 'Healthy' ? 'bg-green-100 text-green-700' :
                      item.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="table-cell text-gray-500">{item.expiry}</td>
                  <td className="table-cell text-gray-500">{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-500">Showing 1 to 5 of 124 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 bg-agility-green text-white rounded-md text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
