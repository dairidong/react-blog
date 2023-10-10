import { Head, Link, router } from "@inertiajs/react";
import { FC, useCallback } from "react";
import { App, Button, Col, List, Row, Switch, theme } from "antd";
import { PaginationConfig } from "antd/es/pagination";
import {
  DeleteFilled,
  EditFilled,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { timeTemplate } from "@admin/constants";
import { LaravelPagination } from "@/types";
import { Article } from "@/types/models";
import { formatTime } from "@/lib/utils";
import ContentContainer from "@/admin/layouts/components/ContentContainer";

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

  const deleteBtnOnClick = useCallback(
    (article: Article) => {
      modal.confirm({
        title: `删除文章：${article.id}`,
        content: article.title,
        icon: <InfoCircleOutlined style={{ color: colorErrorText }} />,
        cancelText: "取消",
        okText: "删除",
        onOk: () => {
          return new Promise((resolve) => {
            router.delete(route("admin.articles.destroy", article), {
              onFinish: () => resolve("deleted"),
              preserveScroll: true,
              only: ["articles", "flash", "errors"],
            });
          });
        },
      });
    },
    [modal, colorErrorText],
  );

  const switchPublish = useCallback(
    (article: Article) => {
      if (article.published_at === null) {
        router.post(
          route("admin.articles.publish", article),
          {},
          {
            preserveScroll: true,
            only: ["articles", "flash", "errors"],
          },
        );
      } else {
        router.delete(route("admin.articles.unpublish", article), {
          preserveScroll: true,
          only: ["articles", "flash", "errors"],
        });
      }
    },
    [modal],
  );

  return (
    <>
      <Head title="文章" />
      <ContentContainer
        pageTitle="文章列表"
        actions={
          <Link href={route("admin.articles.create")}>
            <Button type="primary" size="large" icon={<PlusOutlined />}>
              新建
            </Button>
          </Link>
        }
      >
        <List<Article>
          rowKey="id"
          dataSource={articles.data}
          pagination={pagination}
          renderItem={(article) => (
            <List.Item
              actions={[
                <Switch
                  checked={article.published_at !== null}
                  checkedChildren="已发布"
                  unCheckedChildren="未发布"
                  onChange={(checked, event) => switchPublish(article)}
                />,
                <Link href={route("admin.articles.edit", article)}>
                  <Button type="primary" icon={<EditFilled key="edit" />} />
                </Link>,
                <Button
                  type="primary"
                  danger
                  icon={<DeleteFilled key="delete" />}
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
                    {formatTime(article.created_at, {
                      template: timeTemplate,
                      human: false,
                    })}
                  </div>
                </Col>
                <Col xs={0} sm={0} md={12}>
                  <div>最后更新时间：</div>
                  <div>
                    {formatTime(article.updated_at, {
                      template: timeTemplate,
                      human: false,
                    })}
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
