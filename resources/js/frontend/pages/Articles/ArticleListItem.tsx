import { Link } from "@inertiajs/react";
import { Icon } from "@iconify/react";
import arrowNextLtr from "@iconify/icons-ooui/arrow-next-ltr";
import { useRoute } from "ziggy-js";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { isEmpty, cn } from "@/lib/utils";
import { Article } from "@/types/models";
import { formatTime } from "@/lib/dayjs";
import { Badge } from "@/components/ui/badge";

const ArticleListItem = ({ article }: { article: Article }) => {
  const route = useRoute();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      className="tw-flex tw-flex-col tw-gap-2 tw-border-b tw-py-5"
      ref={ref}
    >
      <Link
        className={cn(
          "tw-transition-[transform,opacity] tw-duration-700",
          isInView ? "tw-opacity-1" : "-tw-translate-y-16 tw-opacity-0",
        )}
        href={route("articles.show", article.slug || article.id)}
      >
        <h3 className="animated-underline tw-text-3xl">{article.title}</h3>
      </Link>
      {!isEmpty(article.tags) && (
        <div
          className={cn(
            "tw-flex tw-gap-1 tw-font-sans tw-transition-[transform,opacity] tw-duration-700",
            isInView ? "tw-opacity-1" : "-tw-translate-y-16 tw-opacity-0",
          )}
        >
          {article.tags?.map((tag) => <Badge key={tag.id}>{tag.name}</Badge>)}
        </div>
      )}
      <div
        className={cn(
          "tw-flex tw-flex-wrap tw-gap-x-5 tw-font-nato tw-text-muted-foreground tw-transition-[transform,opacity] tw-duration-700",
          isInView ? "tw-opacity-1" : "-tw-translate-y-16 tw-opacity-0",
        )}
      >
        <div>发布时间：{formatTime(article.created_at)}</div>
        <div>最后更新于：{formatTime(article.updated_at)}</div>
      </div>
      <p
        className={cn(
          "tw-my-3 tw-font-nato tw-text-sm tw-text-muted-foreground tw-transition-[transform,opacity] tw-duration-700",
          isInView ? "tw-opacity-1" : "-tw-translate-x-16 tw-opacity-0",
        )}
      >
        {article.description || article.title}
      </p>

      <div className="tw-flex tw-justify-between">
        <div
          className={cn(
            "tw-font-nato tw-text-muted-foreground tw-transition-[transform_opacity] tw-duration-500",
            isInView ? "tw-opacity-1" : "-tw-translate-x-12 tw-opacity-0",
          )}
        >
          <span>阅读量：</span>
          <span>{article.visits_count}</span>
        </div>
        <Link
          href={route("articles.show", article.slug || article.id)}
          className={cn(
            "animated-underline tw-flex tw-items-center tw-gap-1 tw-font-nato tw-transition-[transform,opacity,background-size] tw-duration-500",
            isInView ? "tw-opacity-1" : "tw-translate-x-12 tw-opacity-0",
          )}
        >
          <span>Read More</span> <Icon icon={arrowNextLtr} />
        </Link>
      </div>
    </section>
  );
};

export default ArticleListItem;
