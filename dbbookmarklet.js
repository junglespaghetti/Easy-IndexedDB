javascript: (function(f, urls, cssUlrs, i, s, c) {
  urls = [
    "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.1.0/papaparse.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/alasql/0.5.5/alasql.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Ventus/0.3.0/ventus.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/handsontable/7.4.2/handsontable.full.min.js"
  ];
  cssUlrs = [
    "https://junglespaghetti.github.io/trade-recorder/css/trade-recoder.css"
  ];
  for (i = 0; i < cssUlrs.length; i++) {
    c = document.createElement("link");
    c.type = "text/css";
    c.rel = "stylesheet";
    c.href = cssUlrs[i];
    document.body.appendChild(c);
  }
  for (i = 0; i < urls.length; i++) {
    s = document.createElement("script");
    s.src = urls[i];
    if (i == urls.length - 1) {
      s.onload = function() {
        f();
      };
    }
    document.body.appendChild(s);
  }
})(function() {
  startMain();
});
