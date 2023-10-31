import { Head } from "@inertiajs/react";
import ContentContainer from "@admin/layouts/components/ContentContainer";
import { Card, Col, Row, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { map } from "lodash-es";
import dayjs from "@/lib/dayjs";

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
  },
];

const Dashboard: FC<Props> = ({ appStats }) => {
  const [stats, setStats] = useState<AppStatsColumn[]>(appStats);

  useEffect(() => {
    const transformRunningTime = (statsToTransform: AppStatsColumn[]) =>
      setStats(
        map(statsToTransform, (stat) => {
          if (stat.key === "octaneRunningTime") {
            const duration = dayjs.duration(dayjs().diff(dayjs(stat.value)));
            return {
              ...stat,
              value: [
                duration.days() > 0 && `${duration.days()} 天`,
                duration.hours() > 0 && `${duration.hours()} 小时`,
                duration.minutes() > 0 && `${duration.minutes()} 分钟`,
                `${duration.seconds()} 秒`,
              ]
                .filter((part) => Boolean(part))
                .join(" "),
            };
          }
          return stat;
        }),
      );

    let intervalId: NodeJS.Timer;
    if (appStats.find((stat) => stat.key === "octaneRunningTime")) {
      transformRunningTime(appStats);

      intervalId = setInterval(() => {
        transformRunningTime(appStats);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [appStats, setStats]);

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
                dataSource={stats}
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
