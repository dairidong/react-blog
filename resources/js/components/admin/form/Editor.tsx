import "vditor/dist/index.css";
import Vditor from "vditor";
import {
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { clsx } from "clsx";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  options?: IOptions;
  setEditor?: Dispatch<SetStateAction<Vditor | null>>;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">;

const Editor: FC<Props> = ({
  value = "",
  options = {},
  onChange = () => {},
  setEditor,
  className,
  ...props
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const triggerChange = useCallback((changedValue: string) => {
    if (changedValue === "\n") {
      onChange?.("");
    } else {
      onChange?.(changedValue);
    }
  }, []);

  useEffect(() => {
    let vditor: Vditor;
    if (editorRef.current) {
      const { id } = editorRef.current;

      vditor = new Vditor(editorRef.current, {
        after: () => {
          if (value) vditor.setValue(value);
        },
        cache: {
          id: id ? `vditor-${id}` : "vditor",
          after: (cache: string) => triggerChange(cache),
        },
        input: (input: string) => triggerChange(input),
        minHeight: 600,
        ...options,
      });
      setEditor?.(vditor);
    }

    return () => {
      vditor?.destroy();
    };
  }, []);

  return (
    <div ref={editorRef} className={clsx("vditor", className)} {...props} />
  );
};

export default Editor;
