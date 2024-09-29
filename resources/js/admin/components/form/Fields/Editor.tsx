import React, { FC, useCallback, useEffect, useMemo } from "react";
import { Editor as ByteMD, EditorProps } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import zh from "bytemd/locales/zh_Hans.json";
import gfmZh from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import "bytemd/dist/index.css";
import "github-markdown-css";
import "highlight.js/styles/vs.css";
import { editorUploadImage } from "@admin/requests";
import { AxiosError } from "axios";
import { App } from "antd";
import { useRoute } from "ziggy-js";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  height?: string | number;
  minHeight?: string | number;
  placeholder?: string;
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
  placeholder = "",
}) => {
  const route = useRoute();
  const { notification } = App.useApp();

  const uploadUrl = useMemo(() => route("admin.images.store"), []);

  const uploadImages = useCallback<NonNullable<EditorProps["uploadImages"]>>(
    (files) => {
      return Promise.all(
        files.map(async (file) => {
          try {
            const { url } = await editorUploadImage(uploadUrl, file, {});

            notification.success({
              message: "图片上传成功",
              description: file.name,
            });

            return { url };
          } catch (e) {
            if (e instanceof AxiosError) {
              notification.error({
                message: "图片上传失败",
                description: e.response?.data.message || "服务器错误",
              });
            }
            throw e;
          }
        }),
      );
    },
    [uploadUrl, notification],
  );

  useEffect(() => {
    const editorStyles =
      document.querySelector<HTMLDivElement>(".bytemd")?.style;

    if (editorStyles) {
      if (height !== undefined) {
        editorStyles.setProperty(
          "height",
          Number.isFinite(height) ? `${height}px` : (height as string),
        );
      }

      if (minHeight !== undefined) {
        editorStyles.setProperty(
          "min-height",
          Number.isFinite(minHeight) ? `${minHeight}px` : (minHeight as string),
        );
      }
    }
  }, [height, minHeight]);

  return (
    <ByteMD
      value={value || ""}
      onChange={onChange}
      plugins={plugins}
      locale={zh}
      placeholder={placeholder}
      uploadImages={uploadImages}
    />
  );
};

export default Editor;
