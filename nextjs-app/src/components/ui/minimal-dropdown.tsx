"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface WordCountOption {
  label: string
  isPro: boolean
}

interface MinimalDropdownProps {
  onChange?: (value: string) => void
  options: WordCountOption[]
  selectedValue: string
}

export default function MinimalDropdown({ onChange, options, selectedValue }: MinimalDropdownProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (option: string) => {
    setOpen(false)
    onChange?.(option)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="!bg-transparent h-fit flex !p-0 items-center gap-1 !text-gray-400 font-medium focus-visible:ring-0 focus-visible:text-gray-700">
          {selectedValue} <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.label}
            className="flex items-center justify-between py-2"
            onClick={() => handleSelect(option.label)}
          >
            <span>{option.label}</span>
            <div className="flex items-center gap-2">
              {option.isPro && <span className="text-[#3B6C75] font-bold">Pro</span>}
              {option.label === selectedValue && <Check className="h-4 w-4 text-gray-300" strokeWidth={3}/>}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}