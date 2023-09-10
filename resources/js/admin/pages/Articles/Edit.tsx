import { Head } from "@inertiajs/react";
import { FC } from "react";
import ArticleForm from "@/admin/pages/Articles/components/ArticleForm";
import { Article } from "@/types/models";

const Edit: FC<{ article: Article }> = ({ article }) => {
  return (
    <>
      <Head title="编辑文章" />
      <ArticleForm article={article} />
    </>
  );
};

export default Edit;
