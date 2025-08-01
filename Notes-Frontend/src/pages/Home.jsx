import { useEffect, useState } from "react";

import {
  getAllNotes,
  createNote,
  trashNotes,
  updateNote,
  pinUnpinNotes,
  archieveNotes,
  updateNoteColor
} from "../services/noteService";

import NoteList from "../components/NoteList";
import AddNotePopup from "./AddNote";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toastStyle = {
    style: {
      background: "#2f2f2f",
      color: "white",
      borderRadius: "8px",
      padding: "10px 16px",
    },
  };

 const fetchNotes = async () => {
  try {
    const res = await getAllNotes();

    // ✅ Filter out both archived AND trashed notes
    const nonArchivedNotes = res.data.filter(
      (note) => !note.archieve && !note.trash
    );

    return nonArchivedNotes.reverse();
  } catch (err) {
    console.error("Fetching notes failed", err);
    return [];
  }
};


  const loadNotes = () => {
    fetchNotes().then(setNotes);
  };

  useEffect(loadNotes, []);

  useEffect(() => {
    document.body.style.overflow = isLoginVisible ? "hidden" : "auto";
  }, [isLoginVisible]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openLogin = () => {
    setIsLoginVisible(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeLogin = () => {
    setIsAnimating(false);
    setTimeout(() => setIsLoginVisible(false), 300);
  };

  // ✅ Pin/unpin with correct success toast
  const handlePinNote = async (noteId) => {
    try {
      await pinUnpinNotes(noteId);

      const updatedNotes = await fetchNotes();
      const updatedNote = updatedNotes.find((note) => note.id === noteId);

      if (!updatedNote) {
        toast.error("Note updated but not found", toastStyle);
        return;
      }

      const message = updatedNote.pinned
        ? "Note pin successful"
        : "Note unpin successful";

      toast.success(message, toastStyle);
      setNotes(updatedNotes);
    } catch (err) {
      toast.error("Failed to pin/unpin note", toastStyle);
      console.error("Pin/unpin failed:", err);
    }
  };

  const handleArchiveNote = (noteId) => {
    archieveNotes(noteId)
      .then(() => {
        toast.success("Note archived", toastStyle);
        loadNotes();
      })
      .catch((err) => {
        toast.error("Failed to archive note", toastStyle);
        console.error("Archive error", err);
      });
  };

  const handleDelete = (id) => {
    trashNotes(id)
      .then(() => {
        toast.success("Note moved to bin", toastStyle);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      })
      .catch((err) => {
        toast.error("Delete failed", toastStyle);
        console.error("Delete failed:", err);
      });
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsPopupOpen(true);
  };

  const handleAddNote = (note) => {
    createNote(note)
      .then((res) => {
        toast.success("Note added", toastStyle);
        setNotes((prevNotes) => [res.data, ...prevNotes]);
        setIsModalOpen(false);
      })
      .catch((err) => {
        toast.error("Error adding note", toastStyle);
        console.error("Error adding note:", err);
      });
  };

 const handleColorChange = (noteId, color) => {
  updateNoteColor(noteId, color)
    .then(() => {
      toast.success("Color updated", toastStyle);
      fetchNotes().then(setNotes); // ✅ update state
    })
    .catch((err) => {
      toast.error("Color update failed", toastStyle);
      console.error(err);
    });
};



  const handleNoteUpdate = (updatedNote) => {
    updateNote(updatedNote.id, updatedNote)
      .then((res) => {
        toast.success("Note updated", toastStyle);
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === updatedNote.id ? res.data : note
          )
        );
        setIsPopupOpen(false);
        setSelectedNote(null);
      })
      .catch((err) => {
        toast.error("Update failed", toastStyle);
        console.error("Update failed:", err);
      });
  };

  const handleEmptyBin = () => {
    alert("Empty Bin clicked");
  };

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
        className={`flex-1 transition-all duration-300 ${
          isLoginVisible ? "lg:ml-[250px]" : "ml-0"
        }`}
      >
        <Header
          onOpenSidebar={openLogin}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="px-4 sm:px-6 py-6">
          {notes.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">
              No notes available.
            </p>
          ) : (
            <>
              {filteredNotes.some((note) => note.pinned) && (
                <>
                  <h2 className="text-lg font-semibold text-white mb-2">
                    📌 Pinned
                  </h2>
                  <NoteList
                    notes={filteredNotes.filter((note) => note.pinned)}
                    onDelete={handleDelete}
                    onNoteClick={handleNoteClick}
                    pinNotes={handlePinNote}
                    archieveNote={handleArchiveNote}
                     handleColorChange={handleColorChange}
                  />
                </>
              )}

              {filteredNotes.some((note) => !note.pinned) && (
                <>
                  {filteredNotes.some((note) => note.pinned) && (
                    <h2 className="text-lg font-semibold text-white mt-6 mb-2">
                      Others
                    </h2>
                  )}
                  <NoteList
                    notes={filteredNotes.filter((note) => !note.pinned)}
                    onDelete={handleDelete}
                    onNoteClick={handleNoteClick}
                    pinNotes={handlePinNote}
                    archieveNote={handleArchiveNote}
                     handleColorChange={handleColorChange}
                  />
                </>
              )}
            </>
          )}
        </main>

        {isModalOpen && (
          <>
            <div className="fixed inset-0 z-20 backdrop-blur-[1px] bg-black/20 transition-opacity duration-300"></div>
            <AddNotePopup
              onAdd={handleAddNote}
              onClose={() => setIsModalOpen(false)}
              pinNotes={handlePinNote}
            />
          </>
        )}

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
