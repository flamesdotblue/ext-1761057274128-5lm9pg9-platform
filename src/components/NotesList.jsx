import { Star, Trash2 } from 'lucide-react'

function NoteRow({ note, selected, onSelect, onDelete, onToggleFavorite }) {
  const date = new Date(note.updatedAt)
  const when = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' • ' +
    date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

  return (
    <div
      onClick={() => onSelect(note.id)}
      className={`group relative cursor-pointer rounded-lg border p-3 transition ${
        selected ? 'border-blue-300 bg-blue-50/60' : 'border-neutral-200 bg-white hover:bg-neutral-50'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-medium">{note.title || 'Untitled'}</p>
            {note.favorite && (
              <Star size={14} className="shrink-0 fill-yellow-400 text-yellow-500" />
            )}
          </div>
          <p className="line-clamp-2 pr-6 text-xs text-neutral-500">{note.content || 'No content'}</p>
        </div>
        <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(note.id) }}
            title={note.favorite ? 'Unfavorite' : 'Favorite'}
            className={`rounded p-1 hover:bg-neutral-100 ${note.favorite ? 'text-yellow-600' : 'text-neutral-500'}`}
          >
            <Star size={16} className={note.favorite ? 'fill-yellow-400' : ''} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(note.id) }}
            title="Delete"
            className="rounded p-1 text-neutral-500 hover:bg-neutral-100 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="mt-2 text-[11px] text-neutral-400">{when}</div>
    </div>
  )
}

export default function NotesList({ notes, selectedId, onSelect, onDelete, onToggleFavorite }) {
  if (!notes.length) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-6 text-center text-sm text-neutral-500">
        No notes yet. Click "New note" to get started.
      </div>
    )
  }

  return (
    <div className="flex max-h-[70vh] flex-col gap-2 overflow-auto pr-1">
      {notes.map((n) => (
        <NoteRow
          key={n.id}
          note={n}
          selected={n.id === selectedId}
          onSelect={onSelect}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
