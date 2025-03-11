import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { WandSparkles, RotateCcw } from "lucide-react";
import { Button } from "./button";
import FormattedAiOutput from "../utils/ai-output-formatter";

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
    isAssistant:boolean; 
    profile_url?: string;
    username: string;
    message: string;
}

export default function Message({ isAssistant, profile_url="/default-profile-pic.svg", username, message, className }: MessageProps) {
    if(!isAssistant) {
        return(
            <div>
                <div className="flex flex-col gap-1.5 items-end">
                    <div className="flex flex-col bg-muted px-2 rounded-md py-1 max-w-xs">
                        <div className="whitespace-pre-wrap prose-pre:whitespace-pre-wrap !text-sm !font-[450]">
                            <p className="text-sm">{message}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return ( 
        <motion.div
            initial={{ translateY:30 }}
            animate={{ translateY:0 }}
            transition={{ duration: 0.5 }} 
            className={cn("flex items-start gap-3 p-3 rounded-xl w-full overflow-auto", className)}
        >
            <div className="flex flex-col gap-0.5">
                <p className="text-muted-foreground text-xs ml-7">Notate AI</p>
                <div className="flex gap-0.5 py-1">

                    <Avatar className="ring-border h-5 w-5 rounded-full flex-shrink-0">
                        <AvatarImage src={isAssistant ? "/notate-ai-profile-pic.svg" : profile_url} />
                        <AvatarFallback>{isAssistant ? "" : username.substring(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="relative px-2 flex flex-col gap-2 w-full">
                        <div className="text-sm whitespace-pre-wrap prose-pre:whitespace-pre-wrap">
                            <pre className="mt-1 text-sm text-foreground text-wrap font-sans w-full overflow-hidden">
                                <FormattedAiOutput output={message} />
                            </pre>
                        </div>
                        <div className="absolute -bottom-6 left-0"></div>
                    </div>
                </div>
            </div>
        </motion.div> 
    );
}