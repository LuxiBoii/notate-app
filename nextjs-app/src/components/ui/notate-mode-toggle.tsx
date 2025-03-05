"use client"

import { useState } from "react"
import { Calendar, MessageCircleMore, NotebookPen, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NotateModeToggleProps {
  mode: string;
  setMode: (value:string)=>void;
}

export default function NotateModeToggle({mode, setMode}:NotateModeToggleProps) {

  const options = [
    { id: "chat", label: "Chat", icon: MessageCircleMore },
    { id: "notes", label: "Notes", icon: NotebookPen },
    { id: "calender", label: "Calender", icon: Calendar },
  ]

  return (
    <>
      {options.map((option) => {
        const Icon = option.icon
        const isSelected = mode === option.id

        return (
          <Button
            key={option.id}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setMode(option.id)}
            aria-pressed={isSelected}
            className={cn("cursor-pointer px-3 group rounded-full",isSelected && "bg-muted")}
          >
            <div className={cn("group-hover:opacity-60 flex",isSelected && "opacity-60")}>
                <Icon className="h-4 w-4 mr-1" />
                {option.label}
            </div>
          </Button>
        )
      })}
    </>
  )
}