import { Head } from "@inertiajs/react";
import Form from "@admin/components/form/Form";
import { FC, useMemo } from "react";
import { Divider, Form as AntForm, Input } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { pick } from "lodash-es";
import { useRoute } from "ziggy-js";
import { Administrator } from "@/types/models";

interface Props {
  user: Administrator;
}

const Edit: FC<Props> = ({ user }) => {
  const route = useRoute();
  const formDefaultValues = useMemo(
    () => pick(user, ["username", "name"]),
    [user],
  );

  return (
    <>
      <Head title="个人设置" />
      <Form
        title="个人设置"
        defaultValues={formDefaultValues}
        url={route("admin.me.update")}
        method="put"
      >
        <AntForm.Item />
        <AntForm.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              type: "string",
              whitespace: true,
              message: "用户名不能为空",
            },
            {
              min: 5,
              max: 30,
              message: "用户名长度在 5 到 30 个字符",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} />
        </AntForm.Item>

        <AntForm.Item
          label="名称"
          name="name"
          rules={[
            {
              required: true,
              type: "string",
              whitespace: true,
              message: "用户名不能为空",
            },
            {
              min: 2,
              max: 30,
              message: "名称长度在 2 到 30 个字符",
            },
          ]}
        >
          <Input prefix={<EditOutlined />} placeholder="输入名称" />
        </AntForm.Item>

        <Divider />

        <AntForm.Item
          label="旧密码"
          name="old_password"
          dependencies={["password"]}
          rules={[
            ({ getFieldValue }) => {
              const password = getFieldValue("password");

              return {
                required: Boolean(password),
                type: "string",
                whitespace: true,
                message: "旧密码不能为空",
              };
            },
          ]}
        >
          <Input.Password placeholder="输入旧密码" autoComplete="off" />
        </AntForm.Item>
        <AntForm.Item
          label="密码"
          name="password"
          rules={[
            {
              type: "string",
              whitespace: true,
              message: "密码不能包含空格",
            },
            {
              min: 6,
              max: 30,
              message: "密码长度为6-30位",
              type: "string",
            },
          ]}
        >
          <Input.Password placeholder="输入密码" autoComplete="off" />
        </AntForm.Item>

        <AntForm.Item
          label="确认密码"
          name="password_confirmation"
          dependencies={["password"]}
          rules={[
            ({ getFieldValue }) => {
              const password = getFieldValue("password");

              return {
                required: Boolean(password),
                message: "确认密码不能为空",
              };
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("确认密码必须与密码一致"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="输入确认密码" autoComplete="off" />
        </AntForm.Item>
      </Form>
    </>
  );
};

export default Edit;
