import { useEffect, useState } from "react";
import { getAllNotes, trashNotes, pinUnpinNotes, archieveNotes,updateNoteColor } from "../services/noteService";
import NoteList from "../components/NoteList";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { toast } from "react-hot-toast";

const archieve = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    fetchArchivedNotes();
  }, []);


  useEffect(() => {
    document.body.style.overflow = isLoginVisible ? "hidden" : "auto";
  }, [isLoginVisible]);

  const toastStyle = {
    style: {
      background: '#2f2f2f',
      color: 'white',
      borderRadius: '8px',
      padding: '10px 16px'
    }
  };

const handleColorChange = (noteId, color) => {
  updateNoteColor(noteId, color)
    .then(() => {
      toast.success("Color updated", toastStyle);
      fetchArchivedNotes();
    })
    .catch((err) => {
      toast.error("Color update failed", toastStyle);
      console.error(err);
    });
};

  const fetchArchivedNotes = () => {
    getAllNotes()
      .then((res) => {
const archived = res.data.filter((note) => note.archieve && !note.trash);
        setArchivedNotes(archived.reverse());
      })
      .catch((err) => {
        toast.error("Failed to fetch archived notes", toastStyle);
        console.error("Failed to fetch archived notes", err);
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

  const handleEmptyBin = () => {
    alert("Empty Bin clicked");
  };

  const handleDelete = (id) => {
    trashNotes(id)
      .then(() => {
        toast.success("Note deleted", toastStyle);
        fetchArchivedNotes();
      })
      .catch((err) => {
        toast.error("Delete failed", toastStyle);
        console.error("Delete failed:", err);
      });
  };

  const handleUnarchive = (noteId) => {
    archieveNotes(noteId)
      .then(() => {
        toast.success("Note unarchived", toastStyle);
        fetchArchivedNotes();
      })
      .catch((err) => {
        toast.error("Unarchive failed", toastStyle);
        console.error("Unarchive failed:", err);
      });
  };

  const handlePin = (noteId) => {
    pinUnpinNotes(noteId)
      .then(() => {
        toast.success("Note pinned/unpinned", toastStyle);
        fetchArchivedNotes();
      })
      .catch((err) => {
        toast.error("Pin/Unpin failed", toastStyle);
        console.error("Pin/Unpin failed:", err);
      });
  };

  const filteredNotes = archivedNotes.filter(
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
        onEmptyBin={handleEmptyBin}
      />

      <div
        className={`flex-1 transition-all duration-300 ${isLoginVisible ? "lg:ml-[250px]" : "ml-0"}`}
      >
        <Header
          onOpenSidebar={openLogin}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="px-4 sm:px-6 py-6">
          <h1 className="text-2xl font-semibold mb-4">📦 Archived Notes</h1>
          {filteredNotes.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">No archived notes found.</p>
          ) : (
            <NoteList
              notes={filteredNotes}
              onDelete={handleDelete}
              onNoteClick={() => {}}
              pinNotes={handlePin}
              archieveNote={handleUnarchive}
              handleColorChange={handleColorChange}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default archieve;