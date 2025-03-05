import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { Copy, MessageCirclePlus, Pen, Pencil, Trash, Undo2, Undo, Wand, WandSparkles, Rotate3D, RotateCcw, Notebook, NotebookPen } from "lucide-react";
import { Button } from "./button";
import { MouseEventHandler } from "react";
import MarkdownRenderer from "../utils/markdown-renderer";

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
    profile_fallback: string;
    profile_url: string;
    username: string;
    message: string;
    isAssistant:boolean;
}

export default function Message({ profile_fallback, profile_url, username, message, className, isAssistant }: MessageProps) {
    return ( 
        <motion.div
            initial={{ opacity: 0, translateX:-10 }}
            animate={{ opacity: 1, translateX:0 }}
            transition={{ duration: 0.3,delay:isAssistant?0.3:0 }} 
            className={cn("flex items-start gap-3 p-3 rounded-xl w-full overflow-auto", className)}
        >
            <Avatar className="ring-border">
                <AvatarImage src={profile_url} />
                <AvatarFallback>{profile_fallback}</AvatarFallback>
            </Avatar>
            <div className="flex-1 relative w-full">
                <div className="text-xs text-muted-foreground">{username}</div>
                <pre className="mt-1 text-sm text-foreground text-wrap font-sans w-full overflow-hidden">
                    {isAssistant?<MarkdownRenderer content={message} />:<>{message}</>}
                </pre>
                <div className="flex absolute top-0 right-0 gap-2">
                    {isAssistant?
                    <>
                        <Button variant="ghost" className="p-0 h-min hover:bg-transparent opacity-30 hover:opacity-50"><RotateCcw /></Button>
                    </>
                    :
                    <>
                        <Button variant="ghost" className="p-0 h-min hover:bg-transparent opacity-30 hover:opacity-50"><WandSparkles /></Button>
                    </>
                    }
                </div>
            </div>
        </motion.div> 
    );
}