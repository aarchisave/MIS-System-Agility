import React from 'react';
import { Save, Building, BellRing, Database, Paintbrush } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage platform configuration, thresholds, and integrations.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <section className="glass-card">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
            <Building className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Company Profile</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" defaultValue="Agility Food Products LLP" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-agility-green focus:border-agility-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax/GST Number</label>
              <input type="text" defaultValue="27AADCA1234E1Z5" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-agility-green focus:border-agility-green" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Registered Address</label>
              <textarea rows="3" defaultValue="123 Industrial Area, Phase 2, Pune, Maharashtra" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-agility-green focus:border-agility-green"></textarea>
            </div>
          </div>
        </section>

        <section className="glass-card">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
            <BellRing className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Alert Thresholds</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Global Low Stock Warning (%)</label>
              <div className="flex items-center gap-3">
                <input type="range" min="5" max="50" defaultValue="15" className="w-full accent-agility-green" />
                <span className="text-sm font-medium text-gray-700 w-12">15%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Premix Expiry Alert (Days)</label>
              <input type="number" defaultValue="3" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-agility-green focus:border-agility-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Allowable Overfill (%)</label>
              <input type="number" defaultValue="1.5" step="0.1" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-agility-green focus:border-agility-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Yield Warning Threshold (%)</label>
              <input type="number" defaultValue="95" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-agility-green focus:border-agility-green" />
            </div>
          </div>
        </section>

        <section className="glass-card">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
            <Database className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Integrations</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-semibold text-sm text-gray-900">SAP ERP Sync</h4>
                <p className="text-xs text-gray-500">Automatically sync inventory and production data to SAP.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-agility-green"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-semibold text-sm text-gray-900">Tally Accounting</h4>
                <p className="text-xs text-gray-500">Export finance and wastage logs directly to Tally.</p>
              </div>
              <button className="text-sm border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 font-medium text-gray-700">Connect</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
