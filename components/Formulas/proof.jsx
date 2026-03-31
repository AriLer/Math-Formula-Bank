import React from 'react'
import TeX from '@matejmazur/react-katex'
import { parseMath } from '@/lib/utils'

export default function Proof({ data }) {
  return (
    <div className="flex flex-col gap-3 relative pb-5">
      {data.map((p, idx) => (
        <Paragraph key={`paragaph-${idx}`} data={p} />
      ))}
      <div className="h-4 w-4 bg-foreground absolute bottom-0 left-[10%]"></div>
    </div>
  )
}

export function Paragraph({ data }) {
  if (data.type === 'paragraph') {
    return <div>{parseMath(data.content)}</div>
  } else if (data.type === 'step') {
    return (
      <div>
        {data.title && <h2 className="font-bold text-lg">{data.title}</h2>}
        {data.content && <p>{parseMath(data.content)}</p>}
      </div>
    )
  } else if (data.type === 'equation') {
    return (
      <div
        style={{ direction: 'ltr' }}
        className="text-foreground ltr p-4 rounded-md overflow-x-auto text-center"
      >
        <TeX math={data.latex} />
      </div>
    )
  }
}
