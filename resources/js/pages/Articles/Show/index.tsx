import { FC } from "react";
import { Head } from "@inertiajs/react";
import { Article as ArticleModel } from "@/types/models";
import Article from "@/components/Article";

const Show: FC<{ article: Required<ArticleModel> }> = ({ article }) => {
  return (
    <>
      <Head title={article.title} />
      <div className="tw-mt-5 lg:tw-mt-10">
        <div className="tw-container tw-flex tw-justify-center">
          <Article markdown={article.content} articleTitle={article.title} />
        </div>
      </div>
    </>
  );
};

export default Show;
