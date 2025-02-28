"use client"
import { useRef, useState } from "react"

import { ArrowUp, LoaderCircle } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function CenterInput() {
    const input_ref = useRef<HTMLFormElement>(null)
    const [isGenerating, setIsGenerating] = useState<boolean>(false)

    return ( 
        <div className="flex w-full max-w-sm items-center space-x-2">
            <form 
                className="relative" 
                ref={input_ref}
                onSubmit={(e) => {
                    e.preventDefault()
                    e.currentTarget.reset()
                    setIsGenerating(true)
                    toast("Generated new notes.",
                        {
                            action: {
                                label: "Undo",
                                onClick: () => 
                                    {
                                        setIsGenerating(false)
                                    },
                            }
                        })}}
            >
                <Input 
                    disabled={isGenerating}
                    type="text" 
                    placeholder={!isGenerating?"What's something on your mind?":"Generating your notes..." }
                    className="rounded-full p-6 w-96 dark:bg-neutral-900 focus-visible:ring-neutral-500/50"
                />

                <Button 
                    disabled={isGenerating}
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full p-4 size-10"
                >
                    {isGenerating?<LoaderCircle className="animate-spin" strokeWidth={2.5} size={10}/>:<ArrowUp strokeWidth={2.5} size={10}/>}
                </Button>
            </form>
        </div>
     );
}

export default CenterInput;