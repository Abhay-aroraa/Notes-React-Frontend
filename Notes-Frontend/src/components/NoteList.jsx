import NoteCard from "../components/NoteCard"
export default function NoteList({ notes, onDelete, onNoteClick, pinNotes,archieveNote }) {
  if (!Array.isArray(notes)) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 py-6">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          pinNote={pinNotes}
          archieve= {archieveNote}
          onClick={() => onNoteClick(note)}
        />
      ))}
    </div>
  );
}
