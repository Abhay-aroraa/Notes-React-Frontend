import { useEffect, useState } from "react";
import { getAllNotes, createNote, deleteNote } from "../services/noteService";
import NoteList from "../components/NoteList";
import { FaBars, FaPlus, FaTimes } from "react-icons/fa";
import AddNotePopup from "./AddNote";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openLogin = () => {
    setIsLoginVisible(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeLogin = () => {
    setIsAnimating(false);
    setTimeout(() => setIsLoginVisible(false), 300);
  };

  useEffect(() => {
    getAllNotes()
      .then((res) => setNotes(res.data.reverse()))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    deleteNote(id)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  

  const handleAddNote = (note) => {
    createNote(note)
      .then((res) => {
        setNotes([res.data, ...notes]);
        setTitle("");
        setContent("");
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Error adding note:", err));
  };

  const handleEmptyBin = () => {
    alert("Empty Bin clicked");
  };

  const handleViewArchived = () => {
    alert("Archived clicked");
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white font-sans flex ">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#1f1f1f] shadow-lg z-50 transform transition-transform duration-300 ${isAnimating ? "translate-x-" : "-translate-x-full"
          }`}
        style={{ width: "250px" }}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <FaTimes
            className="text-white text-xl cursor-pointer hover:text-gray-400"
            onClick={closeLogin}
          />
        </div>

        {/* Sidebar Options */}
        <div className="px-4 space-y-4">
          <button
            onClick={handleEmptyBin}
            className="w-full text-left text-white font-medium"
          >
            Empty Bin
          </button>
          <button
            onClick={handleViewArchived}
            className="w-full text-left text-white font-medium"
          >
            Archived
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${isLoginVisible ? "ml-[250px]" : "ml-0"
          }`}
      >
        {/* Header */}
        <header className="p-4 sm:p-6 flex items-center gap-4 bg-[#1f1f1f] shadow-md sticky top-0 z-10">
          <button className="text-xl text-white">
            <FaBars onClick={openLogin} />
          </button>

          <input
            type="text"
            placeholder="Search your note..."
            className="flex-1 bg-[#202124] h-12 px-4 rounded-lg outline-none focus:ring-2 focus:ring-gray-600"
          />
        </header>

        {/* Notes Section */}
        <main className="px-4 sm:px-6 py-6">
          {notes.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">No notes available.</p>
          ) : (
            <NoteList notes={notes} onDelete={handleDelete} />
          )}
        </main>

        {/* Add Note Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-20 backdrop-blur-[1px] bg-black/20 transition-opacity duration-300"></div>
        )}

        {isModalOpen && (
          <AddNotePopup
            onAdd={(note) => handleAddNote(note)}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        {/* Floating Add Button */}
        <button
          className="fixed bottom-6 right-6 bg-[#2f2f2f] text-white p-4 rounded-full shadow-md hover:bg-[#3c3c3c] transition-colors z-20"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="text-xl" />
        </button>
      </div>
    </div>
  );
}
