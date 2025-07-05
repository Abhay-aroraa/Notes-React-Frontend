import { useEffect, useState } from "react";
import { getAllNotes, createNote, deleteNote } from "../services/noteService";
import NoteList from "../components/NoteList";
import { FaBars, FaPlus } from "react-icons/fa";
import AddNotePopup from "./AddNote";


export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch all notes on mount
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

  // Handle new note submission
  const handleAddNote = (note) => {
    createNote(note)
      .then((res) => {
        setNotes([res.data, ...notes]); // Add new note to the list
        setTitle("");
        setContent("");
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Error adding note:", err));
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white font-sans">
      {/* Header */}
      <header className="p-4 sm:p-6 flex items-center gap-4 bg-[#1f1f1f] shadow-md sticky top-0 z-10">
        <button className="text-xl text-white">
          <FaBars />
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
          <NoteList notes={notes} onDelete={handleDelete}/>
        )}
      </main>

      {isModalOpen && (
        <AddNotePopup
          onAdd={(note) => handleAddNote(note)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {/* Floating Add Note Button */}
      <button
        className="fixed bottom-6 right-6 bg-[#2f2f2f] text-white p-4 rounded-full shadow-md hover:bg-[#3c3c3c] transition-colors z-20"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="text-xl" />
      </button>
    </div>
  );
}
