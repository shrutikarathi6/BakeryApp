"use client";

import { usePathname, useRouter } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      label: "Add Bakery Items",
      path: "/addproducts",
    },
    {
      label: "Order Status",
      path: "/admindashboard",
    },
  ];

  return (
  <nav className="w-full bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo & Title */}
      <div className="flex items-center gap-3">
        {/* Shield Icon */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-indigo-600 drop-shadow-sm"
        >
          <path
            d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12 8v4l3 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Admin Panel
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`
                relative px-3 py-2 text-sm font-medium uppercase tracking-wider
                transition-all duration-300 rounded-lg
                ${isActive 
                  ? "text-indigo-600 bg-indigo-50" 
                  : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                }
              `}
            >
              {item.label}

              {/* Animated Active Indicator */}
              <span
                className={`
                  absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full
                  transition-transform duration-300 origin-left
                  ${isActive ? "scale-x-100" : "scale-x-0"}
                `}
              />
            </button>
          );
        })}
      </div>
    </div>
  </div>
</nav>
  );
}
