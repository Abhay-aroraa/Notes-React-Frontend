import NoteCard from "../components/NoteCard";

export default function NoteList({
  notes,
  onDelete,
  onNoteClick,
  pinNotes,
  archieveNote,
  restoreNote,       // ✅ Add this
  isTrashPage = false // ✅ Add this with default value
}) {
  if (!Array.isArray(notes)) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-4 max-w-screen-xl mx-auto">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          restoreNote={restoreNote}
          pinNote={pinNotes}
          archieve={archieveNote}
          onClick={() => onNoteClick(note)}
          isTrashPage={isTrashPage}
        />
      ))}
    </div>
  );
}
