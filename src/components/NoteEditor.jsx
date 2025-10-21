import { useEffect, useRef } from 'react'

export default function NoteEditor({ note, onChange }) {
  const titleRef = useRef(null)

  useEffect(() => {
    if (note && titleRef.current) {
      titleRef.current.focus()
      titleRef.current.select()
    }
  }, [note?.id])

  if (!note) {
    return (
      <div className="flex h-[70vh] items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-white">
        <div className="px-8 text-center">
          <h2 className="text-lg font-semibold">Select a note to view and edit</h2>
          <p className="mt-1 text-sm text-neutral-500">Or create a new one from the top-right button</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
      <input
        ref={titleRef}
        value={note.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="Title"
        className="w-full rounded-md border-0 px-1 text-xl font-semibold outline-none ring-0 placeholder:text-neutral-400 focus:outline-none"
      />
      <textarea
        value={note.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Start typing..."
        className="mt-3 h-[60vh] w-full resize-none rounded-md border border-neutral-200 bg-neutral-50/60 p-3 text-sm outline-none focus:border-neutral-300"
      />
      <div className="mt-2 text-right text-xs text-neutral-400">
        Last edited {new Date(note.updatedAt).toLocaleString()}
      </div>
    </div>
  )
}
