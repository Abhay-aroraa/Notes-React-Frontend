// Header.jsx
import { FaBars } from "react-icons/fa";

export default function Header({ onOpenSidebar, searchQuery, setSearchQuery }) {
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
    </header>
  );
}
