import React from 'react';
import { FileText, Download, Calendar, Filter, FileSpreadsheet } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & MIS Generation</h1>
          <p className="text-sm text-gray-500 mt-1">Generate, schedule, and export comprehensive enterprise reports.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button className="btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" /> Download All Pending
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card col-span-2">
          <h3 className="font-semibold text-gray-900 mb-4 text-lg">Generate Custom Report</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Category</label>
                <select className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-agility-green focus:border-agility-green">
                  <option>Monthly MIS Overview</option>
                  <option>Production & Yield</option>
                  <option>Inventory Movement</option>
                  <option>Dispatch & Logistics</option>
                  <option>Wastage & Finance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <div className="flex items-center gap-2">
                  <input type="date" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-agility-green focus:border-agility-green" />
                  <span className="text-gray-500">to</span>
                  <input type="date" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-agility-green focus:border-agility-green" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
                <select className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-agility-green focus:border-agility-green">
                  <option>PDF Document (.pdf)</option>
                  <option>Excel Spreadsheet (.xlsx)</option>
                  <option>CSV Data (.csv)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Include Visuals</label>
                <select className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-agility-green focus:border-agility-green">
                  <option>Yes, include charts & graphs</option>
                  <option>No, data tables only</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button type="button" className="bg-agility-dark text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
                Generate & Preview
              </button>
            </div>
          </form>
        </div>

        <div className="glass-card">
          <h3 className="font-semibold text-gray-900 mb-4">Scheduled Reports</h3>
          <div className="space-y-3">
            {[
              { title: 'Weekly Production Summary', freq: 'Every Monday 08:00', format: 'PDF' },
              { title: 'EOM Inventory Valuation', freq: 'Last day of month', format: 'Excel' },
              { title: 'Daily Dispatch Logs', freq: 'Daily 18:00', format: 'CSV' },
            ].map((report, idx) => (
              <div key={idx} className="p-3 border border-gray-100 rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-gray-800">{report.title}</span>
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">{report.format}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <Calendar className="w-3 h-3 mr-1" /> {report.freq}
                </div>
              </div>
            ))}
            <button className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition mt-2">
              + New Schedule
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Reports Library</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'April 2026 MIS.pdf', date: 'May 1, 2026', type: 'PDF' },
            { name: 'Yield_Analysis_Q1.xlsx', date: 'Apr 15, 2026', type: 'Excel' },
            { name: 'Wastage_Log_Week12.csv', date: 'Apr 10, 2026', type: 'CSV' },
            { name: 'Maintenance_Audit.pdf', date: 'Apr 5, 2026', type: 'PDF' },
          ].map((file, i) => (
            <div key={i} className="flex flex-col border border-gray-100 rounded-lg p-4 hover:shadow-md transition bg-white cursor-pointer group">
              <div className="flex justify-center mb-4">
                {file.type === 'PDF' ? <FileText className="w-10 h-10 text-red-500" /> : <FileSpreadsheet className="w-10 h-10 text-green-600" />}
              </div>
              <h4 className="text-sm font-semibold text-center truncate" title={file.name}>{file.name}</h4>
              <p className="text-xs text-gray-500 text-center mt-1">{file.date}</p>
              <button className="mt-3 text-sm text-agility-green font-medium opacity-0 group-hover:opacity-100 transition text-center">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
