import { FC, useCallback, useMemo } from "react";
import { Head, router } from "@inertiajs/react";
import ContentContainer from "@admin/layouts/components/ContentContainer";
import { Button, Form, Input, Row, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ModalForm from "@admin/components/form/ModalForm";
import { ColumnsType, ColumnType } from "antd/es/table";
import { timeTemplate } from "@admin/constants";
import { has, isArray, isPlainObject, map } from "lodash";
import { Tag } from "@/types/models";
import {
  formatTime,
  transformOrderDirectionFromAntToRequest,
  transformOrderDirectionFromRequestToAnt,
} from "@/lib/utils";
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
    render: (text) => formatTime(text, timeTemplate, false),
    sorter: true,
  },
  {
    title: "更新时间",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (text) => formatTime(text, timeTemplate, false),
    sorter: true,
  },
];

const Index: FC<Props> = ({ tags }) => {
  const [createForm] = Form.useForm();

  const columns = useMemo<ColumnsType<Tag>>(() => {
    const columnsWithActions: ColumnsType<Tag> = [
      ...baseColumns,
      {
        title: "操作",
        key: "actions",
        render: (text, record) => (
          <Row style={{ gap: 10 }}>
            <Button type="primary" icon={<EditOutlined />} />
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Row>
        ),
      },
    ];

    if (isPlainObject(route().params)) {
      const params = route().params as OrderBy;
      if (params.order) {
        return map(columnsWithActions, (column) => {
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
  }, []);

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
            form={createForm}
            layout="vertical"
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
