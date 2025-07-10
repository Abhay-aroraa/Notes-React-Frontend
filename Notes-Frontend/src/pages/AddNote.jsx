import { useState, useEffect, useRef } from "react";
import {
  FaBell,
  FaImage,
  FaUserPlus,
  FaPalette,
  FaEllipsisV,
  FaUndo,
  FaRedo,
  FaThumbtack,
} from "react-icons/fa";

export default function AddNotePopup({note, onAdd, onClose, onUpdate,pinNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const popupRef = useRef(null); 
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (trimmedTitle || trimmedContent) {
      const newNote = { title: trimmedTitle, content: trimmedContent };

      if (note) {
        onUpdate({ ...note, ...newNote });
      } else {
        onAdd(newNote);
      }

      setTitle("");
      setContent("");
      onClose();
    }
  };

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose(); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };


  return (
    <div className="fixed inset-2 z-40 flex items-center justify-center mt-20 px-4">
      <div
        ref={popupRef}
        className="bg-[#202124] text-white w-full max-w-2xl rounded-xl shadow-lg p-4"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* Title Row */}
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Title"
              className="w-full bg-transparent text-lg outline-none font-medium placeholder-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleTitleKeyDown}
              autoFocus
            />
            <FaThumbtack className="text-gray-400 cursor-pointer hover:text-white" onClick={pinNote} />
          </div>

          <textarea
            placeholder="Take a note..."
            rows={3}
            className="bg-transparent resize-none outline-none placeholder-gray-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Icon Row */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-4 text-gray-400 text-sm">
              <FaPalette className="hover:text-white cursor-pointer" />
              <FaBell className="hover:text-white cursor-pointer" />
              <FaUserPlus className="hover:text-white cursor-pointer" />
              <FaImage className="hover:text-white cursor-pointer" />
              <FaEllipsisV className="hover:text-white cursor-pointer" />
              <FaUndo className="hover:text-white cursor-pointer" />
              <FaRedo className="hover:text-white cursor-pointer" />
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" className="text-sm font-medium text-white hover:underline">
                {note ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-sm font-medium text-white hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
