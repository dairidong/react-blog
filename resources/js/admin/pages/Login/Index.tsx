import { Head } from "@inertiajs/react";
import React from "react";
import { Button, Card, Checkbox, Form, Input, theme, Typography } from "antd";
import useForm from "@admin/components/form/hooks/useForm";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRoute } from "ziggy-js";
import svg from "./bg.svg?url";

interface Credentials extends Record<string, any> {
  username: string;
  password: string;
  remember?: boolean;
  [key: string]: unknown;
}

const defaultValues = {
  username: "",
  password: "",
  remember: false,
};

const { Title } = Typography;

const Login = () => {
  const {
    token: { colorBgLayout, colorTextSecondary, colorTextDescription },
  } = theme.useToken();

  const route = useRoute();

  const { formInstance, onValuesChange, onFinish, processing, hasErrors } =
    useForm<Credentials>({
      defaultValues,
      url: route("admin.login"),
      method: "post",
      errorMessage: "登录失败",
    });

  return (
    <>
      <Head title="登录后台" />
      <main
        style={{
          height: "100vh",
          backgroundImage: `url(${svg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          backgroundColor: colorBgLayout,
          backgroundSize: "cover",
        }}
      >
        <section
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            style={{
              width: 400,
              paddingTop: 24,
            }}
            headStyle={{ border: "none" }}
            title={
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Title
                  level={3}
                  style={{ fontFamily: "'Press Start 2P'", margin: 0 }}
                >
                  DRD BLOG
                </Title>
                <div style={{ color: colorTextDescription }}>管理后台</div>
              </section>
            }
          >
            <Form<Credentials>
              name="login"
              className="login-form"
              initialValues={{ ...defaultValues }}
              onValuesChange={onValuesChange}
              onFinish={onFinish}
              form={formInstance}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "请输入用户名！" }]}
              >
                <Input placeholder="用户名" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入密码！" }]}
              >
                <Input.Password placeholder="密码" prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  style={{
                    width: "100%",
                  }}
                  htmlType="submit"
                  disabled={hasErrors}
                  loading={processing}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </section>
      </main>
    </>
  );
};

export default Login;
