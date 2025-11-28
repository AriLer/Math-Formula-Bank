import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'

export function EditFormulaDialog({ open, onOpenChange, onSave, formula }) {
  const [name, setName] = useState('')
  const [latex, setLatex] = useState('')
  const [description, setDescription] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])

  useEffect(() => {
    if (formula) {
      setName(formula.name)
      setLatex(formula.latex)
      setDescription(formula.description)
      setTags(formula.tags)
    }
  }, [formula])

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formula && name && latex && description) {
      onSave({
        id: formula.id,
        name,
        latex,
        description,
        tags,
      })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ערוך נוסחה</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">שם הנוסחה</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">נוסחה (LaTeX)</label>
            <Input
              value={latex}
              onChange={(e) => setLatex(e.target.value)}
              className="font-mono"
              placeholder="a^2 + b^2 = c^2"
              required
            />
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm text-muted-foreground mb-1">
                תצוגה מקדימה:
              </p>
              <code className="font-mono">{latex || 'הכנס נוסחה...'}</code>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">תיאור</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">תגיות</label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                placeholder="הוסף תגית..."
              />
              <Button type="button" onClick={handleAddTag} variant="secondary">
                <Plus className="h-4 w-4 ml-2" />
                הוסף
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              ביטול
            </Button>
            <Button type="submit">שמור שינויים</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
