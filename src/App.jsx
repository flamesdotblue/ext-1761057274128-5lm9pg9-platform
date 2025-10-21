import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import NotesList from './components/NotesList'
import NoteEditor from './components/NoteEditor'

const STORAGE_KEY = 'notes.v1'

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function App() {
  const [notes, setNotes] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setNotes(parsed)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    } catch {}
  }, [notes])

  const selectedNote = useMemo(() => notes.find(n => n.id === selectedId) || null, [notes, selectedId])

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = q
      ? notes.filter(n => (n.title + ' ' + n.content).toLowerCase().includes(q))
      : notes
    return list
      .slice()
      .sort((a, b) => {
        if (a.favorite && !b.favorite) return -1
        if (!a.favorite && b.favorite) return 1
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      })
  }, [notes, query])

  function createNote() {
    const now = new Date().toISOString()
    const newNote = {
      id: generateId(),
      title: 'Untitled',
      content: '',
      favorite: false,
      createdAt: now,
      updatedAt: now,
    }
    setNotes(prev => [newNote, ...prev])
    setSelectedId(newNote.id)
  }

  function deleteNote(id) {
    setNotes(prev => prev.filter(n => n.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  function toggleFavorite(id) {
    setNotes(prev => prev.map(n => (n.id === id ? { ...n, favorite: !n.favorite, updatedAt: new Date().toISOString() } : n)))
  }

  function updateNote(id, patch) {
    setNotes(prev => prev.map(n => (n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n)))
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Header onNew={createNote} />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <aside className="md:col-span-1 lg:col-span-1">
            <SearchBar value={query} onChange={setQuery} />
            <div className="mt-3">
              <NotesList
                notes={filteredNotes}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onDelete={deleteNote}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          </aside>
          <main className="md:col-span-2 lg:col-span-3">
            <NoteEditor
              note={selectedNote}
              onChange={(patch) => selectedNote && updateNote(selectedNote.id, patch)}
            />
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
