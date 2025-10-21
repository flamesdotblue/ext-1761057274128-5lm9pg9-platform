import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
        <Search size={16} />
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search notes..."
        className="w-full rounded-lg border border-neutral-200 bg-white px-9 py-2 text-sm outline-none ring-0 placeholder:text-neutral-400 focus:border-neutral-300 focus:shadow-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 mr-2 inline-flex items-center rounded px-2 text-neutral-400 hover:text-neutral-600"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
