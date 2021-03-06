javascript: (function(f, urls,cssUlrs, i, s,c) {
  urls = [
    "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.1.0/papaparse.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/dexie/2.0.4/dexie.min.js",
    "https://cdn.jsdelivr.net/npm/jspanel4@4.9.4/dist/jspanel.js",
     "https://easy-indexeddb.glitch.me/js/easyIndexedDB.js"
  ];
  cssUlrs = [
    "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
    "https://cdn.jsdelivr.net/npm/jspanel4@4.9.4/dist/jspanel.css",
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