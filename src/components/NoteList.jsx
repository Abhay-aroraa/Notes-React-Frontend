import NoteCard from "../components/NoteCard";

export default function NoteList({
  notes,
  onDelete,
  onNoteClick,
  pinNotes,
  archieveNote,
  restoreNote,
  handleColorChange,
  isTrashPage = false,
}) {
  if (!Array.isArray(notes)) return null;

  return (
    <div className="  max-w-screen-xl mx-auto">
      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            restoreNote={restoreNote}
            pinNote={pinNotes}
            archieve={archieveNote}
            onColorChange={handleColorChange}
            isTrashPage={isTrashPage}
            onClick={() => onNoteClick(note)}
          />
        ))}
      </div>
    </div>
  );
}

