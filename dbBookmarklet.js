javascript: (function(s) {
  gsUrl =
    "https://script.google.com/macros/s/AKfycbxKmy8wnZSKN2i-VlcVwcUutTu_4bvHdZ7zU7yvbCN0PFyONN4/exec";
  scriptFanc = {
    pass: "test",
    callback: "jsonp_callback",
    origin: location.hostname
  };
  s = document.createElement("script");
  s.src = gsUrl + "?pass=" + scriptFanc.pass + "&loader=true";
  document.body.appendChild(s);
})();
