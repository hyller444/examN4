
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Users, Package, ShoppingBag, CreditCard, TrendingUp, 
  ArrowUpRight, ArrowDownRight, PieChart as PieChartIcon, BarChart as BarChartIcon,
  User, Activity
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Recharts components
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample data for charts
const salesData = [
  { name: 'Jan', total: 1200 },
  { name: 'Fév', total: 1900 },
  { name: 'Mar', total: 1500 },
  { name: 'Avr', total: 2400 },
  { name: 'Mai', total: 1800 },
  { name: 'Jun', total: 2800 },
  { name: 'Jul', total: 3200 },
  { name: 'Aoû', total: 2800 },
  { name: 'Sep', total: 3500 },
  { name: 'Oct', total: 3700 },
  { name: 'Nov', total: 3000 },
  { name: 'Déc', total: 4500 },
];

const categoryData = [
  { name: 'Électronique', value: 35 },
  { name: 'Vêtements', value: 25 },
  { name: 'Maison', value: 20 },
  { name: 'Sports', value: 15 },
  { name: 'Autres', value: 5 },
];

const COLORS = ['#2563eb', '#4f46e5', '#8b5cf6', '#d946ef', '#ec4899'];

// Recent activity
const recentActivity = [
  {
    id: 1,
    type: 'user',
    action: 'a créé un compte',
    name: 'Jean Dupont',
    time: '10 minutes',
    icon: <User className="h-5 w-5 text-blue-500" />
  },
  {
    id: 2,
    type: 'order',
    action: 'a passé une commande',
    name: 'Marie Martin',
    time: '30 minutes',
    icon: <ShoppingBag className="h-5 w-5 text-green-500" />
  },
  {
    id: 3,
    type: 'seller',
    action: 'a ajouté un nouveau produit',
    name: 'Pierre Legrand',
    time: '1 heure',
    icon: <Package className="h-5 w-5 text-purple-500" />
  },
  {
    id: 4,
    type: 'platform',
    action: 'Mise à jour du système',
    name: 'Système',
    time: '3 heures',
    icon: <Activity className="h-5 w-5 text-orange-500" />
  }
];

// Stats card component
const StatsCard = ({ title, value, icon, trend, percentage }: { 
  title: string, 
  value: string, 
  icon: React.ReactNode,
  trend: 'up' | 'down',
  percentage: string
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-brand">
          {icon}
        </div>
      </div>
      <div className={`flex items-center mt-4 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? (
          <ArrowUpRight className="h-4 w-4 mr-1" />
        ) : (
          <ArrowDownRight className="h-4 w-4 mr-1" />
        )}
        <span className="text-sm font-medium">{percentage}</span>
        <span className="text-gray-500 text-sm ml-1">par rapport au mois dernier</span>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [dateRange, setDateRange] = useState('year');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Tableau de bord administrateur</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard 
              title="Utilisateurs" 
              value="8,249" 
              icon={<Users className="h-6 w-6" />}
              trend="up"
              percentage="+5.2%"
            />
            <StatsCard 
              title="Commandes" 
              value="3,456" 
              icon={<ShoppingBag className="h-6 w-6" />}
              trend="up"
              percentage="+12.5%"
            />
            <StatsCard 
              title="Produits" 
              value="1,254" 
              icon={<Package className="h-6 w-6" />}
              trend="up"
              percentage="+3.8%"
            />
            <StatsCard 
              title="Revenu" 
              value="€149,500" 
              icon={<CreditCard className="h-6 w-6" />}
              trend="down"
              percentage="-2.4%"
            />
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Revenus</h2>
                <div>
                  <select 
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="text-sm border-gray-300 rounded-md focus:border-brand focus:ring focus:ring-brand/20 focus:ring-opacity-50"
                  >
                    <option value="week">7 derniers jours</option>
                    <option value="month">30 derniers jours</option>
                    <option value="quarter">3 derniers mois</option>
                    <option value="year">Année en cours</option>
                  </select>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      tickFormatter={(value) => `€${value}`} 
                    />
                    <Tooltip 
                      formatter={(value: any) => [`€${value}`, 'Revenu']}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#2563eb" 
                      fillOpacity={1}
                      fill="url(#colorTotal)"
                      strokeWidth={2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Category Distribution */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Répartition des produits</h2>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Selling Products */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Produits les plus vendus</h2>
                  <Button variant="ghost" asChild>
                    <Link to="/admin/products">Voir tout</Link>
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Smartphone XYZ", sales: 452 },
                        { name: "Écouteurs Bluetooth", sales: 356 },
                        { name: "Montre connectée", sales: 271 },
                        { name: "Ordinateur portable", sales: 189 },
                        { name: "Enceinte sans fil", sales: 145 },
                      ].sort((a, b) => a.sales - b.sales)}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#4f46e5" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Activité récente</h2>
              </div>
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {recentActivity.map((item, itemIdx) => (
                      <li key={item.id}>
                        <div className="relative pb-8">
                          {itemIdx !== recentActivity.length - 1 ? (
                            <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                          ) : null}
                          <div className="relative flex items-start space-x-3">
                            <div className="relative">
                              <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center ring-8 ring-white">
                                {item.icon}
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="text-sm">
                                  <span className="font-medium text-gray-900">{item.name}</span>
                                  {' '}
                                  <span className="text-gray-500">{item.action}</span>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                  Il y a {item.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/admin/activity">
                      Voir toutes les activités
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
