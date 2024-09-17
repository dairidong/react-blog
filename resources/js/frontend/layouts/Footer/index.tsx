import { FC } from "react";
import { usePage } from "@inertiajs/react";

const Footer: FC = () => {
  const { icp } = usePage<{
    icp: {
      icp_no: string | null;
      police_icp_no: string | null;
      police_icp_url: string | null;
    };
  }>().props;

  return (
    <footer className="tw-justify-self-end">
      <div className="tw-container tw-mt-20 tw-flex tw-min-h-[6rem] tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-font-nato tw-text-sm tw-font-medium tw-text-muted-foreground md:tw-flex-row md:tw-text-base">
        <section>
          <div>
            &copy; 2023 &nbsp;
            <a
              href="https://github.com/dairidong"
              className="tw-underline tw-decoration-2 tw-underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              Jatdung
            </a>
          </div>
        </section>

        <section className="tw-flex tw-flex-row tw-justify-center tw-gap-3">
          {icp?.icp_no && (
            <div>
              <a
                href="http://beian.miit.gov.cn/"
                target="_blank"
                rel="noreferrer"
                className="hover:tw-text-muted-foreground/80"
              >
                {icp.icp_no}
              </a>
            </div>
          )}

          {icp?.police_icp_no && icp?.police_icp_url && (
            <div>
              <a
                href={icp.police_icp_url}
                target="_blank"
                rel="noreferrer"
                className="hover:tw-text-muted-foreground/80"
              >
                {icp.police_icp_no}
              </a>
            </div>
          )}
        </section>
      </div>
    </footer>
  );
};

export default Footer;
