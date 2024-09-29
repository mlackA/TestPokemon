import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface Props {
  children: React.ReactNode
  label?: string,
  width?:number,
  height?:number
  description?: string
}


export function CardWithForm({ label, description, children,width=350,height }: Props) {
  
  return (
    <Card className={`w-[${width}px] h-[${height}px]`}>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>{description && description}</CardDescription>
      </CardHeader>
      <CardContent>
        
          {children}
          
        
      </CardContent>

    </Card>
  )
}