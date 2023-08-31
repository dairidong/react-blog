import { Head, router } from "@inertiajs/react";
import { FC } from "react";
import { Button, List, Switch, theme } from "antd";
import { PaginationConfig } from "antd/es/pagination";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { LaravelPagination } from "@/types";
import { Article } from "@/types/models";
import { formatTime } from "@/lib/utils";

const timeTemplate = "YYYY年MM月DD日 HH:mm:ss";

const Articles: FC<{ articles: LaravelPagination<Article> }> = ({
  articles,
}) => {
  const {
    token: { colorTextSecondary },
  } = theme.useToken();

  const pagination: PaginationConfig = {
    pageSize: articles.per_page,
    total: articles.total,
    current: articles.current_page,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
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

  return (
    <>
      <Head title="文章" />
      <div>
        <List<Article>
          rowKey="id"
          dataSource={articles.data}
          pagination={pagination}
          header={
            <div className="tw-flex tw-justify-between">
              <h1 className="tw-text-3xl tw-font-bold">文章列表</h1>
              <div className="actions">
                <Button type="primary" size="large">
                  新建 +
                </Button>
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
                <EditTwoTone className="tw-text-xl" key="edit" />,
                <DeleteTwoTone className="tw-text-xl" key="delete" />,
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
              <ul
                style={{
                  display: "flex",
                  alignItems: "start",
                  gap: 20,
                  color: colorTextSecondary,
                }}
              >
                <li className="tw-flex tw-flex-col">
                  <div>创建时间：</div>
                  <div>
                    {formatTime(article.created_at, timeTemplate, false)}
                  </div>
                </li>
                <li className="tw-flex tw-flex-col">
                  <div>最后更新时间：</div>
                  <div>
                    {formatTime(article.updated_at, timeTemplate, false)}
                  </div>
                </li>
              </ul>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default Articles;
