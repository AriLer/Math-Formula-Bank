import { Heart, Edit2, Trash2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import Link from 'next/link'
import Thumbnail from '@/components/Formulas/thumbnail'

export function FormulaCard({
  formula,
  isSaved,
  onToggleSave,
  onEdit,
  onDelete,
  isDevMode,
}) {
  const cardContent = (
    <Link prefetch={false} href={`/formulas/${formula.id}`}>
      <Card className="hover:shadow-lg transition-shadow h-full">
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-lg text-accent">
              {formula.name}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleSave(formula.id)}
              className={
                isSaved
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-muted-foreground hover:text-red-500'
              }
            >
              <Heart
                className="h-5 w-5"
                fill={isSaved ? 'currentColor' : 'none'}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Thumbnail latex={formula.latex} />
          <CardDescription className="text-foreground">
            {formula.description}
          </CardDescription>

          <div className="flex flex-wrap gap-2">
            {formula.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="font-normal bg-primary/30"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {isDevMode && (
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                מצב מפתח: לחץ לחיצה ימנית לעריכה
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )

  if (isDevMode && onEdit && onDelete) {
    return (
      <ContextMenu>
        <ContextMenuTrigger>{cardContent}</ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem onClick={() => onEdit(formula)} className="gap-2">
            <Edit2 className="h-4 w-4 text-blue-600" />
            <span>ערוך נוסחה</span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => onDelete(formula.id)}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
            <span>מחק נוסחה</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
  }

  return cardContent
}
