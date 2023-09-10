import { NormalComponents } from "react-markdown/lib/complex-types";
import { clsx } from "clsx";

const Pre: NormalComponents["pre"] = ({ node, className, ...props }) => (
  <pre className={clsx(className, "line-numbers")} {...props} />
);

export default Pre;
