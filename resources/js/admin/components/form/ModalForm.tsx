import useForm from "@admin/components/form/hooks/useForm";
import { Form, Modal, ModalProps } from "antd";
import { cloneElement, useMemo, useState } from "react";
import { VisitOptions } from "@inertiajs/core";
import { FormComponentProps } from "@/types";

type Props<T> = FormComponentProps<T> & {
  open?: ModalProps["open"];
  onCancel?: ModalProps["onCancel"];
  onOk?: ModalProps["onOk"];
  width?: string | number;
  trigger?: JSX.Element;
  modalProps?: Omit<ModalProps, "visible">;
};

export default function ModalForm<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  width = 400,
  trigger,
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
  modalProps,
  ...props
}: Props<T>) {
  const [open, setOpen] = useState<boolean>(modalProps?.open || false);

  const memoSubmitOptions = useMemo<VisitOptions>(
    () => ({
      ...submitOptions,
      onFinish: (visit) => {
        submitOptions?.onFinish?.(visit);
        setOpen(false);
      },
    }),
    [submitOptions],
  );

  const { formInstance, onValuesChange, onFinish, processing } = useForm<T>({
    defaultValues,
    method,
    url,
    form,
    errorMessage,
    submitOptions: memoSubmitOptions,
  });

  const triggerDom = useMemo(() => {
    if (!trigger) {
      return null;
    }

    return cloneElement(trigger, {
      key: "trigger",
      ...trigger.props,
      onClick: async (e: any) => {
        formInstance.resetFields();
        setOpen(!open);
        trigger.props?.onClick?.(e);
      },
    });
  }, [open, setOpen, trigger, formInstance]);

  return (
    <>
      {triggerDom}
      <Modal
        {...modalProps}
        forceRender
        title={title}
        open={open}
        confirmLoading={processing}
        cancelText="取消"
        okText={submitBtnText}
        width={width}
        onCancel={(e) => {
          if (processing) return;
          setOpen(false);
          modalProps?.onCancel?.(e);
        }}
        onOk={(e) => {
          if (processing) return;
          formInstance.submit();
          modalProps?.onOk?.(e);
        }}
      >
        <Form
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          initialValues={{ ...defaultValues }}
          form={formInstance}
          layout="vertical"
          children={children}
          {...props}
        />
      </Modal>
    </>
  );
}
