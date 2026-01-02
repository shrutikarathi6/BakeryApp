"use client";
import logo from "@/constants/logo.jpeg";
import { usePathname, useRouter } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Add Bakery Items", path: "/addproducts" },
    { label: "Order Status", path: "/admindashboard" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          {/* Logo & Admin Title */}
          <div className="navbar-logo flex items-center gap-4">
            <img
              src={logo.src}
              alt="KABRA'S BAKE WORLD Logo"
              className="navbar-logo-img"
            />
            <h1 className="navbar-title">
              <span className="navbar-title-primary">Admin</span>

            </h1>
          </div>

          {/* Navigation Links */}
          <div className="navbar-tabs">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`navbar-tab ${pathname === item.path ? "active" : ""}`}
              >
                {item.label}
                <span className="navbar-tab-indicator" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}