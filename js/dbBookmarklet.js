async function startMain() {
  let url = 'https://script.google.com/macros/s/AKfycbxKmy8wnZSKN2i-VlcVwcUutTu_4bvHdZ7zU7yvbCN0PFyONN4/exec'
 

loadJS( url+'?callback=jsonp_callback');

loadJS( url+'?callback=jsonp_callback2');
  
//  showWindowFrame();
  
//  alert("OK!");
}

 function loadJS(src){
  var script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
}

var jsonp_callback = function(data){
  alert(data)
};

var jsonp_callback2 = function(data){
  alert(data)
};

function showWindowFrame() {
  var easyIndexedDB = jsPanel.create({
    headerTitle: "Easy IndexedDB",
    position: "center-top 0 80",
    contentSize: "450 250",
    content: '<div id="table-element"></div>',
    callback: function(panel) {
      showGridTable()
    }
  });
}

function showGridTable(){
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
}
