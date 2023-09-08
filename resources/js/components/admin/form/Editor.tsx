import React, { FC, useEffect } from "react";
import { Editor as ByteMD } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import { isNumber } from "lodash";
import zh from "bytemd/locales/zh_Hans.json";
import gfmZh from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import "bytemd/dist/index.css";
import "github-markdown-css";
import "highlight.js/styles/vs.css";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  height?: string | number;
  minHeight?: string | number;
};

const plugins = [
  gfm({ locale: gfmZh }),
  breaks(),
  frontmatter(),
  gemoji(),
  highlight(),
];

const Editor: FC<Props> = ({
  value = "",
  onChange = () => {},
  height,
  minHeight,
}) => {
  useEffect(() => {
    const editorStyles =
      document.querySelector<HTMLDivElement>(".bytemd")?.style;

    if (height !== undefined) {
      editorStyles?.setProperty(
        "height",
        isNumber(height) ? `${height}px` : height,
      );
    }

    if (minHeight !== undefined) {
      editorStyles?.setProperty(
        "min-height",
        isNumber(minHeight) ? `${minHeight}px` : minHeight,
      );
    }
  }, [height, minHeight]);

  return (
    <ByteMD
      value={value || ""}
      onChange={onChange}
      plugins={plugins}
      locale={zh}
    />
  );
};

export default Editor;
