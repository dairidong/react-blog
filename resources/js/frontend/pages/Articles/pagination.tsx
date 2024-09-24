import { Link } from "@inertiajs/react";
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
          className={cn(
            "tw-flex tw-transform tw-cursor-pointer tw-items-center tw-gap-1 tw-border-4 tw-border-black tw-bg-primary tw-px-5 tw-py-2 tw-text-xl tw-text-primary-foreground hover:tw-bg-primary hover:tw-text-primary-foreground  md:tw-px-10 md:tw-text-2xl lg:tw-bg-background lg:tw-text-foreground",
            "tw-skew-x-12",
          )}
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
          className={cn(
            "tw-flex tw-transform tw-cursor-pointer tw-items-center tw-gap-1 tw-border-4 tw-border-black tw-bg-primary tw-px-5 tw-py-2 tw-text-xl tw-text-primary-foreground hover:tw-bg-primary hover:tw-text-primary-foreground  md:tw-px-10 md:tw-text-2xl lg:tw-bg-background lg:tw-text-foreground",
            "-tw-skew-x-12",
          )}
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
