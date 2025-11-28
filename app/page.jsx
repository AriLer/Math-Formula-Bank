'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  Search,
  X,
  Plus,
  Moon,
  Sun,
  BookMarked,
  Library,
  Code,
} from 'lucide-react'
import { FormulaCard } from '@/components/formula-card'
import { AddFormulaDialog } from '@/components/add-formula-dialog'
import { EditFormulaDialog } from '@/components/edit-formula-dialog'
import { formulas as defaultFormulas } from '@/data/formulas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import './globals.css'
import 'katex/dist/katex.min.css'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [devMode, setDevMode] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState('all')
  const [customFormulas, setCustomFormulas] = useState([])
  const [editedDefaultFormulas, setEditedDefaultFormulas] = useState([])
  const [savedFormulaIds, setSavedFormulaIds] = useState([])
  const [nextId, setNextId] = useState(16)
  const [formulaToEdit, setFormulaToEdit] = useState(null)

  // Load from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }

    const savedDevMode = localStorage.getItem('devMode')
    if (savedDevMode) {
      setDevMode(JSON.parse(savedDevMode))
    }

    const savedCustomFormulas = localStorage.getItem('customFormulas')
    if (savedCustomFormulas) {
      setCustomFormulas(JSON.parse(savedCustomFormulas))
    }

    const savedEditedFormulas = localStorage.getItem('editedDefaultFormulas')
    if (savedEditedFormulas) {
      setEditedDefaultFormulas(JSON.parse(savedEditedFormulas))
    }

    const savedIds = localStorage.getItem('savedFormulaIds')
    if (savedIds) {
      setSavedFormulaIds(JSON.parse(savedIds))
    }

    const savedNextId = localStorage.getItem('nextFormulaId')
    if (savedNextId) {
      setNextId(JSON.parse(savedNextId))
    }
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('devMode', JSON.stringify(devMode))
  }, [devMode])

  useEffect(() => {
    localStorage.setItem('customFormulas', JSON.stringify(customFormulas))
  }, [customFormulas])

  useEffect(() => {
    localStorage.setItem(
      'editedDefaultFormulas',
      JSON.stringify(editedDefaultFormulas)
    )
  }, [editedDefaultFormulas])

  useEffect(() => {
    localStorage.setItem('savedFormulaIds', JSON.stringify(savedFormulaIds))
  }, [savedFormulaIds])

  useEffect(() => {
    localStorage.setItem('nextFormulaId', JSON.stringify(nextId))
  }, [nextId])

  // Combine default and custom formulas
  const allFormulas = useMemo(() => {
    const editedIds = new Set(editedDefaultFormulas.map((f) => f.id))
    const uneditedDefaults = defaultFormulas.filter((f) => !editedIds.has(f.id))
    return [...uneditedDefaults, ...editedDefaultFormulas, ...customFormulas]
  }, [customFormulas, editedDefaultFormulas])

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set()
    allFormulas.forEach((formula) => {
      formula.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [allFormulas])

  // Filter formulas
  const filteredFormulas = useMemo(() => {
    let formulasToFilter = allFormulas

    if (viewMode === 'saved') {
      formulasToFilter = allFormulas.filter((f) =>
        savedFormulaIds.includes(f.id)
      )
    }

    return formulasToFilter.filter((formula) => {
      const matchesSearch =
        searchQuery === '' ||
        formula.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formula.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formula.latex.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => formula.tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [searchQuery, selectedTags, allFormulas, viewMode, savedFormulaIds])

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
  }

  const handleAddFormula = (formula) => {
    const newFormula = {
      ...formula,
      id: nextId,
    }
    setCustomFormulas([...customFormulas, newFormula])
    setNextId(nextId + 1)
  }

  const handleEditFormula = (formula) => {
    const isCustom = customFormulas.some((f) => f.id === formula.id)
    const isEditedDefault = editedDefaultFormulas.some(
      (f) => f.id === formula.id
    )
    const isOriginalDefault = defaultFormulas.some((f) => f.id === formula.id)

    if (isCustom) {
      setCustomFormulas(
        customFormulas.map((f) => (f.id === formula.id ? formula : f))
      )
    } else if (isEditedDefault) {
      setEditedDefaultFormulas(
        editedDefaultFormulas.map((f) => (f.id === formula.id ? formula : f))
      )
    } else if (isOriginalDefault) {
      setEditedDefaultFormulas([...editedDefaultFormulas, formula])
    }
  }

  const handleDeleteFormula = (formulaId) => {
    const isDefault = defaultFormulas.some((f) => f.id === formulaId)

    if (isDefault) {
      alert('לא ניתן למחוק נוסחאות ברירת מחדל. ניתן רק לערוך אותן.')
      return
    }

    if (window.confirm('האם אתה בטוח שברצונך למחוק נוסחה זו?')) {
      setCustomFormulas(customFormulas.filter((f) => f.id !== formulaId))
      setEditedDefaultFormulas(
        editedDefaultFormulas.filter((f) => f.id !== formulaId)
      )
      setSavedFormulaIds(savedFormulaIds.filter((id) => id !== formulaId))
    }
  }

  const toggleSaveFormula = (id) => {
    setSavedFormulaIds((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    )
  }

  const handleEditFromCard = (formula) => {
    setFormulaToEdit(formula)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="page-gradient min-h-screen flex flex-col" dir="rtl">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant={devMode ? 'default' : 'outline'}
              size="icon"
              onClick={() => setDevMode(!devMode)}
              className={`rounded-full ${
                devMode ? 'bg-green-600 hover:bg-green-700' : ''
              }`}
            >
              <Code className="h-5 w-5" />
            </Button>
          </div>
          <h1 className="font-bold text-[#8EC5FF] text-3xl mb-2">
            מאגר נוסחאות מתמטיות
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            חפש נוסחאות לפי שם, תוכן או תגיות
          </p>
          {devMode && (
            <p className="text-green-600 dark:text-green-400 mt-2">
              מצב מפתח פעיל - לחץ לחיצה ימנית על נוסחה לעריכה או מחיקה
            </p>
          )}
        </div>

        {/* View Mode Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={viewMode === 'all' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setViewMode('all')}
          >
            <Library className="h-5 w-5" />
            כל הנוסחאות ({allFormulas.length})
          </Button>
          <Button
            variant={viewMode === 'saved' ? 'default' : 'outline'}
            className="flex-1 gap-2"
            onClick={() => setViewMode('saved')}
          >
            <BookMarked className="h-5 w-5" />
            נוסחאות שמורות ({savedFormulaIds.length})
          </Button>
        </div>

        {/* Add Formula Button */}
        <div className="mb-6">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-5 w-5" />
            הוסף נוסחה חדשה
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="p-6 mb-6">
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="חפש נוסחה..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-secondary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          </div>

          {/* Tag Filters */}
          <div>
            <h4 className="mb-3">סינון לפי תגיות:</h4>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => toggleTag(tag)}
                  className="rounded-full font-normal"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedTags.length > 0) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="mt-4 gap-2 text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4" />
              נקה סינונים
            </Button>
          )}
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-foreground">
            נמצאו {filteredFormulas.length} נוסחאות
          </p>
        </div>

        {/* Formula Grid */}
        {filteredFormulas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFormulas.map((formula) => (
              <FormulaCard
                key={formula.id}
                formula={formula}
                isSaved={savedFormulaIds.includes(formula.id)}
                onToggleSave={toggleSaveFormula}
                onEdit={handleEditFromCard}
                onDelete={handleDeleteFormula}
                isDevMode={devMode}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              {viewMode === 'saved'
                ? 'אין נוסחאות שמורות'
                : 'לא נמצאו נוסחאות התואמות את החיפוש'}
            </p>
          </Card>
        )}
      </div>

      {/* Dialogs */}
      <AddFormulaDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddFormula}
      />
      <EditFormulaDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleEditFormula}
        formula={formulaToEdit}
      />
    </div>
  )
}
