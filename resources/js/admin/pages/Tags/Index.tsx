import { FC, useCallback, useMemo } from "react";
import { Head, router } from "@inertiajs/react";
import ContentContainer from "@admin/layouts/components/ContentContainer";
import { App, Button, Form, Input, Row, Table, TableProps, theme } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ModalForm from "@admin/components/form/ModalForm";
import { ColumnsType, ColumnType } from "antd/es/table";
import { timeTemplate } from "@admin/constants";
import { isPlainObject } from "es-toolkit";
import { has, isArray } from "es-toolkit/compat";
import { useRoute } from "ziggy-js";
import { Tag } from "@/types/models";
import {
  transformOrderDirectionFromAntToRequest,
  transformOrderDirectionFromRequestToAnt,
} from "@/lib/utils";
import { formatTime } from "@/lib/dayjs";

import { OrderBy } from "@/types";

interface Props {
  tags: Tag[];
}

const baseColumns: ColumnsType<Tag> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    defaultSortOrder: "descend",
  },
  {
    title: "标签名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    key: "created_at",
    render: (text) =>
      formatTime(text, {
        template: timeTemplate,
        human: false,
      }),
    sorter: true,
  },
  {
    title: "更新时间",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (text) =>
      formatTime(text, {
        template: timeTemplate,
        human: false,
      }),
    sorter: true,
  },
];

const Index: FC<Props> = ({ tags }) => {
  const {
    token: { colorErrorText },
  } = theme.useToken();
  const route = useRoute();

  const { modal } = App.useApp();

  const handleDelete = useCallback(
    (tag: Tag) => {
      modal.confirm({
        title: `删除标签`,
        content: (
          <>
            确认删除标签 <strong>{tag.name}</strong> 吗？
          </>
        ),
        icon: <InfoCircleOutlined style={{ color: colorErrorText }} />,
        cancelText: "取消",
        okText: "删除",
        onOk: () => {
          return new Promise((resolve) => {
            router.delete(route("admin.tags.destroy", tag.id), {
              only: ["tags"],
              onFinish: () => resolve("deleted"),
            });
          });
        },
      });
    },
    [modal],
  );

  const handleChange = useCallback<NonNullable<TableProps<Tag>["onChange"]>>(
    (_t, _f, sorter) => {
      const sort = isArray(sorter) ? sorter[0] : sorter;

      const sortBy =
        sort.order === undefined
          ? {}
          : {
              order: String(sort.field),
              dir: transformOrderDirectionFromAntToRequest(sort.order),
            };

      router.get(route("admin.tags.index"), sortBy, { only: ["tags"] });
    },
    [],
  );

  const columns = useMemo<ColumnsType<Tag>>(() => {
    const columnsWithActions: ColumnsType<Tag> = [
      ...baseColumns,
      {
        title: "操作",
        key: "actions",
        render: (text, record) => {
          return (
            <Row style={{ gap: 10 }}>
              <ModalForm
                url={route("admin.tags.update", record.id)}
                method="put"
                title="更新标签"
                layout="vertical"
                submitOptions={{ only: ["tags", "errors", "flash"] }}
                trigger={<Button type="primary" icon={<EditOutlined />} />}
                defaultValues={{ name: record.name }}
              >
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: "标签名不能为空" }]}
                >
                  <Input autoFocus placeholder="输入标签名" />
                </Form.Item>
              </ModalForm>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record)}
              />
            </Row>
          );
        },
      },
    ];

    if (isPlainObject(route().params)) {
      const params = route().params as OrderBy;
      if (params.order) {
        return columnsWithActions.map((column) => {
          if (column.sorter && has(column, "dataIndex")) {
            return {
              ...column,
              sortOrder:
                (column as ColumnType<Tag>).dataIndex === params.order
                  ? transformOrderDirectionFromRequestToAnt(params.dir)
                  : null,
            };
          }
          return column;
        });
      }
    }
    return columnsWithActions;
  }, [handleDelete, tags]);

  return (
    <>
      <Head title="标签列表" />
      <ContentContainer
        pageTitle="标签列表"
        actions={
          <ModalForm
            url={route("admin.tags.store")}
            method="post"
            title="新建标签"
            layout="vertical"
            submitOptions={{ only: ["tags"] }}
            trigger={
              <Button type="primary" size="large" icon={<PlusOutlined />}>
                新建
              </Button>
            }
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "标签名不能为空" }]}
            >
              <Input autoFocus placeholder="输入标签名" />
            </Form.Item>
          </ModalForm>
        }
      >
        <Table
          pagination={false}
          columns={columns}
          dataSource={tags}
          onChange={handleChange}
          rowKey="id"
        />
      </ContentContainer>
    </>
  );
};

export default Index;
