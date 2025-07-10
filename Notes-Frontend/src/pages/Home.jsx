import { useEffect, useState } from "react";
import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
  pinUnpinNotes 
} from "../services/noteService";
import NoteList from "../components/NoteList";
import {
  FaBars,
  FaPlus,
  FaTimes,
  FaTrash,
  FaArchive,
} from "react-icons/fa";
import AddNotePopup from "./AddNote";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openLogin = () => {
    setIsLoginVisible(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

const pinNote = (noteId) => {
   pinUnpinNotes(noteId)
    .then(() => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId ? { ...note, pinned: !note.pinned } : note
        )
      );
    })
    .catch((err) => console.error("Failed to pin/unpin note", err));
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

  useEffect(() => {
    document.body.style.overflow = isLoginVisible ? "hidden" : "auto";
  }, [isLoginVisible,pinNote]);

  const handleDelete = (id) => {
    deleteNote(id)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsPopupOpen(true);
  };

  const handleAddNote = (note) => {
    createNote(note)
      .then((res) => {
        setNotes([res.data, ...notes]);
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Error adding note:", err));
  };

  const handleNoteUpdate = (updatedNote) => {
    updateNote(updatedNote.id, updatedNote)
      .then((res) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === updatedNote.id ? res.data : note
          )
        );
        setIsPopupOpen(false);
        setSelectedNote(null);
      })
      .catch((err) => console.error("Update failed:", err));
  };

  const handleEmptyBin = () => {
    alert("Empty Bin clicked");
  };

  const handleViewArchived = () => {
    alert("Archived clicked");
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white font-sans flex relative overflow-x-hidden">

      {isLoginVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeLogin}
        ></div>
      )}

 
      {isLoginVisible && (
        <div
          className={`fixed top-0 left-0 h-full bg-[#1f1f1f] z-50 transform transition-transform duration-300 ${isAnimating ? "translate-x-0" : "-translate-x-full"
            }`}
          style={{ width: "100%", maxWidth: "250px" }}
        >
          <div className="flex items-center justify-between px-6 py-8 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">MyNotes</h2>
            <FaTimes
              className="text-white text-lg cursor-pointer"
              onClick={closeLogin}
            />
          </div>

          <div className="flex flex-col px-6 py-4 space-y-4">
            <button
              onClick={handleEmptyBin}
              className="flex items-center gap-3 px-3 py-2 text-white rounded-md hover:bg-[#2c2c2c] transition"
            >
              <FaTrash />
              <span>Empty Bin</span>
            </button>

            <button
              onClick={handleViewArchived}
              className="flex items-center gap-3 px-3 py-2 text-white rounded-md hover:bg-[#2c2c2c] transition"
            >
              <FaArchive />
              <span>Archived</span>
            </button>
          </div>

          <div className="absolute bottom-4 left-6 text-gray-500 text-sm">
            © 2025 MyNotes
          </div>
        </div>
      )}

   
      <div
        className={`flex-1 transition-all duration-300 ${isLoginVisible ? "lg:ml-[250px]" : "ml-0"
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-[#202124] h-12 px-4 rounded-lg outline-none focus:ring-2 focus:ring-gray-600"
          />
        </header>

        {/* Notes Section */}
      <main className="px-4 sm:px-6 py-6">
  {notes.length === 0 ? (
    <p className="text-center text-gray-400 mt-10">
      No notes available.
    </p>
  ) : (
    <>
      {/* 📌 Pinned Notes */}
      {filteredNotes.some(note => note.pinned) && (
        <>
          <h2 className="text-lg font-semibold text-white mb-2">📌 Pinned</h2>
          <NoteList
            notes={filteredNotes.filter(note => note.pinned)}
            onDelete={handleDelete}
            onNoteClick={handleNoteClick}
            pinNotes={pinNote}
          />
        </>
      )}

      {/* 🗒️ Other Notes */}
      {filteredNotes.some(note => !note.pinned) && (
        <>
          {filteredNotes.some(note => note.pinned) && (
            <h2 className="text-lg font-semibold text-white mt-6 mb-2">Others</h2>
          )}
          <NoteList
            notes={filteredNotes.filter(note => !note.pinned)}
            onDelete={handleDelete}
            onNoteClick={handleNoteClick}
            pinNotes={pinNote}
          />
        </>
      )}
    </>
  )}
</main>


        {/* Add Note Modal */}
        {isModalOpen && (
          <>
            <div className="fixed inset-0 z-20 backdrop-blur-[1px] bg-black/20 transition-opacity duration-300"></div>
            <AddNotePopup
              onAdd={handleAddNote}
              onClose={() => setIsModalOpen(false)}
            />
          </>
        )}

        {/* Edit Note Modal */}
        {isPopupOpen && (
          <>
            <div className="fixed inset-0 z-20 backdrop-blur-[1px] bg-black/20 transition-opacity duration-300"></div>
            <AddNotePopup
              note={selectedNote}
              onUpdate={handleNoteUpdate}

              onClose={() => setIsPopupOpen(false)}
            />
          </>
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
