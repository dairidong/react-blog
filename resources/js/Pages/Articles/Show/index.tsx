import { FC } from "react";
import { Head } from "@inertiajs/react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Article } from "@/types/models";
import styles from "./styles.module.pcss";
import HighlightCode from "@/Components/HighlightCode";

const components: Components = {
  code: HighlightCode,
  // 由 code 组件渲染 pre 标签，所以 pre 标签直接返回 children 即可
  pre: ({ children }) => children,
};

const Show: FC<{ article: Required<Article> }> = ({ article }) => (
  <>
    <Head title={article.title} />
    <div className="tw-mt-5 lg:tw-mt-10">
      <div className="tw-container tw-flex tw-justify-center">
        <article className={styles.article}>
          <h1>{article.title}</h1>

          <ReactMarkdown
            children={article.content}
            remarkPlugins={[remarkGfm]}
            components={components}
          />
        </article>
      </div>
    </div>
  </>
);

export default Show;
