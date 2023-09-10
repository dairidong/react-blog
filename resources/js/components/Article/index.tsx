import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import React, { FC, HTMLAttributes } from "react";
import Pre from "./Pre";
import Code from "./Code";
import styles from "./styles.module.pcss";
import "@styles/prism.pcss";
import { cn } from "@/lib/utils";

type Props = {
  articleTitle?: string;
  markdown: string;
} & HTMLAttributes<HTMLDivElement>;

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
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypePrism,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "append", properties: {} }],
        ]}
        components={{
          pre: Pre,
          code: Code,
        }}
      />
    </article>
  );
};

export default Article;
