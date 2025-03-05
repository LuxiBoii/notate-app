"use client"
import { useEffect, useRef, useState } from "react"

import { toast } from "sonner"

import { cn } from "@/lib/utils"

import CenterInput from "@/components/center-input"

import { ModeToggle } from "@/components/ui/mode-toggle"

import Message from "@/components/ui/message"

import { Button } from "../button"

import { Plus, Trash } from "lucide-react"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

function ChatComponent() {
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const [input, setInput] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([]);
    const [mode, setMode] = useState<string>("chat")

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
    
        setIsGenerating(true);
        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        
        // Create a placeholder for the assistant's message
        const assistantMessage: Message = { role: 'assistant', content: '' };
        setMessages(prev => [...prev, assistantMessage]);
        
        const currentInput = input;
        setInput('');
    
        try {
            ///api/notate-ai for real ai
            const res = await fetch('/api/notate-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    messages: messages.concat(userMessage),
                    mode
                }),
            });

            //const res = await fetch('/api/simulated-stream', {
            //    method: 'GET',
            //    headers: { 'Content-Type': 'application/json' },
            //})

            if (!res.ok) {
                throw new Error('API request failed');
            }

            const reader = res.body?.getReader();
            if (!reader) throw new Error('No reader available');

            const decoder = new TextDecoder();
            let content = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                content += chunk;

                // Update the assistant's message with the new content
                setMessages(prev => 
                    prev.map((msg, i) => 
                        i === prev.length - 1 ? { ...msg, content } : msg
                    )
                );
            }
        } catch (error) {
            console.error('Request failed:', error);
            toast.error('Failed to send message', {
                description: error instanceof Error ? error.message : 'An unknown error occurred'
            });
            // Remove the placeholder message on error
            setMessages(prev => prev.slice(0, -1));
        } finally {
            setIsGenerating(false);
        }
    };

    const handleReset =  () =>{
        setMessages([]);
    }

    const handleRevert = (index: number) => {
        setMessages(prev => prev.filter((_, i) => i < index));
    }

    return ( 
        <div className="h-dvh w-dvw flex justify-center items-center">
            <div className="relative h-full w-full flex-col flex items-center justify-center">

                <div className="absolute flex right-0 top-0 m-2 space-x-2">
                    {messages.length!=0 &&
                        
                        <Button 
                            variant="outline"
                            onClick={handleReset}
                        >
                            <Plus/>
                            Start new chat
                        </Button>
                    }
                    <ModeToggle />
                </div>

                <div className={cn("overflow-auto space-y-4 w-full py-8 px-4 scroll-smooth",messages.length!=0&&"flex-1 border-b" )}>
                    <div className="max-w-full w-3xl m-auto space-y-2">
                        {messages.map((msg, i) => (
                            <Message 
                                key={i} 
                                profile_fallback={msg.role=="assistant"?"NO":"YOU"} 
                                profile_url={msg.role=="assistant"?"/notate-ai-profile-pic.svg":"/default-profile-pic.svg"} 
                                username={msg.role=="assistant"?"Notate AI":"You"} 
                                message={msg.content} 
                                isAssistant={msg.role=="assistant"}
                                className={cn(msg.role!=="assistant" ? "bg-muted dark:bg-muted/25":"border border-border/50")}
                                //handleRevert={() => handleRevert(i)}
                            />
                        ))}
                    </div>
                </div>

                <CenterInput handleReset={handleReset} mode={mode} setMode={setMode} input={input} setInput={setInput} sendMessage={sendMessage} isGenerating={isGenerating} isShowingMessages={messages.length!=0}/>
            </div>
        </div>
     );
}

export default ChatComponent;