'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, BookOpen, BarChart2, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApi } from '@/context/api-context';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { auth } = useApi();

  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    auth.logout();
    router.push('/login');
  };

  if (isLoading || !userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const stats = [
    { name: 'Total Courses', value: '12', icon: BookOpen, change: '+2 this month' },
    { name: 'Performance', value: '89%', icon: BarChart2, change: '+5% from last month' },
    { name: 'Support Tickets', value: '3', icon: HelpCircle, change: '-1 this week' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header with prominent logout button */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white mb-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-2">Welcome back, {userData.username}!</h2>
          <p className="opacity-90">
            {userData.role === 'ADMIN' 
              ? 'You have administrator privileges.' 
              : 'Here is your personalized dashboard.'}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                  <stat.icon size={20} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-medium">
                      {userData.username}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {item === 1 && 'You completed the "Advanced React" course'}
                      {item === 2 && 'New assignment available in "Data Structures"'}
                      {item === 3 && 'Your submission was graded 95%'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item === 1 && '2 hours ago'}
                      {item === 2 && '1 day ago'}
                      {item === 3 && '3 days ago'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div> */}
      </main>
    </div>
  );
}