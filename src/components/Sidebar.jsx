import { NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <div className="w-64 bg-white h-screen flex flex-col border-r border-gray-100">
      <div className="px-6 py-5">
        <h1 className="text-lg font-bold text-teal-500 tracking-tight">
          TaskFlow
        </h1>
      </div>

      <div className="px-6 py-4 mx-3 bg-teal-50 rounded-xl mb-4">
        <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{user?.email}</p>
      </div>

      <nav className="flex-1 px-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? "bg-teal-500 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`
          }
        >
          📋 Dashboard
        </NavLink>
      </nav>

      <div className="px-3 py-4">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
        >
          → Logout
        </button>
      </div>
    </div>
  );
}
