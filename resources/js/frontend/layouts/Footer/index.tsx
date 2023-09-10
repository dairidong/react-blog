import styles from "./styles.module.pcss";

const Footer = () => (
  <div className={styles.footerContainer}>
    <section>
      <div>
        &copy;{" 2023 "}
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
      <div>
        <a
          href="http://beian.miit.gov.cn/"
          target="_blank"
          rel="noreferrer"
          className="hover:tw-text-muted-foreground/80"
        >
          粤ICP备2021112135号
        </a>
      </div>

      <div>
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44190002005713"
          target="_blank"
          rel="noreferrer"
          className="hover:tw-text-muted-foreground/80"
        >
          粤公网安备 44190002005713号
        </a>
      </div>
    </section>
  </div>
);

export default Footer;
