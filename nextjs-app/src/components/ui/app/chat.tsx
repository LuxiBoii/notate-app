"use client"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import Cookies from 'js-cookie'
import { cn } from "@/lib/utils"
import ChatInputArea from "@/components/chat-input-area"
import { ModeToggle } from "@/components/ui/mode-toggle"
import Message from "@/components/ui/message"
import { Button } from "../button"
import { Plus } from "lucide-react"

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

function ChatComponent() {
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const [input, setInput] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([])
    const [mode, setMode] = useState<string>("chat")

    // Load messages from cookies on mount
    useEffect(() => {
        const savedMessages = Cookies.get('chat_messages');
        if (savedMessages) {
            try {
                setMessages(JSON.parse(savedMessages));
            } catch (e) {
                console.error('Failed to parse saved messages');
            }
        }
    }, []);

    // Save messages to cookies whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            Cookies.set('chat_messages', JSON.stringify(messages), { expires: 7 }); // Expires in 7 days
        } else {
            Cookies.remove('chat_messages');
        }
    }, [messages]);

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

            const res = await fetch('/api/notate-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    messages,
                    mode
                }),
            });

            if (!res.ok) {
                console.error(res.json)
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

    const handleReset = () => {
        setMessages([]);
    }

    const handleRevert = (index: number) => {
        setMessages(prev => prev.filter((_, i) => i < index));
    }

    return ( 
        <div className="h-dvh w-dvw flex justify-center items-center">
            <div className="relative h-full w-full flex-col flex items-center justify-center">

                <div className="absolute flex right-0 bottom-0 m-2 space-x-2">
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
                    <div className="w-full m-auto space-y-2">
                        {messages.map((msg, i) => {
                            const isAssistant = msg.role === "assistant"
                            return(
                                <Message 
                                    key={i}
                                    profile_url={!isAssistant ? "/default-profile-pic.svg" : undefined} 
                                    username={isAssistant ? "Notate AI" : "You"} 
                                    message={msg.content} 
                                    isAssistant={isAssistant}
                                />
                            )
                        })}
                    </div>
                </div>

                <ChatInputArea 
                    handleReset={handleReset} 
                    mode={mode} 
                    setMode={setMode} 
                    input={input} 
                    setInput={setInput} 
                    sendMessage={sendMessage} 
                    isGenerating={isGenerating} 
                    isShowingMessages={messages.length!=0}
                />
            </div>
        </div>
     );
}

export default ChatComponent;