javascript: (function(f, urls, i, s) {
  urls = [
    "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.1.0/papaparse.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/dexie/2.0.4/dexie.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Ventus/0.3.0/ventus.min.js"
  ];
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
  var wm = new Ventus.WindowManager();
 var window = wm.createWindow({
	title: 'A new window',
	x: 50,
	y: 50,
	width: 400,
	height: 250,
	animations: false,
	stayinspace: true
});

window.open();
});
