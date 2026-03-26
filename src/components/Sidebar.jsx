import { NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <div className="w-64 bg-white h-screen flex flex-col shadow-sm">
      <div className="px-6 py-5 border-b">
        <h1 className="text-xl font-bold text-violet-600">MiniTodo</h1>
      </div>

      <div className="px-6 py-4 border-b">
        <p className="text-sm font-medium text-gray-800">{user?.name}</p>
        <p className="text-xs text-gray-400">{user?.email}</p>
      </div>

      <nav className="flex-1 px-4 py-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-violet-50 text-violet-600"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          Dashboard
        </NavLink>
      </nav>

      <div className="px-4 py-4 border-t">
        <button
          onClick={logout}
          className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
