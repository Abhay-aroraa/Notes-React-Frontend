
import { useState, useEffect, useRef } from "react";
import { MdArchive } from "react-icons/md";
import {
  FaImage,
  FaUserPlus,
  FaPalette,
  FaEllipsisV,
} from "react-icons/fa";
import {getAIResponse} from "../services/noteService"
import useIsMobile from "../components/useInMobile";

export default function AddNotePopup({ note, onAdd, onClose, onUpdate }) {
  const isMobile = useIsMobile();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  // ✅ AI States
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 🧠 AI Call Handler
const handleAI = async (type) => {
  let prompt = "";

  if (type === "summarize") {
    prompt = `Summarize this note: ${content}`;
  } else if (type === "title") {
    prompt = `Give a better title for this note: ${content}`;
  } else if (type === "bullet") {
    prompt = `Convert this note into bullet points: ${content}`;
  }

  setLoading(true);
  const response = await getAIResponse(prompt);
  setAiResult(response);
  setLoading(false);
};


  const applyToNote = () => {
    if (aiResult) {
      // You can adjust this if it was a title improvement
      setContent(aiResult);
      setAiResult("");
    }
  };

  // 📝 Form Submit Handler
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

  // ✨ Reusable Form UI
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
        className="bg-transparent resize-y outline-none placeholder-gray-400 overflow-hidden min-h-[80px]"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ minHeight: "60px" }}
      />

      {/* 🚀 AI Actions Section */}
      <div className="mt-2 space-y-2">
        <h3 className="text-sm text-gray-400 font-semibold">🤖 AI Smart Actions</h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleAI("summarize")}
            className="bg-blue-600 px-3 py-1 text-sm rounded hover:bg-blue-500"
          >
            Summarize
          </button>
          <button
            type="button"
            onClick={() => handleAI("title")}
            className="bg-green-600 px-3 py-1 text-sm rounded hover:bg-green-500"
          >
            Better Title
          </button>
          <button
            type="button"
            onClick={() => handleAI("bullet")}
            className="bg-purple-600 px-3 py-1 text-sm rounded hover:bg-purple-500"
          >
            Bullet Points
          </button>
        </div>

        {loading && <p className="text-gray-400 text-sm mt-1">⏳ Thinking...</p>}

        {aiResult && (
          <div className="bg-[#303134] p-3 rounded mt-2">
            <p className="text-sm whitespace-pre-wrap">{aiResult}</p>
            <button
              type="button"
              onClick={applyToNote}
              className="mt-2 px-3 py-1 bg-white text-black rounded text-sm"
            >
              ✅ Use This
            </button>
          </div>
        )}
      </div>

      {/* 🔧 Footer Buttons */}
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
  // 📱 Full screen on mobile
  <div className="fixed inset-0 z-50 bg-[#202124] text-white p-4 flex flex-col">
    {formUI}
  </div>
) : (
  // 💻 Desktop centered modal
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4 py-10">
    <div
      className="bg-[#202124] text-white w-full max-w-3xl rounded-xl shadow-lg p-4 overflow-y-auto"
      style={{
        maxHeight: "90vh", // allows longer content to fit
      }}
    >
      {formUI}
    </div>
  </div>
);

}
