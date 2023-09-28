import { Head, Link } from "@inertiajs/react";
import { FC } from "react";
import { isEmpty } from "lodash";
import arrowNextLtr from "@iconify/icons-ooui/arrow-next-ltr";
import { Icon } from "@iconify/react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTime } from "@/lib/utils";
import { Article } from "@/types/models";
import styles from "./styles.module.pcss";

interface Props {
  articles: Article[];
}

const Home: FC<Props> = ({ articles }) => {
  return (
    <>
      <Head title="首页" />
      <div className="tw-flex tw-flex-col">
        <section className="tw-flex tw-min-h-[40vh] tw-flex-nowrap tw-items-center tw-justify-center">
          <h1 className="tw-text-3xl tw-transition-[font-size] tw-duration-500 sm:tw-text-5xl md:tw-text-6xl">
            在这记点笔记。。。
          </h1>
        </section>
        <section className="tw-container tw-flex tw-flex-col tw-gap-y-5">
          <div className="tw-flex tw-flex-row tw-items-end tw-justify-between tw-border-b-4 tw-pb-2">
            <h3 className="tw-text-3xl sm:tw-text-4xl">最新文章</h3>
            <div className="tw-text-2xl sm:tw-text-3xl">
              <Link
                href={route("articles.index")}
                className="tw-flex tw-items-center"
              >
                更多 <Icon icon={arrowNextLtr} />
              </Link>
            </div>
          </div>
          <div className="tw-grid tw-gap-5 md:tw-grid-cols-3">
            {!isEmpty(articles) &&
              articles.map((article) => (
                <Link
                  href={route("articles.show", article.slug ?? article.id)}
                  key={article.id}
                >
                  <Card className={styles.articleCard}>
                    <CardHeader className="tw-gap-y-2">
                      <CardTitle className="xs:tw-text-xl sm:tw-text-2xl">
                        {article.title}
                      </CardTitle>
                      <CardDescription>
                        {article.description ?? article.title}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="tw-justify-between">
                      <section>{formatTime(article.created_at)}</section>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
