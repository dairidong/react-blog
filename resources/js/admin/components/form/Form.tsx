import { Form as AntForm, Button, ColProps, Row } from "antd";
import useForm from "@admin/components/form/hooks/useForm";
import ContentContainer from "@/admin/layouts/components/ContentContainer";
import { FormComponentProps } from "@/types";

const defaultCol: ColProps = {
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
  formCol,
  submitBtn,
  submitBtnText = "提交",
  errorMessage = "提交失败",
  submitOptions,
  ...props
}: FormComponentProps<T>) {
  const { formInstance, shouldDisableSubmitBtn, onValuesChange, onFinish } =
    useForm<T>({
      defaultValues,
      method,
      url,
      form,
      errorMessage,
      submitOptions,
    });

  return (
    <ContentContainer pageTitle={title}>
      <AntForm<T>
        layout="vertical"
        form={formInstance}
        onValuesChange={onValuesChange}
        initialValues={{ ...defaultValues }}
        onFinish={onFinish}
        labelCol={formCol || defaultCol}
        wrapperCol={formCol || defaultCol}
        {...props}
      >
        {children}

        {submitBtn !== false &&
          (submitBtn || (
            <Row
              justify="center"
              style={{
                marginTop: 80,
              }}
            >
              <AntForm.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  disabled={shouldDisableSubmitBtn}
                >
                  {submitBtnText}
                </Button>
              </AntForm.Item>
            </Row>
          ))}
      </AntForm>
    </ContentContainer>
  );
}
