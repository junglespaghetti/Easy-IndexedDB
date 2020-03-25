function startMain() {
  let div = document.createElement("div");
  div.innerHTML = '<div id="frame-element"><div id="table-element"></div></div>';
  div.style.display = "none";
  document.body.appendChild(div);
  
  let wm = new Ventus.WindowManager();

  let window = wm.createWindow.fromQuery("#frame-element", {
    title: "My App",
    width: 330,
    height: 400,
    x: 670,
    y: 60
  });
  window.open();
  
  var data = [
  ['', 'Ford', 'Tesla', 'Toyota', 'Honda'],
  ['2017', 10, 11, 12, 13],
  ['2018', 20, 11, 14, 13],
  ['2019', 30, 15, 12, 13]
];

var container = document.getElementById('table-element');
var hot = new Handsontable(container, {
  data: data,
  rowHeaders: true,
  colHeaders: true,
  filters: true,
  dropdownMenu: true,
  licenseKey: "non-commercial-and-evaluation"
});

  
  alert("OK!");
}
