import NoteCard from "../components/NoteCard"
export default function NoteList({ notes, onDelete, onNoteClick }) {
  if (!Array.isArray(notes)) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-6">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          onClick={() => onNoteClick(note)} // 👈 pass click handler
        />
      ))}
    </div>
  );
}
