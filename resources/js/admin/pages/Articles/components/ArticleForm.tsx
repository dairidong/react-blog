import { FC, useMemo } from "react";
import { Form as AntForm, Input, Select, SelectProps } from "antd";
import { map } from "lodash";
import { Article, Tag } from "@/types/models";
import Form from "@/admin/components/form/Form";
import Editor from "@/admin/components/form/Fields/Editor";

interface Props {
  article?: Required<Article>;
  tags?: Pick<Tag, "id" | "name">[];
}

interface ArticleFormFields extends Record<string, unknown> {
  title: string;
  description: string;
  tags: string[];
  content: string;
  slug?: string;
}

const ArticleForm: FC<Props> = ({ article, tags }) => {
  const defaultValues = useMemo<ArticleFormFields>(() => {
    return article
      ? {
          title: article.title,
          description: article.description || "",
          tags: article.tags?.map((tag) => tag.name) || [],
          content: article.content || "",
          slug: article.slug || "",
        }
      : {
          title: "",
          description: "",
          tags: [],
          content: "",
        };
  }, [article]);

  const tagOptions = useMemo<SelectProps["options"]>(
    () =>
      map(tags, (tag) => ({
        label: tag.name,
        value: tag.name,
      })),
    [tags],
  );

  return (
    <Form<ArticleFormFields>
      title={`${article ? "编辑" : "新建"}文章`}
      method={article ? "put" : "post"}
      url={
        article
          ? route("admin.articles.update", article)
          : route("admin.articles.store")
      }
      errorMessage={article ? "更新文章失败" : "创建文章失败"}
      submitBtnText={article ? "更新文章" : "创建文章"}
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

      <AntForm.Item label="标签" name="tags">
        <Select mode="tags" options={tagOptions} />
      </AntForm.Item>

      <AntForm.Item
        label="文章内容"
        name="content"
        labelCol={{ xs: 24, lg: { span: 20, offset: 2 } }}
        wrapperCol={{ xs: 24, lg: { span: 20, offset: 2 } }}
      >
        <Editor minHeight={600} />
      </AntForm.Item>
    </Form>
  );
};

export default ArticleForm;
