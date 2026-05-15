import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Factory, 
  Package, 
  FlaskConical, 
  Box, 
  Truck, 
  Wallet, 
  FileBarChart, 
  BrainCircuit, 
  Bell, 
  Users, 
  Settings,
  Search,
  Menu,
  X,
  Calculator
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Production', href: '/production', icon: Factory },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Planning', href: '/planning', icon: Calculator },
  { name: 'Premix Mgmt', href: '/premix', icon: FlaskConical },
  { name: 'Packaging', href: '/packaging', icon: Box },
  { name: 'Dispatch', href: '/dispatch', icon: Truck },
  { name: 'Finance', href: '/finance', icon: Wallet },
  { name: 'Reports', href: '/reports', icon: FileBarChart },
  { name: 'Forecasting', href: '/forecasting', icon: BrainCircuit },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/80 z-40 lg:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-agility-dark text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-agility-green rounded-lg flex items-center justify-center">
              <Factory className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Agility MIS</span>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-4rem)] p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Main Menu</div>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-agility-green/10 text-agility-green' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30">
          <div className="flex items-center">
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none mr-4"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search inventory, batches, reports..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-agility-green focus:border-transparent w-64 md:w-96"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
              <img 
                className="w-8 h-8 rounded-full border border-gray-200"
                src="https://ui-avatars.com/api/?name=Admin+User&background=57C84D&color=fff" 
                alt="Profile" 
              />
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-700">Admin User</div>
                <div className="text-xs text-gray-500">Plant Manager</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
