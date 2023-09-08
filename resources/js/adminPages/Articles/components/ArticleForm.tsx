import { FC } from "react";
import { Form as AntForm, Input } from "antd";
import { pick } from "lodash";
import { Article } from "@/types/models";
import Form from "@/components/admin/Form";
import Editor from "@/components/admin/form/Editor";

interface Props {
  article?: Article;
}

type ArticleFormFields = Pick<Article, "title" | "description" | "content"> &
  Partial<Pick<Article, "slug">>;

const ArticleForm: FC<Props> = ({ article }) => {
  const defaultValues: ArticleFormFields = article
    ? pick(article, ["title", "slug", "description", "content"])
    : {
        title: "",
        description: "",
        content: "",
      };

  return (
    <Form<ArticleFormFields>
      title={`${article ? "编辑" : "新建"}文章`}
      method={article ? "put" : "post"}
      // todo edit route
      url={
        article
          ? route("admin.articles.update", article)
          : route("admin.articles.store")
      }
      errorMessage="创建文章失败"
      submitBtnText="创建文章"
      defaultValues={defaultValues}
    >
      <AntForm.Item
        label="文章标题"
        name="title"
        rules={[
          {
            required: true,
            message: "文章标题不可为空",
          },
          {
            max: 255,
            message: "标题长度不可超过 255 个字符",
          },
        ]}
      >
        <Input allowClear />
      </AntForm.Item>

      {article && (
        <AntForm.Item
          label="Slug"
          name="slug"
          rules={[
            {
              max: 255,
              message: "Slug 长度不可超过 255 个字符",
            },
          ]}
        >
          <Input allowClear />
        </AntForm.Item>
      )}

      <AntForm.Item
        label="文章描述"
        name="description"
        rules={[
          {
            max: 300,
            message: "文章描述不可超过 500 字",
          },
        ]}
      >
        <Input.TextArea showCount allowClear />
      </AntForm.Item>

      <AntForm.Item label="文章内容" name="content">
        <Editor minHeight={600} />
      </AntForm.Item>
    </Form>
  );
};

export default ArticleForm;
