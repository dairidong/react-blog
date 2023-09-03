import "vditor/dist/index.css";
import Vditor from "vditor";
import { FC, HTMLAttributes, useCallback, useEffect, useRef } from "react";
import { clsx } from "clsx";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  options?: IOptions;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">;

const Editor: FC<Props> = ({
  value = "",
  onChange = () => {},
  options = {},
  className,
  ...props
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const triggerChange = useCallback((changedValue: string) => {
    if (changedValue === "\n") {
      onChange("");
    } else {
      onChange(changedValue);
    }
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const vditor = new Vditor(editorRef.current, {
        after: () => {
          if (value) vditor.setValue(value);
        },
        cache: {
          id: "vditor",
          after: (cache: string) => triggerChange(cache),
        },
        input: (input: string) => triggerChange(input),
        minHeight: 600,
        ...options,
      });
    }
  }, []);

  return (
    <div ref={editorRef} className={clsx("vditor", className)} {...props} />
  );
};

export default Editor;
