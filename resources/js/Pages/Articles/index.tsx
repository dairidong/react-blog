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
  <div className="container flex flex-col gap-y-10 mt-5 lg:mt-10">
    <div className="text-center sm:text-left">
      <h1 className="my-4 text-4xl tracking-tight text-primary md:text-5xl lg:text-6xl">文章</h1>
      {articles.current_page > 1 && (
      <p className="text-secondary-foreground text-xl">
        {`第 ${articles.current_page} 页`}
      </p>
      )}
    </div>

    <div className="flex flex-col gap-y-8 md:gap-y-16">

      <section>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
          {articles.data.map((article) => (
            <li key={article.id}>
              <Card className={styles.articleCard}>
                <CardHeader className="gap-y-2">
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.description ?? article.title}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-between">
                  <section>{formatTime(article.created_at)}</section>
                  <section>{article.category!.title}</section>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="pagination flex justify-evenly">
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
