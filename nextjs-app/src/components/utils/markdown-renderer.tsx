import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import CodeSnippet from "../ui/code-snippet";

interface MarkdownRendererProps {
  content: string;
}

// Custom components for all Markdown elements
const components: Record<string, React.ElementType> = {
    p: ({ children, ...props }) => {
      // Check if children contains any block-level elements
      const hasBlockElements = React.Children.toArray(children).some(
          (child) => React.isValidElement(child) && 
          /^(div|table|ul|ol|blockquote)$/.test((child.type as any)?.name || child.type || '')
      );

      // If it contains block elements, render as div to avoid invalid nesting
      return hasBlockElements ? (
          <div {...props}>{children}</div>
      ) : (
          <p className="mb-0" {...props}>{children}</p>
      );
    },
    h1: ({ node, ...props }) => (
        <h1 className="text-3xl font-bold tracking-tight" {...props} />
    ),
    h2: ({ node, ...props }) => (
        <h2 className="scroll-m-20 text-2xl font-bold tracking-tight" {...props} />
    ),
    h3: ({ node, ...props }) => (
        <h3 className="scroll-m-20 text-xl font-bold tracking-tight" {...props} />
    ),
    h4: ({ node, ...props }) => (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props} />
    ),
    h5: ({ node, ...props }) => (
        <h5 className="scroll-m-20 text-lg font-semibold tracking-tight" {...props} />
    ),
    h6: ({ node, ...props }) => (
        <h6 className="scroll-m-20 text-base font-semibold tracking-tight" {...props} />
    ),
    a: ({ node, ...props }) => (
        <a className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer" {...props} />
    ),
    ul: ({ node, ...props }) => <ul className="list-disc pl-6" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-6" {...props} />,
    li: ({ node, ...props }) => <li className="text-muted-foreground" {...props} />,
    blockquote: ({ node, ...props }) => <blockquote className="italic font-medium border-l-2 pl-4"></blockquote>,
    code: ({ node, inline, className, children, ...props }) => {
      const match = /\r|\n/.exec(children?.toString());
      if (!match) {
        return <code className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono whitespace-nowrap">{children}</code>
      }
      return <CodeSnippet className={className}>{children}</CodeSnippet>;
    },
    pre: ({ children }) => {
      // Return children directly to avoid wrapping in a pre tag
      return children;
    },
    hr: ({ node, ...props }) => <hr className="border-t border-border my-4" {...props} />,
    table: ({ node, ...props }) => (
        <div className="my-4 w-full overflow-hidden rounded-lg border border-border">
            <Table className="w-full" {...props} />
        </div>
    ),
    thead: ({ node, ...props }) => <TableHeader className="bg-muted dark:bg-muted/25" {...props} />,
    tbody: ({ node, ...props }) => <TableBody {...props} />,
    tr: ({ node, ...props }) => <TableRow className="hover:bg-muted/50 border-b last:border-b-0" {...props} />,
    th: ({ node, ...props }) => <TableHead className="px-4 py-2 font-semibold border-b border-r last:border-r-0 border-border" {...props} />,
    td: ({ node, ...props }) => <TableCell className="px-4 py-2 border-r last:border-r-0 border-border" {...props} />,
    strong: ({ node, ...props }) => <strong className="font-bold text-foreground" {...props} />,
    em: ({ node, ...props }) => <em className="italic text-muted-foreground" {...props} />,
    del: ({ node, ...props }) => <del className="text-destructive" {...props} />,
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
