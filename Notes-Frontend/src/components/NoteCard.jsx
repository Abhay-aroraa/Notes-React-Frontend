import { MdDelete } from "react-icons/md";
import {
  FaPalette,
  FaBell,
  FaUserPlus,
  FaImage,
  FaEllipsisV,

} from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faThumbtackSlash } from '@fortawesome/free-solid-svg-icons';

export default function NoteCard({ note, onDelete, onClick, pinNote }) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-[#202124] text-white p-5 rounded-xl border border-[#3c4043] min-h-[116px] w-full break-words font-['Inter'] shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col justify-between"
    >


      <div className="absolute top-3 right-3  transition-opacity duration-200 z-10">
        {note.pinned ? (
          <FontAwesomeIcon
            icon={faThumbtackSlash}
            style={{ color: "#fff" }}
            className="cursor-pointer hover:text-white"
            title="Unpin note"
            onClick={(e) => {
              e.stopPropagation();
              pinNote(note.id);
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faThumbtack}
            style={{ color: "#9ca3af" }}
            className="cursor-pointer hover:text-white"
            title="Pin note"
            onClick={(e) => {
              e.stopPropagation();
              pinNote(note.id);
            }}
          />
        )}
      </div>



      {/* Title and content */}
      <div>
        {note.title && (
          <h2 className="text-base font-medium mb-2 leading-tight pr-6">
            {note.title}
          </h2>
        )}
        <p className="text-sm whitespace-pre-wrap leading-snug text-gray-300">
          {note.content}
        </p>
      </div>

      {/* Bottom icons - only on hover */}
      <div className="mt-3 flex items-center space-x-4 text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <FaPalette className="hover:text-white cursor-pointer" title="Change color" />
        <FaBell className="hover:text-white cursor-pointer" title="Remind me" />
        <FaUserPlus className="hover:text-white cursor-pointer" title="Collaborator" />
        <FaImage className="hover:text-white cursor-pointer" title="Add image" />
        <FaEllipsisV className="hover:text-white cursor-pointer" title="More options" />
        <MdDelete
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="hover:text-white cursor-pointer text-base"
          title="Delete note"
        />
      </div>
    </div>
  );
}
