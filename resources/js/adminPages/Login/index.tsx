import { ProFormProps } from "@ant-design/pro-components";
import { Head, useForm } from "@inertiajs/react";
import React, { ComponentPropsWithoutRef, FC, useEffect } from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import { Form } from "antd";
import { Callbacks } from "rc-field-form/es/interface";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/Logo";
import { Input } from "@/components/ui/input";
import styles from "./styles.module.pcss";
import { Checkbox } from "@/components/ui/checkbox";

interface Credentials extends Record<string, any> {
  username: string;
  password: string;
  remember?: boolean;
  [key: string]: unknown;
}

interface RememberCheckboxProps
  extends Omit<
    ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "value" | "onChange"
  > {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const RememberCheckbox: FC<RememberCheckboxProps> = ({
  value,
  onChange,
  id,
  ...props
}) => (
  <div className="tw-flex tw-w-fit tw-cursor-pointer tw-select-none tw-items-center tw-gap-1">
    <Checkbox id={id} checked={value} onCheckedChange={onChange} {...props} />
    <label htmlFor={id} className="tw-cursor-pointer">
      记住登录
    </label>
  </div>
);

const Login = () => {
  const { data, setData, post, errors, hasErrors, clearErrors, reset } =
    useForm<Credentials>({
      username: "",
      password: "",
      remember: false,
    });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const onValuesChange: Callbacks<Credentials>["onValuesChange"] = (
    changedValues,
    values,
  ) => {
    if (hasErrors) clearErrors();

    setData({
      ...data,
      ...values,
    });
  };

  const submit: ProFormProps<Credentials>["onFinish"] = async (formData) => {
    post(route("admin.login"));
  };

  return (
    <StyleProvider hashPriority="high">
      <Head title="登录后台" />
      <main className="tw-min-h-screen tw-bg-background">
        <section className={styles.loginCardWrapper}>
          <Card className="tw-mx-5 tw-w-96">
            <CardHeader className="tw-gap-2">
              <CardTitle className="tw-flex tw-justify-center">
                <Logo className="tw-w-max" />
              </CardTitle>
              <CardDescription className="tw-flex tw-justify-center tw-font-bold">
                管理后台
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form<Credentials>
                name="normal_login"
                className="login-form"
                initialValues={{ ...data }}
                onValuesChange={onValuesChange}
                onFinish={submit}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: "请输入用户名！" }]}
                  validateStatus={errors.username && "error"}
                  help={errors.username}
                >
                  <Input
                    placeholder="用户名"
                    type="text"
                    className={styles.loginInput}
                    aria-invalid={Boolean(errors.username)}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "请输入密码！" }]}
                  validateStatus={errors.username && "error"}
                  help={errors.username}
                >
                  <Input
                    placeholder="密码"
                    type="password"
                    className={styles.loginInput}
                    aria-invalid={Boolean(errors.username)}
                    autoComplete="off"
                  />
                </Form.Item>

                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <RememberCheckbox value={data.remember} />
                  </Form.Item>
                </Form.Item>

                <Form.Item>
                  <Button className="tw-w-full" disabled={hasErrors}>
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </CardContent>
          </Card>
        </section>
      </main>
    </StyleProvider>
  );
};

export default Login;
