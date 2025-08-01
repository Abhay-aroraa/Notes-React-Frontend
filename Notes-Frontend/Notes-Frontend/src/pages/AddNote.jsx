import { useState, useEffect, useRef } from "react";
import { MdArchive } from "react-icons/md";
import {
  FaImage,
  FaUserPlus,
  FaPalette,
  FaEllipsisV,
} from "react-icons/fa";
import useIsMobile from "../components/useInMobile";

export default function AddNotePopup({ note, onAdd, onClose, onUpdate }) {
  const isMobile = useIsMobile(); // 📱 Detect if user is on mobile
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (trimmedTitle || trimmedContent) {
      const newNote = { title: trimmedTitle, content: trimmedContent };
      note ? onUpdate({ ...note, ...newNote }) : onAdd(newNote);
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
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  // 🧱 Reusable Form UI
  const formUI = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 h-full">
      <input
        type="text"
        placeholder="Title"
        className="w-full bg-transparent text-lg outline-none font-medium placeholder-gray-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />

      <textarea
        ref={textareaRef}
        placeholder="Take a note..."
        className="bg-transparent resize-none outline-none placeholder-gray-400 overflow-hidden flex-1"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ minHeight: "60px" }}
      />

      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-4 text-gray-400 text-sm">
          <FaPalette className="hover:text-white cursor-pointer" />
          <FaUserPlus className="hover:text-white cursor-pointer" />
          <FaImage className="hover:text-white cursor-pointer" />
          <MdArchive className="hover:text-white cursor-pointer" />
          <FaEllipsisV className="hover:text-white cursor-pointer" />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="text-sm font-medium text-white hover:underline">
            {note ? "Update" : "Add"}
          </button>
          <button type="button" onClick={onClose} className="text-sm font-medium text-white hover:underline">
            Close
          </button>
        </div>
      </div>
    </form>
  );

  return isMobile ? (
    // 📱 Full page on mobile
    <div className="fixed inset-0 z-50 bg-[#202124] text-white p-4 flex flex-col">
      {formUI}
    </div>
  ) : (
    // 💻 Modal on desktop
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto px-4 py-10">
      <div className="bg-[#202124] text-white w-full max-w-2xl rounded-xl shadow-lg p-4 min-h-fit">
        {formUI}
      </div>
    </div>
  );
}
