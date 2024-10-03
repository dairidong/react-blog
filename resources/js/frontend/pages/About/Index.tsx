import { Head } from "@inertiajs/react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const About = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const aboutSiteRef = useRef<HTMLDivElement>(null);

  const imageIsInView = useInView(imageRef, { once: true });
  const aboutMeIsInView = useInView(aboutMeRef, { once: true });
  const aboutSiteIsInView = useInView(aboutSiteRef, { once: true });

  return (
    <>
      <Head title="关于" />
      <div className="tw-container">
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-16">
          <div ref={imageRef}>
            <img
              src="/avatar.jpg"
              alt="my avatar"
              className={cn(
                "tw-w-72 tw-select-none tw-transition-all tw-duration-500",
                imageIsInView ? "" : "tw-translate-y-1/4 tw-opacity-0",
              )}
              loading="lazy"
            />
          </div>

          <article className="tw-prose">
            <section
              ref={aboutMeRef}
              className={cn(
                "tw-transition-all tw-duration-500",
                aboutMeIsInView ? "" : "tw-translate-y-1/4 tw-opacity-0",
              )}
            >
              <h2>关于我</h2>
              <p>
                一个全栈开发程序员，涉及
                PHP、NodeJs、Laravel、Nestjs、Electron、React、Vue、Next.js
                等等相关技术栈。
              </p>
            </section>

            <section
              ref={aboutSiteRef}
              className={cn(
                "tw-transition-all tw-duration-500",
                aboutSiteIsInView ? "" : "tw-translate-y-1/4 tw-opacity-0",
              )}
            >
              <h2>关于本站</h2>
              <p>
                本人的个人技术博客，记录学习历程，使用 PHP + Laravel + InertiaJs
                + React 编写。
              </p>
            </section>
          </article>
        </div>
      </div>
    </>
  );
};

export default About;
