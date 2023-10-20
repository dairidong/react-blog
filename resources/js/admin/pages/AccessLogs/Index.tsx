import { Head, router } from "@inertiajs/react";
import ContentContainer from "@admin/layouts/components/ContentContainer";
import {
  Button,
  Form,
  FormProps,
  Input,
  PaginationProps,
  Table,
  Tag,
  theme,
  Tooltip,
} from "antd";
import React, { FC, MouseEventHandler, useCallback } from "react";
import { ColumnsType } from "antd/es/table";
import { timeTemplate } from "@admin/constants";
import { LaravelPagination } from "@/types";
import { AccessLog } from "@/types/models";
import { formatTime } from "@/lib/dayjs";

interface Props {
  logs: LaravelPagination<AccessLog>;
  search: {
    ip: string | null;
    ua: string | null;
  };
}

interface SearchFormColumns {
  ip: string;
  ua: string;
}

const getResponseCodeColor = (code: number) => {
  const { colorPrimary, colorWarning, colorError, colorInfo, colorSuccess } =
    theme.getDesignToken();

  switch (true) {
    case code >= 200 && code < 300:
      return colorSuccess;
    case code >= 300 && code < 400:
      return colorPrimary;
    case code >= 400 && code < 500:
      return colorWarning;
    case code >= 500:
      return colorError;
    default:
      return colorInfo;
  }
};

const columns: ColumnsType<AccessLog> = [
  {
    title: "ID",
    key: "id",
    dataIndex: "id",
  },
  {
    title: "路径",
    key: "path",
    dataIndex: "path",
  },
  {
    title: "响应码",
    key: "response_code",
    dataIndex: "response_code",
    render: (value) => <Tag color={getResponseCodeColor(value)}>{value}</Tag>,
  },
  {
    title: "请求体",
    key: "input",
    dataIndex: "input",
    render: (value) => <pre>{JSON.stringify(value, null, 2)}</pre>,
  },
  {
    title: "UA",
    key: "user_agent",
    dataIndex: "user_agent",
    ellipsis: {
      showTitle: false,
    },
    render: (value) => <Tooltip title={value}>{value}</Tooltip>,
  },
  {
    title: "IP",
    key: "ip",
    dataIndex: "ip",
  },
  {
    title: "请求时间",
    key: "requested_at",
    dataIndex: "requested_at",
    render: (value) =>
      formatTime(value, {
        human: false,
        template: timeTemplate,
      }),
  },
];

const Index: FC<Props> = ({ logs, search: { ip, ua } }) => {
  const pagination: PaginationProps = {
    pageSize: logs.per_page,
    total: logs.total,
    current: logs.current_page,
    showTotal: (total, range) => `总共 ${total} 项`,
    showSizeChanger: true,

    onChange: (page, pageSize) =>
      router.get(
        route("admin.access_logs.index"),
        { page, pageSize, ip, ua },
        {
          only: ["logs", "search"],
        },
      ),
  };

  const handleSearch = useCallback<
    NonNullable<FormProps<SearchFormColumns>["onFinish"]>
  >((search) => {
    router.get(
      route("admin.access_logs.index"),
      {
        ...search,
      },
      {
        only: ["logs", "search"],
      },
    );
  }, []);

  const resetSearch = useCallback<MouseEventHandler>((e) => {
    e.preventDefault();
    router.get(
      route("admin.access_logs.index"),
      {},
      {
        only: ["logs", "search"],
      },
    );
  }, []);

  return (
    <>
      <Head title="访问日志" />
      <ContentContainer pageTitle="访问日志">
        <div style={{ marginBottom: 24 }}>
          <Form<SearchFormColumns>
            layout="inline"
            onFinish={handleSearch}
            initialValues={{ ip, ua }}
          >
            <Form.Item name="ip" label="IP">
              <Input placeholder="搜索 IP" />
            </Form.Item>
            <Form.Item name="ua" label="UA">
              <Input placeholder="搜索 UA" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>

            <Form.Item>
              <Button onClick={resetSearch}>重置搜索</Button>
            </Form.Item>
          </Form>
        </div>

        <Table<AccessLog>
          bordered
          dataSource={logs.data}
          columns={columns}
          rowKey="id"
          pagination={pagination}
        />
      </ContentContainer>
    </>
  );
};

export default Index;
