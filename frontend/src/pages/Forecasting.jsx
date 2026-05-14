import React from 'react';
import { BrainCircuit, TrendingUp, AlertOctagon, Lightbulb } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const forecastData = [
  { month: 'Jun', predicted: 42000, actual: null },
  { month: 'Jul', predicted: 46000, actual: null },
  { month: 'Aug', predicted: 51000, actual: null },
  { month: 'Sep', predicted: 49000, actual: null },
  { month: 'Oct', predicted: 55000, actual: null },
  { month: 'Nov', predicted: 60000, actual: null },
];

export default function Forecasting() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI / Forecasting Insights</h1>
          <p className="text-sm text-gray-500 mt-1">Predictive analytics for demand, inventory, and production.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <BrainCircuit className="w-5 h-5 mr-2 text-agility-green" /> 6-Month Demand Prediction (kg)
            </h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="predicted" stroke="#8B5CF6" strokeDasharray="5 5" fill="#C4B5FD" fillOpacity={0.4} name="Predicted Demand" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card flex flex-col">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" /> Smart Recommendations
          </h3>
          <div className="space-y-4 flex-1">
             <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
              <h5 className="font-semibold text-sm text-purple-800">Stock Up: Refined Sugar</h5>
              <p className="text-xs text-purple-600 mt-1">Predicted 15% surge in demand for August. Order additional 2,000kg by July 15.</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <h5 className="font-semibold text-sm text-blue-800">Optimize: Extruder Beta</h5>
              <p className="text-xs text-blue-600 mt-1">Machine shows 4% yield drop over 30 days. Recommend predictive maintenance this weekend.</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
              <h5 className="font-semibold text-sm text-green-800">Logistics Savings</h5>
              <p className="text-xs text-green-600 mt-1">Consolidating Thursday shipments to Reliance HQ can save approx. $120/week.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
