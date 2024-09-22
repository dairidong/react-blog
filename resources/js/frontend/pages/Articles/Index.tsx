import { FC, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import { Icon } from "@iconify/react";
import arrowNextLtr from "@iconify/icons-ooui/arrow-next-ltr";
import { isEmpty } from "lodash-es";
import { useRoute } from "ziggy-js";
import { SimplePagination } from "@/types";
import { Article } from "@/types/models";

import { formatTime } from "@/lib/dayjs";
import { Badge } from "@/components/ui/badge";
import Pagination from "./pagination";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import ArticleListItem from "@frontend/pages/Articles/ArticleListItem";

const Index: FC<{ articles: SimplePagination<Article> }> = ({ articles }) => {
  const route = useRoute();
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true });

  return (
    <>
      <Head title="文章" />
      <div className="tw-container tw-mt-5 tw-flex tw-max-w-screen-lg tw-flex-col tw-gap-y-10 lg:tw-mt-10">
        <div className="tw-text-center sm:tw-text-left" ref={titleRef}>
          <h1
            className={cn(
              "tw-my-4 tw-text-4xl tw-tracking-tight tw-text-foreground tw-transition-[transform,opacity] tw-duration-700 md:tw-text-5xl lg:tw-text-6xl",
              isInView
                ? "tw-translate-x-0 tw-opacity-100"
                : "-tw-translate-x-32 tw-opacity-0",
            )}
          >
            文章
          </h1>
          {articles.current_page > 1 && (
            <p
              className={cn(
                "tw-text-xl tw-text-secondary-foreground tw-transition-[transform,opacity] tw-delay-200 tw-duration-700",
                isInView
                  ? "tw-translate-x-0 tw-opacity-100"
                  : "tw-translate-x-16 tw-opacity-0",
              )}
            >
              {`第 ${articles.current_page} 页`}
            </p>
          )}
        </div>

        <div className="tw-flex tw-flex-col tw-gap-y-8 md:tw-gap-y-16">
          <ul className="tw-flex tw-list-none tw-flex-col tw-justify-stretch tw-gap-5">
            {articles.data.map((article) => (
              <li key={article.id}>
                <ArticleListItem article={article} />
              </li>
            ))}
          </ul>

          <Pagination
            prevUrl={articles.prev_page_url}
            nextUrl={articles.next_page_url}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
