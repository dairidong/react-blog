import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTime } from "@/lib/dayjs";
import { Article } from "@/types/models";
import { cn } from "@/lib/utils";

const ArticleCard = ({ article }: { article: Article }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref}>
      <div
        className={cn(
          "tw-duration-1000 tw-ease-in-out",
          isInView ? "tw-opacity-100" : "-tw-translate-y-1/4 tw-opacity-0",
        )}
      >
        <Card className="tw-flex tw-h-full tw-flex-col tw-justify-between tw-rounded-none tw-border-[3px] tw-border-primary tw-transition-transform tw-ease-in-out hover:tw-scale-105">
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
      </div>
    </div>
  );
};

export default ArticleCard;
