import NoteCard from "../components/NoteCard"
export default function NoteList({ notes,onDelete }) {
  if (!Array.isArray(notes)) return null; // or return a loader/error

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-6">
      {notes.map((note) => (
        <NoteCard key={note._id || note.id} note={note}   onDelete={onDelete } />
      ))}
    </div>
  );
}
