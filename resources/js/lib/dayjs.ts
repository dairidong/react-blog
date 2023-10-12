import dayjs from "dayjs";
import locale_zhCn from "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale(locale_zhCn);

interface FormatTimeOptions {
  template?: string;
  human?: boolean;
}

export const formatTime = (
  date: dayjs.ConfigType,
  options?: FormatTimeOptions,
) => {
  const defaultOptions: FormatTimeOptions = {
    template: "YYYY-MM-DD",
    human: true,
  };
  const { template, human } = {
    ...defaultOptions,
    ...options,
  };

  const dayjsDate = dayjs(date);

  if (dayjs().isAfter(dayjsDate.clone().add(15, "day"))) {
    return dayjs(date).format(template);
  }

  if (human) {
    return dayjsDate.isAfter() ? dayjs(date).fromNow() : dayjs(date).toNow();
  }

  return dayjs(date).format(template);
};

export default dayjs;
