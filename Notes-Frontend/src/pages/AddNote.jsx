import { useState } from "react";

export default function AddNotePopup({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() || content.trim()) {
      onAdd({ title, content });
      setTitle("");
      setContent("");
    }

    
  };

    const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleSubmit(e);
    }
}

  return (
    <div className="fixed inset-0 bg-[#171717] bg-opacity-60 z-40 flex items-center justify-center">
      <div className="bg-[#222222] text-white p-5 rounded-lg w-[95%] max-w-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            className="bg-[#363636] p-3 rounded outline-none"
            value={title}
      
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <textarea
            placeholder="Take a note..."
            rows={3}
            required
            className="bg-[#363636] p-3 rounded outline-none resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
