import { Plus, StickyNote } from 'lucide-react'

export default function Header({ onNew }) {
  return (
    <header className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 text-white">
          <StickyNote size={18} />
        </div>
        <div>
          <h1 className="font-semibold">QuickNotes</h1>
          <p className="text-xs text-neutral-500">Capture, organize, and find your thoughts</p>
        </div>
      </div>
      <button
        onClick={onNew}
        className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800 active:scale-[0.98]"
      >
        <Plus size={16} /> New note
      </button>
    </header>
  )
}
