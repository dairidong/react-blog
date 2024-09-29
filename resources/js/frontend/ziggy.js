const Ziggy = {"url":"http:\/\/react-blog.test","port":null,"defaults":{},"routes":{"home":{"uri":"\/","methods":["GET","HEAD"]},"articles.index":{"uri":"articles","methods":["GET","HEAD"]},"articles.show":{"uri":"articles\/{article}","methods":["GET","HEAD"],"parameters":["article"],"bindings":{"article":"id"}},"about":{"uri":"about","methods":["GET","HEAD"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
