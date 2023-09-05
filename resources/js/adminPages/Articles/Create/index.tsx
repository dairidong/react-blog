import { Head, useForm } from "@inertiajs/react";
import { App, Button, Divider, Form, Input, Typography } from "antd";
import { Callbacks, FieldData } from "rc-field-form/es/interface";
import { useEffect, useState } from "react";
import Vditor from "vditor";
import ContentContainer from "@/layouts/AdminLayout/components/ContentContainer";
import { Article } from "@/types/models";
import Editor from "@/components/Editor";

type ArticleFormFields = Pick<Article, "title" | "description" | "content"> &
  Partial<Pick<Article, "slug">>;

const { Title } = Typography;

const Create = () => {
  const { data, setData, post, processing, errors, hasErrors, clearErrors } =
    useForm<ArticleFormFields>({
      title: "",
      description: "",
      content: "",
    });

  const { message } = App.useApp();

  const [form] = Form.useForm();

  const [editor, setEditor] = useState<Vditor>();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      message.error("创建文章失败");

      const fields: FieldData[] = Object.entries(data).map(([field, value]) => {
        const error = errors[field as keyof ArticleFormFields];
        return {
          name: field,
          value,
          errors: error ? [error] : [],
        };
      });
      form.setFields(fields);
    }
  }, [errors, form]);

  const onFinish: Callbacks<ArticleFormFields>["onFinish"] = (values) => {
    post(route("admin.articles.store"), {
      onSuccess: () => editor?.clearCache(),
    });
  };

  const onValuesChange: Callbacks<ArticleFormFields>["onValuesChange"] = (
    changedValues,
  ) => {
    if (hasErrors) clearErrors();
    setData({
      ...data,
      ...changedValues,
    });
  };

  return (
    <>
      <Head title="新建文章" />
      <ContentContainer>
        <Title level={3}>新建文章</Title>
        <Divider />
        <Form<ArticleFormFields>
          labelCol={{ span: 7, offset: 7 }}
          wrapperCol={{ span: 10, offset: 7 }}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          initialValues={data}
          form={form}
        >
          <Form.Item
            label="文章标题"
            name="title"
            rules={[
              {
                required: true,
                max: 255,
                message: "文章标题不可为空",
              },
            ]}
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            label="文章描述"
            name="description"
            rules={[
              {
                max: 500,
                message: "文章描述不可超过 500 字",
              },
            ]}
          >
            <Input.TextArea showCount allowClear />
          </Form.Item>

          <Form.Item label="文章内容" name="content">
            <Editor />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              disabled={hasErrors || processing}
            >
              创建文章
            </Button>
          </Form.Item>
        </Form>
      </ContentContainer>
    </>
  );
};

export default Create;
