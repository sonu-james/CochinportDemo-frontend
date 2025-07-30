'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  FiLogOut,
  FiMenu,
  FiGrid,
  FiMap,
  FiBox,
  FiFileText,
  FiFolder,
  FiBarChart2,
  FiChevronDown,
  FiChevronRight,
  FiUsers,
  FiCalendar,
  FiArchive,
  FiMapPin,
  FiActivity

} from 'react-icons/fi';
export default function Sidebar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const menuItems = [
    {
      label: 'Dashboard',
      icon: <FiGrid />,
      children: [
        { label: 'Berth Tracker', icon: <FiMap />, href: '/dashboard' },
        { label: 'Ship Movement Summary', icon: <FiFileText />, href: '/ship-movement-summary' },
        { label: 'TRT Dashboard', icon: <FiFileText />, href: '/TRT-dashboard' },
        { label: 'Notification', icon: <FiFolder />, href: '#' },
      ],
    },
    {
      label: 'Ship Management', icon: <FiBox />,
      children: [
        { label: 'Ship Visit Tracker', icon: <FiActivity />, href: '/ship-visit-history' },
      ],
    },
    { label: 'Berth Management', icon: <FiMap />, href: '/berth-management' },
    { label: 'Cargo Management', icon: <FiArchive />, href: '#' },
    { label: 'User Management', icon: <FiUsers />, href: '#' },
    { label: 'Port Schedule', icon: <FiCalendar />, href: '#' },

    {
      label: 'Payment Management',
      icon: <FiFileText />,
      children: [
        { label: 'Payment History', icon: <FiFileText />, href: '/berth-payment-history' },
      ],
    },
    /* {
        label: 'Payment History',
        icon: <FiFileText />,
        href: '/berth-payment-history' 
        
      }, */
    { label: 'Reports & Analytics', icon: <FiBarChart2 />, href: '#' },
    { label: 'Live Shipping Tracking', icon: <FiMapPin />, href: '|#' },
  ];

  const [expandedMenu, setExpandedMenu] = useState<string | null>('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    console.log('Logging out...');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('existingUser');
    sessionStorage.removeItem('isLoggedIn');
    // localStorage.removeItem('userEmail');
    if (window.innerWidth < 768) setSidebarOpen(false);
    window.location.href = '/login'; 
  };


  const toggleMenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };
  if (!isMounted) return null;
  return (
    <div className="flex">
      {/* Hamburger for small screens */}
      <div className="md:hidden p-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl text-white">
          <FiMenu />
        </button>
      </div>

      <aside
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } transform transition-transform duration-300 ease-in-out 
        fixed md:static z-40 top-0 left-0 h-full w-68 
        bg-gradient-to-b from-[#014F86] via-[#006494] to-[#003049] 
        text-white shadow-xl md:flex flex-col justify-between py-6 px-4`}
      >
        {/* Top */}
        <div>
          <h1 className="text-2xl font-extrabold text-center mb-4 tracking-wide flex items-center justify-center gap-3">
            <img
              src="/images/cochinporticon.jpg"
              alt="Logo"
              className="w-10 h-10 object-contain rounded-full"
            />
            PORTRAC
          </h1>

          <hr className="border-white/30 mb-6" />

          <nav className="space-y-2">
            {menuItems.map((item) => {
              return (
                <div key={item.label}>
                  {item.children ? (
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded hover:bg-white/20 transition-all`}
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        {item.label}
                      </span>
                      {expandedMenu === item.label ? <FiChevronDown /> : <FiChevronRight />}
                    </button>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/20 transition-all ${pathname === item.href ? 'bg-white/20 font-bold shadow' : ''
                        }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/20 transition-all"
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  )}

                  {/* Submenu items */}
                  {item.children && expandedMenu === item.label && (
                    <div className="ml-6 mt-1 space-y-1 text-sm">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href || '#'}
                          onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                          className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded transition-all ${pathname === sub.href
                            ? 'bg-white/20 text-white font-semibold shadow'
                            : 'hover:bg-white/10 text-white'
                            }`}
                        >
                          {sub.icon}
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}
        <div className="space-y-4">
          <hr className="border-white/30 mb-2" />
          <div className="flex items-center space-x-3 justify-center">
            <img
              src="/images/users-icon.jpg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border border-white shadow"
            />
            <span className="font-medium">John Doe</span>
          </div>
          <hr className="border-white/30 mb-8" />
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="flex items-center gap-5 hover:text-yellow-300 transition-colors text-lg"
            >
              <FiLogOut />
              <span className="text-base font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
