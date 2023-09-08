import { Head, Link, router } from "@inertiajs/react";
import { FC } from "react";
import { App, Button, Col, List, Row, Switch, theme } from "antd";
import { PaginationConfig } from "antd/es/pagination";
import {
  DeleteFilled,
  EditFilled,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { LaravelPagination } from "@/types";
import { Article } from "@/types/models";
import { formatTime } from "@/lib/utils";
import ContentContainer from "@/layouts/AdminLayout/components/ContentContainer";

const timeTemplate = "YYYY年MM月DD日 HH:mm:ss";

const Index: FC<{ articles: LaravelPagination<Article> }> = ({ articles }) => {
  const {
    token: { colorTextSecondary, colorErrorText },
  } = theme.useToken();

  const { modal } = App.useApp();

  const pagination: PaginationConfig = {
    pageSize: articles.per_page,
    total: articles.total,
    current: articles.current_page,
    showTotal: (total, range) => `总共 ${total} 项`,
    showSizeChanger: true,

    onChange: (page, pageSize) =>
      router.get(
        route("admin.articles.index"),
        { page, pageSize },
        {
          only: ["articles"],
        },
      ),
  };

  const deleteBtnOnClick = (article: Article) => {
    modal.confirm({
      title: `删除文章：${article.id}`,
      content: article.title,
      icon: <InfoCircleOutlined style={{ color: colorErrorText }} />,
      cancelText: "取消",
      okText: "删除",
      onOk: () => {
        router.delete(route("admin.articles.destroy", article));
      },
    });
  };

  return (
    <>
      <Head title="文章" />
      <ContentContainer>
        <List<Article>
          rowKey="id"
          dataSource={articles.data}
          pagination={pagination}
          header={
            <div className="tw-flex tw-justify-between">
              <h1 className="tw-text-3xl tw-font-bold">文章列表</h1>
              <div className="actions">
                <Link href={route("admin.articles.create")}>
                  <Button type="primary" size="large" icon={<PlusOutlined />}>
                    新建
                  </Button>
                </Link>
              </div>
            </div>
          }
          renderItem={(article) => (
            <List.Item
              actions={[
                <Switch
                  checked={article.published_at !== null}
                  checkedChildren="已发布"
                  unCheckedChildren="未发布"
                />,
                <Link href={route("admin.articles.edit", article)}>
                  <Button
                    type="primary"
                    icon={<EditFilled className="tw-text-xl" key="edit" />}
                  />
                </Link>,
                <Button
                  type="primary"
                  danger
                  icon={<DeleteFilled className="tw-text-xl" key="delete" />}
                  onClick={() => deleteBtnOnClick(article)}
                />,
              ]}
            >
              {/* 主要内容：标题 + 描述 */}
              <List.Item.Meta
                title={
                  <span className="tw-text-lg tw-font-bold">
                    {article.title}
                  </span>
                }
                description={
                  <p className="tw-text-base">{article.description}</p>
                }
              />

              {/* 次要内容：时间 */}
              <Row
                align="middle"
                gutter={20}
                style={{
                  color: colorTextSecondary,
                }}
              >
                <Col xs={0} md={12}>
                  <div>创建时间：</div>
                  <div>
                    {formatTime(article.created_at, timeTemplate, false)}
                  </div>
                </Col>
                <Col xs={0} sm={0} md={12}>
                  <div>最后更新时间：</div>
                  <div>
                    {formatTime(article.updated_at, timeTemplate, false)}
                  </div>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </ContentContainer>
    </>
  );
};

export default Index;
