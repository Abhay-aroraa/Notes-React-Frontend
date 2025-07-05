import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="group relative bg-[#202124] text-white p-5 rounded-xl border border-[#3c4043] min-h-[104px] w-full break-words font-['Inter'] shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Title */}
      {note.title && (
        <h2 className="text-base font-medium mb-2 leading-tight">
          {note.title}
        </h2>
      )}

      {/* Content */}
      <p className="text-sm whitespace-pre-wrap leading-snug text-gray-300">
        {note.content}
      </p>

      {/* Actions */}
      <div className="absolute bottom-3 right-3 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onDelete(note.id)}
          className="text-gray-300 hover:text-gray-400 transition"
          title="Delete"
        >
          <MdDelete className="text-xl" />
        </button>
        <button title="More options" className="text-gray-300 hover:text-gray-400">
          <HiDotsVertical className="text-xl" />
        </button>
      </div>
    </div>
  );
}
