import { App, Form as AntForm } from "antd";
import { Callbacks, FieldData } from "rc-field-form/es/interface";
import { useForm as useInertiaForm } from "@inertiajs/react";
import { map, omit } from "lodash";
import { useCallback, useMemo } from "react";
import { FormHookProps } from "@/types";

export default function useForm<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  method = "get",
  url,
  defaultValues,
  form,
  errorMessage,
  submitOptions,
}: FormHookProps<T>) {
  const {
    data,
    setData,
    submit,
    clearErrors,
    hasErrors,
    processing,
    wasSuccessful,
    recentlySuccessful,
  } = useInertiaForm<T>(defaultValues);

  const { message } = App.useApp();

  const [formInstance] = AntForm.useForm<T>(form);

  const onFinish: Callbacks<T>["onFinish"] = (values) => {
    if (processing) {
      return;
    }

    submit(
      method,
      url || (route().current() ? route(route().current()!) : ""),
      {
        onError: (errors) => {
          message.error(errorMessage);

          // set error to antd form
          const fields: FieldData[] = map(
            values,
            (value, field, collection) => {
              const error = errors[field];

              return {
                name: field,
                value,
                errors: error ? [error] : [],
              };
            },
          );
          formInstance.setFields(fields);

          submitOptions?.onError?.(errors);
        },

        ...omit(submitOptions, "onError"),
      },
    );
  };

  const onValuesChange = useCallback<
    NonNullable<Callbacks<T>["onValuesChange"]>
  >(
    (changedValues) => {
      if (hasErrors) clearErrors();
      setData({
        ...formInstance.getFieldsValue(),
      });
    },
    [hasErrors],
  );

  const shouldDisableSubmitBtn = useMemo(
    () => hasErrors || processing,
    [hasErrors, processing],
  );

  return {
    data,
    onFinish,
    onValuesChange,
    wasSuccessful,
    recentlySuccessful,
    hasErrors,
    processing,
    formInstance,
    shouldDisableSubmitBtn,
  };
}
