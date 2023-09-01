import { CodeComponent } from "react-markdown/lib/ast-to-react";
import { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const createLineNumbers = (count: number) => {
  const spanArr: ReactNode[] = [];
  for (let i = 1; i <= count; i += 1) {
    spanArr.push(<span key={i} />);
  }
  return spanArr;
};

const Code: CodeComponent = ({ node, children, inline, ...props }) => {
  if (inline) {
    return <code children={children} {...props} />;
  }

  return (
    <>
      {children.length > 0 && (
        <div className="line-numbers-rows">
          {createLineNumbers(children.length)}
        </div>
      )}

      <ScrollArea orientation="horizontal" className="tw-pb-2">
        <code children={children} {...props} />
      </ScrollArea>
    </>
  );
};

export default Code;
