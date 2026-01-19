import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-white/10 bg-zinc-950 px-4 md:px-10 py-4">
      <div className="flex justify-between items-center">
        
        <NavLink
          to="/"
          className="text-xl md:text-2xl font-semibold tracking-wide text-white"
        >
          MediaVault
        </NavLink>

        <div className="hidden md:flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition
              ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`
            }
          >
            Search
          </NavLink>

          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition
              ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`
            }
          >
            Collection
          </NavLink>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-300 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-2">
          <NavLink
            onClick={() => setOpen(false)}
            to="/"
            className={({ isActive }) =>
              `px-4 py-3 rounded-md text-sm font-medium
              ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-zinc-900"
              }`
            }
          >
            Search
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to="/collection"
            className={({ isActive }) =>
              `px-4 py-3 rounded-md text-sm font-medium
              ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-zinc-900"
              }`
            }
          >
            Collection
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
