import { FC } from "react";
import { Head } from "@inertiajs/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import { Article } from "@/types/models";
import styles from "./styles.module.pcss";
import "@styles/prism.pcss";
import Pre from "@/Components/Articles/Pre";
import Code from "@/Components/Articles/Code";

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
            rehypePlugins={[rehypePrism]}
            components={{
              pre: Pre,
              code: Code,
            }}
          />
        </article>
      </div>
    </div>
  </>
);

export default Show;
