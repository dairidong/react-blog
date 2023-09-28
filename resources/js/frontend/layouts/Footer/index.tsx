import { FC } from "react";
import styles from "./styles.module.pcss";

const Footer: FC<{
  icp?: {
    icp_no: string | null;
    police_icp_no: string | null;
    police_icp_url: string | null;
  };
}> = ({ icp }) => (
  <div className={styles.footerContainer}>
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
);

export default Footer;
