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
    <div className="px-4 py-4 max-w-screen-xl mx-auto">
   <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

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

