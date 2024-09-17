import { Head, Link } from "@inertiajs/react";
import { FC } from "react";
import { isEmpty } from "lodash-es";
import arrowNextLtr from "@iconify/icons-ooui/arrow-next-ltr";
import { Icon } from "@iconify/react";
import { useRoute } from "ziggy-js";
import { Article } from "@/types/models";
import ArticleCard from "@frontend/pages/Home/article-card";

interface Props {
  latestArticles: Article[];
  hottestArticles: Article[];
}

const Home: FC<Props> = ({ latestArticles, hottestArticles }) => {
  const route = useRoute();

  return (
    <>
      <Head title="首页" />
      <div className="tw-flex tw-flex-col">
        <section className="tw-flex tw-min-h-[40vh] tw-flex-nowrap tw-items-center tw-justify-center">
          <h1 className="tw-text-3xl tw-transition-[font-size] tw-duration-500 sm:tw-text-5xl md:tw-text-6xl">
            在这记点笔记。。。
          </h1>
        </section>

        <div className="tw-flex tw-flex-col tw-gap-y-16">
          {!isEmpty(latestArticles) && (
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
                {latestArticles.map((article) => (
                  <Link
                    href={route("articles.show", article.slug ?? article.id)}
                    key={article.id}
                  >
                    <ArticleCard article={article} />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {!isEmpty(hottestArticles) && (
            <section className="tw-container tw-flex tw-flex-col tw-gap-y-5">
              <div className="tw-flex tw-flex-row tw-items-end tw-justify-between tw-border-b-4 tw-pb-2">
                <h3 className="tw-text-3xl sm:tw-text-4xl">最热文章</h3>
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
                {hottestArticles.map((article) => (
                  <Link
                    href={route("articles.show", article.slug ?? article.id)}
                    key={article.id}
                  >
                    <ArticleCard article={article} />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
