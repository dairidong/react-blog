import { FC } from 'react';
import { Link } from '@inertiajs/react';
import { Icon } from '@iconify/react';
import arrowNextLtr from '@iconify/icons-ooui/arrow-next-ltr';
import arrowPreviousLtr from '@iconify/icons-ooui/arrow-previous-ltr';
import { SimplePagination } from '@/types';
import { Article } from '@/types/models';
import {
  Card, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/Components/ui/card';
import styles from './styles.module.pcss';
import { cn, formatTime } from '@/lib/utils';

const Articles: FC<{ articles: SimplePagination<Article> }> = ({ articles }) => (
  <div className="tw-container tw-flex tw-flex-col tw-gap-y-10 tw-mt-5 lg:tw-mt-10">
    <div className="tw-text-center sm:tw-text-left">
      <h1 className="heading-title">文章</h1>
      {articles.current_page > 1 && (
      <p className="tw-text-secondary-foreground tw-text-xl">
        {`第 ${articles.current_page} 页`}
      </p>
      )}
    </div>

    <div className="tw-flex tw-flex-col tw-gap-y-8 md:tw-gap-y-16">

      <section>
        <ul className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-5 tw-list-none">
          {articles.data.map((article) => (
            <li key={article.id}>
              <Card className={styles.articleCard}>
                <CardHeader className="tw-gap-y-2">
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.description ?? article.title}</CardDescription>
                </CardHeader>
                <CardFooter className="tw-justify-between">
                  <section>{formatTime(article.created_at)}</section>
                  <section className="tw-underline tw-decoration-4 tw-underline-offset-4">
                    {article.category!.title}
                  </section>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="tw-flex tw-justify-evenly">
          {articles.prev_page_url ? (
            <Link
              className={cn(styles.paginationBtn, styles.prev)}
              href={articles.prev_page_url}
            >
              <Icon icon={arrowPreviousLtr} />
              <div>上一页</div>
            </Link>
          ) : <div />}
          {articles.next_page_url ? (
            <Link
              className={cn(styles.paginationBtn, styles.next)}
              href={articles.next_page_url}
            >
              <div>下一页</div>
              <Icon icon={arrowNextLtr} />
            </Link>
          ) : <div />}
        </div>
      </section>
    </div>
  </div>
);

export default Articles;
