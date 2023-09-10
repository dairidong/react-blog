import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import React, { FC, HTMLAttributes } from "react";
import { PluggableList } from "react-markdown/lib/react-markdown";
import Pre from "./Pre";
import Code from "./Code";
import styles from "./styles.module.pcss";
import "@styles/prism.pcss";
import { cn } from "@/lib/utils";

type Props = {
  articleTitle?: string;
  markdown: string;
} & HTMLAttributes<HTMLDivElement>;

const remarkPlugins: PluggableList = [remarkGfm];
const rehypePlugins: PluggableList = [
  rehypePrism,
  rehypeSlug,
  [rehypeAutolinkHeadings, { behavior: "append", properties: {} }],
];

const components = {
  pre: Pre,
  code: Code,
};

const Article: FC<Props> = ({
  markdown,
  articleTitle,
  className,
  ...props
}) => {
  return (
    <article className={cn(styles.article, className)} {...props}>
      {articleTitle && <h1>{articleTitle}</h1>}

      <ReactMarkdown
        children={markdown}
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
      />
    </article>
  );
};

export default Article;
