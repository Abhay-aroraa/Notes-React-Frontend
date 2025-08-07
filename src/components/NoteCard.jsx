import { useState } from "react";
import { MdDelete, MdArchive, MdUnarchive } from "react-icons/md";
import { FaPalette, FaUserPlus, FaImage } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbtack,
  faThumbtackSlash,
  faTrashRestore,
} from "@fortawesome/free-solid-svg-icons";
import ColorPicker from "./ColorPicker";

export default function NoteCard({
  note,
  onDelete,
  onClick,
  pinNote,
  archieve,
  restoreNote,
  isTrashPage,
  onColorChange,
}) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const toggleColorPicker = (e) => {
    e.stopPropagation(); 
    setIsColorPickerOpen((prev) => !prev);
  };

  return (
    <div

  className="break-inside-avoid group relative text-white p-2 rounded-xl border border-[#3c4043] w-full break-words font-['Inter'] shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col justify-between min-h-[125px]"
      style={{ backgroundColor: note.color || "#202124" }}
      onClick={onClick}
    >
      {/* Pin Icon */}
      {!isTrashPage && (
        <div className="absolute top-3 right-3 z-10">
          {note.pinned ? (
            <FontAwesomeIcon
              icon={faThumbtackSlash}
              style={{ color: "#fff" }}
              className="cursor-pointer"
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
              className="cursor-pointer"
              title="Pin note"
              onClick={(e) => {
                e.stopPropagation();
                pinNote(note.id);
              }}
            />
          )}
        </div>
      )}


      <div>
        {note.title && (
          <h2 className="text-base font-medium mb-2 leading-tight pr-6 line-clamp-1">
  {note.title}
</h2>

        )}
       <p className="text-sm whitespace-pre-wrap leading-snug text-gray-300 line-clamp-3 sm:line-clamp-none">
  {note.content}
</p>

      </div>

      {/* Bottom Icons */}
      <div className="mt-3 flex items-center space-x-4 text-gray-400 text-sm relative">
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
            <div className="relative">
              <FaPalette
                className="hover:text-white cursor-pointer"
                title="Change color"
                onClick={toggleColorPicker}
              />
              {isColorPickerOpen && (
                <div className="absolute bottom-6 left-0 z-20">
                  <ColorPicker
                    currentColor={note.color}
                    onColorSelect={(color) => {
                      onColorChange(note.id, color);
                      setIsColorPickerOpen(false);
                    }}
                  />
                </div>
              )}
            </div>

      

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
              className="hover:text-white cursor-pointer"
              title="Trash"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
