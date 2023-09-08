import { Head } from "@inertiajs/react";
import ArticleForm from "@/adminPages/Articles/components/ArticleForm";

// type ArticleFormFields = Pick<Article, "title" | "description" | "content"> &
//   Partial<Pick<Article, "slug">>;

const Create = () => {
  // const [editor, setEditor] = useState<Vditor | null>(null);

  return (
    <>
      <Head title="新建文章" />

      <ArticleForm />
      {/* <Form<ArticleFormFields> */}
      {/*  title="新建文章" */}
      {/*  method="post" */}
      {/*  url={route("admin.articles.store")} */}
      {/*  submitOptions={{ */}
      {/*    onSuccess: () => editor?.clearCache(), */}
      {/*  }} */}
      {/*  errorMessage="创建文章失败" */}
      {/*  submitBtnText="创建文章" */}
      {/*  defaultValues={{ */}
      {/*    title: "", */}
      {/*    description: "", */}
      {/*    content: "", */}
      {/*  }} */}
      {/* > */}
      {/*  <AntForm.Item */}
      {/*    label="文章标题" */}
      {/*    name="title" */}
      {/*    rules={[ */}
      {/*      { */}
      {/*        required: true, */}
      {/*        max: 255, */}
      {/*        message: "文章标题不可为空", */}
      {/*      }, */}
      {/*    ]} */}
      {/*  > */}
      {/*    <Input allowClear /> */}
      {/*  </AntForm.Item> */}

      {/*  <AntForm.Item */}
      {/*    label="文章描述" */}
      {/*    name="description" */}
      {/*    rules={[ */}
      {/*      { */}
      {/*        max: 300, */}
      {/*        message: "文章描述不可超过 500 字", */}
      {/*      }, */}
      {/*    ]} */}
      {/*  > */}
      {/*    <Input.TextArea showCount allowClear /> */}
      {/*  </AntForm.Item> */}

      {/*  <AntForm.Item label="文章内容" name="content"> */}
      {/*    <Editor setEditor={setEditor} /> */}
      {/*  </AntForm.Item> */}
      {/* </Form> */}
    </>
  );
};

export default Create;
