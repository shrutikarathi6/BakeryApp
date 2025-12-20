"use client";

type Role = "USER" | "CHEF" | "ADMIN";

export default function Navbar({
  role,
  setRole,
}: {
  role: Role;
  setRole: (r: Role) => void;
}) {
  const tabs: Role[] = ["USER", "CHEF", "ADMIN"];

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center gap-3">
           

            <h1 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                Shrutika's
              </span>{" "}
              <span className="text-gray-800">Bakery</span>
            </h1>
          </div>

          {/* Uniform Role Tabs */}
          <div className="flex items-center gap-8">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setRole(t)}
                className={`
                  relative px-4 py-2 text-sm font-medium uppercase tracking-wider
                  transition-all duration-300 ease-out rounded-lg
                  ${role === t 
                    ? "text-rose-600 bg-rose-50" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {t === "USER"
                  ? "User Login"
                  : t === "CHEF"
                  ? "Chef Login"
                  : "Admin Login"}

                {/* Active underline indicator */}
                <span
                  className={`
                    absolute bottom-0 left-0 w-full h-1 bg-rose-500 rounded-full
                    transition-transform duration-300 origin-left
                    ${role === t ? "scale-x-100" : "scale-x-0"}
                  `}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}