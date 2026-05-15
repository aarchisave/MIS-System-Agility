import React, { useState, useEffect } from 'react';
import { ClipboardList, Calculator, Users, Clock, Calendar, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://mis-system-agility.onrender.com/api';

const PRODUCTS = [
  'Kodubale', 'Millet Murukku', 'Butter Murukku', 'Sev', 'Ribbon Pakoda', 'Chips', 'Bhujia',
  'Peanuts Coated', 'Peanuts Masala', 'Boondi', 'Millet Nipattu', 'Madras Mixture', 'Murmura Mixture', 'Bombay Mixture'
];

export default function Planning() {
  const [formData, setFormData] = useState({
    product_name: 'Kodubale',
    order_qty_kg: '',
    shifts_per_day: 1
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/planning/history`);
      const data = await response.json();
      if (data.status === 'success') setHistory(data.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/planning/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setResult(data);
        fetchHistory();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection failed. Please check your backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Planning Engine</h1>
          <p className="text-sm text-gray-500 mt-1">Predict shifts, manpower, and machinery time for incoming orders.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="glass-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-agility-green" />
              Order Details
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-agility-green outline-none"
                  value={formData.product_name}
                  onChange={(e) => setFormData({...formData, product_name: e.target.value})}
                >
                  {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Quantity (kg)</label>
                <input 
                  type="number"
                  placeholder="e.g. 500"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-agility-green outline-none"
                  value={formData.order_qty_kg}
                  onChange={(e) => setFormData({...formData, order_qty_kg: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Active Shifts Per Day</label>
                <div className="flex gap-4">
                  {[1, 2, 3].map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="shifts" 
                        checked={formData.shifts_per_day === s}
                        onChange={() => setFormData({...formData, shifts_per_day: s})}
                        className="text-agility-green focus:ring-agility-green"
                      />
                      <span className="text-sm text-gray-600">{s} Shift{s > 1 ? 's' : ''}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button 
                disabled={loading}
                className="btn-primary w-full py-3 flex justify-center items-center gap-2 mt-6 shadow-lg shadow-agility-green/20"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Calculator className="w-5 h-5" />}
                Calculate Requirements
              </button>
            </form>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {!result && !loading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center glass-card border-dashed border-2 border-gray-200">
              <div className="p-4 bg-gray-50 rounded-full mb-4">
                <Calculator className="w-12 h-12 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">Enter order details to see resource predictions</p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Target Banner */}
              <div className="bg-agility-dark text-white p-4 rounded-xl flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-agility-green" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Assigned Machinery</p>
                    <p className="text-lg font-semibold">{result.data.assigned_machine}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Capacity</p>
                  <p className="text-lg font-semibold text-agility-green">{result.meta.machine_capacity}</p>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card !bg-blue-50 border-blue-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-blue-900">Completion Time</h3>
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-900">{result.data.days_scheduled} Days</div>
                  <p className="text-sm text-blue-600 mt-1">Based on {formData.shifts_per_day} shifts/day</p>
                </div>

                <div className="glass-card !bg-purple-50 border-purple-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-purple-900">Total Shifts</h3>
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-purple-900">{result.data.total_shifts}</div>
                  <p className="text-sm text-purple-600 mt-1">Total 8-hour production blocks</p>
                </div>

                <div className="glass-card !bg-orange-50 border-orange-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-orange-900">Required Headcount</h3>
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-3xl font-bold text-orange-900">{result.data.manpower_mandays}</div>
                  <p className="text-sm text-orange-600 mt-1">Total Man-Days required</p>
                </div>
              </div>

              {/* History Table */}
              <div className="glass-card !p-0 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Recent Calculations</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="table-header">Product</th>
                        <th className="table-header text-right">Qty (kg)</th>
                        <th className="table-header">Days</th>
                        <th className="table-header">Shifts</th>
                        <th className="table-header">Man-Days</th>
                        <th className="table-header">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {history.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50 text-sm">
                          <td className="table-cell font-medium text-gray-900">{row.product_name}</td>
                          <td className="table-cell text-right">{row.order_qty_kg}</td>
                          <td className="table-cell">{row.days_scheduled}</td>
                          <td className="table-cell">{row.total_shifts}</td>
                          <td className="table-cell">{row.manpower_mandays}</td>
                          <td className="table-cell">
                            <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">Scheduled</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
