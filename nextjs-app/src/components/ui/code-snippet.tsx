import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"; // Import Atom One Dark theme
import { useTheme } from "next-themes";

import { Button } from "../ui/button";
import { toast } from "sonner";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

import hljs from 'highlight.js';

interface CodeSnippetProps {
    children: React.ReactNode;
    className?: string;
}

function CodeSnippet({ children, className }: CodeSnippetProps) {
    const [hasCopied, setHasCopied] = useState(false);
    const { theme } = useTheme();
    const content = String(children).replace(/\n$/, '');
    const language = className?.replace('language-', '') || 'text';
    
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setHasCopied(true);
            toast("Copied to clipboard", {
                duration: 1500,
            });
            setTimeout(() => setHasCopied(false), 3000);
        } catch (err) {
            toast("Failed to copy code", {
                duration: 2000,
                description: "Please try again",
            });
        }
    };

    return ( 
        <div className="w-full rounded-lg border bg-background box-border">
            <div className="flex items-center justify-between px-3 py-2 border-b box-border">
                <span className="text-xs text-muted-foreground">{language}</span>
                <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6" 
                    onClick={copyToClipboard}
                >
                    {hasCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
            </div>
            <div className="overflow-x-auto w-full box-border">
                <SyntaxHighlighter 
                    language={language}
                    style={theme === 'dark' ? oneDark : oneLight}
                    className="!rounded-none !m-0 box-border *:max-w-full"
                >
                    {content}
                </SyntaxHighlighter>
            </div>
        </div>
     );
}

export default CodeSnippet;