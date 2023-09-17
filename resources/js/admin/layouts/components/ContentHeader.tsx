import { Col, Row, Typography } from "antd";
import { FC, ReactNode } from "react";

const { Title } = Typography;

interface Props {
  title: ReactNode;
  actions?: ReactNode;
}

const ContentHeader: FC<Props> = ({ title, actions }) => {
  return (
    <Row justify="space-between">
      <Col>
        <Title level={2}>{title}</Title>
      </Col>

      <Col className="actions">{actions}</Col>
    </Row>
  );
};

export default ContentHeader;
