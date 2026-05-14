import React from 'react';
import { Users as UsersIcon, Shield, Lock, Activity } from 'lucide-react';

const users = [
  { id: 1, name: 'Admin User', role: 'Plant Manager', dept: 'Management', status: 'Active', lastActive: '2 mins ago' },
  { id: 2, name: 'John Doe', role: 'Production Supervisor', dept: 'Production', status: 'Active', lastActive: '1 hr ago' },
  { id: 3, name: 'Priya Sharma', role: 'Inventory Controller', dept: 'Warehouse', status: 'Active', lastActive: '5 hrs ago' },
  { id: 4, name: 'Rajesh Kumar', role: 'Machine Operator', dept: 'Production', status: 'Inactive', lastActive: '2 days ago' },
  { id: 5, name: 'Amit Singh', role: 'Logistics Coordinator', dept: 'Dispatch', status: 'Active', lastActive: '10 mins ago' },
];

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User & Role Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage employee access levels and departmental permissions.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="btn-primary shadow-sm shadow-agility-green/30">Add New User</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><UsersIcon className="w-6 h-6" /></div>
          <div>
            <h3 className="font-semibold text-gray-700">Total Users</h3>
            <p className="text-2xl font-bold text-gray-900">42</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 bg-agility-green/10 text-agility-green rounded-full"><Activity className="w-6 h-6" /></div>
          <div>
            <h3 className="font-semibold text-gray-700">Active Today</h3>
            <p className="text-2xl font-bold text-gray-900">18</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-full"><Shield className="w-6 h-6" /></div>
          <div>
            <h3 className="font-semibold text-gray-700">Admin Roles</h3>
            <p className="text-2xl font-bold text-gray-900">4</p>
          </div>
        </div>
      </div>

      <div className="glass-card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="table-header">Name</th>
                <th className="table-header">Role</th>
                <th className="table-header">Department</th>
                <th className="table-header">Status</th>
                <th className="table-header">Last Active</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell font-medium text-gray-900 flex items-center gap-3">
                    <img src={`https://ui-avatars.com/api/?name=${u.name.replace(' ', '+')}&background=random`} alt="" className="w-8 h-8 rounded-full" />
                    {u.name}
                  </td>
                  <td className="table-cell">{u.role}</td>
                  <td className="table-cell">{u.dept}</td>
                  <td className="table-cell">
                    <span className={`status-badge ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{u.status}</span>
                  </td>
                  <td className="table-cell text-gray-500">{u.lastActive}</td>
                  <td className="table-cell">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">Suspend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
