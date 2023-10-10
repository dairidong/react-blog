import { Head } from "@inertiajs/react";
import ContentContainer from "@admin/layouts/components/ContentContainer";
import { Card, Col, Row, Table } from "antd";
import { FC } from "react";
import { ColumnsType } from "antd/es/table";
import { formatTime } from "@/lib/utils";

interface AppStatsColumn {
  key: string;
  label: string;
  value: string | number | null;
}

type Props = {
  appStats: AppStatsColumn[];
};

const columns: ColumnsType<AppStatsColumn> = [
  {
    key: "label",
    dataIndex: "label",
  },
  {
    key: "value",
    dataIndex: "value",
    render: (value, { key }) => {
      if (key === "octaneRunningTime") {
        return formatTime(value);
      }
      return value;
    },
  },
];

const Dashboard: FC<Props> = ({ appStats }) => {
  return (
    <>
      <Head title="总览" />
      <ContentContainer style={{ background: "none" }}>
        <Row>
          <Col xs={24} md={12}>
            <Card title="应用信息">
              <Table
                showHeader={false}
                columns={columns}
                dataSource={appStats}
                pagination={false}
                rowKey="key"
                bordered
              />
            </Card>
          </Col>
        </Row>
      </ContentContainer>
    </>
  );
};

export default Dashboard;
