import { MdDelete, MdArchive, MdUnarchive } from "react-icons/md";
import {
  FaPalette,
  FaUserPlus,
  FaImage,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbtack,
  faThumbtackSlash,
  faTrashRestore,
} from "@fortawesome/free-solid-svg-icons";

export default function NoteCard({
  note,
  onDelete,
  onClick,
  pinNote,
  archieve,
  restoreNote,
  isTrashPage,
}) {
  return (
    <div
      className="group relative bg-[#202124] text-white p-2 rounded-xl border border-[#3c4043] min-h-[116px] w-full break-words font-['Inter'] shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col justify-between"
    >
      {/* Pin Icon (if not in trash) */}
      {!isTrashPage && (
        <div className="absolute top-3 right-3 transition-opacity duration-200 z-10">
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
      )}

      {/* Title & Content */}
      <div onClick={onClick}>
        {note.title && (
          <h2 className="text-base font-medium mb-2 leading-tight pr-6">
            {note.title}
          </h2>
        )}
        <p className="text-sm whitespace-pre-wrap leading-snug text-gray-300">
          {note.content}
        </p>
      </div>

      {/* Bottom Icons */}
      <div className="mt-3 flex items-center space-x-4 text-gray-400 text-sm">
        {/* Trash Mode Buttons */}
        {isTrashPage ? (
          <>
            <FontAwesomeIcon
              icon={faTrashRestore}
              className="hover:text-white cursor-pointer"
              title="Restore"
              onClick={(e) => {
                e.stopPropagation();
                restoreNote(note.id);
              }}
            />
            <MdDelete
              className="hover:text-white cursor-pointer"
              title="Delete Forever"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
            />
          </>
        ) : (
          <>
            <FaPalette className="hover:text-white cursor-pointer" title="Change color" />
            <FaUserPlus className="hover:text-white cursor-pointer" title="Collaborator" />
            <FaImage className="hover:text-white cursor-pointer" title="Add image" />

            {note.archieve ? (
              <MdUnarchive
                className="hover:text-white cursor-pointer"
                title="Unarchive"
                onClick={(e) => {
                  e.stopPropagation();
                  archieve(note.id);
                }}
              />
            ) : (
              <MdArchive
                className="hover:text-white cursor-pointer"
                title="Archive"
                onClick={(e) => {
                  e.stopPropagation();
                  archieve(note.id);
                }}
              />
            )}

            <MdDelete
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              className="hover:text-white cursor-pointer text-base"
              title="Trash"
            />
          </>
        )}
      </div>
    </div>
  );
}
