import { FaBars, FaUser } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function Header({ onOpenSidebar, searchQuery, setSearchQuery }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // or your logout logic
    window.location.href = "/";  // redirect to login
  };

  return (
    <header className="p-4 sm:p-6 flex items-center gap-4 bg-[#1f1f1f] shadow-md sticky top-0 z-10">
      <button className="text-xl text-white">
        <FaBars onClick={onOpenSidebar} />
      </button>

      <input
        type="text"
        placeholder="Search your note..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 bg-[#202124] h-12 px-4 rounded-lg outline-none focus:ring-2 focus:ring-gray-600"
      />

      {/* User Icon with Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="text-xl text-white bg-gray-700 rounded-full p-2 hover:bg-gray-600"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FaUser />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
