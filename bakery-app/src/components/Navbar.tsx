"use client";

type Role = "USER" | "CHEF" | "ADMIN";
import logo from "../constants/logo.jpeg"

export default function Navbar({
  role,
  setRole,
}: {
  role: Role;
  setRole: (r: Role) => void;
}) {
  const tabs: Role[] = ["USER", "CHEF", "ADMIN"];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          {/* Logo on the left */}
          <div className="navbar-logo">
            <img 
              src={logo.src}
              alt="KABRA'S BAKE WORLD Logo"
              className="navbar-logo-img"
            />
          </div>

          {/* Centered login tabs */}
          <div className="navbar-tabs">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setRole(t)}
                className={`navbar-tab ${role === t ? "active" : ""}`}
              >
                {t === "USER" ? "User Login" : t === "CHEF" ? "Chef Login" : "Admin Login"}
                <span className="navbar-tab-indicator" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}