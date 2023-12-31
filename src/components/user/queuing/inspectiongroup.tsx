import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

export interface InspectionGroupProps {
  groupName: string
  teams: string[]
}

export default function InspectionGroup(props: InspectionGroupProps) {
  return (
    <div>
      <AccordionItem value={props.groupName}>
        <AccordionTrigger>
          {props.groupName}
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {
              props.teams.map( (team: string) => {
                return <li>{team}</li>
              })
            }
          </ul>
        </AccordionContent>
      </AccordionItem>
    </div>
  )
}