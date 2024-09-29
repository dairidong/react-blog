import { FC } from "react";
import { Head } from "@inertiajs/react";
import { Article as ArticleModel } from "@/types/models";
import Article from "@/components/Article";
import { truncate } from "@/lib/utils";

// generate by tongyi
function generateMetaDescription(
  title: string,
  description: string | null,
  content: string | null,
  maxLength: number = 155,
): string {
  // 如果有提供文章描述，则优先使用它
  if (description && description.trim().length > 0) {
    return truncate(description, maxLength);
  }

  // 如果没有提供文章描述，尝试从文章内容中提取
  if (content && content.trim().length > 0) {
    // 使用正则表达式匹配句子
    const sentences = content.match(/[^.!?]+[.!?]*/g) || [];
    const generatedDescription = sentences.slice(0, 2).join(" "); // 使用前两句

    // 确保生成的描述不超过最大长度
    return truncate(generatedDescription, maxLength);
  }

  // 如果都没有，则使用文章标题
  return truncate(title, maxLength);
}

const Show: FC<{ article: Required<ArticleModel> }> = ({ article }) => {
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta
          head-key="description"
          name="description"
          content={generateMetaDescription(
            article.title,
            article.description,
            article.content,
          )}
        />
      </Head>
      {/* <Head title={article.title} /> */}
      <div className="tw-mt-5 lg:tw-mt-10">
        <div className="tw-container tw-flex tw-justify-center">
          <Article article={article} />
        </div>
      </div>
    </>
  );
};

export default Show;
