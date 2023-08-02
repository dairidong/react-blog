import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CodeComponent } from "react-markdown/lib/ast-to-react";
import { FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/Components/ui/scroll-area";

const PreTag: FC<PropsWithChildren> = ({ children }) => (
  <pre>
    <ScrollArea viewPortClassName="tw-mb-2" orientation="horizontal">
      {children}
    </ScrollArea>
  </pre>
);

const HighlightCode: CodeComponent = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      {...props}
      children={String(children).replace(/\n$/, "")}
      lineNumberStyle={{ minWidth: 0 }}
      style={atomDark}
      language={match[1]}
      PreTag={PreTag}
      showLineNumbers
    />
  ) : (
    <code
      {...props}
      className={cn(
        className,
        "tw-relative tw-rounded tw-bg-muted tw-px-[0.3rem] tw-py-[0.2rem] tw-font-mono tw-text-sm",
      )}
    >
      {children}
    </code>
  );
};

export default HighlightCode;
