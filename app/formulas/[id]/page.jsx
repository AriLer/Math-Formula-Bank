'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchFormulaById, fetchFormulasByArray } from '@/lib/data/formuals'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Proof from '@/components/Formulas/proof'
import Thumbnail from '@/components/Formulas/thumbnail'
import { Separator } from '@/components/ui/separator'
import { FormulaCard } from '@/components/Formulas/formula-card'
import { Badge } from '@/components/ui/badge'

export default function Page() {
  const params = useParams()
  const { id } = params || {}
  const [formula, setFormula] = useState()
  const [dependencies, setDependencies] = useState()

  useEffect(() => {
    const fetchFormulaData = async () => {
      try {
        const data = await fetchFormulaById(id)
        setFormula({ ...data })
        console.log(data)
      } catch (error) {
        setFormula(error)
      }
    }
    if (id) {
      fetchFormulaData()
    }
  }, [id])

  useEffect(() => {
    const fetchFormulaData = async () => {
      try {
        const data = await fetchFormulasByArray(formula.dependencies)
        setDependencies([...data])
      } catch (error) {
        console.error(error)
        setDependencies([])
      }
    }
    if (formula) {
      fetchFormulaData()
    }
  }, [formula])

  if (!formula) {
    return <FormulaSekeleton />
  }

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-2xl text-accent">{formula.name}</CardTitle>
          <CardDescription>{formula.description}</CardDescription>
        </div>
        <div className="flex flex-wrap gap-2 h-5">
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
      </div>

      {formula && (
        <Thumbnail
          latex={formula.latex}
          className="my-4 w-full mx-auto py-5 text-xl"
        />
      )}

      {formula.proof && (
        <>
          <Separator className="mt-3 mb-6" />
          <h3 className="mt-5 my-3 text-xl font-bold text-accent">הוכחה</h3>
          <Proof data={formula.proof} />
        </>
      )}

      {dependencies && dependencies.length !== 0 && (
        <>
          <Separator className="mt-3 mb-6" />
          <h3 className="mt-5 my-3 text-xl font-bold text-accent">
            קישורים נוספים
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dependencies.map((dep) => (
              <FormulaCard
                key={dep.id}
                formula={dep}
                isSaved={false} // TODO: add save compatibility
                onToggleSave={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
                isDevMode={false} // TOOD: add dev mode
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function FormulaSekeleton() {
  return (
    <>
      <div className="h-full py-13 px-[2.5%] md:px-[2%] flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-4 mb-1">
          <Skeleton className="w-60 h-6" />
          <Skeleton className="w-36 h-4" />
        </div>
      </div>
      <div className="flex w-full h-15 gap-4 justify-center pb-5">
        <Skeleton className="py-2 h-full min-w-28 w-[20%]" />
        <Skeleton className="py-2 h-full min-w-28 w-[20%]" />
      </div>
    </>
  )
}
