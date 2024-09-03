import { FC } from "react";
import { Head, Link } from "@inertiajs/react";
import { Icon } from "@iconify/react";
import arrowNextLtr from "@iconify/icons-ooui/arrow-next-ltr";
import arrowPreviousLtr from "@iconify/icons-ooui/arrow-previous-ltr";
import { isEmpty } from "lodash-es";
import { SimplePagination } from "@/types";
import { Article } from "@/types/models";

import styles from "./styles.module.pcss";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/dayjs";
import { Badge } from "@/components/ui/badge";

const Index: FC<{ articles: SimplePagination<Article> }> = ({ articles }) => (
  <>
    <Head title="文章" />
    <div className="tw-container tw-mt-5 tw-flex tw-max-w-screen-lg tw-flex-col tw-gap-y-10 lg:tw-mt-10">
      <div className="tw-text-center sm:tw-text-left">
        <h1 className="heading-title">文章</h1>
        {articles.current_page > 1 && (
          <p className="tw-text-xl tw-text-secondary-foreground">
            {`第 ${articles.current_page} 页`}
          </p>
        )}
      </div>

      <div className="tw-flex tw-flex-col tw-gap-y-8 md:tw-gap-y-16">
        <ul className="tw-flex tw-list-none tw-flex-col tw-justify-stretch tw-gap-5">
          {articles.data.map((article) => (
            <li key={article.id}>
              <section className="tw-flex tw-flex-col tw-gap-2 tw-border-b tw-py-5">
                <Link href={route("articles.show", article.slug || article.id)}>
                  <h3 className="animated-underline tw-text-3xl">
                    {article.title}
                  </h3>
                </Link>
                {!isEmpty(article.tags) && (
                  <div className="tw-flex tw-gap-1 tw-font-sans">
                    {article.tags?.map((tag) => (
                      <Badge key={tag.id}>{tag.name}</Badge>
                    ))}
                  </div>
                )}
                <div className="tw-flex tw-flex-wrap tw-gap-x-5 tw-font-nato tw-text-muted-foreground">
                  <div>发布时间：{formatTime(article.created_at)}</div>
                  <div>最后更新于：{formatTime(article.updated_at)}</div>
                </div>
                <p className="tw-my-3 tw-font-nato tw-text-sm tw-text-muted-foreground">
                  {article.description || article.title}
                </p>

                <div className="tw-flex tw-justify-between">
                  <div className="tw-font-nato tw-text-muted-foreground">
                    <span>阅读量：</span>
                    <span>{article.visits_count}</span>
                  </div>
                  <Link
                    href={route("articles.show", article.slug || article.id)}
                    className="tw-g-1 animated-underline tw-flex tw-items-center tw-gap-1 tw-font-nato"
                  >
                    <span>Read More</span> <Icon icon={arrowNextLtr} />
                  </Link>
                </div>
              </section>
            </li>
          ))}
        </ul>

        <div className="tw-flex tw-justify-evenly">
          {articles.prev_page_url ? (
            <Link
              className={cn(styles.paginationBtn, styles.prev)}
              href={articles.prev_page_url}
              only={["articles"]}
            >
              <Icon icon={arrowPreviousLtr} />
              <div>上一页</div>
            </Link>
          ) : (
            <div />
          )}
          {articles.next_page_url ? (
            <Link
              className={cn(styles.paginationBtn, styles.next)}
              href={articles.next_page_url}
              only={["articles"]}
            >
              <div>下一页</div>
              <Icon icon={arrowNextLtr} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  </>
);

export default Index;
