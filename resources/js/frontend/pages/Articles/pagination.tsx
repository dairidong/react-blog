import { Link } from "@inertiajs/react";
import styles from "@frontend/pages/Articles/styles.module.pcss";
import { Icon } from "@iconify/react";
import arrowPreviousLtr from "@iconify/icons-ooui/arrow-previous-ltr";
import arrowNextLtr from "@iconify/icons-ooui/arrow-next-ltr";
import { cn } from "@/lib/utils";

const Pagination = ({
  prevUrl,
  nextUrl,
}: {
  prevUrl?: string | null;
  nextUrl?: string | null;
}) => {
  return (
    <div className="tw-flex tw-justify-evenly">
      {prevUrl ? (
        <Link
          className={cn(styles.paginationBtn, styles.prev)}
          href={prevUrl}
          only={["articles"]}
        >
          <Icon icon={arrowPreviousLtr} />
          <div>上一页</div>
        </Link>
      ) : (
        <div />
      )}
      {nextUrl ? (
        <Link
          className={cn(styles.paginationBtn, styles.next)}
          href={nextUrl}
          only={["articles"]}
        >
          <div>下一页</div>
          <Icon icon={arrowNextLtr} />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Pagination;
