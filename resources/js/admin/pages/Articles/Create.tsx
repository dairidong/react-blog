import { Head } from "@inertiajs/react";
import { FC } from "react";
import ArticleForm from "@/admin/pages/Articles/components/ArticleForm";
import { Tag } from "@/types/models";

interface Props {
  tags: Pick<Tag, "id" | "name">[];
}

const Create: FC<Props> = ({ tags }) => {
  return (
    <>
      <Head title="新建文章" />

      <ArticleForm tags={tags} />
    </>
  );
};

export default Create;
