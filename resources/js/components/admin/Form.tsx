import {
  Divider,
  Typography,
  Form as AntForm,
  FormProps,
  App,
  Button,
  ColProps,
} from "antd";
import { ReactNode } from "react";
import { useForm } from "@inertiajs/react";
import { Callbacks, FieldData } from "rc-field-form/es/interface";
import { JointContent } from "antd/es/message/interface";
import { Method, VisitOptions } from "@inertiajs/core";
import { omit, map } from "lodash";
import ContentContainer from "@/layouts/AdminLayout/components/ContentContainer";

type Props<T> = Omit<FormProps, "method" | "children" | "onValuesChange"> & {
  title: ReactNode;
  method?: Method;
  url?: string;
  defaultValues?: T;
  submitBtnText?: ReactNode;
  errorMessage?: JointContent;
  children?: ReactNode;
  submitOptions?: VisitOptions;
};

const { Title } = Typography;

const col: ColProps = {
  xs: 24,
  sm: { span: 20, offset: 2 },
  md: { span: 18, offset: 3 },
  lg: { span: 16, offset: 4 },
  xl: { span: 12, offset: 6 },
  xxl: { span: 10, offset: 7 },
};

export default function Form<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  title,
  defaultValues,
  children,
  url,
  form,
  method = "get",
  submitBtnText = "提交",
  errorMessage = "提交失败",
  submitOptions = {},
  ...props
}: Props<T>) {
  const { data, setData, submit, clearErrors, hasErrors, processing } =
    useForm<T>(defaultValues);

  const { message } = App.useApp();

  const [formInstance] = AntForm.useForm<T>(form);

  const onFinish: Callbacks<T>["onFinish"] = (values) => {
    submit(
      method,
      url || (route().current() ? route(route().current()!) : ""),
      {
        onError: (errors) => {
          message.error(errorMessage);

          // set error to antd form
          const fields: FieldData[] = map(data, (value, field, collection) => {
            const error = errors[field];

            return {
              name: field,
              value,
              errors: error ? [error] : [],
            };
          });
          formInstance.setFields(fields);

          submitOptions?.onError?.(errors);
        },

        ...omit(submitOptions, "onError"),
      },
    );
  };

  const onValuesChange: Callbacks<T>["onValuesChange"] = (changedValues) => {
    if (hasErrors) clearErrors();
    setData({
      ...data,
      ...changedValues,
    });
  };

  return (
    <ContentContainer>
      <Title level={3}>{title}</Title>
      <Divider />
      <AntForm<T>
        layout="vertical"
        form={formInstance}
        onValuesChange={onValuesChange}
        initialValues={{ ...data }}
        onFinish={onFinish}
        labelCol={col}
        wrapperCol={col}
        {...props}
      >
        {children}

        <AntForm.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            disabled={hasErrors || processing}
          >
            {submitBtnText}
          </Button>
        </AntForm.Item>
      </AntForm>
    </ContentContainer>
  );
}
