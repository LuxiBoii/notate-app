import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
  text: string
}

export function Badge({ icon: Icon, text, className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-primary/20 bg-background dark:bg-primary/5 px-3 py-1 text-sm text-primary shadow-xs",
        className
      )}
      {...props}
    >
      <Icon className="mr-1 h-3.5 w-3.5" />
      <span>{text}</span>
    </div>
  )
} 