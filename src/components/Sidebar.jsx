// Sidebar.jsx
import { FaTimes, FaTrash, FaArchive } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isVisible, isAnimating, onClose, onEmptyBin }) {
  const navigate = useNavigate();

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      )}

      {isVisible && (
        <div className={`fixed top-0 left-0 h-full bg-[#1f1f1f] z-50 transform transition-transform duration-300 ${isAnimating ? "translate-x-0" : "-translate-x-full"}`} style={{ width: "100%", maxWidth: "250px" }}>
          <div className="flex items-center justify-between px-6 py-8 border-b border-gray-700">
            <h2 className="text-xl font-semibold cursor-pointer text-white" onClick={() => navigate("/home")}>MyNotes</h2>
            <FaTimes className="text-white text-lg cursor-pointer" onClick={onClose} />
          </div>

          <div className="flex flex-col px-6 py-4 space-y-4">
           
            <button onClick={() => navigate("/archieve")} className="flex items-center gap-3 px-3 py-2 text-white rounded-md hover:bg-[#2c2c2c] transition">
              <FaArchive />
              <span>Archived</span>
            </button>
             <button onClick={() => navigate("/trash")} className="flex items-center gap-3 px-3 py-2 text-white rounded-md hover:bg-[#2c2c2c] transition">
              <FaTrash />
              <span>Empty Bin</span>
            </button>
          </div>

          <div className="absolute bottom-4 left-6 text-gray-500 text-sm">© 2025 MyNotes</div>
        </div>
      )}
    </>
  );
}
