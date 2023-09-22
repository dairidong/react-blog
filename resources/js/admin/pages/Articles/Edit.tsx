import { Head } from "@inertiajs/react";
import { FC } from "react";
import ArticleForm from "@/admin/pages/Articles/components/ArticleForm";
import { Article, Tag } from "@/types/models";

interface Props {
  article: Required<Article>;
  tags: Pick<Tag, "id" | "name">[];
}

const Edit: FC<Props> = ({ article, tags }) => {
  return (
    <>
      <Head title="编辑文章" />
      <ArticleForm article={article} tags={tags} />
    </>
  );
};

export default Edit;
