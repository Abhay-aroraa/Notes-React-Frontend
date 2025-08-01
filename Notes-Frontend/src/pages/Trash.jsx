import { useEffect, useState } from "react";
import { getAllNotes, deleteNote, trashNotes } from "../services/noteService";
import NoteList from "../components/NoteList";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { toast } from "react-hot-toast";

const Trash = () => {
  const [trashedNotes, setTrashedNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toastStyle = {
    style: {
      background: '#2f2f2f',
      color: 'white',
      borderRadius: '8px',
      padding: '10px 16px'
    }
  };

  useEffect(() => {
    fetchTrashedNotes();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoginVisible ? "hidden" : "auto";
  }, [isLoginVisible]);

  const fetchTrashedNotes = () => {
    getAllNotes()
      .then((res) => {
        const trashed = res.data.filter((note) => note.trash === true);
        setTrashedNotes(trashed.reverse());
      })
      .catch((err) => console.error("Failed to fetch trashed notes", err));
  };

  const handleDeleteForever = (id) => {
    deleteNote(id)
      .then(() => {
        toast.success("Note permanently deleted", toastStyle);
        fetchTrashedNotes();
      })
      .catch((err) => {
        toast.error("Failed to delete note", toastStyle);
        console.error("Permanent delete failed:", err);
      });
  };

  const handleRestore = (id) => {
    trashNotes(id)
      .then(() => {
        toast.success("Note restored", toastStyle);
        fetchTrashedNotes();
      })
      .catch((err) => {
        toast.error("Failed to restore note", toastStyle);
        console.error("Restore failed:", err);
      });
  };

  const openLogin = () => {
    setIsLoginVisible(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeLogin = () => {
    setIsAnimating(false);
    setTimeout(() => setIsLoginVisible(false), 300);
  };

  const filteredNotes = trashedNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#171717] text-white font-sans flex relative overflow-x-hidden">
      {isLoginVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeLogin}
        ></div>
      )}

      <Sidebar
        isVisible={isLoginVisible}
        isAnimating={isAnimating}
        onClose={closeLogin}
      />

      <div
        className={`flex-1 transition-all duration-300 ${isLoginVisible ? "lg:ml-[250px]" : "ml-0"
          }`}
      >
        <Header
          onOpenSidebar={openLogin}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="px-4 sm:px-6 py-6">
          <h1 className="text-2xl font-semibold mb-4">🗑️ Trashed Notes</h1>
          {filteredNotes.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">Trash is empty.</p>
          ) : (
            <NoteList
              notes={filteredNotes}
              onDelete={handleDeleteForever}
              restoreNote={handleRestore}
              isTrashPage={true}
              onNoteClick={() => { }}
            />

          )}
        </main>
      </div>
    </div>
  );
};

export default Trash;
