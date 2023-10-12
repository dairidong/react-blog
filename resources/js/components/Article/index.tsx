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
import { formatTime } from "@/lib/dayjs";
import { Article as ArticleModel } from "@/types/models";
import { Separator } from "@/components/ui/separator";

type Props = {
  article: ArticleModel;
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

const Article: FC<Props> = ({ article, className, ...props }) => {
  return (
    <article className={cn(styles.article, className)} {...props}>
      <h1>{article.title}</h1>
      <section className="tw-flex tw-justify-around tw-gap-5 tw-text-base tw-text-secondary-foreground">
        <div className="tw-flex tw-flex-col tw-items-center">
          <div>发布时间</div>
          <Separator />
          {formatTime(article.published_at)}
        </div>
        <div className="tw-flex tw-flex-col tw-items-center">
          <div>最后更新时间</div>
          <Separator />
          {formatTime(article.updated_at)}
        </div>
        <div className="tw-flex tw-flex-col tw-items-center">
          <div>阅读量</div>
          <Separator />
          {article.visits_count}
        </div>
      </section>

      <ReactMarkdown
        children={article.content || ""}
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
      />
    </article>
  );
};

export default Article;
