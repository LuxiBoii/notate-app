"use client"
import { cn } from "@/lib/utils"

import { ArrowUp, LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

import { AutoResizeTextarea } from "./ui/autoresize-textarea"

import { MouseEventHandler, useState } from "react"

import MinimalDropdown from "./ui/minimal-dropdown"
  

interface ChatInputAreaProps {
    sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
    input: string;
    setInput: (value: string) => void;
    isGenerating: boolean;
    isShowingMessages: boolean;
    mode:string;
    setMode:(value:string)=>void;
    handleReset:MouseEventHandler;
}

function ChatInputArea({sendMessage, input, setInput, isGenerating, isShowingMessages, mode, setMode, handleReset}: ChatInputAreaProps) {
    
    const [wordAmount, setWordAmount] = useState("50 words")
    const wordCountOptions = [
        { label: "50 words", isPro: false },
        { label: "120 words", isPro: false },
        { label: "250 words", isPro: true },
        { label: "500 words", isPro: true },
        { label: "No limit", isPro: true },
      ]
    
    const [model, setModel] = useState("Gemini 2.0 Flash")
    const modelOptions = [
        { label: "Gemini 2.0 Flash", isPro: false },
        { label: "gpt-4o", isPro: true },
        { label: "Claude 3.5 sonnet", isPro: true },
    ]
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault()
          sendMessage(e as unknown as React.FormEvent<HTMLFormElement>)
        }
    }

    return ( 
        <div className={cn("flex items-center justify-center space-x-2 mb-8",isShowingMessages && "pt-5 px-2 w-2xl max-w-full")}>
            <form
                onSubmit={sendMessage}
                className="w-full"
            >
                <div className={cn("relative w-md h-fit m-0",isShowingMessages && "w-full")}>
                    <div className="rounded-2xl border py-4 pl-5 pr-14 w-full max-h-40 m-0 dark:bg-neutral-900 focus-visible:shadow-md focus-visible:border-border focus-visible:ring-0 dark:focus-visible:ring-1 dark:focus-visible:ring-border dark:focus-visible:inset-shadow-sm text-sm">
                        <AutoResizeTextarea
                            value={input} 
                            onKeyDown={handleKeyDown}
                            onChange={(v) => setInput(v)}
                            disabled={isGenerating}
                            placeholder={!isGenerating?"What's something on your mind?":"Generating your notes..." }
                            className="!bg-none !border-0 focus-visible:ring-0 rounded-none focus-visible:shadow-none shadow-none p-0 m-0 font-medium w-full leading-[22px] max-sm:text-[16px] bg-transparent placeholder:text-gray-400 scrollbar-hide"
                        />

                        <div className="space-x-4 flex w-full mt-3">
                        <div className="space-x-1">
                                <MinimalDropdown options={modelOptions} onChange={setModel} selectedValue={model}/>
                            </div>
                            <div className="space-x-1">
                                <MinimalDropdown options={wordCountOptions} onChange={setWordAmount} selectedValue={wordAmount}/>
                            </div>
                        </div>
                    </div>

                    <Button 
                        disabled={isGenerating}
                        type="submit"
                        className="absolute right-2 bottom-2 flex items-center justify-center w-12 h-12 rounded-full p-4 size-5"
                    >
                        {isGenerating?<LoaderCircle className="animate-spin" strokeWidth={2.5} size={10}/>:<ArrowUp strokeWidth={2.5} size={10}/>}
                    </Button>
                </div>
            </form>
        </div>
     );
}

export default ChatInputArea;